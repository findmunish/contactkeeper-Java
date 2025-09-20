# Contact Keeper Frontend - Angular 17

A modern Angular 17 frontend application for the Contact Keeper contact management system.

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Running the Application

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Access the Application**
   Open your browser and navigate to `http://localhost:4200`

## 🏗️ Architecture

### Project Structure
```
src/app/
├── components/          # Angular components
│   ├── auth/           # Authentication components
│   ├── contacts/       # Contact management components
│   ├── layout/         # Layout components
│   └── pages/          # Page components
├── guards/             # Route guards
├── interceptors/       # HTTP interceptors
├── models/             # TypeScript interfaces
└── services/           # Angular services
```

### Key Features

#### Components
- **Standalone Components**: All components are standalone (no NgModules)
- **Reactive Forms**: Form validation and handling
- **Bootstrap 5**: Modern UI framework
- **Font Awesome**: Icon library

#### Services
- **AuthService**: Authentication and user management
- **ContactService**: Contact CRUD operations
- **AlertService**: Notification management

#### Security
- **AuthGuard**: Route protection
- **AuthInterceptor**: Automatic JWT token handling
- **Token Management**: Secure token storage and retrieval

## 🎨 UI Components

### Layout Components
- **NavbarComponent**: Navigation bar with authentication state
- **AlertsComponent**: Toast notifications

### Authentication Components
- **LoginComponent**: User login form
- **RegisterComponent**: User registration form

### Contact Components
- **ContactFormComponent**: Add/edit contact form
- **ContactListComponent**: Display and manage contacts
- **ContactFilterComponent**: Search and filter contacts

### Page Components
- **HomeComponent**: Main dashboard with contact management
- **AboutComponent**: Application information

## 🔧 Configuration

### API Configuration
Update the API URL in services if your backend runs on a different port:
```typescript
// In services
private readonly API_URL = 'http://localhost:5000/api';
```

### Environment Configuration
Create environment files for different configurations:
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```

## 🛠️ Development

### Available Scripts
- `npm start`: Start development server
- `npm run build`: Build for production
- `npm test`: Run unit tests
- `npm run watch`: Build and watch for changes

### Code Style
- Uses Angular standalone components
- Implements reactive forms with validation
- Follows Angular best practices
- Uses TypeScript strict mode

## 🎯 Features

### Authentication
- User registration and login
- JWT token management
- Automatic token refresh
- Route protection

### Contact Management
- Add new contacts
- Edit existing contacts
- Delete contacts
- Search and filter contacts
- Contact categorization (personal/professional)

### User Experience
- Responsive design
- Loading states
- Error handling
- Success notifications
- Form validation

## 🧪 Testing

Run unit tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 🚀 Building for Production

1. **Build Application**
   ```bash
   npm run build
   ```

2. **Deploy**
   Deploy the contents of the `dist/` folder to your web server

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🔐 Security Features

- JWT token storage in localStorage
- Automatic token inclusion in API requests
- Route guards for protected pages
- Input validation and sanitization
- HTTPS support for production

## 🎨 Styling

- **Bootstrap 5**: CSS framework
- **Font Awesome**: Icon library
- **Custom CSS**: Additional styling in `styles.css`
- **Responsive Design**: Mobile-first approach

## 📝 Development Notes

- Uses Angular 17 standalone components
- Implements reactive programming with RxJS
- Follows Angular style guide
- Uses modern TypeScript features
- Implements proper error handling
- Includes loading states and user feedback
