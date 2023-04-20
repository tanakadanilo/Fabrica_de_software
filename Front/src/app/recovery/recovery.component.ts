import { Component } from '@angular/core';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent {
 email = "";
 opcaoRecuperacao = "";


  recuperar(_event: Event) {
    // seu código de login aqui
  }
}
