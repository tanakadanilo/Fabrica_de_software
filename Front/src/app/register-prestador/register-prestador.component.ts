import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DiasSemana } from '../exports/model/dias-semana';
import { Horario } from '../exports/model/horario';
import { Disponibilidade } from '../exports/model/disponibilidade';
import { dadosPj } from '../exports/model/dadosPj';
// import { documentoValidator } from '../exports/model/documentoValidator';
@Component({
  selector: 'app-register-prestador',
  templateUrl: './register-prestador.component.html',
  styleUrls: ['./register-prestador.component.css'],
})
export class RegisterPrestadorComponent implements OnInit {
  linearMode = true;
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
    const validator = new DocumentoValidator();

    // const cpfValido = documentoValidator.validarCPF(this.dadosPj.cpf);
    // console.log('CPF válido:', cpfValido);

    // const cnpjValido = documentoValidator.validarCNPJ(this.dadosPj.cpf);
    // console.log('CNPJ válido:', cnpjValido)

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
  verificaLetras(nome: string) {
    const apenasLetras = /^[A-za-z]+$/;
    return !nome.match(apenasLetras);
  }


  valida(value: string) {
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
      disponibilidade: ['', Validators.required],
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
    console.log(this.selecionado2);

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
