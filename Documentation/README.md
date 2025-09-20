# Contact Keeper - Spring Boot & Angular 17

A modern full-stack contact management application built with Spring Boot 3.2 backend and Angular 17 frontend.

## 🏗️ Architecture

- **Backend**: Spring Boot 3.2 with Spring Security and JWT authentication
- **Frontend**: Angular 17 with standalone components
- **Database**: MongoDB
- **Authentication**: JWT-based authentication
- **UI Framework**: Bootstrap 5 with Font Awesome icons

## 🚀 Features

### Backend Features
- RESTful API with Spring Boot
- JWT-based authentication and authorization
- MongoDB integration with Spring Data
- Input validation with Bean Validation
- CORS configuration for frontend integration
- Password encryption with BCrypt
- Comprehensive error handling

### Frontend Features
- Modern Angular 17 with standalone components
- Reactive forms with validation
- JWT token management
- Route guards for authentication
- HTTP interceptors for automatic token handling
- Responsive design with Bootstrap 5
- Real-time alerts and notifications
- Contact CRUD operations
- Search and filter functionality

## 📁 Project Structure

```
Java/
├── backend/                 # Spring Boot Backend
│   ├── src/main/java/com/contactkeeper/
│   │   ├── config/         # Configuration classes
│   │   ├── controller/     # REST controllers
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── model/         # Entity models
│   │   ├── repository/    # Data repositories
│   │   ├── security/      # Security configuration
│   │   └── service/       # Business logic services
│   ├── src/main/resources/
│   │   └── application.yml # Application configuration
│   └── pom.xml            # Maven dependencies
└── frontend/               # Angular 17 Frontend
    ├── src/app/
    │   ├── components/     # Angular components
    │   ├── guards/        # Route guards
    │   ├── interceptors/  # HTTP interceptors
    │   ├── models/        # TypeScript interfaces
    │   └── services/      # Angular services
    ├── src/styles.css     # Global styles
    └── package.json       # NPM dependencies
```

## 🛠️ Setup Instructions

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- MongoDB (local or cloud instance)
- Maven 3.6 or higher

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Java/backend
   ```

2. Configure MongoDB connection in `src/main/resources/application.yml`:
   ```yaml
   spring:
     data:
       mongodb:
         uri: mongodb://localhost:27017/contactkeeper
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

   The backend will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Java/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:4200`

## 🔧 Configuration

### Environment Variables

#### Backend
- `MONGO_URI`: MongoDB connection string (default: mongodb://localhost:27017/contactkeeper)
- `JWT_SECRET`: JWT signing secret (default: mySecretKey)

#### Frontend
- Update API URL in services if backend runs on different port

## 📚 API Endpoints

### Authentication
- `POST /api/auth` - User login
- `GET /api/auth` - Get current user
- `POST /api/users` - User registration

### Contacts
- `GET /api/contacts` - Get user's contacts
- `POST /api/contacts` - Add new contact
- `PUT /api/contacts/{id}` - Update contact
- `DELETE /api/contacts/{id}` - Delete contact

## 🔐 Security Features

- JWT-based authentication
- Password hashing with BCrypt
- CORS configuration
- Input validation
- Route protection
- User-specific data isolation

## 🎨 UI Features

- Responsive design
- Modern Bootstrap 5 styling
- Font Awesome icons
- Real-time form validation
- Loading states and spinners
- Alert notifications
- Search and filter functionality

## 🧪 Testing

### Backend Testing
```bash
cd Java/backend
mvn test
```

### Frontend Testing
```bash
cd Java/frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Build the JAR file:
   ```bash
   mvn clean package
   ```

2. Run the JAR:
   ```bash
   java -jar target/contact-keeper-backend-0.0.1-SNAPSHOT.jar
   ```

### Frontend Deployment
1. Build for production:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to your web server

## 📝 Development Notes

- The application uses standalone Angular components (no NgModules)
- JWT tokens are stored in localStorage
- All API calls include authentication headers automatically
- The backend uses Spring Data MongoDB for database operations
- Input validation is handled both on frontend and backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
