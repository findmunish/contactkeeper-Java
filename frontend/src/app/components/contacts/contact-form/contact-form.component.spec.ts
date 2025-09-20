import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ContactFormComponent } from './contact-form.component';
import { ContactService } from '../../../services/contact.service';
import { AlertService } from '../../../services/alert.service';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let contactService: jasmine.SpyObj<ContactService>;
  let alertService: jasmine.SpyObj<AlertService>;

  beforeEach(async () => {
    const contactServiceSpy = jasmine.createSpyObj('ContactService', ['addContact', 'updateContact']);
    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['showAlert']);

    await TestBed.configureTestingModule({
      imports: [ContactFormComponent, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: ContactService, useValue: contactServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    contactService = TestBed.inject(ContactService) as jasmine.SpyObj<ContactService>;
    alertService = TestBed.inject(AlertService) as jasmine.SpyObj<AlertService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.contactForm.get('name')?.value).toBe('');
    expect(component.contactForm.get('email')?.value).toBe('');
    expect(component.contactForm.get('phone')?.value).toBe('');
    expect(component.contactForm.get('type')?.value).toBe('personal');
  });

  it('should validate required fields', () => {
    const nameControl = component.contactForm.get('name');
    const emailControl = component.contactForm.get('email');

    nameControl?.setValue('');
    emailControl?.setValue('');

    expect(nameControl?.invalid).toBeTruthy();
    expect(emailControl?.invalid).toBeTruthy();
  });

  it('should validate email format', () => {
    const emailControl = component.contactForm.get('email');
    
    emailControl?.setValue('invalid-email');
    expect(emailControl?.invalid).toBeTruthy();

    emailControl?.setValue('valid@email.com');
    expect(emailControl?.valid).toBeTruthy();
  });

  it('should switch to edit mode when contactToEdit is provided', () => {
    const mockContact = {
      id: '1',
      name: 'Test Contact',
      email: 'test@example.com',
      phone: '1234567890',
      type: 'personal',
      date: '2023-01-01',
      user: 'user1'
    };

    component.contactToEdit = mockContact;
    component.ngOnChanges({
      contactToEdit: {
        currentValue: mockContact,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true
      }
    });

    expect(component.isEditMode).toBeTruthy();
    expect(component.contactForm.get('name')?.value).toBe('Test Contact');
    expect(component.contactForm.get('email')?.value).toBe('test@example.com');
  });
});
