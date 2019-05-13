import { Injectable } from '@angular/core';

@Injectable()
export class LogInService {
  isLoggedIn: boolean;

  getUserName() {
    return 'Darth Vader';
  }
}
