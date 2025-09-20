export interface Environment {
  production: boolean;
  apiUrl: string;
  appName: string;
  version: string;
  features: {
    enableUsersPage: boolean;
    enableAlerts: boolean;
    enableContactFilter: boolean;
  };
  apiKey: string;
  debugMode: boolean;
}
