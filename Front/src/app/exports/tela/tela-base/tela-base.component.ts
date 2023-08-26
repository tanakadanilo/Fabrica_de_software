import { Component } from '@angular/core';
import { BaseServiceService } from '../../service/base-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tela-base',
  templateUrl: './tela-base.component.html',
  styleUrls: ['./tela-base.component.css'],
})
export class TelaBaseComponent {
  errorMessage: string | null = null;

  constructor(protected service: BaseServiceService) {}

  toastError(messages: string[]) {
    messages.forEach((message) => {
      this.service.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: message,
      });
    });
  }
}
