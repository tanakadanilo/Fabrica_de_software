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
  cities!: any[];
  selectedCity = '';
  prestadores!: Prestador[];
  card: any;
  abrirModal: boolean = false;

  constructor(private servicoService: PrestadorService) {}

  ngOnInit() {
    this.carregarPrestadores();
    this.carregarCategorias();
  }

  async carregarCategorias() {
    this.servicoService
      .get('http://localhost:8080/servico/categorias')
      .subscribe((categorias: any) => {
        this.cities = categorias.data.content;
      });
  }
  async carregarPrestadores() {
    try {
      this.servicoService.getPrestadores().subscribe((servicos: any) => {
        this.prestadores = servicos.data.content;
        console.log(this.prestadores);
      });
    } catch (error: any) {
      console.log(error.error.erros);
      alert(error.error.erros);
    }
  }

  cancel() {
    this.servicoService
      .get('http://localhost:8080/servico/' + this.card.id)
      .subscribe((a: any) => {
        this.card = a.data;
        console.log(this.card);
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
