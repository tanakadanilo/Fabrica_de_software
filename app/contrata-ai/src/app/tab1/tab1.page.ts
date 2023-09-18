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

  // Função para atualizar a posição da imagem
  public atualizarPosicao(event: MouseEvent) {
    // Atualize as coordenadas com base na posição do mouse
    this.initialX = event.clientX;
    this.initialY = event.clientY;
  }
}
