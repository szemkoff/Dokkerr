# Development Setup Guide

This guide will help you set up your development environment for the Dokkerr application.

## Prerequisites

### Required Software
- Node.js (v18 or higher)
- npm (v9 or higher)
- Git
- Android Studio (for mobile app development)
- VS Code (recommended)

### System Requirements
- Operating System: macOS, Windows, or Linux
- RAM: 8GB minimum (16GB recommended)
- Disk Space: 10GB minimum
- Internet connection for package downloads

## Initial Setup

### 1. Clone the Repository
```bash
git clone https://github.com/dokkerr/dokkerr.git
cd dokkerr
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install documentation dependencies
cd dokkerr-docs
npm install

# Install mobile app dependencies
cd ../mobile
npm install

# Install web app dependencies
cd ../web
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:
```env
# API Configuration
API_URL=http://localhost:3000
API_KEY=your_api_key_here

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dokkerr
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=24h

# External Services
STRIPE_SECRET_KEY=your_stripe_secret_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Development Workflow

### 1. Start Documentation Server
```bash
cd dokkerr-docs
npm run docs:dev
```
The documentation will be available at `http://localhost:5173`

### 2. Start API Server
```bash
cd api
npm run dev
```
The API server will run on `http://localhost:3000`

### 3. Start Web Application
```bash
cd web
npm run dev
```
The web application will be available at `http://localhost:5174`

### 4. Start Mobile Application
```bash
cd mobile
npm run android  # For Android
npm run ios     # For iOS
```

## Database Setup

### 1. Install PostgreSQL
- Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)
- Create a new database:
```sql
CREATE DATABASE dokkerr;
```

### 2. Run Migrations
```bash
cd api
npm run migrate
```

### 3. Seed Initial Data
```bash
npm run seed
```

## Testing Setup

### 1. Install Testing Dependencies
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

### 2. Run Tests
```bash
# Run all tests
npm test

# Run specific test file
npm test -- path/to/test/file

# Run tests with coverage
npm run test:coverage
```

## Code Style and Linting

### 1. Install ESLint and Prettier
```bash
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier
```

### 2. Configure ESLint
Create `.eslintrc.js`:
```javascript
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'error'
  }
}
```

### 3. Configure Prettier
Create `.prettierrc`:
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

## Debugging Setup

### 1. VS Code Configuration
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug API",
      "program": "${workspaceFolder}/api/src/index.js"
    },
    {
      "type": "chrome",
      "request": "launch",
      "name": "Debug Web App",
      "url": "http://localhost:5174"
    }
  ]
}
```

### 2. Mobile Debugging
- Enable Developer Options on your Android device
- Enable USB Debugging
- Connect your device via USB
- Run `adb devices` to verify connection

## Common Issues and Solutions

### 1. Port Conflicts
If you encounter port conflicts:
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>
```

### 2. Database Connection Issues
- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure database exists

### 3. Mobile Build Issues
- Clean Android build: `cd android && ./gradlew clean`
- Reset Metro bundler: `npm start -- --reset-cache`
- Clear npm cache: `npm cache clean --force`

## Additional Resources

- [API Documentation](/technical/api-endpoints)
- [Database Schema](/technical/database-schema)
- [Mobile App Architecture](/technical/mobile-app)
- [Contributing Guidelines](/development/contributing)
- [Testing Guide](/development/testing) 