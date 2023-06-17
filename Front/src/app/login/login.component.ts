import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: any = {
    'login': "",
    'password': ""
  }

  token!: string;

  constructor(private http: HttpClient) {

  }
  teste() {
    this.http.get(`http://localhost:8080/login`).subscribe((r: any) => {
      console.log(r);


    })
  }

  login(_event: Event) {
    // seu código de login aqui

    this.http.get(`http://localhost:8080/login/login?username=${this.user.login}&password=${this.user.password}`).subscribe((r: any) => {
      this.token = r.data;
      localStorage.setItem('token', this.token);
      console.log(localStorage.getItem('token'));

    })
  }
}
