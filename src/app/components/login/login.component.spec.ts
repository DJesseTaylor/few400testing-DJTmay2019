import { LoginComponent } from './login.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { LogInService } from './login.service';
import { By } from '@angular/platform-browser';

describe('the login component', () => {
  describe('with a logged in user', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let deMessage: DebugElement;
    let elMessage: HTMLElement;
    let stubbedLoginService: LogInService;

    beforeEach(() => {
      stubbedLoginService = {
        isLoggedIn: true,
        getUserName: () => 'Darth Vader'
      };

      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        providers: [{ provide: LogInService, useValue: stubbedLoginService }]
      }).compileComponents();

      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      deMessage = fixture.debugElement.query(By.css('[data-login-message]'));
      elMessage = deMessage.nativeElement;
      fixture.detectChanges();
    });

    it('should display the logged in message', () => {
      expect(elMessage.textContent).toBe('Welcome, Darth Vader');
    });
  });
  describe('with a non-logged in user', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let deMessage: DebugElement;
    let elMessage: HTMLElement;
    let stubbedLoginService: LogInService;

    beforeEach(() => {
      stubbedLoginService = {
        isLoggedIn: false,
        getUserName: () => 'Darth Vader'
      };

      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        providers: [{ provide: LogInService, useValue: stubbedLoginService }]
      }).compileComponents();

      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      deMessage = fixture.debugElement.query(By.css('[data-login-message]'));
      elMessage = deMessage.nativeElement;
      fixture.detectChanges();
    });

    it('should display the logged in message', () => {
      expect(elMessage.textContent).toBe('You are not logged in.');
    });
  });
});
