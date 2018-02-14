import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Select2Module } from 'ng2-select2';
import { MatProgressSpinnerModule, MatCheckboxModule, MatSelectModule, MatRadioModule,
         MatDatepickerModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule } from '@angular/material';

import { DataTableModule } from '../../../shared/data-table/data-table.module';
import { ProcessDetailsModule } from '../process-details/process-details.module';

import { ProcessTransmissionComponent } from './process-transmission.component';
import { TransmissionProductDetailsComponent } from './transmission-product-details/transmission-product-details.component';
import { TransmissionBankDetailsComponent } from './transmission-bank-details/transmission-bank-details.component';
import { TransmissionDateComponent } from './transmission-date/transmission-date.component';
import { TransmissionCommentComponent } from '../process-payment/transmission-comment/transmission-comment.component';
import { TransmissionIntroFormComponent } from './transmission-intro-form/transmission-intro-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule, MatCheckboxModule, MatSelectModule, MatRadioModule, MatFormFieldModule,
    MatInputModule, MatDatepickerModule, MatSlideToggleModule,
    ProcessDetailsModule,
    Select2Module,
    DataTableModule,
  ],
  declarations: [
    ProcessTransmissionComponent,
    TransmissionProductDetailsComponent,
    TransmissionBankDetailsComponent,
    TransmissionDateComponent,
    TransmissionCommentComponent,
    TransmissionIntroFormComponent
  ],
  entryComponents: [
    TransmissionProductDetailsComponent,
    TransmissionDateComponent,
    TransmissionBankDetailsComponent,
    TransmissionCommentComponent,
    TransmissionIntroFormComponent
  ],
})
export class ProcessTransmissionModule {}
