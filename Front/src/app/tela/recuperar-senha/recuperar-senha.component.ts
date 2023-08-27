import { Component } from '@angular/core';
import { TelaBaseComponent } from 'src/app/exports/tela/tela-base/tela-base.component';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent extends TelaBaseComponent{
  email: string = '';

  recuperarSenha() {
    // Adicione aqui a lógica para enviar o email de recuperação de senha
  } 
}
