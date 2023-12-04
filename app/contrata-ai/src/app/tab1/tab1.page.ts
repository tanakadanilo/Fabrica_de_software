import { Component, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { PrestadorService } from '../services/prestador.service';
import { Prestador } from '../model/prestador';
import { ModalPrestadorComponent } from './modal-prestador/modal-prestador.component';

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
  constructor(
    private service: PrestadorService,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    await Promise.all([this.carregarPrestadores(), this.carregarCategorias()]);
  }

  async carregarCategorias() {
    this.service
      .get('http://localhost:8080/servico/categorias')
      .then((categorias: any) => {
        this.categorias = categorias.data.content;
      });
  }
  async carregarPrestadores() {
    this.service.getPrestadores(this.selectedCity).then((servicos: any) => {
      this.prestadores = servicos.data.content;
      this.prestadores.forEach((prestador) => {
        this.service.getNotaMedia(prestador.id).then((nota) => {
          prestador.nota = nota.data;
        });
      });
    });
  }

  novoServico() {
    this.card = {
      area: '',
      nome: '',
      descricao: '',
    };
  }

  async abrirModal(prestador: Prestador) {
    const modal = await this.modalController.create({
      component: ModalPrestadorComponent,
      componentProps: { prestador: prestador }, // Passando os dados como parâmetro
    });
    return await modal.present();
  }
}
