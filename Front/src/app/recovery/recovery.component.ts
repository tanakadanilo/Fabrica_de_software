import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent {
 email = "";
 opcaoRecuperacao = "";
  form: FormGroup;

constructor(private FormBuilder:FormBuilder)
{
  this.form = this.FormBuilder.group({
    email :['', Validators.required]
  })
}
  recuperar(_event: Event) {
    // seu código de login aqui
  }
}
