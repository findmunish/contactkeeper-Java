import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from '../../contacts/contact-form/contact-form.component';
import { ContactListComponent } from '../../contacts/contact-list/contact-list.component';
import { ContactFilterComponent } from '../../contacts/contact-filter/contact-filter.component';
import { ContactService } from '../../../services/contact.service';
import { AlertService } from '../../../services/alert.service';
import { Contact } from '../../../models/contact.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ContactFormComponent, ContactListComponent, ContactFilterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  editingContact: Contact | null = null;
  private contactService = inject(ContactService);
  private alertService = inject(AlertService);

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe({
      next: (contacts) => {
        this.contacts = contacts;
        this.filteredContacts = contacts;
      },
      error: (error) => {
        console.error('Error loading contacts:', error);
      }
    });
  }

  onContactAdded(contact: Contact): void {
    this.contacts.unshift(contact);
    this.filteredContacts = [...this.contacts];
  }

  onContactUpdated(updatedContact: Contact): void {
    const index = this.contacts.findIndex(c => c.id === updatedContact.id);
    if (index !== -1) {
      this.contacts[index] = updatedContact;
      this.filteredContacts = [...this.contacts];
    }
    this.editingContact = null;
  }

  onEditContact(contact: Contact): void {
    this.editingContact = contact;
  }

  onEditCancelled(): void {
    this.editingContact = null;
  }

  onContactDeleted(contactId: string): void {
    console.log('Attempting to delete contact:', contactId);
    this.contactService.deleteContact(contactId).subscribe({
      next: (response) => {
        console.log('Delete successful:', response);
        this.contacts = this.contacts.filter(c => c.id !== contactId);
        this.filteredContacts = [...this.contacts];
        this.alertService.showAlert('success', response.message || 'Contact deleted successfully!');
      },
      error: (error) => {
        console.error('Delete error details:', error);
        console.error('Error status:', error.status);
        console.error('Error statusText:', error.statusText);
        console.error('Error body:', error.error);
        
        let errorMessage = 'Failed to delete contact';
        if (error.status === 401) {
          errorMessage = 'Unauthorized: Please login again';
        } else if (error.status === 403) {
          errorMessage = 'Forbidden: You do not have permission to delete this contact';
        } else if (error.status === 404) {
          errorMessage = 'Contact not found';
        } else if (error.error && typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        
        this.alertService.showAlert('error', errorMessage);
      }
    });
  }

  onFilterChanged(filteredContacts: Contact[]): void {
    this.filteredContacts = filteredContacts;
  }
}
