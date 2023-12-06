import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Contratante } from '../model/contratante';
import { Response } from '../model/response';
import { HistoricoServico } from '../model/historico-servico';

@Injectable({
  providedIn: 'root',
})
export class ContratanteService extends BaseService {
  URL_CONTRATANTE = this.URL_BACK + '/contratante';
  URL_HISTORICO = this.URL_CONTRATANTE + '/historico';
  constructor(
    protected override http: HttpClient,
    override alertController: AlertController
  ) {
    super(http, alertController);
  }

  editar(contratante: Contratante): Promise<Response<Contratante>> {
    return this.toPromisse<Contratante>(
      this.http.put<Response<Contratante>>(this.URL_CONTRATANTE, contratante)
    );
  }

  listarHistorico(
    contratante: Contratante
  ): Promise<Response<HistoricoServico[]>> {
    return this.get<HistoricoServico[]>(
      this.URL_HISTORICO + '/' + contratante.id
    );
  }
}
