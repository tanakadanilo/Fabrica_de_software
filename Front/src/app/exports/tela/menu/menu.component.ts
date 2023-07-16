import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {


  items = [
    {
      label: 'Perfil',
      icon: 'pi pi-refresh',
      command: () => {
        this.mostrarPerfil();
      }
    },
    {
      label: 'Desconectar',
      icon: 'pi pi-times',
      command: () => {
        this.desconectar();
      }
    }



  ];

  mostrarPerfil(){}

  desconectar(){}
}
