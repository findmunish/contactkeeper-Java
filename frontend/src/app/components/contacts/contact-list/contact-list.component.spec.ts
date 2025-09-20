import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListComponent } from './contact-list.component';
import { Contact } from '../../../models/contact.model';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display contacts when contacts array is not empty', () => {
    const mockContacts: Contact[] = [
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

    component.contacts = mockContacts;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.contact-item')).toBeTruthy();
    expect(compiled.textContent).toContain('John Doe');
  });

  it('should display no contacts message when contacts array is empty', () => {
    component.contacts = [];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.contact-item')).toBeFalsy();
    expect(compiled.textContent).toContain('No contacts found');
  });

  it('should emit contactUpdated event when edit button is clicked', () => {
    const mockContact: Contact = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      type: 'personal',
      date: '2023-01-01',
      user: 'user1'
    };

    component.contacts = [mockContact];
    fixture.detectChanges();

    spyOn(component.contactUpdated, 'emit');
    
    const editButton = fixture.nativeElement.querySelector('.btn-outline-primary');
    editButton.click();

    expect(component.contactUpdated.emit).toHaveBeenCalledWith(mockContact);
  });

  it('should emit contactDeleted event when delete button is clicked and confirmed', () => {
    const mockContact: Contact = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      type: 'personal',
      date: '2023-01-01',
      user: 'user1'
    };

    component.contacts = [mockContact];
    fixture.detectChanges();

    spyOn(component.contactDeleted, 'emit');
    spyOn(window, 'confirm').and.returnValue(true);
    
    const deleteButton = fixture.nativeElement.querySelector('.btn-outline-danger');
    deleteButton.click();

    expect(component.contactDeleted.emit).toHaveBeenCalledWith('1');
  });

  it('should track contacts by id', () => {
    const mockContact: Contact = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      type: 'personal',
      date: '2023-01-01',
      user: 'user1'
    };

    const result = component.trackByContactId(0, mockContact);
    expect(result).toBe('1');
  });
});
