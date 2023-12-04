import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Uf } from 'src/app/exports/enum/uf';
import { Contratante } from 'src/app/exports/interface/contratante';
import { Paginavel } from 'src/app/exports/interface/paginavel';
import { Response } from 'src/app/exports/interface/response';
import { BaseServiceService } from 'src/app/exports/service/base-service.service';
import { ContratanteService } from 'src/app/exports/service/contratante.service';
import { TelaBaseComponent } from 'src/app/exports/tela/tela-base/tela-base.component';
import { createNumberMask } from 'text-mask-addons';
import { TabViewModule } from 'primeng/tabview';
import { ViaCepService } from 'src/app/exports/interface/viacep-service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro-contratante.component.html',
  styleUrls: ['./cadastro-contratante.component.css'],
})
export class CadastroComponent extends TelaBaseComponent {
  contratante!: Contratante;
  ufs: any[];
  ufSelecionada: Uf = Uf.AC;

  constructor(
    private viaCepService: ViaCepService,
   private rota:Router,
    override service: ContratanteService,
    protected override route: ActivatedRoute
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
  cpf = cpf.replace(/[^\d]/g, '');
  if (cpf.length !== 11) return false;

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;

  if ((resto === 10) || (resto === 11)) {
      resto = 0;
  }

  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;

  for (let i = 1; i <= 10; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;

  if ((resto === 10) || (resto === 11)) {
      resto = 0;
  }

  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}
cpf: string = '';
cpfInvalido: boolean = false;

validarECorrigirCPF() {
  if (this.validarCPF(this.cpf)) {
    this.cpfInvalido = false;
  } else {
    this.cpfInvalido = true;
  }
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
  this.contratante.usuario.prestador = false;
  this.contratante.usuario.username = this.contratante.contato.email;
  this.contratante.foto = this.service.base64String;
  this.service.cadastrarContratante(this.contratante).then(x=>{
    this.service.toastSuccess(["Usuário Cadastrado!"]);
    this.rota.navigate([""])
  })
}
onCepChange() {
  console.log("to aqui mano")
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
