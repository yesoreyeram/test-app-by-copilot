# test-app-by-copilot

A full-stack enterprise-level web application with React frontend and Go backend, featuring text conversion, math operations, and temperature conversion tools with a comprehensive design system.

## Features

### Core Functionalities
- **Text Conversion**: Lower case, upper case, camel case, title case, inverse case, and text reverse
- **Math Operations**: Addition, subtraction, multiplication, and division
- **Temperature Converter**: Celsius to Fahrenheit and vice versa (protected route)

### UI/UX & Design System
- **Comprehensive Design System** with reusable components:
  - `Input`: Text input with labels, error states, and theming
  - `Select`: Dropdown selector with custom styling
  - `Button`: Multiple variants (primary, secondary, danger, ghost) with loading states
- Responsive design with Tailwind CSS
- Sticky top navigation with logo, breadcrumbs, and search
- Collapsible left sidebar with feature links
- **Multiple theme support** (Dark, Light, Gold) - **Dark theme by default**
  - **Dark theme**: Dark blue background (#1e3a8a) with white text
  - **Light theme**: White background with dark blue text  
  - **Gold theme**: Golden background with brown text
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
- **Tailwind CSS 4** for styling with custom theme system
- **Design System** with reusable Input, Select, and Button components
- **Zod** for validation
- **Webpack 5** for bundling with Hot Module Replacement
  - **Automatic build output** to backend directory (no manual copying needed)
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

\`\`\`
.
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── design-system/  # Reusable UI components
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Select.tsx
│   │   │   │   ├── Button.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Layout.tsx
│   │   │   ├── TopNav.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── pages/              # Page components
│   │   ├── contexts/           # React contexts (Theme, Auth)
│   │   └── styles.css          # Global styles with theme CSS variables
│   ├── public/                 # Static assets
│   ├── e2e/                    # Playwright E2E tests
│   └── webpack.config.js       # Webpack config with auto-output to backend
│
├── backend/
│   ├── cmd/server/
│   │   ├── main.go             # Main application entry point
│   │   └── dist/               # Frontend build output (auto-generated)
│   ├── pkg/                    # Public packages
│   └── internal/store/         # Internal data storage
│
├── .github/workflows/          # CI/CD pipelines
│   ├── backend.yml             # Backend CI
│   ├── frontend.yml            # Frontend CI
│   ├── e2e.yml                 # E2E tests
│   ├── security.yml            # Security scanning
│   ├── test-development-env.yml # Dev environment testing
│   ├── test-test-env.yml       # Test environment validation
│   └── test-build-env.yml      # Build environment testing
│
├── Dockerfile                  # Production build
├── Dockerfile.dev              # Development build
├── docker-compose.yml          # Production compose
├── docker-compose.dev.yml      # Development compose  
└── package.json                # Root package with dev scripts
\`\`\`

## Getting Started

### Prerequisites
- Go 1.24 or higher
- Node.js 20 or higher  
- Yarn package manager
- Docker and Docker Compose (optional)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yesoreyeram/test-app-by-copilot.git
cd test-app-by-copilot
\`\`\`

2. Install root dependencies:
\`\`\`bash
npm install
\`\`\`

3. Install frontend dependencies:
\`\`\`bash
cd frontend
yarn install
cd ..
\`\`\`

4. Install backend dependencies:
\`\`\`bash
cd backend
go mod download
cd ..
\`\`\`

5. Install Air for backend hot reload (optional, for development):
\`\`\`bash
go install github.com/air-verse/air@latest
\`\`\`

### Running the Application

#### Option 1: Using npm scripts (Recommended for Development)

**Run both frontend and backend in parallel with hot reload:**
\`\`\`bash
npm run dev
\`\`\`

This command starts:
- **Frontend dev server**: http://localhost:3000 (with HMR and proxy to backend)
- **Backend API server**: http://localhost:8080 (with Air hot reload)

**Important**: During development, access the app at **http://localhost:3000**. The frontend dev server proxies API calls to the backend on port 8080.

**Build for production:**
\`\`\`bash
npm run build
npm start
\`\`\`
The frontend automatically builds to \`backend/cmd/server/dist/\` - no manual copying needed!
Access the unified app at **http://localhost:8080** (backend serves the frontend).

#### Option 2: Docker Compose

**Development mode with hot reload:**
\`\`\`bash
docker-compose -f docker-compose.dev.yml up
\`\`\`
- Backend with Air hot reload: http://localhost:8080
- Frontend dev server: http://localhost:3000

**Production mode:**
\`\`\`bash
docker-compose up --build
\`\`\`
- Unified app (backend serves frontend): http://localhost:8080

#### Option 3: Manual Setup

**Frontend dev server:**
\`\`\`bash
cd frontend
yarn start    # Runs on http://localhost:3000
\`\`\`
The webpack dev server is configured with a proxy that forwards \`/api\` and \`/health\` requests to \`http://localhost:8080\`.

**Backend with Air (hot reload):**
\`\`\`bash
cd backend
air           # Runs on http://localhost:8080
\`\`\`

**Access the app at http://localhost:3000** during development (frontend with backend proxy).

**Backend (production mode with embedded frontend):**
\`\`\`bash
# Build frontend (automatically outputs to backend/cmd/server/dist)
cd frontend
yarn build

# Run backend
cd ../backend
go run cmd/server/main.go
\`\`\`
**Access at http://localhost:8080** (backend serves embedded frontend).

### Building for Production

#### Using npm scripts:
\`\`\`bash
npm run build    # Builds frontend and backend
npm start        # Starts the unified server
\`\`\`

The frontend build automatically outputs to \`backend/cmd/server/dist/\` - **no manual copying required!**

#### Using Docker:
\`\`\`bash
docker build -t test-app .
docker run -p 8080:8080 test-app
\`\`\`

#### Manual build:
\`\`\`bash
# Build frontend (auto-outputs to backend/cmd/server/dist)
cd frontend
yarn build

# Build backend
cd ../backend
go build -o bin/server ./cmd/server

# Run
./bin/server
\`\`\`

## Design System

The app includes a comprehensive design system with reusable components:

### Input Component
\`\`\`tsx
import { Input } from '@/components/design-system';

<Input
  label="Username"
  type="text"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  error={error}
  fullWidth
  placeholder="Enter username"
/>
\`\`\`

### Select Component
\`\`\`tsx
import { Select } from '@/components/design-system';

<Select
  label="Choose Option"
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ]}
  value={selected}
  onChange={(e) => setSelected(e.target.value)}
  fullWidth
/>
\`\`\`

### Button Component
\`\`\`tsx
import { Button } from '@/components/design-system';

<Button
  variant="primary"  // primary, secondary, danger, ghost
  size="md"          // sm, md, lg
  loading={isLoading}
  fullWidth
  onClick={handleClick}
>
  Click Me
</Button>
\`\`\`

All design system components:
- Support theme switching (Dark, Light, Gold)
- Include accessibility features
- Provide consistent styling across the app
- Support loading states and error states

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

Requires \`Authorization: ******  
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
\`\`\`bash
cd backend
go test ./...
\`\`\`

### Frontend Unit Tests
\`\`\`bash
cd frontend
yarn test
\`\`\`

### E2E Tests
\`\`\`bash
cd frontend
# Install Playwright browsers (first time only)
npx playwright install

# Run E2E tests
yarn test:e2e
\`\`\`

E2E tests automatically:
- Start the backend server with embedded frontend
- Run tests against http://localhost:8080
- Capture screenshots on test failures
- Generate HTML reports

## CI/CD

The project includes comprehensive GitHub Actions workflows:

### Backend CI (\`.github/workflows/backend.yml\`)
- Linting with golangci-lint (fixed configuration for latest version)
- Go tests with race detection
- Security scanning with gosec
- Coverage reporting
- Build verification

### Frontend CI (\`.github/workflows/frontend.yml\`)
- ESLint and Prettier checks
- TypeScript type checking
- Jest unit tests with coverage
- Build verification
- Artifact uploads

### E2E Tests (\`.github/workflows/e2e.yml\`)
- Builds both frontend and backend
- Runs Playwright E2E tests
- **Uploads screenshots as artifacts**
- **Uploads test reports as artifacts**

### Security Scanning (`.github/workflows/security.yml`)
- Trivy vulnerability scanning
- CodeQL static analysis
- Dependency security checks

### Environment Testing Workflows

The project includes automated workflows to verify development, test, and production environments:

#### Test Development Environment (`.github/workflows/test-development-env.yml`)
- Installs all dependencies (Node.js, Go, Air)
- Starts dev servers in parallel (`npm run dev`)
- Verifies health endpoint at http://localhost:3000/health
- Tests home page loads with correct title
- Tests convert page accessibility
- Tests math API endpoint functionality
- Automatically stops servers after testing

#### Test Test Environment (`.github/workflows/test-test-env.yml`)
- Runs all backend unit tests with race detection
- Runs all frontend unit tests with coverage
- Installs Playwright browsers
- Runs E2E tests with screenshot capture
- Uploads test results and coverage reports as artifacts

#### Test Build Environment (`.github/workflows/test-build-env.yml`)
- Builds frontend and backend for production
- Starts production server with embedded frontend
- Verifies health endpoint at http://localhost:8080/health
- Tests that home page is served correctly
- Tests that convert pages are accessible
- Verifies math API endpoint works in production mode
- Automatically stops server after testing

These workflows ensure that the application works correctly across all deployment scenarios.

## Development

### Automatic Build Output

The webpack configuration automatically outputs production builds to \`backend/cmd/server/dist/\`:
- No manual copying needed
- Works for both \`yarn build\` and \`npm run build\`
- Development mode still outputs to \`frontend/dist\` for dev server

### Hot Module Reloading

**Frontend:**
- Webpack Dev Server with HMR
- Changes to React components update instantly
- Preserves application state during updates

**Backend:**
- Air watches for Go file changes
- Automatically rebuilds and restarts server
- Configuration in \`.air.toml\`

### Webpack Proxy Configuration

The frontend dev server (\`webpack.config.js\`) proxies API requests:
\`\`\`javascript
proxy: [
  {
    context: ['/api', '/health'],
    target: 'http://localhost:8080',
    changeOrigin: true,
  },
]
\`\`\`

This allows the frontend (port 3000) to make API calls to the backend (port 8080) without CORS issues during development.

### Theme System

The app uses CSS custom properties for theming:

\`\`\`css
/* Dark theme (default) */
.dark {
  --bg-primary: #1e3a8a;      /* Dark blue */
  --bg-secondary: #1e40af;
  --text-primary: #ffffff;     /* White */
  --text-secondary: #e0e7ff;
}

/* Light theme */
.light {
  --bg-primary: #ffffff;       /* White */
  --bg-secondary: #f3f4f6;
  --text-primary: #1e3a8a;     /* Dark blue */
  --text-secondary: #3730a3;
}

/* Gold theme */
.gold {
  --bg-primary: #fef3c7;       /* Golden */
  --bg-secondary: #fde68a;
  --text-primary: #78350f;     /* Brown */
  --text-secondary: #92400e;
}
\`\`\`

Components use inline styles with \`var(--bg-primary)\` etc. for theme-aware styling.

## Docker

### Development
\`\`\`bash
docker-compose -f docker-compose.dev.yml up
\`\`\`
Includes:
- Air hot reload for backend
- Webpack Dev Server for frontend
- Volume mounts for live code updates

### Production
\`\`\`bash
docker-compose up --build
\`\`\`
Features:
- Multi-stage build for optimized image
- Embedded frontend in Go binary
- Health checks
- Single container deployment

## Security Features

- Session-based authentication with expiration (24 hours)
- Protected routes requiring authentication tokens
- **No CORS issues** - frontend embedded in backend for production
- Input validation with Zod (frontend) and Go validation (backend)
- Security scanning in CI/CD (gosec, Trivy, CodeQL)
- Dependency vulnerability checks
- Design system components with secure defaults

## Architecture Highlights

- **Embedded Frontend**: Frontend assets embedded in Go binary using \`embed.FS\`
- **Automatic Build Output**: Webpack outputs directly to backend directory
- **Hot Reload**: Development mode supports HMR for both frontend and backend
- **Proxy Configuration**: Webpack proxy forwards API calls during development
- **Design System**: Reusable components with consistent theming
- **Modular Backend**: Clean separation with distinct packages
- **Type Safety**: TypeScript in frontend, Go's strong typing in backend
- **CI/CD Ready**: Comprehensive GitHub Actions workflows with artifact uploads
- **Container Ready**: Docker and Docker Compose for all environments

## Future Enhancements

The codebase is structured to easily add:
- Database integration (PostgreSQL/MySQL)
- OAuth social login providers
- Password hashing with bcrypt
- Rate limiting
- WebSocket support
- Kubernetes deployment manifests
- Additional design system components (Card, Modal, Toast, etc.)

## License

MIT
