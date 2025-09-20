import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../../services/auth.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'logout']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home when goHome is called', () => {
    component.goHome();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should navigate to users when goUsers is called', () => {
    component.goUsers();
    expect(router.navigate).toHaveBeenCalledWith(['/users']);
  });

  it('should navigate to about when goAbout is called', () => {
    component.goAbout();
    expect(router.navigate).toHaveBeenCalledWith(['/about']);
  });

  it('should navigate to login when goLogin is called', () => {
    component.goLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to register when goRegister is called', () => {
    component.goRegister();
    expect(router.navigate).toHaveBeenCalledWith(['/register']);
  });

  it('should logout and navigate to login when logout is called', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should show login/register links when user is not authenticated', () => {
    authService.isAuthenticated.and.returnValue(false);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Login');
    expect(compiled.textContent).toContain('Register');
  });

  it('should show logout button when user is authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Logout');
  });
});