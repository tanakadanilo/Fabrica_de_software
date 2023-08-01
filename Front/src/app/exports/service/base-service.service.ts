import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prestador } from '../interface/prestador';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  readonly URL_BACK = 'http://localhost:8080'
  readonly URL_SERVICOS = this.URL_BACK + "/servico"

  user:any = '';

  constructor(private http: HttpClient, private messageService: MessageService) { }


  toast(message:string){
    this.messageService.add({ key: 'toast1', severity: 'success', summary: 'Success', detail: 'key: toast1' });
  }
  

  get(url: string) {
    return this.http.get(url);
  }
  getServicos() {
    return this.get(this.URL_SERVICOS);
  }

  getPrestadorVazio(): Prestador {

    return {
      id: 0,
      nome: "",
      contato: "",
      cpf: "",
      endereco: '',
      foto: '',
      servicosPrestados: '',
      historicoServicosPrestados: '',
      portfolio: '',
      disponibilidades: '',
      descricaoAdicional: '',
      especializacao: ''
    }
  }

  setUser(user:any){
    this.user = user;
    console.log("loggou coroi");
  }
}
