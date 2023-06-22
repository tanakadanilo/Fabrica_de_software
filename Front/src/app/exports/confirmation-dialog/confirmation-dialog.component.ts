import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <nb-card [style]="{ 'background-color': 'red' }">
      <nb-card-header>{{ title }}</nb-card-header>
      <nb-card-body>{{ message }}</nb-card-body>
      <nb-card-footer>
        <button nbButton status="success" (click)="confirm()">Sim</button>
        <button nbButton status="danger" (click)="cancel()">Não</button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class ConfirmationDialogComponent {
  title?: string;
  message?: string;

  constructor(protected dialogRef: NbDialogRef<ConfirmationDialogComponent>) {}

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
