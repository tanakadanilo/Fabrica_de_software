import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  contratante: any = {
    nome: 'Unknown User',
    contato: {
      contato: 'Unknown',
      email: 'Unknown@Unknown.com',
      telefone: 'Unknown',
    },
    cpf: 'Unknown',
    endereco: {
      cep: 'Unknown',
      logradouro: 'Unknown',
      numero: 'Unknown',
      cidade: 'Unknown',
      quadra: 'Unknown',
      lote: 'Unknown',
      uf: 'Unknown',
      bairro: 'Unknown',
      complemento: 'Unknown',
    },
    foto: 'Unknown.Unknown',
    usuario: 'Unknown User',
  };
  ufs: any;
  UrlImagem = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:8080/contratante').subscribe((a: any) => {
      this.contratante = a.data.content[1];
    });
  }
}
