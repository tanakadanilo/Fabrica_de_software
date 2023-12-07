import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Contratante } from 'src/app/model/contratante';
import { Uf } from 'src/app/enum/uf';
import { ContratanteService } from 'src/app/services/contratante.service';

@Component({
  selector: 'app-modal-cadastro',
  templateUrl: './modal-cadastro.component.html',
  styleUrls: ['./modal-cadastro.component.scss'],
})
export class ModalCadastroComponent implements OnInit {
  confirmacaoSenha: string = '';
  contratante: Contratante = {
    nome: '',
    contato: {
      contato: '',
      email: '',
      telefone: '',
    },
    cpf: '',
    endereco: {
      cep: '',
      logradouro: '',
      numero: '',
      cidade: '',
      quadra: '',
      lote: '',
      uf: Uf.AC,
      bairro: '',
      complemento: '',
    },
    usuario: {
      login: '',
      password: '',
      prestador: false,
      username: '',
    },
  };
  ufs: any;
  UrlImagem = '';

  constructor(
    private service: UsuarioService,
    private contratanteService: ContratanteService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.service.getUsuarios().then((usuarios: any) => {
      console.log(usuarios);
    });
  }

  cancelar() {
    this.modalController.dismiss();
  }

  validarContratante(contratante: Contratante): string[] {
    let listaErros: string[] = [];

    if (!contratante.cpf) {
      listaErros.push('Informe o CPF!');
    }
    if (!contratante.nome) {
      listaErros.push('Informe o nome!');
    }
    if (!contratante.contato.email) {
      listaErros.push('Informe o email!');
    }
    if (!contratante.contato.telefone) {
      listaErros.push('Informe o telefone!');
    }
    if (!contratante.endereco.cep) {
      listaErros.push('Informe o cep!');
    }
    if (!contratante.endereco.cidade) {
      listaErros.push('Informe a cidade!');
    }
    if (!contratante.endereco.bairro) {
      listaErros.push('Informe o bairro!');
    }
    if (!contratante.endereco.uf) {
      listaErros.push('Informe o estado!');
    }
    if (!contratante.usuario!.password) {
      listaErros.push('Informe a senha de acesso!');
    }

    return listaErros;
  }
  cadastrar() {
    console.log(this.contratante);
    
    if (this.contratante.usuario?.password !== this.confirmacaoSenha) {
      this.service.toastError(['As senhas não coincidem!']);
      return;
    }
    this.contratante.usuario.username = this.contratante.contato.email!;
    let listaErros: string[] = this.validarContratante(this.contratante);
    if (listaErros.length != 0) {
      this.service.toastError(listaErros);
      return;
    }

    this.contratanteService.criar(this.contratante).then((contratante) => {
      this.contratante = contratante.data;
      console.log(this.contratante);
    });
  }
}
