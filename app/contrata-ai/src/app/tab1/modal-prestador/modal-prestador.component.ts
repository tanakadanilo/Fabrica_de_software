import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Prestador } from 'src/app/model/prestador';
import { Response } from 'src/app/model/response';
import { ServicoPrestadoDto } from 'src/app/model/servico-prestado-dto';
import { PrestadorService } from 'src/app/services/prestador.service';
import { ModalContratarComponent } from '../modal-contratar/modal-contratar.component';

@Component({
  selector: 'app-modal-prestador',
  templateUrl: './modal-prestador.component.html',
  styleUrls: ['./modal-prestador.component.scss'],
})
export class ModalPrestadorComponent implements OnInit {
  @Input() prestador!: Prestador;
  categorias!: string[];
  categoria = '';
  servicosPrestadosPeloPrestador!: ServicoPrestadoDto[];
  servicosPrestados!: ServicoPrestadoDto[];

  constructor(
    private modalController: ModalController,
    private prestadorService: PrestadorService
  ) { }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }


  carregarCategorias() {
    const set = new Set<string>();
    for (const objeto of this.servicosPrestados) {
      set.add(objeto.area);
    }
    this.categorias = Array.from(set);
  }
  async carregarServicosPrestados() {
    this.prestadorService
      .carregarServicosPrestado(this.prestador.id)
      .then((servicos: Response<ServicoPrestadoDto[]>) => {
        this.servicosPrestadosPeloPrestador = servicos.data;
      });
  }
  async ngOnInit() {
    await this.prestadorService
      .carregarServicosPrestado(this.prestador.id)
      .then((a) => {
        this.servicosPrestados = a.data;
      });
    this.carregarCategorias();
  }

  async contratar(servico: ServicoPrestadoDto) {
    const modal = await this.modalController.create({
      component: ModalContratarComponent,
      componentProps: { servico: servico, modal: this.modalController }, // Passando os dados como parâmetro
    });

    return await modal.present();
  }
}
