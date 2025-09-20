import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { UsersComponent } from './users.component';
import { User } from '../../../models/user.model';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let httpMock: HttpTestingController;
  let router: jasmine.SpyObj<Router>;

  const mockUsers: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      date: '2023-01-01'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      date: '2023-01-15'
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      date: '2023-02-01'
    }
  ];

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [UsersComponent, HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    component.ngOnInit();

    const req = httpMock.expectOne('http://localhost:5000/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);

    expect(component.users).toEqual(mockUsers);
    expect(component.isLoading).toBeFalse();
    expect(component.error).toBeNull();
  });

  it('should handle loading state', () => {
    expect(component.isLoading).toBeTrue();
    expect(component.users).toEqual([]);
    expect(component.error).toBeNull();
  });

  it('should handle error when loading users fails', () => {
    component.ngOnInit();

    const req = httpMock.expectOne('http://localhost:5000/api/users');
    req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });

    expect(component.error).toBe('Failed to load users. Please try again later.');
    expect(component.isLoading).toBeFalse();
    expect(component.users).toEqual([]);
  });

  it('should format date correctly', () => {
    const testDate = '2023-12-25';
    const formattedDate = component.formatDate(testDate);
    
    // The exact format may vary based on locale, but should contain the date parts
    expect(formattedDate).toContain('2023');
    expect(formattedDate).toContain('December');
    expect(formattedDate).toContain('25');
  });

  it('should generate initials correctly', () => {
    expect(component.getInitials('John Doe')).toBe('JD');
    expect(component.getInitials('Jane Smith')).toBe('JS');
    expect(component.getInitials('Bob Johnson')).toBe('BJ');
    expect(component.getInitials('Alice')).toBe('A');
    expect(component.getInitials('Mary Jane Watson')).toBe('MJ');
  });

  it('should handle empty users list', () => {
    component.ngOnInit();

    const req = httpMock.expectOne('http://localhost:5000/api/users');
    req.flush([]);

    expect(component.users).toEqual([]);
    expect(component.isLoading).toBeFalse();
    expect(component.error).toBeNull();
  });

  it('should retry loading users when retry button is clicked', () => {
    // First load fails
    component.ngOnInit();
    const firstReq = httpMock.expectOne('http://localhost:5000/api/users');
    firstReq.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });

    expect(component.error).toBeTruthy();

    // Retry
    component.loadUsers();
    const secondReq = httpMock.expectOne('http://localhost:5000/api/users');
    secondReq.flush(mockUsers);

    expect(component.users).toEqual(mockUsers);
    expect(component.error).toBeNull();
    expect(component.isLoading).toBeFalse();
  });

  it('should handle network error', () => {
    component.ngOnInit();

    const req = httpMock.expectOne('http://localhost:5000/api/users');
    req.error(new ErrorEvent('Network error'));

    expect(component.error).toBe('Failed to load users. Please try again later.');
    expect(component.isLoading).toBeFalse();
  });

  it('should display correct number of users in badge', () => {
    component.users = mockUsers;
    fixture.detectChanges();

    const badgeElement = fixture.nativeElement.querySelector('.badge');
    expect(badgeElement.textContent.trim()).toBe('3 Users');
  });

  it('should show loading spinner initially', () => {
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('.spinner-border');
    expect(spinner).toBeTruthy();
  });

  it('should show error message when error occurs', () => {
    component.error = 'Test error message';
    component.isLoading = false;
    fixture.detectChanges();

    const errorAlert = fixture.nativeElement.querySelector('.alert-danger');
    expect(errorAlert).toBeTruthy();
    expect(errorAlert.textContent).toContain('Test error message');
  });

  it('should navigate to login and store user data when user card is clicked', () => {
    const testUser = mockUsers[0];
    spyOn(sessionStorage, 'setItem');
    
    component.onUserCardClick(testUser);
    
    expect(sessionStorage.setItem).toHaveBeenCalledWith('loginPrefill', JSON.stringify({
      email: testUser.email,
      name: testUser.name
    }));
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to register when plus card is clicked', () => {
    component.onPlusCardClick();
    
    expect(router.navigate).toHaveBeenCalledWith(['/register']);
  });

  it('should display plus card in the template', () => {
    component.users = mockUsers;
    component.isLoading = false;
    fixture.detectChanges();

    const plusCard = fixture.nativeElement.querySelector('.plus-card');
    expect(plusCard).toBeTruthy();
    
    const plusIcon = fixture.nativeElement.querySelector('.plus-icon i');
    expect(plusIcon).toBeTruthy();
    expect(plusIcon.classList).toContain('fa-plus');
  });

  it('should have clickable cards with proper cursor', () => {
    component.users = mockUsers;
    component.isLoading = false;
    fixture.detectChanges();

    const userCards = fixture.nativeElement.querySelectorAll('.clickable-card');
    expect(userCards.length).toBeGreaterThan(0);
    
    userCards.forEach((card: any) => {
      expect(card.style.cursor).toBe('pointer');
    });
  });
});