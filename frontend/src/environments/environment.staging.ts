import { Environment } from './environment.types';

export const environment: Environment = {
  production: false,
  apiUrl: 'https://staging-api.contactkeeper.com/api',
  appName: 'Contact Keeper',
  version: '1.0.0',
  features: {
    enableUsersPage: true,
    enableAlerts: true,
    enableContactFilter: true
  },
  apiKey: '',
  debugMode: true
};
