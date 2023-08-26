import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseServiceService } from 'src/app/exports/service/base-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private service: BaseServiceService,private router: Router) {}
  cadastrar(){
    this.router.navigate(["/cadastrar"]);
  }
  cadastrarPrestador(){
    this.router.navigate(["/cadastrarp"]);
  }
  recuperarSenha() {
    this.router.navigate(["/recuperar"]);
  }
  entrar() {
    this.service.toast('senha errada');

    this.service
      .get(
        `http://localhost:8080/login/login?username=${this.username}&password=${this.password}`
      )
      .subscribe({
        next: (a: any) => {
          
          if (a.erros?.length > 0) {
            console.log('senha errada');
            
            this.service.toast('senha errada');

          } else {
            console.log(a.data);
            localStorage.setItem('token', a.data);
            this.service.setUser(a.data);
          }
        },
        error: (err) => {
          this.service.toast('senha errada');
          console.log(err);
        },
      });
  }

  toastError(mesage: string) {}
}
