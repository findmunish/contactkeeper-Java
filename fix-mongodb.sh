#!/bin/bash

echo "========================================"
echo "  Fixing MongoDB Authentication Issue"
echo "========================================"

echo ""
echo "[1/3] Stopping existing MongoDB container..."
docker-compose down mongodb

echo "[2/3] Removing old MongoDB data volume..."
docker volume rm contact-keeper_java_mongodb_data 2>/dev/null

echo "[3/3] Starting MongoDB without authentication..."
docker-compose up -d mongodb

echo ""
echo "MongoDB is now running without authentication!"
echo "You can now start your Spring Boot application."
echo ""
echo "To start the backend:"
echo "  cd backend"
echo "  ./mvnw spring-boot:run"
echo ""
