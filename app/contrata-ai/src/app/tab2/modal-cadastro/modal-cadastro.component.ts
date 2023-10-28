import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Uf } from 'src/app/enum/uf';
import { Contratante } from 'src/app/model/contratante';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modal-cadastro',
  templateUrl: './modal-cadastro.component.html',
  styleUrls: ['./modal-cadastro.component.scss'],
})
export class ModalCadastroComponent implements OnInit {
  contratante!: Contratante;
  ufs: any;
  UrlImagem = '';
  usuario!: Usuario;

  senhaConfirmacao: string = '';

  constructor(
    private modalController: ModalController,
    private service: UsuarioService
  ) {}

  ngOnInit() {
    this.contratante = this.service.getContratanteVazio();
    this.service.getUsuarios().then((usuarios: any) => {
      console.log(usuarios);
    });
    this.usuario = this.service.getUsuarioVazio();
  }

  cadastrar() {
    this.usuario.nome = this.contratante.nome;
    this.usuario.prestador = false;
    this.usuario.username = this.contratante.contato.email!;
    this.contratante.endereco.uf = this.obterSiglaEstadoPorNome(
      this.contratante.endereco.uf
    );
    this.service.criarUsuario(this.usuario).then((data) => {
      console.log('usuário criado com sucesso!', data);
      this.usuario = data.data;
      this.service.criarContratante(this.contratante).then((data) => {
        console.log(data);
        this.service.toastSuccess('Cadastrado com sucesso!');
      });
    });
  }
  login() {
    this.modalController.dismiss();
  }
  obterSiglaEstadoPorNome(nome: string): string {
    const estado = Object.entries(Uf).find(([_, value]) => value === nome);
    return estado ? estado[0] : '';
  }
}
