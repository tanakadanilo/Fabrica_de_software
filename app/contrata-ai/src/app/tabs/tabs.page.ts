import { Component } from '@angular/core';
import { ServicoService } from '../services/servico.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public service: ServicoService;
  constructor(service: ServicoService) {
    this.service = service;
  }


}
