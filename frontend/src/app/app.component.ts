import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { AlertsComponent } from './components/layout/alerts/alerts.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, AlertsComponent],
  template: `
    <div class="container-fluid">
      <app-navbar></app-navbar>
      <app-alerts></app-alerts>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .container-fluid {
      min-height: 100vh;
      background-color: #f8f9fa;
    }
  `]
})
export class AppComponent {
  title = 'Contact Keeper';
}