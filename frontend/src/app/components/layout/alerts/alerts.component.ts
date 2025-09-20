import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService, Alert } from '../../../services/alert.service';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent {
  alertService = inject(AlertService);

  getIcon(type: Alert['type']): string {
    switch (type) {
      case 'success': return 'check-circle';
      case 'error': return 'exclamation-circle';
      case 'warning': return 'exclamation-triangle';
      case 'info': return 'info-circle';
      default: return 'info-circle';
    }
  }

  trackByAlertId(index: number, alert: Alert): string {
    return alert.id;
  }
}