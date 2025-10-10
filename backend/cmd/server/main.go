package main

import (
	"embed"
	"encoding/json"
	"io/fs"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/yesoreyeram/test-app-by-copilot/backend/internal/store"
	"github.com/yesoreyeram/test-app-by-copilot/backend/pkg/auth"
	"github.com/yesoreyeram/test-app-by-copilot/backend/pkg/mathops"
	"github.com/yesoreyeram/test-app-by-copilot/backend/pkg/tempconv"
	"github.com/yesoreyeram/test-app-by-copilot/backend/pkg/textconv"
)

//go:embed dist
var staticFiles embed.FS

var userStore *store.MemoryStore
var authMiddleware *auth.AuthMiddleware

func main() {
	userStore = store.NewMemoryStore()
	authMiddleware = auth.NewAuthMiddleware(userStore)

	// Serve static files
	distFS, err := fs.Sub(staticFiles, "dist")
	if err != nil {
		log.Printf("Warning: Could not load embedded static files: %v", err)
		log.Println("Static files will not be served. Run 'yarn build' in frontend to create them.")
	}
	
	// API endpoints
	http.HandleFunc("/health", healthHandler)
	
	// Text conversion endpoints
	http.HandleFunc("/api/convert/lower", convertHandler("lower"))
	http.HandleFunc("/api/convert/upper", convertHandler("upper"))
	http.HandleFunc("/api/convert/camel", convertHandler("camel"))
	http.HandleFunc("/api/convert/title", convertHandler("title"))
	http.HandleFunc("/api/convert/inverse", convertHandler("inverse"))
	http.HandleFunc("/api/convert/reverse", convertHandler("reverse"))
	
	// Math operation endpoints
	http.HandleFunc("/api/math/add/", mathHandler)
	http.HandleFunc("/api/math/subtract/", mathHandler)
	http.HandleFunc("/api/math/multiply/", mathHandler)
	http.HandleFunc("/api/math/divide/", mathHandler)
	
	// Temperature conversion endpoints (protected)
	http.HandleFunc("/api/temp/", authMiddleware.RequireAuth(tempHandler))
	
	// Auth endpoints
	http.HandleFunc("/api/auth/register", registerHandler)
	http.HandleFunc("/api/auth/login", loginHandler)
	http.HandleFunc("/api/auth/logout", authMiddleware.RequireAuth(logoutHandler))
	http.HandleFunc("/api/auth/profile", authMiddleware.RequireAuth(profileHandler))

	// Serve static files for all other routes (only if dist exists)
	if err == nil {
		http.Handle("/", http.FileServer(http.FS(distFS)))
	}

	port := "8080"
	log.Printf("Server starting on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status": "healthy",
		"service": "test-app-backend",
	})
}

func convertHandler(convType string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, `{"meta":{"status":"error","reason":"method not allowed"}}`, http.StatusMethodNotAllowed)
			return
		}

		var req struct {
			Input string `json:"input"`
		}

		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, `{"meta":{"status":"error","reason":"invalid JSON"}}`, http.StatusBadRequest)
			return
		}

		var output string
		switch convType {
		case "lower":
			output = textconv.ToLowerCase(req.Input)
		case "upper":
			output = textconv.ToUpperCase(req.Input)
		case "camel":
			output = textconv.ToCamelCase(req.Input)
		case "title":
			output = textconv.ToTitleCase(req.Input)
		case "inverse":
			output = textconv.ToInverseCase(req.Input)
		case "reverse":
			output = textconv.ReverseText(req.Input)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"output": output,
			"meta": map[string]string{
				"status": "success",
			},
		})
	}
}

func mathHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, `{"meta":{"status":"error","reason":"method not allowed"}}`, http.StatusMethodNotAllowed)
		return
	}

	// Parse URL path: /api/math/{operation}/{a}/{b}
	parts := strings.Split(strings.TrimPrefix(r.URL.Path, "/api/math/"), "/")
	if len(parts) != 3 {
		http.Error(w, `{"meta":{"status":"error","reason":"invalid path format"}}`, http.StatusBadRequest)
		return
	}

	operation := parts[0]
	a, err1 := strconv.ParseFloat(parts[1], 64)
	b, err2 := strconv.ParseFloat(parts[2], 64)

	if err1 != nil || err2 != nil {
		http.Error(w, `{"meta":{"status":"error","reason":"invalid number format"}}`, http.StatusBadRequest)
		return
	}

	var result float64
	var err error

	switch operation {
	case "add":
		result = mathops.Add(a, b)
	case "subtract":
		result = mathops.Subtract(a, b)
	case "multiply":
		result = mathops.Multiply(a, b)
	case "divide":
		result, err = mathops.Divide(a, b)
		if err != nil {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{
				"meta": map[string]string{
					"status": "error",
					"reason": err.Error(),
				},
			})
			return
		}
	default:
		http.Error(w, `{"meta":{"status":"error","reason":"unknown operation"}}`, http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"output": result,
	})
}

func tempHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, `{"meta":{"status":"error","reason":"method not allowed"}}`, http.StatusMethodNotAllowed)
		return
	}

	// Parse URL path: /api/temp/{from}/{to}/{value}
	parts := strings.Split(strings.TrimPrefix(r.URL.Path, "/api/temp/"), "/")
	if len(parts) != 3 {
		http.Error(w, `{"meta":{"status":"error","reason":"invalid path format"}}`, http.StatusBadRequest)
		return
	}

	from := parts[0]
	to := parts[1]
	value, err := strconv.ParseFloat(parts[2], 64)

	if err != nil {
		http.Error(w, `{"meta":{"status":"error","reason":"invalid number format"}}`, http.StatusBadRequest)
		return
	}

	var result float64
	if from == "c" && to == "f" {
		result = tempconv.CelsiusToFahrenheit(value)
	} else if from == "f" && to == "c" {
		result = tempconv.FahrenheitToCelsius(value)
	} else {
		http.Error(w, `{"meta":{"status":"error","reason":"unsupported conversion"}}`, http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"output": result,
		"meta": map[string]string{
			"status": "success",
		},
	})
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, `{"meta":{"status":"error","reason":"method not allowed"}}`, http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"meta":{"status":"error","reason":"invalid JSON"}}`, http.StatusBadRequest)
		return
	}

	user, err := userStore.CreateUser(req.Username, req.Email, req.Password)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"meta": map[string]string{
				"status": "error",
				"reason": err.Error(),
			},
		})
		return
	}

	session, _ := userStore.CreateSession(user.ID)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"user": user,
		"token": session.Token,
		"meta": map[string]string{
			"status": "success",
		},
	})
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, `{"meta":{"status":"error","reason":"method not allowed"}}`, http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"meta":{"status":"error","reason":"invalid JSON"}}`, http.StatusBadRequest)
		return
	}

	user, err := userStore.ValidateCredentials(req.Username, req.Password)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"meta": map[string]string{
				"status": "error",
				"reason": "invalid credentials",
			},
		})
		return
	}

	session, _ := userStore.CreateSession(user.ID)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"user": user,
		"token": session.Token,
		"meta": map[string]string{
			"status": "success",
		},
	})
}

func logoutHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, `{"meta":{"status":"error","reason":"method not allowed"}}`, http.StatusMethodNotAllowed)
		return
	}

	authHeader := r.Header.Get("Authorization")
	parts := strings.Split(authHeader, " ")
	if len(parts) == 2 {
		userStore.DeleteSession(parts[1])
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"meta": map[string]string{
			"status": "success",
		},
	})
}

func profileHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, `{"meta":{"status":"error","reason":"method not allowed"}}`, http.StatusMethodNotAllowed)
		return
	}

	user, ok := auth.GetUserFromContext(r.Context())
	if !ok {
		http.Error(w, `{"meta":{"status":"error","reason":"user not found in context"}}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"user": user,
		"meta": map[string]string{
			"status": "success",
		},
	})
}
