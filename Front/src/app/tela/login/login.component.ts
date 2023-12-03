import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseServiceService } from 'src/app/exports/service/base-service.service';
import { TelaBaseComponent } from 'src/app/exports/tela/tela-base/tela-base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends TelaBaseComponent {
  username: string = '';
  password: string = '';

  constructor(
    override service: BaseServiceService,
    protected override route: ActivatedRoute,
    private navigate : Router,
  ) {
    super(service, route);
  }
  cadastrar() {
    this.service.navigate('/cadastrar');
  }
  cadastrarPrestador() {
    this.service.navigate('/cadastrarp');
  }
  recuperarSenha() {
    this.service.navigate('/recuperar');
  }
  entrar() {
    this.service
      .get(
        `http://localhost:8080/login/login?username=${this.username}&password=${this.password}`
      )
      .subscribe({
        next: (a: any) => {
          if (a.erros?.length > 0) {
            this.toastError(a.erros);
          } else {
            localStorage.setItem('token', a.data);
            this.service.setUser(a.data);
            this.service.findByToken(a.data).subscribe( (variavel : any) => {
              this.service.contratante = variavel.data.pessoa;
            });;
            this.navigate.navigate(['']);
          }
        },
        error: (err) => {
          this.toastError(err);
        },
      });

  }
}
