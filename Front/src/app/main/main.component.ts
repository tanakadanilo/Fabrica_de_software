import { Component } from '@angular/core';
import { Categoria } from '../exports/model/categoria';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prestador } from '../exports/model/prestador';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  pagina: any;
  elementos: any;
  categorias!: Categoria[];
  prestadores!: Prestador[];

  constructor(
    private http: HttpClient,
    private toastrService: NbToastrService
  ) {}
  copiar() {}
  ngOnInit(): void {
    this.carregaCategorias();
    this.carregaDados();
    this.elementos = this.dividirEmGrupos(this.prestadores, 4);
  }

  carregaCategorias() {
    this.http
      .get('http://localhost:8080/servico/categorias')
      .subscribe((response: any) => {
        if (response.erros?.length > 0) {
          console.log(response.erros);
          this.toastError(response.erros[0]);
          return;
        }
        this.categorias = response.data;
      });
  }
  carregaDados() {
    this.http
      .get('http://localhost:8080/prestador')
      .subscribe((response: any) => {
        if (response.erros?.length > 0) {
          console.log(response.erros);
          this.toastError(response.erros[0]);
          return;
        }
        this.prestadores = response.data;
        this.elementos = this.dividirEmGrupos(this.prestadores, 4);
      });
  }
  toastError(message: string) {
    this.toastrService.show(message, 'ERRO', {
      status: 'danger',
      duration: 5000,
    });
  }

  cadastrar() {
    //  this.regCliente.post("http://localhost:8080/contrante",{'nome': 'adasdasda'}).subscribe((response: any) =>{
    //   console.log(response);

    //  });
    console.log('funfo');

    this.http
      .get('http://localhost:8080/preencherbanco')
      .subscribe((req: any) => {
        console.log(req);
      });
  }

  dividirEmGrupos(lista: any[], tamanho: number): any[][] {
    if (!lista) {
      return [];
    }
    const grupos: any[][] = [];

    for (let i = 0; i < lista.length; i += tamanho) {
      grupos.push(lista.slice(i, i + tamanho));
    }

    return grupos;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const controls = document.querySelectorAll('.control');
  const items = document.querySelectorAll('.item');
  const gallery = document.querySelector('.gallery') as HTMLElement;
  const maxItems = items.length;
  const itemWidth = items[0].clientWidth;
  let currentItem = 0;

  // ajustando a largura do container da galeria
  gallery.style.width = `${itemWidth * maxItems}px`;

  controls.forEach((control) => {
    control.addEventListener('click', (e) => {
      const isLeft = (e.target as HTMLElement).classList.contains('arrow-left');

      if (isLeft) {
        currentItem -= 1;
      } else {
        currentItem += 1;
      }

      if (currentItem >= maxItems) {
        currentItem = 0;
      }

      if (currentItem < 0) {
        currentItem = maxItems - 1;
      }

      // movendo a galeria
      gallery.style.transform = `translateX(-${currentItem * itemWidth}px)`;

      items.forEach((item) => item.classList.remove('current-item'));
      items[currentItem].classList.add('current-item');
    });
  });

  // permitindo o swipe na galeria em dispositivos móveis
  let startX: number;
  let startY: number;

  gallery.addEventListener('touchstart', (e: TouchEvent) => {
    startX = e.changedTouches[0].screenX;
    startY = e.changedTouches[0].screenY;
  });

  gallery.addEventListener('touchmove', (e: TouchEvent) => {
    const diffX = e.changedTouches[0].screenX - startX;
    const diffY = e.changedTouches[0].screenY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      e.preventDefault();
    }
  });

  gallery.addEventListener('touchend', (e: TouchEvent) => {
    const diffX = e.changedTouches[0].screenX - startX;

    if (Math.abs(diffX) > itemWidth / 4) {
      if (diffX > 0) {
        currentItem -= 1;
      } else {
        currentItem += 1;
      }

      if (currentItem >= maxItems) {
        currentItem = 0;
      }

      if (currentItem < 0) {
        currentItem = maxItems - 1;
      }

      // movendo a galeria
      gallery.style.transform = `translateX(-${currentItem * itemWidth}px)`;

      items.forEach((item) => item.classList.remove('current-item'));
      items[currentItem].classList.add('current-item');
    }
  });
  gallery.addEventListener('wheel', (e) => {
    e.preventDefault();
    const direction = Math.sign(e.deltaY);
    currentItem += direction;

    if (currentItem >= maxItems) {
      currentItem = 0;
    }

    if (currentItem < 0) {
      currentItem = maxItems - 1;
    }

    // movendo a galeria
    gallery.style.transform = `translateX(-${currentItem * itemWidth}px)`;

    items.forEach((item) => item.classList.remove('current-item'));
    items[currentItem].classList.add('current-item');
  });
});
