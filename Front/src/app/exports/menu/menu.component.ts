import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Buffer } from 'buffer';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  constructor(private service: ServiceService) {
    this.carregaImagem();
  }
  items!: NbMenuItem[];

  carregaImagem() {
    this.service.carregaUsuario().subscribe((response: any) => {
      if (response.erros.length > 0) {
        if ((response.erros[0] = 'token não informado!')) {
          // * ignorar pois só não está loggado
          this.loggout();
          return;
        }
        this.service.toastError(response.erros[0]);
      }
      console.log(response);

      this.service.usuario = response.data.usuario;
      this.user = {
        name: response.data.usuario.username,
        picture: this.user.picture,
        prestador: response.data.usuario.prestador,
      };

      if (this.user.prestador) {
        this.items = [
          { title: 'Perfil', link: '/perfilprestador' },
          { title: 'Desconectar', link: '/loggout' },
        ];
      } else {
        this.items = [
          { title: 'Perfil', link: '/userprofile' },
          { title: 'Desconectar', link: '/loggout' },
        ];
      }
    });
  }

  loggout() {
    this.service.usuario = undefined;
    this.user = {
      name: '',
      picture: '',
      prestador: '',
    };
  }
  decodeImageBase64(base64String: string) {
    return 'data:image/jpg;base64,' + Buffer.from(base64String, 'base64');
  }
  userPictureOnly: boolean = true;
  user = {
    name: '',
    picture: '/assets/images/perfil.jpg',
    prestador: '',
  };
}
