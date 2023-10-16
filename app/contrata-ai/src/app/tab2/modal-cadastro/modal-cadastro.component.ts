import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modal-cadastro',
  templateUrl: './modal-cadastro.component.html',
  styleUrls: ['./modal-cadastro.component.scss'],
})
export class ModalCadastroComponent implements OnInit {
  contratante: any = {
    nome: 'Unknown User',
    contato: {
      contato: 'Unknown',
      email: 'Unknown@Unknown.com',
      telefone: 'Unknown',
    },
    cpf: 'Unknown',
    endereco: {
      cep: 'Unknown',
      logradouro: 'Unknown',
      numero: 'Unknown',
      cidade: 'Unknown',
      quadra: 'Unknown',
      lote: 'Unknown',
      uf: 'Unknown',
      bairro: 'Unknown',
      complemento: 'Unknown',
    },
    foto: 'Unknown.Unknown',
    usuario: 'Unknown User',
  };
  ufs: any;
  UrlImagem = '';

  constructor(private service: UsuarioService) {}

  ngOnInit() {
    this.service.getUsuarios().then((usuarios: any)=>{
      console.log(usuarios);      
    })
  }

  cancelar() {}
  cadastrar() {}
}
