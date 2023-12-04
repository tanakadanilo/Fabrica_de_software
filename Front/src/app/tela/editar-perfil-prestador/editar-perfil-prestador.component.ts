import { ViaCepService } from './../../exports/interface/viacep-service';
import { Prestador } from 'src/app/exports/interface/prestador';
import { Component } from '@angular/core';
import { Uf } from 'src/app/exports/enum/uf';
import { TelaBaseComponent } from 'src/app/exports/tela/tela-base/tela-base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestadorService } from 'src/app/exports/service/prestador.service';
import { ValidacoesService } from 'src/app/exports/service/validacoes.service';

@Component({
  selector: 'app-editar-perfil-prestador',
  templateUrl: './editar-perfil-prestador.component.html',
  styleUrls: ['./editar-perfil-prestador.component.css']
})
export class EditarPerfilPrestadorComponent extends TelaBaseComponent{

  prestador!: Prestador;
  ufs!: any[];
  ufSelecionada: Uf = Uf.AM;
  cities: any;
  prestadorCep = {
    endereco: {
      uf: '',
      cep: '',
      numero: '',
      cidade: '',
      bairro: '',
      complemento: '',
    },
  };

  constructor(
    private viaCepService: ViaCepService,
    private rota:Router,
    override service: PrestadorService,
    protected override route: ActivatedRoute,
    private valida : ValidacoesService,
  ) {
    super(service, route);
  }

  override ngOnInit(): void {
    this.ufs = Object.values(Uf);
    this.prestador = this.service.getPrestadorVazio();
    this.service.getPrestadorVazio();
  }

  cadastrar(){
    if(!this.service.base64String){
      this.service.toastError(["Insira a imagem de perfil!"]);
      return;
    }
    if (!this.validarCPF(this.prestador.cpfCnpj)) {
      this.service.toastError(["CPF inválido!"]);
      return;
    }
    if (this.camposObrigatoriosPreenchidos()) {
          this.prestador.usuario.prestador = true;
          this.prestador.usuario.username = this.prestador.contato.email;
          this.prestador.foto = this.service.base64String;
          this.service.cadastrarPrestador(this.prestador).then(x=>{
            this.service.toastSuccess(["Usuário Cadastrado!"]);
            this.rota.navigate([""])
          })
    } else {
      this.toastError(['Por favor, preencha todos os campos corretamente antes de cadastrar.']);
    }
  }

  camposObrigatoriosPreenchidos(): boolean {
    return (
      this.prestador.cpfCnpj !== null && this.validarCPF(this.prestador.cpfCnpj) &&
      this.prestador.nome !== null && this.prestador.nome.trim() !== '' &&
      this.prestador.contato.telefone !== null && this.prestador.contato.telefone.trim() !== '' &&
      this.prestador.endereco.cep !== null && this.prestador.endereco.cep.trim() !== '' &&
      this.prestador.endereco.uf !== null && this.prestador.endereco.uf.trim() !== '' &&
      this.prestador.endereco.cidade !== null && this.prestador.endereco.cidade.trim() !== '' &&
      this.prestador.endereco.bairro !== null && this.prestador.endereco.bairro.trim() !== '' &&
      this.prestador.endereco.numero !== null && this.prestador.endereco.numero.trim() !== '' &&
      this.prestador.endereco.complemento !== null && this.prestador.endereco.complemento.trim() !== '' &&
      this.prestador.usuario.username !== null && this.prestador.usuario.username.trim() !== '' &&
      this.prestador.usuario.password !== null && this.prestador.usuario.password.trim() !== ''
    );
  }

    onCepChange() {
    const cepSemMascara = this.prestador.endereco.cep.replace(/\D/g, '');

      if (cepSemMascara.length === 8) {
        this.viaCepService.getAddressByCep(cepSemMascara).subscribe(
          (data) => {
            this.prestador.endereco.uf = data.uf;
            this.prestador.endereco.cidade = data.localidade;
            this.prestador.endereco.bairro = data.bairro;
            this.prestador.endereco.complemento = data.complemento;
          },
          (error) => {
            this.service.toastError(["Cep Inválido"])
          }
        );
      }

}

    validarCPF(cpf: string) {
      return this.valida.validarCPF(cpf);
      }
}
