import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Uf } from 'src/app/exports/enum/uf';
import { Contratante } from 'src/app/exports/interface/contratante';
import { ContratanteService } from 'src/app/exports/service/contratante.service';
import { TelaBaseComponent } from 'src/app/exports/tela/tela-base/tela-base.component';
import { createNumberMask } from 'text-mask-addons';
import { ValidacoesService } from 'src/app/exports/service/validacoes.service';
import { NgModel } from '@angular/forms';
import { ViaCepService } from 'src/app/exports/interface/viacep-service';

@Component({
  selector: 'app-editar-perfil-contratante',
  templateUrl: './editar-perfil-contratante.component.html',
  styleUrls: ['./editar-perfil-contratante.component.css']
})
export class EditarPerfilContratanteComponent  extends TelaBaseComponent {
  contratante!: Contratante;
  ufs: any[];
  ufSelecionada: Uf = Uf.AC;
  
  constructor(
    private rota:Router,
    override service: ContratanteService,
    protected override route: ActivatedRoute,
    private valida : ValidacoesService,
    private viaCepService: ViaCepService,
  ) {
    super(service, route);
    this.ufs = Object.values(Uf);
    this.contratante = service.getContratanteVazio();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.contratante.foto = file;
  }
  
  validarCPF(cpf : string) {
    return this.valida.validarCPF(this.contratante.cpfCnpj)
  }
  cpfMask = createNumberMask({
    prefix: '',
    includeThousandsSeparator: false,
    allowDecimal: false,
    requireDecimal: false,
  });
  
  cadastrar(){
    if(!this.service.base64String){
      this.service.toastError(["Insira a imagem de perfil!"]);
      return;
    }
    if (!this.validarCPF(this.contratante.cpfCnpj)) {
      this.service.toastError(["CPF inválido!"]);
      return;
    }
    if (this.camposObrigatoriosPreenchidos()) {
          this.contratante.usuario.prestador = true;
          this.contratante.usuario.username = this.contratante.contato.email;
          this.contratante.foto = this.service.base64String;
          this.service.cadastrarContratante(this.contratante).then(x=>{
            this.service.toastSuccess(["Usuário Cadastrado!"]);
            this.rota.navigate([""])
          })
    } else {
      this.toastError(['Por favor, preencha todos os campos corretamente antes de cadastrar.']);
    }
  }

  camposObrigatoriosPreenchidos(): boolean {
    return (
      this.contratante.cpfCnpj !== null && this.validarCPF(this.contratante.cpfCnpj) &&
      this.contratante.nome !== null && this.contratante.nome.trim() !== '' &&
      this.contratante.contato.telefone !== null && this.contratante.contato.telefone.trim() !== '' &&
      this.contratante.endereco.cep !== null && this.contratante.endereco.cep.trim() !== '' &&
      this.contratante.endereco.uf !== null && this.contratante.endereco.uf.trim() !== '' &&
      this.contratante.endereco.cidade !== null && this.contratante.endereco.cidade.trim() !== '' &&
      this.contratante.endereco.bairro !== null && this.contratante.endereco.bairro.trim() !== '' &&
      this.contratante.endereco.numero !== null && this.contratante.endereco.numero.trim() !== '' &&
      this.contratante.endereco.complemento !== null && this.contratante.endereco.complemento.trim() !== '' &&
      this.contratante.usuario.username !== null && this.contratante.usuario.username.trim() !== '' &&
      this.contratante.usuario.password !== null && this.contratante.usuario.password.trim() !== ''
    );
  }
  
  cpfCnpjInput!: NgModel;

  onCepChange() {
    const cepSemMascara = this.contratante.endereco.cep.replace(/\D/g, '');

      if (cepSemMascara.length === 8) {
        this.viaCepService.getAddressByCep(cepSemMascara).subscribe(
          (data) => {
            this.contratante.endereco.uf = data.uf;
            this.contratante.endereco.cidade = data.localidade;
            this.contratante.endereco.bairro = data.bairro;
            this.contratante.endereco.complemento = data.complemento;
          },
          (error) => {
            this.service.toastError(["Cep Inválido"])
          }
        );
      }

}
}
