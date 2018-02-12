import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-payment-prompt',
  templateUrl: './payment-prompt.component.html'
})
export class PaymentPromptComponent {

  constructor(private dialogRef: MatDialogRef<PaymentPromptComponent>) {}

  choosePayment(): void {
    this.dialogRef.close();
  }
}
