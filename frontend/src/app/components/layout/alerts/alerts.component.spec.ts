import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AlertsComponent } from './alerts.component';
import { AlertService, Alert } from '../../../services/alert.service';

describe('AlertsComponent', () => {
  let component: AlertsComponent;
  let fixture: ComponentFixture<AlertsComponent>;
  let alertService: jasmine.SpyObj<AlertService>;

  const mockAlerts: Alert[] = [
    {
      id: '1',
      type: 'success',
      message: 'Success message',
      autoDismiss: true,
      timeout: 4000
    },
    {
      id: '2',
      type: 'error',
      message: 'Error message',
      autoDismiss: true,
      timeout: 8000
    },
    {
      id: '3',
      type: 'warning',
      message: 'Warning message',
      autoDismiss: false
    },
    {
      id: '4',
      type: 'info',
      message: 'Info message',
      autoDismiss: true,
      timeout: 5000
    }
  ];

  beforeEach(async () => {
    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['removeAlert'], {
      alerts$: of(mockAlerts)
    });

    await TestBed.configureTestingModule({
      imports: [AlertsComponent],
      providers: [
        { provide: AlertService, useValue: alertServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertsComponent);
    component = fixture.componentInstance;
    alertService = TestBed.inject(AlertService) as jasmine.SpyObj<AlertService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display alerts when they exist', () => {
    fixture.detectChanges();
    
    const alertElements = fixture.nativeElement.querySelectorAll('.alert');
    expect(alertElements.length).toBe(4);
  });

  it('should not display alerts container when no alerts exist', () => {
    alertService.alerts$ = of([]);
    fixture.detectChanges();
    
    const alertsContainer = fixture.nativeElement.querySelector('.alerts-container');
    expect(alertsContainer).toBeNull();
  });

  it('should display success alert with correct styling', () => {
    alertService.alerts$ = of([mockAlerts[0]]);
    fixture.detectChanges();
    
    const alertElement = fixture.nativeElement.querySelector('.alert');
    expect(alertElement).toHaveClass('alert-success');
    expect(alertElement.textContent).toContain('Success message');
  });

  it('should display error alert with danger styling', () => {
    alertService.alerts$ = of([mockAlerts[1]]);
    fixture.detectChanges();
    
    const alertElement = fixture.nativeElement.querySelector('.alert');
    expect(alertElement).toHaveClass('alert-danger');
    expect(alertElement.textContent).toContain('Error message');
  });

  it('should display warning alert with correct styling', () => {
    alertService.alerts$ = of([mockAlerts[2]]);
    fixture.detectChanges();
    
    const alertElement = fixture.nativeElement.querySelector('.alert');
    expect(alertElement).toHaveClass('alert-warning');
    expect(alertElement.textContent).toContain('Warning message');
  });

  it('should display info alert with correct styling', () => {
    alertService.alerts$ = of([mockAlerts[3]]);
    fixture.detectChanges();
    
    const alertElement = fixture.nativeElement.querySelector('.alert');
    expect(alertElement).toHaveClass('alert-info');
    expect(alertElement.textContent).toContain('Info message');
  });

  it('should call removeAlert when close button is clicked', () => {
    alertService.alerts$ = of([mockAlerts[0]]);
    fixture.detectChanges();
    
    const closeButton = fixture.nativeElement.querySelector('.btn-close');
    closeButton.click();
    
    expect(alertService.removeAlert).toHaveBeenCalledWith('1');
  });

  it('should display correct icons for different alert types', () => {
    expect(component.getIcon('success')).toBe('check-circle');
    expect(component.getIcon('error')).toBe('exclamation-circle');
    expect(component.getIcon('warning')).toBe('exclamation-triangle');
    expect(component.getIcon('info')).toBe('info-circle');
    expect(component.getIcon('unknown' as any)).toBe('info-circle');
  });

  it('should have dismissible and fade classes on alerts', () => {
    alertService.alerts$ = of([mockAlerts[0]]);
    fixture.detectChanges();
    
    const alertElement = fixture.nativeElement.querySelector('.alert');
    expect(alertElement).toHaveClass('alert-dismissible');
    expect(alertElement).toHaveClass('fade');
    expect(alertElement).toHaveClass('show');
  });

  it('should have proper ARIA role on alerts', () => {
    alertService.alerts$ = of([mockAlerts[0]]);
    fixture.detectChanges();
    
    const alertElement = fixture.nativeElement.querySelector('.alert');
    expect(alertElement.getAttribute('role')).toBe('alert');
  });

  it('should display multiple alerts when multiple exist', () => {
    fixture.detectChanges();
    
    const alertElements = fixture.nativeElement.querySelectorAll('.alert');
    expect(alertElements.length).toBe(4);
    
    // Check that each alert has the correct message
    expect(alertElements[0].textContent).toContain('Success message');
    expect(alertElements[1].textContent).toContain('Error message');
    expect(alertElements[2].textContent).toContain('Warning message');
    expect(alertElements[3].textContent).toContain('Info message');
  });

  it('should show countdown timer for auto-dismissing alerts', () => {
    fixture.detectChanges();
    
    const timerElements = fixture.nativeElement.querySelectorAll('.alert-timer');
    expect(timerElements.length).toBe(3); // Only auto-dismissing alerts should have timers
    
    // Check that timers have correct animation duration
    expect(timerElements[0].style.animationDuration).toBe('4000ms'); // Success alert
    expect(timerElements[1].style.animationDuration).toBe('8000ms'); // Error alert
    expect(timerElements[2].style.animationDuration).toBe('5000ms'); // Info alert
  });

  it('should not show countdown timer for persistent alerts', () => {
    alertService.alerts$ = of([mockAlerts[2]]); // Warning alert (autoDismiss: false)
    fixture.detectChanges();
    
    const timerElement = fixture.nativeElement.querySelector('.alert-timer');
    expect(timerElement).toBeNull();
  });

  it('should have proper trackBy function', () => {
    expect(component.trackByAlertId(0, mockAlerts[0])).toBe('1');
    expect(component.trackByAlertId(1, mockAlerts[1])).toBe('2');
  });

  it('should have proper ARIA label on close button', () => {
    alertService.alerts$ = of([mockAlerts[0]]);
    fixture.detectChanges();
    
    const closeButton = fixture.nativeElement.querySelector('.btn-close');
    expect(closeButton.getAttribute('aria-label')).toBe('Close alert');
  });
});
