export const environment = {
  production: true,
  apiUrl: process.env['API_URL'] || 'https://api.contactkeeper.com/api',
  appName: 'Contact Keeper',
  version: '1.0.0',
  features: {
    enableUsersPage: true,
    enableAlerts: true,
    enableContactFilter: true
  },
  // Sensitive data should come from environment variables
  apiKey: process.env['API_KEY'] || '',
  debugMode: false
};