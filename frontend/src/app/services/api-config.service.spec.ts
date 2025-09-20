import { TestBed } from '@angular/core/testing';
import { ApiConfigService } from './api-config.service';

describe('ApiConfigService', () => {
  let service: ApiConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return base URL', () => {
    expect(service.getBaseUrl()).toBe('http://localhost:5000/api');
  });

  it('should return API URL for specific endpoint', () => {
    expect(service.getApiUrl('contacts')).toBe('http://localhost:5000/api/contacts');
    expect(service.getApiUrl('users')).toBe('http://localhost:5000/api/users');
    expect(service.getApiUrl('auth/login')).toBe('http://localhost:5000/api/auth/login');
  });

  it('should handle endpoints with leading slash', () => {
    expect(service.getApiUrl('/contacts')).toBe('http://localhost:5000/api/contacts');
    expect(service.getApiUrl('/users')).toBe('http://localhost:5000/api/users');
  });

  it('should return base URL when no endpoint provided', () => {
    expect(service.getApiUrl()).toBe('http://localhost:5000/api');
    expect(service.getApiUrl('')).toBe('http://localhost:5000/api');
  });

  it('should return specific endpoint URLs', () => {
    expect(service.contactsUrl).toBe('http://localhost:5000/api/contacts');
    expect(service.usersUrl).toBe('http://localhost:5000/api/users');
    expect(service.authUrl).toBe('http://localhost:5000/api/auth');
    expect(service.loginUrl).toBe('http://localhost:5000/api/auth/login');
    expect(service.registerUrl).toBe('http://localhost:5000/api/auth/register');
  });
});
