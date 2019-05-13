import { Component, OnInit } from '@angular/core';
import { LogInService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;

  constructor(private service: LogInService) { }

  ngOnInit() {
    if (this.service.isLoggedIn) {
      this.message = `Welcome, ${this.service.getUserName()}`;
    } else {
      this.message = 'You are not logged in.';
    }
  }

}
