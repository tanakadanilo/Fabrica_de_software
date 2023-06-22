import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ServiceService } from '../exports/service/service.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: any = {
    login: '',
    password: '',
  };

  token!: string;

  constructor(private http: HttpClient, private service: ServiceService) {}
  teste() {
    this.http.get(`http://localhost:8080/login`).subscribe((r: any) => {
      console.log(r);
    });
  }

  login(_event: Event) {
    // seu código de login aqui

    this.http
      .get(
        `http://localhost:8080/login/login?username=${this.user.login}&password=${this.user.password}`
      )
      .subscribe((r: any) => {
        console.log(r);
        
        if (r.erros.length > 0) {
          this.service.toastError(r.erros[0]);
          return;
        }
        this.token = r.data;
        localStorage.setItem('token', this.token);
        this.service.toastSucess("login com sucesse!")
        window.location.href = 'http://localhost:4200/';
      });
  }
}
