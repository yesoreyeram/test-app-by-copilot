# test-app-by-copilot

A full-stack enterprise-level web application with React frontend and Go backend, featuring text conversion, math operations, and temperature conversion tools.

## Features

### Core Functionalities
- **Text Conversion**: Lower case, upper case, camel case, title case, inverse case, and text reverse
- **Math Operations**: Addition, subtraction, multiplication, and division
- **Temperature Converter**: Celsius to Fahrenheit and vice versa (protected route)

### UI/UX
- Responsive design with Tailwind CSS
- Sticky top navigation with logo, breadcrumbs, and search
- Collapsible left sidebar with feature links
- Multiple theme support (Dark, Light, Gold) - **Dark theme by default**
- Hero section on home page

### Authentication
- User registration and login
- Protected routes for authenticated users
- Profile and settings pages
- Session-based authentication with in-memory storage

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **React Router 7** for routing
- **Tailwind CSS 4** for styling
- **Zod** for validation
- **Webpack 5** for bundling with Hot Module Replacement
- **Jest** and **React Testing Library** for unit testing
- **Playwright** for E2E testing
- **Yarn** as package manager

### Backend
- **Go 1.24**
- Embedded frontend (no CORS needed)
- Modular package structure:
  - `textconv` - Text conversion operations
  - `mathops` - Mathematical operations
  - `tempconv` - Temperature conversion
  - `auth` - Authentication middleware
  - `store` - In-memory data storage
- RESTful API with path parameters
- Health check endpoint
- Hot reload support with Air

## Project Structure

```
.
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts (Theme, Auth)
│   │   ├── utils/          # Utility functions
│   │   └── hooks/          # Custom React hooks
│   ├── public/             # Static assets
│   ├── e2e/                # Playwright E2E tests
│   └── webpack.config.js   # Webpack configuration
│
├── backend/
│   ├── cmd/server/         # Main application entry point
│   ├── pkg/                # Public packages
│   │   ├── textconv/       # Text conversion
│   │   ├── mathops/        # Math operations
│   │   ├── tempconv/       # Temperature conversion
│   │   └── auth/           # Authentication
│   └── internal/store/     # Internal data storage
│
├── .github/workflows/      # CI/CD pipelines
├── Dockerfile              # Production build
├── Dockerfile.dev          # Development build
├── docker-compose.yml      # Production compose
└── docker-compose.dev.yml  # Development compose
```

## Getting Started

### Prerequisites
- Go 1.24 or higher
- Node.js 20 or higher
- Yarn package manager
- Docker and Docker Compose (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yesoreyeram/test-app-by-copilot.git
cd test-app-by-copilot
```

2. Install frontend dependencies:
```bash
cd frontend
yarn install
```

3. Install backend dependencies:
```bash
cd ../backend
go mod download
```

### Running the Application

#### Option 1: Docker Compose (Recommended for Development)

**Development mode with hot reload:**
```bash
docker-compose -f docker-compose.dev.yml up
```
- Backend with Air hot reload: \`http://localhost:8080\`
- Frontend dev server: \`http://localhost:3000\`

**Production mode:**
```bash
docker-compose up --build
```
- Unified app (backend serves frontend): \`http://localhost:8080\`

#### Option 2: Manual Setup

**Backend (with embedded frontend):**
```bash
# Build frontend first
cd frontend
yarn build

# Copy dist to backend (automated in Dockerfile)
cp -r dist ../backend/cmd/server/

# Run backend
cd ../backend
go run cmd/server/main.go
```
The application will be available at \`http://localhost:8080\`

**Development mode with hot reload:**
```bash
# Terminal 1: Frontend dev server
cd frontend
yarn start    # Runs on http://localhost:3000

# Terminal 2: Backend with Air
cd backend
go install github.com/air-verse/air@latest
air           # Runs on http://localhost:8080
```

### Building for Production

#### Using Docker:
```bash
docker build -t test-app .
docker run -p 8080:8080 test-app
```

#### Manual build:
```bash
# Build frontend
cd frontend
yarn build

# Copy to backend
cp -r dist ../backend/cmd/server/

# Build backend
cd ../backend
go build -o bin/server ./cmd/server

# Run
./bin/server
```

The production build will be available at \`http://localhost:8080\`

## API Endpoints

### Health Check
- \`GET /health\` - Returns server health status

### Text Conversion
- \`POST /api/convert/lower\` - Convert to lowercase
- \`POST /api/convert/upper\` - Convert to uppercase
- \`POST /api/convert/camel\` - Convert to camelCase
- \`POST /api/convert/title\` - Convert to Title Case
- \`POST /api/convert/inverse\` - Invert case
- \`POST /api/convert/reverse\` - Reverse text

Request body: \`{ "input": "Hello World" }\`
Response: \`{ "output": "hello world", "meta": { "status": "success" } }\`

### Math Operations
- \`GET /api/math/add/{a}/{b}\` - Addition
- \`GET /api/math/subtract/{a}/{b}\` - Subtraction
- \`GET /api/math/multiply/{a}/{b}\` - Multiplication
- \`GET /api/math/divide/{a}/{b}\` - Division

Response: \`{ "output": 5 }\`

### Temperature Conversion (Protected)
- \`GET /api/temp/c/f/{value}\` - Celsius to Fahrenheit
- \`GET /api/temp/f/c/{value}\` - Fahrenheit to Celsius

Requires \`Authorization: Bearer {token}\` header
Response: \`{ "output": 32, "meta": { "status": "success" } }\`

### Authentication
- \`POST /api/auth/register\` - Register new user
  - Body: \`{ "username": "user", "email": "user@example.com", "password": "pass" }\`
- \`POST /api/auth/login\` - Login user
  - Body: \`{ "username": "user", "password": "pass" }\`
- \`POST /api/auth/logout\` - Logout user (protected)
- \`GET /api/auth/profile\` - Get user profile (protected)

## Testing

### Backend Tests
```bash
cd backend
go test ./...
```

### Frontend Unit Tests
```bash
cd frontend
yarn test
```

### E2E Tests
```bash
cd frontend
# Install Playwright browsers (first time only)
npx playwright install

# Run E2E tests
yarn test:e2e
```

## CI/CD

The project includes GitHub Actions workflows for:
- **Backend CI**: Linting (golangci-lint), testing, security scanning (gosec)
- **Frontend CI**: Linting (ESLint), type checking, testing, Playwright E2E tests
- **Security**: Trivy vulnerability scanning, CodeQL analysis

## Development Tools

### Hot Module Reloading
- **Frontend**: Webpack Dev Server with HMR
- **Backend**: Air for automatic Go code reloading

### Code Quality
- **Backend**: golangci-lint with comprehensive rule set
- **Frontend**: ESLint, Prettier, TypeScript strict mode
- **Security**: gosec, Trivy, CodeQL

## Docker

### Development
```bash
docker-compose -f docker-compose.dev.yml up
```
Includes hot reload for both frontend and backend.

### Production
```bash
docker-compose up --build
```
Multi-stage build for optimized image with embedded frontend.

## Security Features

- Session-based authentication with expiration
- Protected routes requiring authentication
- No CORS issues (frontend embedded in backend)
- Input validation with Zod
- Security scanning in CI/CD pipeline
- Dependency vulnerability checks

## Architecture Highlights

- **Embedded Frontend**: Frontend assets are embedded in Go binary, eliminating CORS and deployment complexity
- **Modular Backend**: Clean separation of concerns with distinct packages
- **Type Safety**: TypeScript in frontend, Go's strong typing in backend
- **Hot Reload**: Development experience with instant feedback
- **Container Ready**: Docker and Docker Compose for easy deployment
- **CI/CD Ready**: Comprehensive GitHub Actions workflows

## Future Enhancements

The codebase is structured to easily add:
- Database integration (PostgreSQL/MySQL)
- OAuth social login providers
- Password hashing with bcrypt
- Rate limiting
- WebSocket support
- Kubernetes deployment manifests

## License

MIT
