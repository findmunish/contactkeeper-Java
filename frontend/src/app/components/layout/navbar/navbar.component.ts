import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);

  goHome(event?: Event): void {
    if (event) event.preventDefault();
    this.router.navigate(['/']);
  }

  goUsers(event?: Event): void {
    if (event) event.preventDefault();
    this.router.navigate(['/users']);
  }

  goAbout(event?: Event): void {
    if (event) event.preventDefault();
    this.router.navigate(['/about']);
  }

  goLogin(event?: Event): void {
    if (event) event.preventDefault();
    this.router.navigate(['/login']);
  }

  goRegister(event?: Event): void {
    if (event) event.preventDefault();
    this.router.navigate(['/register']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

