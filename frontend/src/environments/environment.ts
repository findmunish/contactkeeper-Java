import { Environment } from './environment.types';

export const environment: Environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api',
  appName: 'Contact Keeper',
  version: '1.0.0',
  features: {
    enableUsersPage: true,
    enableAlerts: true,
    enableContactFilter: true
  },
  // Sensitive data should come from environment variables
  apiKey: '',
  debugMode: false
};