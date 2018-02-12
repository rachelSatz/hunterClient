import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatProgressSpinnerModule, MatSelectModule,
         MatStepperModule } from '@angular/material';
import { Select2Module } from 'ng2-select2';

import { DataTableModule } from '../../shared/data-table/data-table.module';
import { ProcessUploadModule } from './process-upload/process-upload.module';
import { ProcessTransmissionModule } from './process-transmission/process-transmission.module';
import { ProcessHeaderModule } from './process-header/process-header.module';

import { ProcessComponent } from './process.component';
import { ProcessPaymentComponent } from './process-payment/process-payment.component';
import { EmployeePaymentsTableComponent } from './employee-payments-table/employee-payments-table.component';
import { EmployeePaymentFormComponent } from './employee-payment-form/employee-payment-form.component';
import { ProcessEmployeePaymentsComponent } from './process-employee-payments/process-employee-payments.component';
import { ProcessProductPaymentsComponent } from './process-product-payments/process-product-payments.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatStepperModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatSelectModule,
    MatProgressSpinnerModule,
    Select2Module,
    DataTableModule,
    ProcessUploadModule,
    ProcessTransmissionModule,
    ProcessHeaderModule
  ],
  declarations: [
    ProcessComponent,
    ProcessPaymentComponent,
    EmployeePaymentsTableComponent,
    EmployeePaymentFormComponent,
    ProcessEmployeePaymentsComponent,
    ProcessProductPaymentsComponent,
  ],
  entryComponents: [
    EmployeePaymentFormComponent,
    ProcessEmployeePaymentsComponent,
    ProcessProductPaymentsComponent,
  ],
  providers: []
})
export class ProcessModule {}
