import { Component, HostListener } from '@angular/core';
import { BaseServiceService } from '../../service/base-service.service';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../../service/authentication-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  constructor(
    private service: AuthenticationServiceService,
    private navigate: Router
  ) {}

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
    let pessoa = this.service.getPessoa();
    if (pessoa) {
      if (pessoa.usuario.prestador) {
        this.navigate.navigate(['/perfil/' + pessoa.id]);
      } else {
        this.navigate.navigate(['/perfilu/' + pessoa.id]);
      }
    } else {
      this.navigate.navigate(['/perfil/2']);
    }
  }

  desconectar() {
    this.service.deslogar();
  }

  mostrarServicos() {
    this.navigate.navigate(['/']);
  }

  mostrarLogin() {
    this.navigate.navigate(['/login']);
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

  recarregarServicos() {
    if (this.navigate.url == '/') {
      location.reload();
    } else this.navigate.navigate(['/']);
  }
}
