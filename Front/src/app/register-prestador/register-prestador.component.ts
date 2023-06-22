import { dadosPj } from './../exports/model/dadosPj';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DiasSemana } from '../exports/model/dias-semana';
import { Horario } from '../exports/model/horario';
import { Disponibilidade } from '../exports/model/disponibilidade';

import { Buffer } from 'buffer';

import { ReactiveFormsModule } from '@angular/forms'; // Import the
// import { documentoValidator } from '../exports/model/documentoValidator';
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
  selecionado2: boolean = false;

  disponibilidade: boolean[][] = [
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
  ];

  dadosPj: dadosPj = {
    nome: '',
    cpf: '',
    especializacao: '',
    foto: '',
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
    usuario: {

    }
  };

  ngOnInit() {
    this.obterItensDoBackend();
  }

  preencheu(value: string) {
    if (!value) {
      return true;
    }
    return value.length == 0;
  }

  verificarNome(value: string) {
    if (!value) {
      return true;
    }

    const regex = /^[a-zA-Z]{1,}\s+[a-zA-Z]{1,}/;
    return !regex.test(value);
  }


  validaemail(value: string) {
    if (!value) {
      return true;
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return !emailRegex.test(value);
  }
  selectedCells: string[] = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.form = this.formBuilder.group({
      nomecompleto: ['', Validators.required],
      cpf: ['', Validators.required, Validators.pattern(/^\d{11}$/)],
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
      complemento: ['', Validators.required],
    });
    this.infoprof = this.formBuilder.group({
      servico: ['', Validators.required],
      inputservico: [''],
      selecionado: ['', Validators.required],
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
        this.dadosPj.foto! = e.target!.result as string;
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
    console.log(this.dadosPj);
    this.dadosPj.usuario.username = this.dadosPj.contato.email
    this.preenchedisponibilidade();
    this.http
      .post('http://localhost:8080/prestador', this.dadosPj)
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  toggleCellSelection(cell: string) {
    const index = this.selectedCells.indexOf(cell);

    if (index > -1) {
      this.selectedCells.splice(index, 1);
    } else {
      this.selectedCells.push(cell);
    }
  }
  selecionar(i: number, j: number) {
    this.disponibilidade[i][j] = !this.disponibilidade[i][j];
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

  adicionarDisponibilidade(disponibilidade: string) {
    // this.disponibilidade.push(disponibilidade);
  }

  removerDisponibilidade(index: number) {
    this.disponibilidade.splice(index, 1);
  }

  preenchedisponibilidade() {
    console.log(this.disponibilidade);
    let disponibilidade: Disponibilidade = {
      diaDaSemana: DiasSemana.SEGUNDA,
      horario: Horario.MANHA,
    };

    if (this.disponibilidade[0][0]) {
      disponibilidade = Object.assign({}, disponibilidade);
      disponibilidade.diaDaSemana = DiasSemana.SEGUNDA;
      disponibilidade.horario = Horario.MANHA;
      this.dadosPj.disponibilidades.push(disponibilidade);
    }
    if (this.disponibilidade[0][1]) {
      disponibilidade = Object.assign({}, disponibilidade);

      disponibilidade.diaDaSemana = DiasSemana.TERCA;
      disponibilidade.horario = Horario.MANHA;
      this.dadosPj.disponibilidades.push(disponibilidade);
    }
    if (this.disponibilidade[0][2]) {
      disponibilidade = Object.assign({}, disponibilidade);

      disponibilidade.diaDaSemana = DiasSemana.QUARTA;
      disponibilidade.horario = Horario.MANHA;
      this.dadosPj.disponibilidades.push(disponibilidade);
    }
    if (this.disponibilidade[0][3]) {
      disponibilidade = Object.assign({}, disponibilidade);

      disponibilidade.diaDaSemana = DiasSemana.QUINTA;
      disponibilidade.horario = Horario.MANHA;
      this.dadosPj.disponibilidades.push(disponibilidade);
    }
    if (this.disponibilidade[0][4]) {
      disponibilidade = Object.assign({}, disponibilidade);

      disponibilidade.diaDaSemana = DiasSemana.SEXTA;
      disponibilidade.horario = Horario.MANHA;
      this.dadosPj.disponibilidades.push(disponibilidade);
    }
    if (this.disponibilidade[0][5]) {
      disponibilidade = Object.assign({}, disponibilidade);

      disponibilidade.diaDaSemana = DiasSemana.SABADO;
      disponibilidade.horario = Horario.MANHA;
      this.dadosPj.disponibilidades.push(disponibilidade);
    }
    if (this.disponibilidade[0][6]) {
      disponibilidade = Object.assign({}, disponibilidade);

      disponibilidade.diaDaSemana = DiasSemana.DOMINGO;
      disponibilidade.horario = Horario.MANHA;
      this.dadosPj.disponibilidades.push(disponibilidade);
    }
    if (this.disponibilidade[1][0]) {
      disponibilidade = Object.assign({}, disponibilidade);

      disponibilidade.diaDaSemana = DiasSemana.SEGUNDA;
      disponibilidade.horario = Horario.TARDE;
      this.dadosPj.disponibilidades.push(disponibilidade);
    }
    if (this.disponibilidade[1][1]) {
      disponibilidade = Object.assign({}, disponibilidade);

      disponibilidade.diaDaSemana = DiasSemana.TERCA;
      disponibilidade.horario = Horario.TARDE;
      this.dadosPj.disponibilidades.push(disponibilidade);
    }
    if (this.disponibilidade[1][2]) {
      disponibilidade = Object.assign({}, disponibilidade);

      disponibilidade.diaDaSemana = DiasSemana.QUARTA;
      disponibilidade.horario = Horario.TARDE;
      this.dadosPj.disponibilidades.push(disponibilidade);
    }
    if (this.disponibilidade[1][3]) {
      disponibilidade = Object.assign({}, disponibilidade);

      disponibilidade.diaDaSemana = DiasSemana.QUINTA;
      disponibilidade.horario = Horario.TARDE;
      this.dadosPj.disponibilidades.push(disponibilidade);
    }
    if (this.disponibilidade[1][4]) {
      disponibilidade = Object.assign({}, disponibilidade);

      disponibilidade.diaDaSemana = DiasSemana.SEXTA;
      disponibilidade.horario = Horario.TARDE;
      this.dadosPj.disponibilidades.push(disponibilidade);
    }
    if (this.disponibilidade[1][5]) {
      disponibilidade = Object.assign({}, disponibilidade);

      disponibilidade.diaDaSemana = DiasSemana.SABADO;
      disponibilidade.horario = Horario.TARDE;
      this.dadosPj.disponibilidades.push(disponibilidade);
    }
    if (this.disponibilidade[1][6]) {
      disponibilidade = Object.assign({}, disponibilidade);

      disponibilidade.diaDaSemana = DiasSemana.DOMINGO;
      disponibilidade.horario = Horario.NOITE;
      this.dadosPj.disponibilidades.push(disponibilidade);
    }
    if (this.disponibilidade[2][0]) {
      disponibilidade = Object.assign({}, disponibilidade);

      disponibilidade.diaDaSemana = DiasSemana.SEGUNDA;
      disponibilidade.horario = Horario.NOITE;
      this.dadosPj.disponibilidades.push(disponibilidade);
    }
    if (this.disponibilidade[2][1]) {
      disponibilidade = Object.assign({}, disponibilidade);

      disponibilidade.diaDaSemana = DiasSemana.TERCA;
      disponibilidade.horario = Horario.NOITE;
      this.dadosPj.disponibilidades.push(disponibilidade);
    }
    if (this.disponibilidade[2][2]) {
      disponibilidade = Object.assign({}, disponibilidade);

      disponibilidade.diaDaSemana = DiasSemana.QUARTA;
      disponibilidade.horario = Horario.NOITE;
      this.dadosPj.disponibilidades.push(disponibilidade);
    }
    if (this.disponibilidade[2][3]) {
      disponibilidade = Object.assign({}, disponibilidade);

      disponibilidade.diaDaSemana = DiasSemana.QUINTA;
      disponibilidade.horario = Horario.NOITE;
      this.dadosPj.disponibilidades.push(disponibilidade);
    }
    if (this.disponibilidade[2][4]) {
      disponibilidade = Object.assign({}, disponibilidade);

      disponibilidade.diaDaSemana = DiasSemana.SEXTA;
      disponibilidade.horario = Horario.NOITE;
      this.dadosPj.disponibilidades.push(disponibilidade);
    }
    if (this.disponibilidade[2][5]) {
      disponibilidade = Object.assign({}, disponibilidade);

      disponibilidade.diaDaSemana = DiasSemana.SABADO;
      disponibilidade.horario = Horario.NOITE;
      this.dadosPj.disponibilidades.push(disponibilidade);
    }
    if (this.disponibilidade[2][6]) {
      disponibilidade = Object.assign({}, disponibilidade);

      disponibilidade.diaDaSemana = DiasSemana.DOMINGO;
      disponibilidade.horario = Horario.NOITE;
      this.dadosPj.disponibilidades.push(disponibilidade);
    }
  }

  validateCPF(cpf: string): boolean {
    cpf = cpf.trim();

    if (
      cpf.length !== 11 ||
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999'
    ) {
      return false;
    }

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(10, 11))) {
      return false;
    }

    return true;
  }

  validateCNPJ(cnpj: string): boolean {
    cnpj = cnpj.trim();

    if (
      cnpj.length !== 14 ||
      cnpj === '00000000000000' ||
      cnpj === '11111111111111' ||
      cnpj === '22222222222222' ||
      cnpj === '33333333333333' ||
      cnpj === '44444444444444' ||
      cnpj === '55555555555555' ||
      cnpj === '66666666666666' ||
      cnpj === '77777777777777' ||
      cnpj === '88888888888888' ||
      cnpj === '99999999999999'
    ) {
      return false;
    }

    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    const digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (result !== parseInt(digits.charAt(0))) {
      return false;
    }

    size += 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (result !== parseInt(digits.charAt(1))) {
      return false;
    }

    return true;
  }



  buscarCep(cep: string) {
    if (cep && cep.length === 8) {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      this.http
        .get(`https://viacep.com.br/ws/${cep}/json/`, { headers })
        .subscribe((response: any) => {
          this.formreg2.patchValue({
            logradouro: response.logradouro,
            cidade: response.localidade,
            uf: response.uf,
          });
        });
    }
  }



}
