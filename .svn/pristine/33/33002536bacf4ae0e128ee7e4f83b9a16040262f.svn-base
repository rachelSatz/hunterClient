import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ProcessProductPaymentsComponent } from '../process-product-payments/process-product-payments.component';
import { ProcessEmployeePaymentsComponent } from '../process-employee-payments/process-employee-payments.component';

import { Process } from '../../../shared/_models/process.model';

@Component({
  selector: 'app-process-header',
  templateUrl: './process-header.component.html',
  styleUrls: ['./process-header.component.css']
})
export class ProcessHeaderComponent {

  @Input() mode: 'payment' | 'transimission';
  @Input() process: Process;

  constructor(private dialog: MatDialog) {};

  openEmployeePaymentModal(): void {
    this.dialog.open(ProcessEmployeePaymentsComponent, {
      data: this.process,
      height: '90%',
      width: '94%'
    });
  }

  openProductPaymentModal(): void {
    this.dialog.open(ProcessProductPaymentsComponent, {
      data: this.process,
      height: '90%',
      width: '94%'
    });
  }
}
