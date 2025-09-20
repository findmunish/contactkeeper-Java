import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';
import { ContactService } from '../../../services/contact.service';
import { AlertService } from '../../../services/alert.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let contactService: jasmine.SpyObj<ContactService>;
  let alertService: jasmine.SpyObj<AlertService>;

  beforeEach(async () => {
    const contactServiceSpy = jasmine.createSpyObj('ContactService', ['getContacts', 'deleteContact']);
    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['showAlert']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule],
      providers: [
        { provide: ContactService, useValue: contactServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    contactService = TestBed.inject(ContactService) as jasmine.SpyObj<ContactService>;
    alertService = TestBed.inject(AlertService) as jasmine.SpyObj<AlertService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load contacts on init', () => {
    const mockContacts = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        type: 'personal',
        date: '2023-01-01',
        user: 'user1'
      }
    ];

    contactService.getContacts.and.returnValue({
      subscribe: (callback: any) => callback({ next: mockContacts })
    } as any);

    component.ngOnInit();

    expect(contactService.getContacts).toHaveBeenCalled();
    expect(component.contacts).toEqual(mockContacts);
    expect(component.filteredContacts).toEqual(mockContacts);
  });

  it('should add contact to list when contact is added', () => {
    const newContact = {
      id: '2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '0987654321',
      type: 'professional',
      date: '2023-01-02',
      user: 'user1'
    };

    component.contacts = [];
    component.filteredContacts = [];

    component.onContactAdded(newContact);

    expect(component.contacts).toContain(newContact);
    expect(component.filteredContacts).toContain(newContact);
  });

  it('should update contact in list when contact is updated', () => {
    const existingContact = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      type: 'personal',
      date: '2023-01-01',
      user: 'user1'
    };

    const updatedContact = {
      ...existingContact,
      name: 'John Smith',
      email: 'johnsmith@example.com'
    };

    component.contacts = [existingContact];
    component.filteredContacts = [existingContact];

    component.onContactUpdated(updatedContact);

    expect(component.contacts[0]).toEqual(updatedContact);
    expect(component.filteredContacts[0]).toEqual(updatedContact);
    expect(component.editingContact).toBeNull();
  });

  it('should delete contact from list when contact is deleted', () => {
    const contactToDelete = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      type: 'personal',
      date: '2023-01-01',
      user: 'user1'
    };

    component.contacts = [contactToDelete];
    component.filteredContacts = [contactToDelete];

    contactService.deleteContact.and.returnValue({
      subscribe: (callback: any) => callback({ next: { message: 'Contact deleted successfully' } })
    } as any);

    component.onContactDeleted('1');

    expect(contactService.deleteContact).toHaveBeenCalledWith('1');
    expect(component.contacts).not.toContain(contactToDelete);
    expect(component.filteredContacts).not.toContain(contactToDelete);
  });
});
