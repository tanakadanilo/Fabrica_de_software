import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    },
    contato: {
      email: '',
      telefone: '',
    },
    usuario:{
      username:'',
      password:''
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private regCliente: HttpClient
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
      numero: ['', Validators.required],
      quadra: ['', Validators.required],
      lote: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
      Complemento: ['', Validators.required],
    });

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

  cadastrar() {
    this.dadosPf.usuario.username = this.dadosPf.contato.email
    this.regCliente
      .post('http://localhost:8080/contratante', this.dadosPf)
      .subscribe((response: any) => {
        console.log(response);
      });
    console.log('funfo');
  }
}
