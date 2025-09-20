import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { ContactService } from '../../../services/contact.service';
import { User } from '../../../models/user.model';
import { Contact } from '../../../models/contact.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  currentUser: User | null = null;
  contacts: Contact[] = [];
  
  authService = inject(AuthService);
  private contactService = inject(ContactService);

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.loadUserData();
    }
  }

  private loadUserData(): void {
    // Load current user
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (error) => {
        console.error('Error loading user:', error);
      }
    });

    // Load user's contacts
    this.contactService.getContacts().subscribe({
      next: (contacts) => {
        this.contacts = contacts;
      },
      error: (error) => {
        console.error('Error loading contacts:', error);
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
