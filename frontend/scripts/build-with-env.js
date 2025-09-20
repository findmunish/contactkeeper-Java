#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read environment variables from process.env
const apiUrl = process.env.API_URL || 'http://localhost:5000/api';
const apiKey = process.env.API_KEY || '';
const debugMode = process.env.DEBUG_MODE === 'true';
const appName = process.env.APP_NAME || 'Contact Keeper';
const version = process.env.APP_VERSION || '1.0.0';

// Environment file content
const envContent = `import { Environment } from './environment.types';

export const environment: Environment = {
  production: ${process.env.NODE_ENV === 'production'},
  apiUrl: '${apiUrl}',
  appName: '${appName}',
  version: '${version}',
  features: {
    enableUsersPage: true,
    enableAlerts: true,
    enableContactFilter: true
  },
  apiKey: '${apiKey}',
  debugMode: ${debugMode}
};
`;

// Write the environment file
const envPath = path.join(__dirname, '../src/environments/environment.ts');
fs.writeFileSync(envPath, envContent);

console.log('Environment file updated with variables:');
console.log(`- API URL: ${apiUrl}`);
console.log(`- Debug Mode: ${debugMode}`);
console.log(`- App Name: ${appName}`);
console.log(`- Version: ${version}`);
