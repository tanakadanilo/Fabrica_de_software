
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
   endereco : {
      cep : '',
      logradouro: '',
      numero: '',
      quadra: '',
      lote: '',
      cidade: '',
      uf: '',
      complemento: '',
    },
    contato: {
      email:'',
      telefone:'',
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
      Complemento: ['', Validators.required]
    });

    this.cadastrar();
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
     this.regCliente.post("http://localhost:8080/contratante",this.dadosPf).subscribe((response: any) =>{
      console.log(response);

     });
    console.log('funfo');

  }
}
