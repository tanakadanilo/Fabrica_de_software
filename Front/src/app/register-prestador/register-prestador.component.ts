import { dadosPj } from './../exports/model/dadosPj';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-prestador',
  templateUrl: './register-prestador.component.html',
  styleUrls: ['./register-prestador.component.css'],
})
export class RegisterPrestadorComponent implements OnInit {
  linearMode = false;
  form: FormGroup;
  formreg2: FormGroup;
  selectedItemNgModel: any;
  selecionado: any;
  categoria: any[] = [];
  itens: any;
  infoprof: FormGroup;

  dadosPj: dadosPj = {
    nome: '',
    cpf: '',
    especializacao: '',
    urlImagem: '',
    descricaoAdicional: '',
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
    disponibilidades: [],
    listadeservico: [],
  };

  ngOnInit() {
    this.obterItensDoBackend();
  }

  selectedCells: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private regP: HttpClient,
    private http: HttpClient
  ) {
    this.form = this.formBuilder.group({
      nomecompleto: ['', Validators.required],
      cnpj: ['', Validators.required],
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
    this.infoprof = this.formBuilder.group({
      servico: ['', Validators.required],
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

  obterItensDoBackend() {
    this.http.get<any[]>('http://localhost:8080/servico/categorias').subscribe({
      next: (response: any) => {
        this.itens = response.data;
        console.log(this.itens);
      },
      error: (error) => {
        console.error('Erro ao obter itens do backend', error);
      },
    });
  }

  cadastrar() {
    this.regP
      .post('http://localhost:8080/prestador', this.dadosPj)
      .subscribe((response: any) => {
        console.log(response);
      });
    console.log('funfo');
  }

  toggleCellSelection(cell: string) {
    const index = this.selectedCells.indexOf(cell);

    if (index > -1) {
      this.selectedCells.splice(index, 1);
    } else {
      this.selectedCells.push(cell);
    }
  }

  isCellSelected(cell: string) {
    return this.selectedCells.includes(cell);
  }

  saveTable() {
    console.log(this.selectedCells);
  }

  servico: string = '';

  adicionarServico() {
    if (this.servico) {
      this.dadosPj.listadeservico.push(this.servico);
      this.servico = '';
      console.log(this.dadosPj.listadeservico);
    }
  }

  removerServico(index: number) {
    this.dadosPj.listadeservico.splice(index, 1);
  }
}
