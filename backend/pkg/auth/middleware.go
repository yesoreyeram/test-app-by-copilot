package auth

import (
	"context"
	"net/http"
	"strings"

	"github.com/yesoreyeram/test-app-by-copilot/backend/internal/store"
)

type contextKey string

const UserContextKey contextKey = "user"

type AuthMiddleware struct {
	store *store.MemoryStore
}

func NewAuthMiddleware(store *store.MemoryStore) *AuthMiddleware {
	return &AuthMiddleware{store: store}
}

func (a *AuthMiddleware) RequireAuth(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, `{"meta":{"status":"error","reason":"unauthorized"}}`, http.StatusUnauthorized)
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			http.Error(w, `{"meta":{"status":"error","reason":"invalid authorization header"}}`, http.StatusUnauthorized)
			return
		}

		token := parts[1]
		session, err := a.store.GetSession(token)
		if err != nil {
			http.Error(w, `{"meta":{"status":"error","reason":"invalid or expired token"}}`, http.StatusUnauthorized)
			return
		}

		user, err := a.store.GetUserByID(session.UserID)
		if err != nil {
			http.Error(w, `{"meta":{"status":"error","reason":"user not found"}}`, http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), UserContextKey, user)
		next.ServeHTTP(w, r.WithContext(ctx))
	}
}

func GetUserFromContext(ctx context.Context) (*store.User, bool) {
	user, ok := ctx.Value(UserContextKey).(*store.User)
	return user, ok
}
