# Environment Configuration Examples

## How Different Environments Work

### 1. Development (Default)
```bash
npm run build
# Uses: src/environments/environment.ts
# API URL: http://localhost:5000/api
```

### 2. Production
```bash
npm run build:prod
# Uses: src/environments/environment.prod.ts
# API URL: https://api.contactkeeper.com/api
```

### 3. Staging
```bash
npm run build:staging
# Uses: src/environments/environment.staging.ts
# API URL: https://staging-api.contactkeeper.com/api
```

### 4. UAT
```bash
npm run build:uat
# Uses: src/environments/environment.uat.ts
# API URL: https://uat-api.contactkeeper.com/api
```

## Override with Environment Variables

### Production with Custom URL
```bash
export API_URL=https://my-custom-api.com/api
export API_KEY=my-secret-key
npm run build:prod
# Will use: https://my-custom-api.com/api
```

### Staging with Custom URL
```bash
export API_URL=https://my-staging-api.com/api
npm run build:staging
# Will use: https://my-staging-api.com/api
```

## CI/CD Examples

### GitHub Actions
```yaml
- name: Build for Production
  env:
    API_URL: ${{ secrets.PROD_API_URL }}
    API_KEY: ${{ secrets.PROD_API_KEY }}
  run: npm run build:prod
```

### Docker
```dockerfile
# Build with environment variables
ARG API_URL
ARG API_KEY
ENV API_URL=$API_URL
ENV API_KEY=$API_KEY
RUN npm run build:prod
```

### Docker Compose
```yaml
services:
  frontend:
    build:
      context: .
      args:
        API_URL: https://api.contactkeeper.com/api
        API_KEY: ${API_KEY}
    environment:
      - API_URL=https://api.contactkeeper.com/api
      - API_KEY=${API_KEY}
```

## File Structure
```
src/environments/
├── environment.ts          # Development (localhost:5000)
├── environment.prod.ts     # Production
├── environment.staging.ts  # Staging
├── environment.uat.ts      # UAT
└── environment.types.ts    # TypeScript interfaces
```

## Key Benefits

✅ **No hardcoded URLs** in services
✅ **Environment-specific builds** 
✅ **Easy deployment** to different environments
✅ **Secure configuration** with environment variables
✅ **Type-safe** configuration with TypeScript