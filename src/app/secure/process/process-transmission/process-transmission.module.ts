import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule, MatStepperModule,
  MatIconModule, MatDialogModule, MatProgressSpinnerModule, MatDatepickerModule, MatRadioModule,} from '@angular/material';
import { Select2Module } from 'ng2-select2';
import { ProcessUploadModule } from './process-upload/process-upload.module';

import { DataTableModule } from '../../shared/data-table/data-table.module';

import { ProcessComponent } from './process.component';
import { ProcessPaymentComponent } from './process-payment/process-payment.component';
import { ProcessHeaderComponent } from './process-header/process-header.component';
import { EmployeePaymentsTableComponent } from './employee-payments-table/employee-payments-table.component';
import { EmployeePaymentFormComponent } from './employee-payment-form/employee-payment-form.component';
import { ProcessTransmissionComponent } from './process-transmission/process-transmission.component';
import { ProcessEmployeePaymentsComponent } from './process-employee-payments/process-employee-payments.component';
import { ProcessProductPaymentsComponent } from './process-product-payments/process-product-payments.component';
import { TransmissionIntroFormComponent } from './transmission-intro-form/transmission-intro-form.component';
import { TransmissionProductDetailsComponent } from './process-transmission/transmission-product-details/transmission-product-details.component';
import { TransmissionBankDetailsComponent } from './process-transmission/transmission-bank-details/transmission-bank-details.component';
import { TransmissionDateComponent } from './process-transmission/transmission-date/transmission-date.component';
import { TransmissionCommentComponent } from './process-transmission/transmission-comment/transmission-comment.component';

import { ProcessService } from '../_services/http/process.service';
import { ProcessFileService } from '../_services/http/process-file.service';
import { ProcessMethodService } from '../_services/http/process-method.service';
import { EmployerService } from '../_services/http/employer.service';
import { ManualProcessService } from '../_services/http/manual-process.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    Select2Module,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatStepperModule, MatIconModule, MatDialogModule,
    MatCheckboxModule, MatDatepickerModule, MatProgressSpinnerModule, MatRadioModule,
    DataTableModule,
    ProcessUploadModule
  ],
  declarations: [
    ProcessComponent,
    ProcessPaymentComponent,
    EmployeePaymentsTableComponent,
    EmployeePaymentFormComponent,
    ProcessHeaderComponent,
    ProcessTransmissionComponent,
    ProcessEmployeePaymentsComponent,
    ProcessProductPaymentsComponent,
    TransmissionIntroFormComponent,
    TransmissionProductDetailsComponent,
    TransmissionBankDetailsComponent,
    TransmissionDateComponent, TransmissionCommentComponent
  ],
  entryComponents: [
    EmployeePaymentFormComponent,
    ProcessEmployeePaymentsComponent,
    ProcessProductPaymentsComponent,
    TransmissionIntroFormComponent,
    TransmissionProductDetailsComponent,
    TransmissionDateComponent,
    TransmissionBankDetailsComponent,
    TransmissionCommentComponent
  ],
  providers: [
    EmployerService,
    ProcessService,
    ProcessFileService,
    ProcessMethodService,
    ManualProcessService
  ]
})
export class ProcessModule {}
