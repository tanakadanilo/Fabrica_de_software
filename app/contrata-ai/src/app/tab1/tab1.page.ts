import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  initialX: number = 0;
  initialY: number = 0;
  urlImagem = 'assets/icon/makarios-voando.gif';
  quantidadeClicks = 0;
  mover: boolean = true;

  // Função para atualizar a posição da imagem
  public atualizarPosicao(event: MouseEvent) {
    // Atualize as coordenadas com base na posição do mouse
    if (this.mover) {
      this.initialX = event.clientX;
      this.initialY = event.clientY;
      this.clicar(event);
    }
  }

  clicar(event: MouseEvent) {
    if (this.quantidadeClicks >= 5) {
      this.quantidadeClicks = 0;
      this.urlImagem = 'assets/icon/makarios-voando-puto.gif';
      this.mover = false;
      document.getElementById('passaro')?.classList.remove('gif');
      document.getElementById('passaro')?.classList.add('centralizado');
    } else {
      this.quantidadeClicks++;
    }
  }
}
