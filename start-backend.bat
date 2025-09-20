@echo off
echo ========================================
echo   Contact Keeper Backend Startup
echo ========================================

echo.
echo [1/4] Checking if Docker is running...
docker version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not running or not installed!
    echo Please start Docker Desktop and try again.
    pause
    exit /b 1
)

echo [2/4] Starting MongoDB container...
docker-compose down mongodb
docker-compose up -d mongodb

echo [3/4] Waiting for MongoDB to be ready...
timeout /t 10 /nobreak >nul

echo [4/4] Starting Spring Boot application...
echo.
echo Setting environment variables...
set JWT_SECRET=contact-keeper-super-secret-jwt-key-2024
set MONGO_URI=mongodb://localhost:27017/contactkeeper

echo.
echo Starting backend server...
echo Backend will be available at: http://localhost:5000
echo MongoDB Express UI will be available at: http://localhost:8081
echo.
echo Press Ctrl+C to stop the application
echo.

cd backend
.\mvnw.cmd spring-boot:run