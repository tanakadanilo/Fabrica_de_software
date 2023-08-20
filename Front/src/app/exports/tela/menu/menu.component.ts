import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private router: Router){}

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

  mostrarPerfil(){
   this.router.navigate(["/perfil/2"])
  }

  desconectar(){}

  mostrarServicos(){
    this.router.navigate(["/"]);
  }
  
mostrarLogin(){
    this.router.navigate(["/login"]);
  }
}
