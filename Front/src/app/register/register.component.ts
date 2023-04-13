import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    previewImage(event: Event): void {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.getElementById('preview-img') as HTMLImageElement;
          img.src = e.target?.result as string;
        }
        reader.readAsDataURL(file);
      }
    }
    cadastrar(){
      // logica
    }
  }


