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
  }
  toastError(message: string) {
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
    return this.http.post(this.urlBack + 'servico', servico);
  }
  carregaUsuario() {
    this.token = localStorage.getItem('token')
      ? localStorage.getItem('token')!
      : '';
    return this.http.get(
      this.urlBack + 'login/findbytoken?token=' + this.token
    );
  }

  public static cpf(cpf: string): boolean {
    if (cpf == null) {
      return false;
    }
    if (cpf.length != 11) {
      return false;
    }
    if (
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999'
    ) {
      return false;
    }
    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = cpf.substring(0, 9);
    for (let i: number = 0; i < 9; i++) {
      caracter = cpfAux.charAt(i);
      if (numeros.search(caracter) == -1) {
        return false;
      }
      numero = Number(caracter);
      somatorio = somatorio + numero * j;
      j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
      digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
      caracter = cpfAux.charAt(i);
      numero = Number(caracter);
      somatorio = somatorio + numero * j;
      j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
      digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf != cpfAux) {
      return false;
    } else {
      return true;
    }
  }
}
