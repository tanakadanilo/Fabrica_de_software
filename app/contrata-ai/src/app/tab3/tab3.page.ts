import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ServicoService } from '../services/servico.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  cities!: any[];
  selectedCity ="";
  cardList: any;
  card: any;
  abrirModal: boolean = false;

  constructor(private servicoService: ServicoService) {}

  ngOnInit() {
    this.carregarServicos();
  }

  async carregarServicos() {
    try {
      this.servicoService.getServicos(this.selectedCity).subscribe((servicos: any) => {
        this.cardList = servicos.data.content;
      });
      this.servicoService
        .get('http://localhost:8080/servico/categorias')
        .subscribe((categorias: any) => {
          this.cities = categorias.data.content;
          console.log(this.cities)
        });

    } catch (error: any) {
      console.log(error.error.erros);
      alert(error.error.erros);
    }
    console.log(this.cardList);
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

    if (!this.card.id) {
      // novo servico
      this.servicoService.criarServico(this.card).subscribe((a: any) => {
        console.log(a);
      });
    } else {
      this.servicoService.editarServico(this.card).subscribe();
    }
    this.carregarServicos();
    this.modal.dismiss(null, 'confirmar');
    this.abrirModal = false;
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
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
