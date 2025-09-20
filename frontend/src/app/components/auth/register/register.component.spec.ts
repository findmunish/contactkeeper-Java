import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let alertService: jasmine.SpyObj<AlertService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['showAlert']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    alertService = TestBed.inject(AlertService) as jasmine.SpyObj<AlertService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.registerForm.get('name')?.value).toBe('');
    expect(component.registerForm.get('email')?.value).toBe('');
    expect(component.registerForm.get('password')?.value).toBe('');
  });

  it('should validate required fields', () => {
    const nameControl = component.registerForm.get('name');
    const emailControl = component.registerForm.get('email');
    const passwordControl = component.registerForm.get('password');

    nameControl?.setValue('');
    emailControl?.setValue('');
    passwordControl?.setValue('');

    expect(nameControl?.invalid).toBeTruthy();
    expect(emailControl?.invalid).toBeTruthy();
    expect(passwordControl?.invalid).toBeTruthy();
  });

  it('should validate name minimum length', () => {
    const nameControl = component.registerForm.get('name');
    
    nameControl?.setValue('A');
    expect(nameControl?.invalid).toBeTruthy();

    nameControl?.setValue('John');
    expect(nameControl?.valid).toBeTruthy();
  });

  it('should validate email format', () => {
    const emailControl = component.registerForm.get('email');
    
    emailControl?.setValue('invalid-email');
    expect(emailControl?.invalid).toBeTruthy();

    emailControl?.setValue('valid@email.com');
    expect(emailControl?.valid).toBeTruthy();
  });

  it('should validate password minimum length', () => {
    const passwordControl = component.registerForm.get('password');
    
    passwordControl?.setValue('123');
    expect(passwordControl?.invalid).toBeTruthy();

    passwordControl?.setValue('password123');
    expect(passwordControl?.valid).toBeTruthy();
  });

  it('should call authService.register when form is valid', () => {
    const mockUserData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    };

    component.registerForm.patchValue(mockUserData);
    authService.register.and.returnValue({
      subscribe: (callback: any) => callback({ next: {} })
    } as any);

    component.onSubmit();

    expect(authService.register).toHaveBeenCalledWith(mockUserData);
  });

  it('should navigate to home on successful registration', () => {
    const mockUserData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    };

    component.registerForm.patchValue(mockUserData);
    authService.register.and.returnValue({
      subscribe: (callback: any) => callback({ next: {} })
    } as any);

    component.onSubmit();

    expect(alertService.showAlert).toHaveBeenCalledWith('success', 'Registration successful!');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should show error message on registration failure', () => {
    const mockUserData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    };

    component.registerForm.patchValue(mockUserData);
    authService.register.and.returnValue({
      subscribe: (callback: any) => callback({ error: 'Registration failed' })
    } as any);

    component.onSubmit();

    expect(alertService.showAlert).toHaveBeenCalledWith('error', 'Registration failed. Please try again.');
    expect(component.isLoading).toBeFalse();
  });

  it('should navigate to login when goToLogin is called', () => {
    component.goToLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
