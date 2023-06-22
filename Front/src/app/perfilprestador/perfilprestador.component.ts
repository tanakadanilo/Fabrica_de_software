import { Component } from '@angular/core';
import { Prestador } from '../exports/model/prestador';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../exports/service/service.service';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-perfilprestador',
  templateUrl: './perfilprestador.component.html',
  styleUrls: ['./perfilprestador.component.css']
})
export class PerfilprestadorComponent implements AfterViewInit{

  texto: any = "Qualquer coisa"
  constructor(private service: ServiceService, private http: HttpClient) {
    
  }
  ngAfterViewInit(): void {
    this.carregaDados()
    }
  p!: Prestador
  editarCampos: boolean = (this.service.usuario) ? this.p.nome == this.service.usuario.nome : false
  async showDialog(servico: any) {
    let contratar: any = await this.service.showDialog(servico);
    if (contratar) {
      this.service.contratarServico(servico).subscribe((response: any) => {
        if (response.erros.lenght > 0) {
          this.service.toastError(response.erros[0]);
          return;
        }
        this.service.toastSucess(
          'Serviço contratado com sucesso! Entraremos em contato por email!'
        );

      })
    }
  
  }
  
  carregaDados(){
    console.log(this.p);
    
    if(!this.service.usuario){
      this.carregaDados()
      return
    }
    
    this.service.http.get("http://localhost:8080/prestador/" + this.service.usuario.id).subscribe((Response:any)=>{
    if(Response.erros.lenght > 0){
      this.service.toastError;
    }else{  
    this.p = Response.data;
  }})
  }
}
