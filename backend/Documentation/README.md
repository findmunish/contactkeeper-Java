# Contact Keeper Backend - Spring Boot

A RESTful API backend for the Contact Keeper application built with Spring Boot 3.2.

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher
- MongoDB (local or cloud instance)

### Running the Application

1. **Configure Database**
   Update `src/main/resources/application.yml` with your MongoDB connection:
   ```yaml
   spring:
     data:
       mongodb:
         uri: mongodb://localhost:27017/contactkeeper
   ```

2. **Run with Maven**
   ```bash
   mvn spring-boot:run
   ```

3. **Access the API**
   The API will be available at `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

#### Login
```http
POST /api/auth
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth
Headers:
  x-auth-token: Bearer <jwt_token>
  email: user@example.com
```

#### Register
```http
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Contact Endpoints

#### Get All Contacts
```http
GET /api/contacts
Headers:
  x-auth-token: Bearer <jwt_token>
  email: user@example.com
```

#### Add Contact
```http
POST /api/contacts
Content-Type: application/json
Headers:
  x-auth-token: Bearer <jwt_token>
  email: user@example.com

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "type": "personal"
}
```

#### Update Contact
```http
PUT /api/contacts/{id}
Content-Type: application/json
Headers:
  x-auth-token: Bearer <jwt_token>
  email: user@example.com

{
  "name": "Jane Smith Updated",
  "email": "jane.updated@example.com",
  "phone": "+1234567890",
  "type": "professional"
}
```

#### Delete Contact
```http
DELETE /api/contacts/{id}
Headers:
  x-auth-token: Bearer <jwt_token>
  email: user@example.com
```

## 🏗️ Architecture

### Package Structure
```
com.contactkeeper/
├── config/          # Configuration classes
├── controller/      # REST controllers
├── dto/            # Data Transfer Objects
├── model/          # Entity models
├── repository/     # Data repositories
├── security/       # Security configuration
└── service/        # Business logic services
```

### Key Components

#### Models
- **User**: User entity with authentication fields
- **Contact**: Contact entity with user relationship

#### Services
- **UserService**: User management and authentication
- **ContactService**: Contact CRUD operations

#### Security
- **JwtUtil**: JWT token generation and validation
- **JwtAuthenticationFilter**: Request authentication filter
- **SecurityConfig**: Spring Security configuration

## 🔧 Configuration

### Application Properties
```yaml
server:
  port: 5000

spring:
  data:
    mongodb:
      uri: ${MONGO_URI:mongodb://localhost:27017/contactkeeper}
  
  security:
    jwt:
      secret: ${JWT_SECRET:mySecretKey}
      expiration: 3600000 # 1 hour
```

### Environment Variables
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: JWT signing secret

## 🧪 Testing

Run tests with Maven:
```bash
mvn test
```

## 🚀 Building for Production

1. **Build JAR**
   ```bash
   mvn clean package
   ```

2. **Run JAR**
   ```bash
   java -jar target/contact-keeper-backend-0.0.1-SNAPSHOT.jar
   ```

## 🔐 Security Features

- JWT-based authentication
- Password hashing with BCrypt
- CORS configuration
- Input validation with Bean Validation
- User-specific data isolation
- Protected endpoints

## 📝 Development Notes

- Uses Spring Data MongoDB for database operations
- JWT tokens include user-specific secrets for enhanced security
- All endpoints require authentication except registration and login
- Input validation is handled with Jakarta Validation annotations
- Error responses are standardized across the API
