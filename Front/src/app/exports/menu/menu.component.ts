import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Buffer } from 'buffer';
import { Observable, buffer } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  constructor(private service: ServiceService) {
    this.carregaImagem();
  }
  items = [
    { title: 'Perfil', link: '/userprofile' },
    { title: 'Desconectar', link: '/main' },
  ];
  teste(){
    console.log(this.user);
    
  }

  // gerarObservable() {
  //  return getUsers(): Promise<User[]>{
  //     return fetch(myApiUrl)
  //     .then(res=>res.json())
  //     .catch(err=> Observable.throw(err.message));
  //   }
  //   return new Observable(this.carregaImagem);
  // }
  carregaImagem() {
    this.service.carregaUsuario().subscribe((response: any) => {
      if (response.erros.lenght > 0) {
        this.service.toastError(response.erros[0]);
      }
      console.log(response);
      
      this.service.usuario = response.data.usuario;
      this.user = {
        name: response.data.usuario.username,
        picture: this.decodeImageBase64(response.data.imagem),
      };
      // this.service.setCallback(this.carregaImagem);
    });
  }

  decodeImageBase64(base64String: string) {
    return 'data:image/jpg;base64,' + Buffer.from(base64String, 'base64');
  }
  userPictureOnly: boolean = true;
  user = {
    name: '',
    picture: '',
  };
}
