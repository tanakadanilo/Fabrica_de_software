import { ViaCepService } from './../../exports/interface/viacep-service';
import { Prestador } from 'src/app/exports/interface/prestador';
import { Component } from '@angular/core';
import { Uf } from 'src/app/exports/enum/uf';
import { TelaBaseComponent } from 'src/app/exports/tela/tela-base/tela-base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestadorService } from 'src/app/exports/service/prestador.service';
import { ValidacoesService } from 'src/app/exports/service/validacoes.service';
import { ServicosService } from 'src/app/exports/service/servicos.service';
import { ServicoPrestado } from 'src/app/exports/interface/servico-prestado';
import { BaseServiceService } from 'src/app/exports/service/base-service.service';
import { AuthenticationServiceService } from 'src/app/exports/service/authentication-service.service';

@Component({
  selector: 'app-editar-perfil-prestador',
  templateUrl: './editar-perfil-prestador.component.html',
  styleUrls: ['./editar-perfil-prestador.component.css']
})
export class EditarPerfilPrestadorComponent extends TelaBaseComponent {

  prestador!: Prestador;
  categorias!: string[];
  novoServico: ServicoPrestado = { valor: 0.0, servico: { area: "", descricao: "", nome: "" } };

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
  visible: boolean= false;

  constructor(
    private viaCepService: ViaCepService,
    private rota: Router,
    override service: PrestadorService,
    protected override route: ActivatedRoute,
    private valida : ValidacoesService,
    private servicoService: ServicosService,
    private authService : AuthenticationServiceService,
  ) {
    super(service, route);
  }

  override ngOnInit(): void {
    this.ufs = Object.values(Uf);
    this.prestador = this.authService.getPessoa()! as Prestador;
    this.servicoService.getCategorias().then(categorias => {
      this.categorias = categorias.data.content
    })
  }

  cadastrar(){
    if(!this.service.base64String){
      this.service.toastError(["Insira a imagem de perfil!"]);
      return;
    }
    if (!this.valida.validarCPF(this.prestador.cpfCnpj)) {
      this.service.toastError(["CPF inválido!"]);
      return;
    }
    if (this.camposObrigatoriosPreenchidos()) {
          this.prestador.usuario.prestador = true;
          this.prestador.usuario.username = this.prestador.contato.email;
          this.prestador.foto = this.service.base64String;
          this.service.alterarPrestador(this.prestador).then(x=>{
            this.service.toastSuccess(["Usuário Editado!"]);
            this.authService.pessoa = x.data;
            this.rota.navigate([""])
          })
    } else {
      this.toastError(['Por favor, preencha todos os campos corretamente antes de atualizar.']);
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
            if (data.erro) {
              this.service.toastError(['Cep Inválido']);
              return
            }
            this.prestador.endereco.uf = data.uf;
            this.prestador.endereco.cidade = data.localidade;
            this.prestador.endereco.bairro = data.bairro;
            this.prestador.endereco.complemento = data.complemento;
          },
          (error) => {
          }
        );
      }

}
  
showDialog() {
  this.visible = true;
}

adicionarServico(){
  this.prestador.servicosPrestados.push(this.novoServico)
}

    validarCPF(cpf: string) {
      return this.valida.validarCPF(cpf);
      }
}
