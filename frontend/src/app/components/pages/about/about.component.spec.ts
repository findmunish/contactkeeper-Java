import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AboutComponent } from './about.component';
import { AuthService } from '../../../services/auth.service';
import { ContactService } from '../../../services/contact.service';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let contactService: jasmine.SpyObj<ContactService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'getCurrentUser']);
    const contactServiceSpy = jasmine.createSpyObj('ContactService', ['getContacts']);

    await TestBed.configureTestingModule({
      imports: [AboutComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ContactService, useValue: contactServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    contactService = TestBed.inject(ContactService) as jasmine.SpyObj<ContactService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show about content when user is not authenticated', () => {
    authService.isAuthenticated.and.returnValue(false);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card-header h4')?.textContent).toContain('About Contact Keeper');
  });

  it('should show user profile when user is authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);
    component.currentUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      date: '2023-01-01'
    };
    
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card-title')?.textContent).toContain('Test User');
  });

  it('should format date correctly', () => {
    const testDate = '2023-01-15T10:30:00Z';
    const formattedDate = component.formatDate(testDate);
    expect(formattedDate).toContain('January');
    expect(formattedDate).toContain('2023');
  });
});
