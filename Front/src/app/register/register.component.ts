import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  linearMode = true;
DadosPessoais: { valid: boolean|null; reset: () => void; }|undefined;

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


/*
    constructor(private stepper: NbStepperComponent) {}

    onStepChange(event: NbStepChangeEvent) {
      const camposObrigatorios = event.step.stepContent.nativeElement.querySelectorAll('.required');
      const camposVazios = Array.from(camposObrigatorios).filter((campo: HTMLInputElement) => !campo.value);

      if (camposVazios.length > 0) {
        event.step.stepControl.status = 'INVALID'; // Define a etapa atual como inválida
      }
    }
    } */





    cadastrar(){
      // logica
    }
  }


