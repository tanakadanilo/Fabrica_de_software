import { Component } from '@angular/core';

@Component({
  selector: 'app-avaliar',
  templateUrl: './avaliar.component.html',
  styleUrls: ['./avaliar.component.css']
})
export class AvaliarComponent {
  visible = false;
  stars: number | undefined = 0;

  openPopup() {
    this.visible = true;
  }

  closePopup() {
    this.visible = false;
  }

  rate(stars: number) {
    this.stars = stars;
  }
}
