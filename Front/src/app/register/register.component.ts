import { ServiceService } from './../exports/service/service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';

import { dadosPf } from '../exports/model/dadosPf';
import { endereco } from '../exports/model/endereco';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  linearMode = false;
  form: FormGroup;
  formreg2: FormGroup;
  formpass: FormGroup;

  dadosPf: dadosPf = {
    nome: '',
    cpf: '',
    endereco: {
      cep: '',
      logradouro: '',
      numero: '',
      quadra: '',
      lote: '',
      cidade: '',
      uf: '',
      complemento: '',
      bairro: '',
    },
    contato: {
      email: '',
      telefone: '',
    },
    usuario: {
      username: '',
      password: '',
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private regCliente: HttpClient,
    private toastrService: NbToastrService,
    private http: HttpClient
  ) {
    this.form = this.formBuilder.group({
      nomecompleto: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],

    });
    this.formreg2 = this.formBuilder.group({
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['',],
      quadra: ['',],
      lote: [''],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
      Complemento: ['',],
      bairro:['',Validators.required]
    });
    this.formpass =this.formBuilder.group({
      password: ['',Validators.required]

    })

    this.cadastrar();
  }
  verificarNome(value: string) {
    if (!value) {
      return true;
    }

    const regex = /^[a-zA-Z]{1,}\s+[a-zA-Z]{1,}/;
    return !regex.test(value);
  }

  preencheu(value: string) {
    if (!value) {
      return true;
    }
    return value.length == 0;
  }

  validaemail(value: string) {
    if (!value) {
      return true;
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return !emailRegex.test(value);
  }

  previewImage(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.getElementById('preview-img') as HTMLImageElement;
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  verificarCPFPreenchido() {
    const cpf = this.dadosPf.cpf;
    if (cpf.length === 11) {
      this.checacpf();
    }
  }
  verificarCEPPreenchido() {
    const cep = this.dadosPf.endereco.cep;
    if (cep.length === 8) {
      this.buscarCep(this.dadosPf.endereco.cep);
    }
  }
  cpfValido: boolean = false;

  checacpf() {
    this.cpfValido = ServiceService.cpf(this.dadosPf.cpf);
    if (!this.cpfValido) {
      this.toastrService.show('CPF inválido', 'ERRO', {
        status: 'danger',
        duration: 5000,
      });
      return;
    }
  }

  cadastrar() {
    this.dadosPf.usuario.username = this.dadosPf.contato.email;
    this.regCliente
      .post('http://localhost:8080/contratante', this.dadosPf)
      .subscribe((response: any) => {
        console.log(response);
      });
    console.log('funfo');
  }

  buscarCep(cep: string) {
    if (cep && cep.length === 8) {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      this.http
        .get(`https://viacep.com.br/ws/${cep}/json/`, { headers })
        .subscribe(
          (response: any) => {
            if (response.erro) {
              this.toastrService.show('CEP inválido', 'ERRO', {
                status: 'danger',
                duration: 5000,
              });
            } else {
              this.formreg2.patchValue({
                logradouro: response.logradouro,
                cidade: response.localidade,
                uf: response.uf,
                bairro: response.bairro,
              });
              console.log(response);
            }
          },
          () => {
            this.toastrService.show('Erro ao buscar CEP', 'ERRO');
          }
        );
    }
  }
}
