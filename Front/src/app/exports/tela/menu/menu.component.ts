import { Component, HostListener } from '@angular/core';
import { BaseServiceService } from '../../service/base-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  constructor(private service: BaseServiceService) {}

  items = [
    {
      label: 'Perfil',
      icon: 'pi pi-refresh',
      command: () => {
        this.mostrarPerfil();
      },
    },
    {
      label: 'Desconectar',
      icon: 'pi pi-times',
      command: () => {
        this.desconectar();
      },
    },
  ];

  mostrarPerfil() {
    this.service.navigate('/perfil/2');
  }

  desconectar() {}

  mostrarServicos() {
    this.service.navigate('/');
  }

  mostrarLogin() {
    this.service.navigate('/login');
  }
  isMenuFixed = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    const scrollOffset = window.pageYOffset;
    const menuElement = document.querySelector('.menu') as HTMLElement; // Adicione o tipo de cast para HTMLElement

    if (menuElement) {
      if (scrollOffset > menuElement.offsetTop) {
        this.isMenuFixed = true;
      } else {
        this.isMenuFixed = false;
      }
    }
  }
}
