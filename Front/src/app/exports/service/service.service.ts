import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Prestador } from '../model/prestador';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  readonly urlBack = 'http://localhost:8080/';

  constructor(
    public http: HttpClient,
    private toastrService: NbToastrService,
    private dialog: NbDialogService
  ) {}

  usuario: any;
  token!: string;

  toastSucess(message: string) {
    this.toastrService.show(message, 'SUCESSO!', {
      status: 'success',
      duration: 5000,
    });
  }  toastError(message: string) {
    this.toastrService.show(message, 'ERRO', {
      status: 'danger',
      duration: 5000,
    });
  }
  async showDialog(servico: any) {
    let ret = await this.dialog
      .open(ConfirmationDialogComponent, {
        context: {
          title: 'Confirmação',
          message: 'Deseja Contratar esse serviço?',
        },
      })
      .onClose.toPromise();
    return ret;
  }

  contratarServico(servico: any) {
    return this.http
      .post(this.urlBack + 'servico', servico)
      
  }
  carregaUsuario() {
    this.token = localStorage.getItem('token')
      ? localStorage.getItem('token')!
      : '';
    return this.http.get(
      this.urlBack + 'login/findbytoken?token=' + this.token
    );
  }
}
