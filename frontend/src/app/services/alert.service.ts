import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Alert {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  timeout?: number; // Optional timeout in milliseconds
  autoDismiss?: boolean; // Whether to auto-dismiss or not
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertsSubject = new BehaviorSubject<Alert[]>([]);
  public alerts$ = this.alertsSubject.asObservable();
  
  // Default timeout durations for different alert types (in milliseconds)
  private readonly defaultTimeouts = {
    success: 4000,  // 4 seconds
    info: 5000,     // 5 seconds
    warning: 6000,  // 6 seconds
    error: 8000     // 8 seconds (errors need more time to read)
  };

  showAlert(type: Alert['type'], message: string, options?: { timeout?: number; autoDismiss?: boolean }): void {
    const alert: Alert = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      type,
      message,
      autoDismiss: options?.autoDismiss !== false, // Default to true unless explicitly set to false
      timeout: options?.timeout || this.defaultTimeouts[type]
    };
    
    const currentAlerts = this.alertsSubject.value;
    this.alertsSubject.next([...currentAlerts, alert]);
    
    // Auto remove after specified timeout if autoDismiss is enabled
    if (alert.autoDismiss && alert.timeout) {
      setTimeout(() => {
        this.removeAlert(alert.id);
      }, alert.timeout);
    }
  }

  removeAlert(id: string): void {
    const currentAlerts = this.alertsSubject.value;
    this.alertsSubject.next(currentAlerts.filter(alert => alert.id !== id));
  }

  clearAlerts(): void {
    this.alertsSubject.next([]);
  }

  // Convenience method for showing persistent alerts (no auto-dismiss)
  showPersistentAlert(type: Alert['type'], message: string): void {
    this.showAlert(type, message, { autoDismiss: false });
  }

  // Convenience method for showing alerts with custom timeout
  showAlertWithTimeout(type: Alert['type'], message: string, timeout: number): void {
    this.showAlert(type, message, { timeout });
  }
}
