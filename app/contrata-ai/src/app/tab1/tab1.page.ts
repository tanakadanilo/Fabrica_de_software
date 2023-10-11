import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { PrestadorService } from '../services/prestador.service';
import { Prestador } from '../model/prestador';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  @ViewChild(IonModal) modal!: IonModal;
  categorias!: string[];
  selectedCity = '';
  prestadores!: Prestador[];
  card: any;
  abrirModal: boolean = false;

  constructor(private servicoService: PrestadorService) {}

  async ngOnInit() {
    await Promise.all([this.carregarPrestadores(), this.carregarCategorias()]);
  }

  async carregarCategorias() {
    this.servicoService
      .get('http://localhost:8080/servico/categorias')
      .then((categorias: any) => {
        this.categorias = categorias.data.content;
      });
  }
  async carregarPrestadores() {
    this.servicoService
      .getPrestadores(this.selectedCity)
      .then((servicos: any) => {
        this.prestadores = servicos.data.content;
      });
  }

  cancel() {
    this.servicoService
      .get('http://localhost:8080/servico/' + this.card.id)
      .then((a: any) => {
        this.card = a.data;
      });
    this.abrirModal = false;
  }

  confirm() {
    console.log(this.card);

    this.carregarPrestadores();
    this.modal.dismiss(null, 'confirmar');
    this.abrirModal = false;
  }

  novoServico() {
    this.abrirModal = true;
    this.card = {
      area: '',
      nome: '',
      descricao: '',
    };
  }
}
