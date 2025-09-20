#!/bin/bash

echo "========================================"
echo "  Contact Keeper Backend Startup"
echo "========================================"

echo ""
echo "[1/4] Checking if Docker is running..."
if ! docker version >/dev/null 2>&1; then
    echo "ERROR: Docker is not running or not installed!"
    echo "Please start Docker and try again."
    exit 1
fi

echo "[2/4] Starting MongoDB container..."
docker-compose down mongodb
docker-compose up -d mongodb

echo "[3/4] Waiting for MongoDB to be ready..."
sleep 10

echo "[4/4] Starting Spring Boot application..."
echo ""
echo "Setting environment variables..."
export JWT_SECRET=contact-keeper-super-secret-jwt-key-2024
export MONGO_URI=mongodb://localhost:27017/contactkeeper

echo ""
echo "Starting backend server..."
echo "Backend will be available at: http://localhost:5000"
echo "MongoDB Express UI will be available at: http://localhost:8081"
echo ""
echo "Press Ctrl+C to stop the application"
echo ""

cd backend
./mvnw spring-boot:run
