import { Component, inject, EventEmitter, Output, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';
import { AlertService } from '../../../services/alert.service';
import { Contact, ContactRequest } from '../../../models/contact.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit, OnChanges {
  @Input() contactToEdit: Contact | null = null;
  @Output() contactAdded = new EventEmitter<Contact>();
  @Output() contactUpdated = new EventEmitter<Contact>();
  @Output() editCancelled = new EventEmitter<void>();
  
  contactForm: FormGroup;
  isLoading = false;
  isEditMode = false;
  
  private contactService = inject(ContactService);
  private alertService = inject(AlertService);
  private fb = inject(FormBuilder);

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      type: ['personal']
    });
  }

  ngOnInit(): void {
    console.log('ContactForm ngOnInit - contactToEdit:', this.contactToEdit);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ContactForm ngOnChanges - changes:', changes);
    if (changes['contactToEdit'] && this.contactToEdit) {
      this.isEditMode = true;
      console.log('Setting edit mode, patching form with:', this.contactToEdit);
      this.contactForm.patchValue({
        name: this.contactToEdit.name,
        email: this.contactToEdit.email,
        phone: this.contactToEdit.phone || '',
        type: this.contactToEdit.type
      });
    } else if (changes['contactToEdit'] && !this.contactToEdit) {
      this.isEditMode = false;
      this.resetForm();
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isLoading = true;
      const contactRequest: ContactRequest = this.contactForm.value;
      
      if (this.isEditMode && this.contactToEdit) {
        // Update existing contact
        this.contactService.updateContact(this.contactToEdit.id, contactRequest).subscribe({
          next: (contact) => {
            this.contactUpdated.emit(contact);
            this.resetForm();
            this.alertService.showAlert('success', 'Contact updated successfully!');
            this.isLoading = false;
          },
          error: (error) => {
            this.alertService.showAlert('error', 'Failed to update contact');
            this.isLoading = false;
          }
        });
      } else {
        // Add new contact
        this.contactService.addContact(contactRequest).subscribe({
          next: (contact) => {
            this.contactAdded.emit(contact);
            this.resetForm();
            this.alertService.showAlert('success', 'Contact added successfully!');
            this.isLoading = false;
          },
          error: (error) => {
            this.alertService.showAlert('error', 'Failed to add contact');
            this.isLoading = false;
          }
        });
      }
    }
  }

  cancelEdit(): void {
    this.resetForm();
    this.editCancelled.emit();
  }

  private resetForm(): void {
    this.contactForm.reset();
    this.contactForm.patchValue({ type: 'personal' });
    this.isEditMode = false;
    this.contactToEdit = null;
  }
}
