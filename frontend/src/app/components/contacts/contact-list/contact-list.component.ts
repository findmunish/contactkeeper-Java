import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../../../models/contact.model';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  @Input() contacts: Contact[] = [];
  @Output() contactUpdated = new EventEmitter<Contact>();
  @Output() contactDeleted = new EventEmitter<string>();

  trackByContactId(index: number, contact: Contact): string {
    return contact.id;
  }

  editContact(contact: Contact): void {
    console.log('Edit contact clicked:', contact);
    this.contactUpdated.emit(contact);
  }

  deleteContact(contactId: string): void {
    const contact = this.contacts.find(c => c.id === contactId);
    const contactName = contact ? contact.name : 'this contact';
    
    if (confirm(`Are you sure you want to delete "${contactName}"? This action cannot be undone.`)) {
      this.contactDeleted.emit(contactId);
    }
  }
}
