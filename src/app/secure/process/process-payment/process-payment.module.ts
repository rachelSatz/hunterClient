import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule,
         MatSelectModule } from '@angular/material';
import { Select2Module } from 'ng2-select2';

import { DataTableModule } from '../../../shared/data-table/data-table.module';

import { ProcessPaymentComponent } from './process-payment.component';
import { ProcessEmployeePaymentsComponent } from './process-employee-payments/process-employee-payments.component';
import { ProcessProductPaymentsComponent } from './process-product-payments/process-product-payments.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Select2Module,
    MatSelectModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule,
    MatDialogModule,
    DataTableModule,
  ],
  exports: [ProcessPaymentComponent],
  declarations: [
    ProcessPaymentComponent,
    ProcessEmployeePaymentsComponent,
    ProcessProductPaymentsComponent
  ],
  entryComponents: [ProcessEmployeePaymentsComponent, ProcessProductPaymentsComponent]
})
export class ProcessPaymentModule {}
