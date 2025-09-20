import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ContactFilterComponent } from './contact-filter.component';
import { Contact } from '../../../models/contact.model';

describe('ContactFilterComponent', () => {
  let component: ContactFilterComponent;
  let fixture: ComponentFixture<ContactFilterComponent>;

  const mockContacts: Contact[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      type: 'personal',
      user: 'user1',
      date: '2023-01-01'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '098-765-4321',
      type: 'business',
      user: 'user1',
      date: '2023-01-02'
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      phone: '555-123-4567',
      type: 'personal',
      user: 'user1',
      date: '2023-01-03'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFilterComponent, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactFilterComponent);
    component = fixture.componentInstance;
    component.contacts = mockContacts;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with all contacts', () => {
    expect(component.filteredContacts).toEqual(mockContacts);
  });

  it('should filter contacts by name', () => {
    component.searchTerm = 'John';
    component.onSearchChange();
    
    expect(component.filteredContacts).toEqual([mockContacts[0]]);
  });

  it('should filter contacts by email', () => {
    component.searchTerm = 'jane@example.com';
    component.onSearchChange();
    
    expect(component.filteredContacts).toEqual([mockContacts[1]]);
  });

  it('should filter contacts by phone', () => {
    component.searchTerm = '555-123';
    component.onSearchChange();
    
    expect(component.filteredContacts).toEqual([mockContacts[2]]);
  });

  it('should be case insensitive', () => {
    component.searchTerm = 'JOHN';
    component.onSearchChange();
    
    expect(component.filteredContacts).toEqual([mockContacts[0]]);
  });

  it('should return all contacts when search term is empty', () => {
    component.searchTerm = 'John';
    component.onSearchChange();
    
    component.searchTerm = '';
    component.onSearchChange();
    
    expect(component.filteredContacts).toEqual(mockContacts);
  });

  it('should return all contacts when search term is only whitespace', () => {
    component.searchTerm = '   ';
    component.onSearchChange();
    
    expect(component.filteredContacts).toEqual(mockContacts);
  });

  it('should emit filtered contacts when search changes', () => {
    spyOn(component.filterChanged, 'emit');
    
    component.searchTerm = 'John';
    component.onSearchChange();
    
    expect(component.filterChanged.emit).toHaveBeenCalledWith([mockContacts[0]]);
  });

  it('should clear search and reset to all contacts', () => {
    component.searchTerm = 'John';
    component.onSearchChange();
    
    spyOn(component.filterChanged, 'emit');
    component.clearSearch();
    
    expect(component.searchTerm).toBe('');
    expect(component.filteredContacts).toEqual(mockContacts);
    expect(component.filterChanged.emit).toHaveBeenCalledWith(mockContacts);
  });

  it('should handle contacts without phone numbers', () => {
    const contactsWithoutPhone = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '',
        type: 'personal',
        user: 'user1',
        date: '2023-01-01'
      }
    ];
    
    component.contacts = contactsWithoutPhone;
    component.searchTerm = 'John';
    component.onSearchChange();
    
    expect(component.filteredContacts).toEqual(contactsWithoutPhone);
  });

  it('should return empty array when no contacts match search', () => {
    component.searchTerm = 'NonExistent';
    component.onSearchChange();
    
    expect(component.filteredContacts).toEqual([]);
  });
});
