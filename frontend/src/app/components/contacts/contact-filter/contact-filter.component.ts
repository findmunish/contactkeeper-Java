import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../../models/contact.model';

@Component({
  selector: 'app-contact-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.css']
})
export class ContactFilterComponent implements OnInit {
  @Input() contacts: Contact[] = [];
  @Output() filterChanged = new EventEmitter<Contact[]>();
  
  searchTerm = '';
  filteredContacts: Contact[] = [];

  ngOnInit(): void {
    this.filteredContacts = [...this.contacts];
  }

  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.filteredContacts = [...this.contacts];
    } else {
      const searchLower = this.searchTerm.toLowerCase();
      this.filteredContacts = this.contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchLower) ||
        contact.email.toLowerCase().includes(searchLower) ||
        (contact.phone && contact.phone.includes(searchLower))
      );
    }
    this.filterChanged.emit(this.filteredContacts);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredContacts = [...this.contacts];
    this.filterChanged.emit(this.filteredContacts);
  }
}
