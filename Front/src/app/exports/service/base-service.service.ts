import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Uf } from '../enum/uf';

import { Response } from '../interface/response';
import { Observable } from 'rxjs';
import { Paginavel } from '../interface/paginavel';
import { PropostaContratacao } from '../interface/contratacaoServico';

@Injectable({
  providedIn: 'root',
})
export class BaseServiceService {
  readonly URL_BACK = 'http://localhost:8080';
  readonly URL_ENVIAR_EMAIL = this.URL_BACK + '/email/enviar';

  user: any = '';

  messageService: MessageService;

  servicosListados!: any[];

  constructor(
    protected http: HttpClient,
    messageService: MessageService,
    protected router: Router
  ) {
    this.messageService = messageService;
  }

  toPromisse(observable: Observable<Response<any>>): Promise<Response<any>> {
    return new Promise<Response<any>>((resolve, reject?) => {
      observable.subscribe(
        (data) => {
          if (data.erros.length > 0) {
            this.toastError(data.erros);
          }
          resolve(data);
        },
        (error) => {
          if (reject) {
            reject(error);
          } else {
            this.toastError(error);
          }
        }
      );
    });
  }

  toPromisseList(observable: Observable<Response<any[]>>): Promise<Response<any[]>> {
    return new Promise<Response<any[]>>((resolve, reject?) => {
      observable.subscribe(
        (data) => {
          if (data.erros.length > 0) {
            this.toastError(data.erros);
          }
          resolve(data);
        },
        (error) => {
          if (reject) {
            reject(error);
          } else {
            this.toastError(error);
          }
        }
      );
    });
  }

  toPromissePaginavel(
    observable: Observable<Response<Paginavel<any>>>
  ): Promise<Response<any>> {
    return new Promise<Response<any>>((resolve, reject?) => {
      observable.subscribe(
        (data) => {
          if (data.erros.length > 0) {
            this.toastError(data.erros);
          }
          resolve(data);
        },
        (error) => {
          if (reject) {
            reject(error);
          } else {
            this.toastError(error);
          }
        }
      );
    });
  }

  toastError(messages: string[]) {
    console.log(messages);
    messages.forEach((message) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: message,
      });
    });
  }

  post(url: string, body?: any) {
    return this.http.post(url, body ? body : new Object());
  }

  get(url: string) {
    return this.http.get(url);
  }

  getContatoVazio() {
    return {
      contato: '',
      email: '',
      telefone: '',
    };
  }
  getEnderecoVazio() {
    return {
      bairro: '',
      cep: '',
      cidade: '',
      complemento: '',
      logradouro: '',
      lote: '',
      numero: '',
      quadra: '',
      uf: Uf.AC,
    };
  }

  setUser(user: any) {
    this.user = user;
    console.log('loggou coroi');
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }

  enviarEmail(destinatario: string, assunto: string, corpo: string) {
    this.post(
      `${this.URL_ENVIAR_EMAIL}?to=${
        destinatario ? encodeURIComponent(destinatario) : ''
      }&subject=${assunto ? encodeURIComponent(assunto) : ''}&body=${
        corpo ? encodeURIComponent(corpo) : ''
      }`,
      null
    ).subscribe({
      next: (a: any) => {
        if (a.erros?.lenght > 0) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: '' + a.erros,
          });
        } else {
          console.log(a.data);
          this.messageService.add({
            severity: 'Success',
            summary: 'Email Enviado!',
            detail: '' + a.data,
          });
        }
      },
      error(err) {
        console.log(err);
      },
    });
  }


  selectedImage: File | null = null;
  base64String: string | null = null;

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedImage = file;

      // Convertendo a imagem para base64
      const reader = new FileReader();
      reader.onloadend = () => {
        this.base64String = reader.result as string;        
      };
      reader.readAsDataURL(file);
    }
  }
}
