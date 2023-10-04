import { Component, OnInit } from '@angular/core';
import { BaseServiceService } from '../../service/base-service.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tela-base',
  templateUrl: './tela-base.component.html',
  styleUrls: ['./tela-base.component.css'],
})
export class TelaBaseComponent implements OnInit {
  errorMessage: string | null = null;
  protected messageService: MessageService;

  constructor(
    protected service: BaseServiceService,
    protected route: ActivatedRoute // * para pegar parametros de URL use <this.route.snapshot.data[<nomeParametro>]>
  ) {
    this.messageService = service.messageService;
  }

  ngOnInit(): void {}

  toastError(messages: string[]) {
    messages.forEach((message) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: message,
      });
    });
  }
}
