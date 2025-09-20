# Environment Configuration Setup

This project uses Angular's environment configuration system to manage different API URLs for different environments.

## Environment Files

- `src/environments/environment.ts` - Development environment (default)
- `src/environments/environment.prod.ts` - Production environment
- `src/environments/environment.staging.ts` - Staging environment
- `src/environments/environment.uat.ts` - UAT environment

## Configuration

Each environment file contains:

```typescript
export const environment = {
  production: boolean,
  apiUrl: string
};
```

### Current Configuration

- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-production-api.com/api`
- **Staging**: `https://your-staging-api.com/api`
- **UAT**: `https://your-uat-api.com/api`

## Usage

### Building for Different Environments

```bash
# Development (default)
ng build
ng serve

# Production
ng build --configuration=production

# Staging
ng build --configuration=staging

# UAT
ng build --configuration=uat
```

### Serving for Different Environments

```bash
# Development (default)
ng serve

# Production
ng serve --configuration=production

# Staging
ng serve --configuration=staging

# UAT
ng serve --configuration=uat
```

## API Configuration Service

The `ApiConfigService` provides a centralized way to access API URLs:

```typescript
import { ApiConfigService } from './services/api-config.service';

// Inject the service
constructor(private apiConfig: ApiConfigService) {}

// Use specific endpoints
this.apiConfig.contactsUrl        // /api/contacts
this.apiConfig.usersUrl          // /api/users
this.apiConfig.authUrl           // /api/auth
this.apiConfig.loginUrl          // /api/auth/login
this.apiConfig.registerUrl       // /api/auth/register

// Or build custom URLs
this.apiConfig.getApiUrl('custom/endpoint')  // /api/custom/endpoint
```

## Updating API URLs

To update API URLs for different environments:

1. Edit the appropriate environment file
2. Update the `apiUrl` property
3. Rebuild the application

### Example: Updating Production API URL

```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.mycompany.com/api'  // Update this URL
};
```

## Environment Configuration

The application uses **environment-specific configuration files** that are automatically selected during build time.

### Default Environment Files

- **Development**: `src/environments/environment.ts` (localhost:5000)
- **Production**: `src/environments/environment.prod.ts` (production API)
- **Staging**: `src/environments/environment.staging.ts` (staging API)
- **UAT**: `src/environments/environment.uat.ts` (UAT API)

### Build Commands

```bash
# Development build (uses localhost:5000)
npm run build

# Production build
npm run build:prod

# Staging build
npm run build:staging

# UAT build
npm run build:uat
```

### Environment Variables (Optional Override)

You can override the default environment URLs using environment variables:

```bash
# Production build with custom API URL
export API_URL=https://api.contactkeeper.com/api
export API_KEY=your-production-key
npm run build:prod

# Staging build with custom API URL
export API_URL=https://staging-api.contactkeeper.com/api
export API_KEY=your-staging-key
npm run build:staging

# UAT build with custom API URL
export API_URL=https://uat-api.contactkeeper.com/api
export API_KEY=your-uat-key
npm run build:uat
```

The build script will automatically inject these variables into the environment file if provided.

## Best Practices

1. **Never commit sensitive URLs** - Use environment variables for production
2. **Use HTTPS in production** - Always use secure connections for production APIs
3. **Test all environments** - Ensure all environment configurations work correctly
4. **Document changes** - Update this file when adding new environments
5. **Use the ApiConfigService** - Don't hardcode URLs in components

## Adding New Environments

1. Create a new environment file: `src/environments/environment.{name}.ts`
2. Add the configuration to `angular.json` under `configurations`
3. Update this documentation
4. Test the new environment configuration
