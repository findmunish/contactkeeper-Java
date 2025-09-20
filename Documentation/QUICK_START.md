# Quick Start Guide

## Prerequisites
- Docker Desktop installed and running
- Java 17+ installed
- Node.js 18+ installed

## Backend Setup

### Option 1: Using Startup Script (Recommended)
```bash
# Windows
start-backend.bat

# macOS/Linux
./start-backend.sh
```

### Option 2: Manual Steps
```bash
# 1. Start MongoDB
docker-compose up -d mongodb

# 2. Set environment variables
export JWT_SECRET=contact-keeper-super-secret-jwt-key-2024
export MONGO_URI=mongodb://localhost:27017/contactkeeper

# 3. Start backend
cd backend
./mvnw spring-boot:run
```

## Frontend Setup
```bash
# 1. Install dependencies
cd frontend
npm install

# 2. Start development server
npm start
```

## Access Points
- **Backend API**: http://localhost:5000
- **Frontend**: http://localhost:4200
- **MongoDB Express**: http://localhost:8081 (admin/password)

## Environment Variables

### Backend (Required)
```bash
JWT_SECRET=your-secret-key-here
MONGO_URI=mongodb://localhost:27017/contactkeeper
```

### Frontend (Optional)
```bash
API_URL=http://localhost:5000/api
API_KEY=your-api-key
```

## Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
docker ps | grep mongodb

# Check MongoDB logs
docker logs contact-keeper-mongodb

# Restart MongoDB
docker-compose restart mongodb
```

### Backend Issues
```bash
# Check if port 5000 is available
netstat -an | findstr :5000

# Check backend logs
# Look for "Started ContactKeeperApplication" message
```

### Frontend Issues
```bash
# Check if port 4200 is available
netstat -an | findstr :4200

# Clear npm cache
npm cache clean --force
```

## Development Workflow

1. **Start MongoDB**: `docker-compose up -d mongodb`
2. **Start Backend**: `cd backend && ./mvnw spring-boot:run`
3. **Start Frontend**: `cd frontend && npm start`
4. **Access Application**: http://localhost:4200

## Production Deployment

### Backend
```bash
# Build JAR
cd backend
./mvnw clean package

# Run JAR
java -jar target/contact-keeper-backend-1.0.0.jar
```

### Frontend
```bash
# Build for production
cd frontend
npm run build:prod

# Serve static files
# Deploy dist/ folder to web server
```