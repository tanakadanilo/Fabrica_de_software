import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  readonly urlBack = 'http://localhost:8080/login';

  constructor(
    public http: HttpClient,
    private toastrService: NbToastrService
  ) {}

  usuario: any;
  token!: string;

  private callback: any | null = null;

  setCallback(callback: any) {
    this.callback = callback;
  }

  chamarCallback() {
    this.carregaUsuario().subscribe((response: any) => {
      if (this.callback) {
        response.data.imagem =
          'data:image/jpg;base64,' +
          Buffer.from(response.data.imagem, 'base64');
        this.callback(response.data.username, response.data.imagem);
      }
    });
  }
  toastError(message: string) {
    this.toastrService.show(message, 'ERRO', {
      status: 'danger',
      duration: 5000,
    });
  }

  carregaUsuario() {
    this.token = localStorage.getItem('token')
      ? localStorage.getItem('token')!
      : '';
    return this.http.get(this.urlBack + '/findbytoken?token=' + this.token);
  }
}
