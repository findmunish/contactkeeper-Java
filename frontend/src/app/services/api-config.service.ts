import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  private get baseUrl(): string {
    return environment.apiUrl;
  }

  /**
   * Get the full API URL for a given endpoint
   * @param endpoint - The API endpoint (e.g., 'contacts', 'users', 'auth/login')
   * @returns Complete URL for the API endpoint
   */
  getApiUrl(endpoint: string = ''): string {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    return cleanEndpoint ? `${this.baseUrl}/${cleanEndpoint}` : this.baseUrl;
  }

  /**
   * Get the base API URL
   * @returns Base API URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Get specific endpoint URLs
   */
  get contactsUrl(): string {
    return this.getApiUrl('contacts');
  }

  get usersUrl(): string {
    return this.getApiUrl('users');
  }

  get authUrl(): string {
    return this.getApiUrl('auth');
  }

  get loginUrl(): string {
    return this.getApiUrl('auth/login');
  }

  get registerUrl(): string {
    return this.getApiUrl('auth/register');
  }
}