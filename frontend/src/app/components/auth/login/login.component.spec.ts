import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let alertService: jasmine.SpyObj<AlertService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['showAlert']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    alertService = TestBed.inject(AlertService) as jasmine.SpyObj<AlertService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.loginForm.get('email')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('should validate required fields', () => {
    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');

    emailControl?.setValue('');
    passwordControl?.setValue('');

    expect(emailControl?.invalid).toBeTruthy();
    expect(passwordControl?.invalid).toBeTruthy();
  });

  it('should validate email format', () => {
    const emailControl = component.loginForm.get('email');
    
    emailControl?.setValue('invalid-email');
    expect(emailControl?.invalid).toBeTruthy();

    emailControl?.setValue('valid@email.com');
    expect(emailControl?.valid).toBeTruthy();
  });

  it('should call authService.login when form is valid', () => {
    const mockCredentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    component.loginForm.patchValue(mockCredentials);
    authService.login.and.returnValue({
      subscribe: (callback: any) => callback({ next: {} })
    } as any);

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith(mockCredentials);
  });

  it('should navigate to home on successful login', () => {
    const mockCredentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    component.loginForm.patchValue(mockCredentials);
    authService.login.and.returnValue({
      subscribe: (callback: any) => callback({ next: {} })
    } as any);

    component.onSubmit();

    expect(alertService.showAlert).toHaveBeenCalledWith('success', 'Login successful!');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should show error message on login failure', () => {
    const mockCredentials = {
      email: 'test@example.com',
      password: 'wrongpassword'
    };

    component.loginForm.patchValue(mockCredentials);
    authService.login.and.returnValue({
      subscribe: (callback: any) => callback({ error: 'Invalid credentials' })
    } as any);

    component.onSubmit();

    expect(alertService.showAlert).toHaveBeenCalledWith('error', 'Invalid credentials');
    expect(component.isLoading).toBeFalse();
  });

  it('should navigate to register when goToRegister is called', () => {
    component.goToRegister();
    expect(router.navigate).toHaveBeenCalledWith(['/register']);
  });
});
