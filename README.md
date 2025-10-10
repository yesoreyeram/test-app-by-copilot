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
- Multiple theme support (Dark, Light, Gold)
- Hero section on home page

### Authentication
- User registration and login
- Protected routes for authenticated users
- Profile and settings pages
- Session-based authentication with in-memory storage

## Tech Stack

### Frontend
- **React** with TypeScript
- **React Router** for routing
- **Tailwind CSS** for styling
- **Zod** for validation
- **Webpack** for bundling with Hot Module Replacement
- **Jest** and **React Testing Library** for unit testing
- **Playwright** for E2E testing
- **Yarn** as package manager

### Backend
- **Go** (Golang)
- Modular package structure:
  - `textconv` - Text conversion operations
  - `mathops` - Mathematical operations
  - `tempconv` - Temperature conversion
  - `auth` - Authentication middleware
  - `store` - In-memory data storage
- RESTful API with path parameters
- CORS-enabled
- Health check endpoint

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
└── backend/
    ├── cmd/server/         # Main application entry point
    ├── pkg/                # Public packages
    │   ├── textconv/       # Text conversion
    │   ├── mathops/        # Math operations
    │   ├── tempconv/       # Temperature conversion
    │   └── auth/           # Authentication
    └── internal/store/     # Internal data storage

```

## Getting Started

### Prerequisites
- Go 1.20 or higher
- Node.js 18 or higher
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yesoreyeram/test-app-by-copilot.git
cd test-app-by-copilot
```

2. Install backend dependencies:
```bash
cd backend
go mod download
```

3. Install frontend dependencies:
```bash
cd frontend
yarn install
```

### Running the Application

#### Backend
```bash
cd backend
go run cmd/server/main.go
```
The backend server will start on `http://localhost:8080`

#### Frontend
```bash
cd frontend
yarn start
```
The frontend dev server will start on `http://localhost:3000`

The frontend is configured with a proxy to forward API calls to the backend.

### Building for Production

#### Backend
```bash
cd backend
go build -o bin/server ./cmd/server
./bin/server
```

#### Frontend
```bash
cd frontend
yarn build
```
The production build will be in the `dist/` directory.

## API Endpoints

### Health Check
- `GET /health` - Returns server health status

### Text Conversion
- `POST /api/convert/lower` - Convert to lowercase
- `POST /api/convert/upper` - Convert to uppercase
- `POST /api/convert/camel` - Convert to camelCase
- `POST /api/convert/title` - Convert to Title Case
- `POST /api/convert/inverse` - Invert case
- `POST /api/convert/reverse` - Reverse text

Request body: `{ "input": "Hello World" }`
Response: `{ "output": "hello world", "meta": { "status": "success" } }`

### Math Operations
- `GET /api/math/add/{a}/{b}` - Addition
- `GET /api/math/subtract/{a}/{b}` - Subtraction
- `GET /api/math/multiply/{a}/{b}` - Multiplication
- `GET /api/math/divide/{a}/{b}` - Division

Response: `{ "output": 5 }`

### Temperature Conversion (Protected)
- `GET /api/temp/c/f/{value}` - Celsius to Fahrenheit
- `GET /api/temp/f/c/{value}` - Fahrenheit to Celsius

Requires `Authorization: Bearer <token>` header
Response: `{ "output": 32, "meta": { "status": "success" } }`

### Authentication
- `POST /api/auth/register` - Register new user
  - Body: `{ "username": "user", "email": "user@example.com", "password": "pass" }`
- `POST /api/auth/login` - Login user
  - Body: `{ "username": "user", "password": "pass" }`
- `POST /api/auth/logout` - Logout user (protected)
- `GET /api/auth/profile` - Get user profile (protected)

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

## Security Features

- Password storage (currently in-memory, ready for database integration)
- Session-based authentication with expiration
- Protected routes requiring authentication
- CORS configuration
- Input validation with Zod

## Future Enhancements

- Database integration (PostgreSQL/MySQL) for user storage
- OAuth social login integration (Google, GitHub)
- Enhanced password hashing (bcrypt)
- Rate limiting
- API documentation with Swagger
- Docker containerization
- CI/CD pipeline

## Development

### Hot Module Replacement
Both frontend and backend support hot reloading during development:
- Frontend: Webpack Dev Server with HMR
- Backend: Can be integrated with tools like `air` or `fresh`

### Code Quality
- TypeScript for type safety in frontend
- Go's strong typing in backend
- Modular architecture with separation of concerns
- Enterprise-level design patterns

## License

MIT
