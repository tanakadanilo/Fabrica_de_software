import { ViaCepService } from './../../exports/interface/viacep-service';
import { Prestador } from 'src/app/exports/interface/prestador';
import { Component } from '@angular/core';
import { BaseServiceService } from 'src/app/exports/service/base-service.service';
import { Uf } from 'src/app/exports/enum/uf';
import { TelaBaseComponent } from 'src/app/exports/tela/tela-base/tela-base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestadorService } from 'src/app/exports/service/prestador.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicosService } from 'src/app/exports/service/servicos.service';
import { ServicoPrestado } from 'src/app/exports/interface/servico-prestado';

@Component({
  selector: 'app-cadastro-prestador',
  templateUrl: './cadastro-prestador.component.html',
  styleUrls: ['./cadastro-prestador.component.css'],
})
export class CadastroPrestadorComponent extends TelaBaseComponent {
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

  constructor(
    private viaCepService: ViaCepService,
    private rota: Router,
    override service: PrestadorService,
    protected override route: ActivatedRoute,
    private servicoService: ServicosService
  ) {
    super(service, route);
  }

  override ngOnInit(): void {
    this.ufs = Object.values(Uf);
    this.prestador = this.service.getPrestadorVazio();
    this.service.getPrestadorVazio();
    this.servicoService.getCategorias().then(categorias => {
      this.categorias = categorias.data.content
    })
  }

  cadastrar() {
    if (!this.service.base64String) {
      this.service.toastError(['Informe a imagem de perfil!']);
      return;
    }
    this.prestador.usuario.prestador = true;
    this.prestador.foto = this.service.base64String;
    this.service.cadastrarPrestador(this.prestador).then((x) => {
      this.service.toastSuccess(['Usuário Cadastrado!']);
      this.rota.navigate(['']);
    });
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
        (error) => { }
      );
    }
  }
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  adicionarServico(){
    this.prestador.servicosPrestados.push(this.novoServico)
  }
}
