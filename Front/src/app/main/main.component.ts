import { Component } from '@angular/core';

  // your code here

document.addEventListener("DOMContentLoaded", () => {
  const controls = document.querySelectorAll(".control");
  const items = document.querySelectorAll(".item");
  const gallery = document.querySelector(".gallery") as HTMLElement;
  const maxItems = items.length;
  const itemWidth = items[0].clientWidth;
  let currentItem = 0;

  // ajustando a largura do container da galeria
  gallery.style.width = `${itemWidth * maxItems}px`;

  controls.forEach((control) => {
    control.addEventListener("click", (e) => {
      const isLeft = (e.target as HTMLElement).classList.contains("arrow-left");

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

      items.forEach((item) => item.classList.remove("current-item"));
      items[currentItem].classList.add("current-item");
    });
  });

  // permitindo o swipe na galeria em dispositivos móveis
  let startX: number;
  let startY: number;

  gallery.addEventListener("touchstart", (e: TouchEvent) => {
    startX = e.changedTouches[0].screenX;
    startY = e.changedTouches[0].screenY;
  });

  gallery.addEventListener("touchmove", (e: TouchEvent) => {
    const diffX = e.changedTouches[0].screenX - startX;
    const diffY = e.changedTouches[0].screenY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      e.preventDefault();
    }
  });

  gallery.addEventListener("touchend", (e: TouchEvent) => {
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

      items.forEach((item) => item.classList.remove("current-item"));
      items[currentItem].classList.add("current-item");

    }
  });
  gallery.addEventListener("wheel", (e) => {
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

    items.forEach((item) => item.classList.remove("current-item"));
    items[currentItem].classList.add("current-item");
  });

});
;



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {




 copiar(){

 }


}
