import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../services/servico.service';
import { Servico } from '../model/servico';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  categorias!: any[];
  categoriaSelecionada = '';
  cardList!: Servico[];
  card: any;

  constructor(private servicoService: ServicoService) {}

  async ngOnInit() {
    await Promise.all([this.carregarServicos(), this.carregarCategorias()]);
  }

  async carregarCategorias() {
    this.servicoService
      .get('http://localhost:8080/servico/categorias')
      .then((categorias: any) => {
        this.categorias = categorias.data.content;
      });
  }
  async carregarServicos() {
    await this.servicoService
      .getServicos(this.categoriaSelecionada)
      .then((servicos: any) => {
        this.cardList = servicos.data.content;
      });
  }
}
