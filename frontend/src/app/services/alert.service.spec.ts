import { TestBed } from '@angular/core/testing';
import { AlertService, Alert } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show alert with default timeout', (done) => {
    service.alerts$.subscribe(alerts => {
      if (alerts.length > 0) {
        const alert = alerts[0];
        expect(alert.type).toBe('success');
        expect(alert.message).toBe('Test message');
        expect(alert.autoDismiss).toBe(true);
        expect(alert.timeout).toBe(4000); // Default success timeout
        done();
      }
    });

    service.showAlert('success', 'Test message');
  });

  it('should show alert with custom timeout', (done) => {
    service.alerts$.subscribe(alerts => {
      if (alerts.length > 0) {
        const alert = alerts[0];
        expect(alert.timeout).toBe(10000);
        done();
      }
    });

    service.showAlert('info', 'Test message', { timeout: 10000 });
  });

  it('should show persistent alert (no auto-dismiss)', (done) => {
    service.alerts$.subscribe(alerts => {
      if (alerts.length > 0) {
        const alert = alerts[0];
        expect(alert.autoDismiss).toBe(false);
        expect(alert.timeout).toBeUndefined();
        done();
      }
    });

    service.showAlert('error', 'Test message', { autoDismiss: false });
  });

  it('should use different default timeouts for different alert types', () => {
    const testCases = [
      { type: 'success' as const, expectedTimeout: 4000 },
      { type: 'info' as const, expectedTimeout: 5000 },
      { type: 'warning' as const, expectedTimeout: 6000 },
      { type: 'error' as const, expectedTimeout: 8000 }
    ];

    testCases.forEach(({ type, expectedTimeout }) => {
      service.showAlert(type, 'Test message');
      
      service.alerts$.subscribe(alerts => {
        if (alerts.length > 0) {
          const alert = alerts.find(a => a.type === type);
          if (alert) {
            expect(alert.timeout).toBe(expectedTimeout);
          }
        }
      });
    });
  });

  it('should remove alert by id', (done) => {
    let alertId: string;
    
    service.alerts$.subscribe(alerts => {
      if (alerts.length === 1) {
        alertId = alerts[0].id;
        service.removeAlert(alertId);
      } else if (alerts.length === 0) {
        done();
      }
    });

    service.showAlert('success', 'Test message');
  });

  it('should clear all alerts', (done) => {
    service.alerts$.subscribe(alerts => {
      if (alerts.length === 0) {
        done();
      }
    });

    service.showAlert('success', 'Test message 1');
    service.showAlert('error', 'Test message 2');
    service.clearAlerts();
  });

  it('should show persistent alert using convenience method', (done) => {
    service.alerts$.subscribe(alerts => {
      if (alerts.length > 0) {
        const alert = alerts[0];
        expect(alert.autoDismiss).toBe(false);
        done();
      }
    });

    service.showPersistentAlert('warning', 'Persistent message');
  });

  it('should show alert with custom timeout using convenience method', (done) => {
    service.alerts$.subscribe(alerts => {
      if (alerts.length > 0) {
        const alert = alerts[0];
        expect(alert.timeout).toBe(15000);
        done();
      }
    });

    service.showAlertWithTimeout('info', 'Custom timeout message', 15000);
  });

  it('should generate unique alert ids', () => {
    const ids: string[] = [];
    
    service.alerts$.subscribe(alerts => {
      alerts.forEach(alert => {
        expect(ids).not.toContain(alert.id);
        ids.push(alert.id);
      });
    });

    service.showAlert('success', 'Message 1');
    service.showAlert('error', 'Message 2');
    service.showAlert('info', 'Message 3');
  });
});
