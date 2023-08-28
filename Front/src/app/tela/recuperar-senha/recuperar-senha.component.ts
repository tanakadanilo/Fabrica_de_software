import { Component } from '@angular/core';
import { TelaBaseComponent } from 'src/app/exports/tela/tela-base/tela-base.component';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css'],
})
export class RecuperarSenhaComponent extends TelaBaseComponent {
  email: string = '';

  recuperarSenha() {
    console.log('inicio envio email');

    this.service.enviarEmail(
      this.email,
      'Email de recuperação de senha',
      `Clique aqui para recuperar sua senha.
      Caso não tenha sido voce quem pediu a recuperação de senha, por favor ignore este email.
    `
    );
  }
}
