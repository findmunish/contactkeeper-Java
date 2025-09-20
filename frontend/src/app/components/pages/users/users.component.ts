import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { ApiConfigService } from '../../../services/api-config.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isLoading = true;
  error: string | null = null;

  private http = inject(HttpClient);
  private router = inject(Router);
  private apiConfig = inject(ApiConfigService);

  ngOnInit(): void {
    this.loadUsers();
  }

  public loadUsers(): void {
    this.http.get<User[]>(this.apiConfig.usersUrl).subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.error = 'Failed to load users. Please try again later.';
        this.isLoading = false;
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

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  onUserCardClick(user: User): void {
    // Store user data in sessionStorage for auto-filling login form
    sessionStorage.setItem('loginPrefill', JSON.stringify({
      email: user.email,
      name: user.name
    }));
    
    // Navigate to login page
    this.router.navigate(['/login']);
  }

  onPlusCardClick(): void {
    // Navigate to register page
    this.router.navigate(['/register']);
  }
}


