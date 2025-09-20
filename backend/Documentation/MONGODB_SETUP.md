# MongoDB Setup for Contact Keeper Backend

## Overview

Your Spring Boot application is configured to connect to MongoDB at `mongodb://localhost:27017/contactkeeper`. You need to have MongoDB running before starting the backend.

## Option 1: MongoDB with Docker (Recommended)

### Start MongoDB Container
```bash
# Start MongoDB container
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:latest

# Or use docker-compose (create docker-compose.yml)
```

### Docker Compose (Recommended)
Create `docker-compose.yml` in your project root:

```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    container_name: mongodb
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
    volumes:
      - mongodb_data:/data/db
    networks:
      - contact-keeper-network

volumes:
  mongodb_data:

networks:
  contact-keeper-network:
    driver: bridge
```

Start with:
```bash
docker-compose up -d
```

## Option 2: Local MongoDB Installation

### Windows
1. **Download MongoDB Community Server** from https://www.mongodb.com/try/download/community
2. **Install MongoDB** following the installer
3. **Start MongoDB Service**:
   ```cmd
   # Start MongoDB service
   net start MongoDB
   
   # Or start manually
   "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath="C:\data\db"
   ```

### macOS
```bash
# Install with Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb/brew/mongodb-community
```

### Linux (Ubuntu/Debian)
```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

## Starting the Backend

### 1. Ensure MongoDB is Running
```bash
# Check if MongoDB is running (Docker)
docker ps | grep mongodb

# Check if MongoDB is running (Local)
# Windows
netstat -an | findstr :27017

# macOS/Linux
lsof -i :27017
```

### 2. Set Environment Variables
```bash
# Set JWT secret (required)
export JWT_SECRET=your-super-secret-jwt-key-here

# Optional: Set custom MongoDB URI
export MONGO_URI=mongodb://localhost:27017/contactkeeper
```

### 3. Start Spring Boot Application
```bash
# Navigate to backend directory
cd backend

# Start the application
.\mvnw.cmd spring-boot:run

# Or on macOS/Linux
./mvnw spring-boot:run
```

## Verification

### Check MongoDB Connection
```bash
# Connect to MongoDB shell
docker exec -it mongodb mongosh

# Or if running locally
mongosh

# List databases
show dbs

# Use your database
use contactkeeper

# List collections
show collections
```

### Check Spring Boot Logs
Look for these log messages:
```
INFO  - Started ContactKeeperApplication in X.XXX seconds
INFO  - MongoDB connection established
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Refused**
   ```
   Error: Could not connect to MongoDB
   ```
   **Solution**: Ensure MongoDB is running on port 27017

2. **JWT_SECRET Not Set**
   ```
   Error: JWT_SECRET environment variable is required
   ```
   **Solution**: Set the JWT_SECRET environment variable

3. **Port 27017 Already in Use**
   ```
   Error: Port 27017 is already in use
   ```
   **Solution**: Stop other MongoDB instances or change the port

### Quick Start Script

Create `start-backend.bat` (Windows) or `start-backend.sh` (macOS/Linux):

**Windows (`start-backend.bat`)**:
```batch
@echo off
echo Starting MongoDB...
docker start mongodb
echo Waiting for MongoDB to be ready...
timeout /t 5
echo Starting Spring Boot application...
set JWT_SECRET=your-super-secret-jwt-key-here
.\mvnw.cmd spring-boot:run
```

**macOS/Linux (`start-backend.sh`)**:
```bash
#!/bin/bash
echo "Starting MongoDB..."
docker start mongodb
echo "Waiting for MongoDB to be ready..."
sleep 5
echo "Starting Spring Boot application..."
export JWT_SECRET=your-super-secret-jwt-key-here
./mvnw spring-boot:run
```

## Environment Configuration

### Development
```bash
export JWT_SECRET=dev-secret-key
export MONGO_URI=mongodb://localhost:27017/contactkeeper
```

### Production
```bash
export JWT_SECRET=your-production-secret-key
export MONGO_URI=mongodb://your-production-mongo:27017/contactkeeper
```

## Database Management

### Reset Database
```bash
# Connect to MongoDB
docker exec -it mongodb mongosh

# Drop and recreate database
use contactkeeper
db.dropDatabase()
```

### Backup Database
```bash
# Create backup
docker exec mongodb mongodump --db contactkeeper --out /backup

# Copy backup to host
docker cp mongodb:/backup ./mongodb-backup
```

## Next Steps

1. **Start MongoDB** (Docker or local installation)
2. **Set JWT_SECRET** environment variable
3. **Run** `.\mvnw.cmd spring-boot:run`
4. **Test** the API at `http://localhost:5000`