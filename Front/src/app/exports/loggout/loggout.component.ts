import { Component } from '@angular/core';

@Component({
  selector: 'app-loggout',
  templateUrl: './loggout.component.html',
  styleUrls: ['./loggout.component.css'],
})
export class LoggoutComponent {
  constructor() {
    localStorage.removeItem('token');
    window.location.href = 'http://localhost:4200/';
  }
}
