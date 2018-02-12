import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Select2Module } from 'ng2-select2';
import { MatProgressSpinnerModule, MatCheckboxModule, MatSelectModule, MatRadioModule,
         MatDatepickerModule } from '@angular/material';

import { DataTableModule } from '../../../shared/data-table/data-table.module';
import { ProcessHeaderModule } from '../process-header/process-header.module';

import { ProcessTransmissionComponent } from './process-transmission.component';
import { TransmissionProductDetailsComponent } from './transmission-product-details/transmission-product-details.component';
import { TransmissionBankDetailsComponent } from './transmission-bank-details/transmission-bank-details.component';
import { TransmissionDateComponent } from './transmission-date/transmission-date.component';
import { TransmissionCommentComponent } from './transmission-comment/transmission-comment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule, MatCheckboxModule, MatSelectModule, MatRadioModule,
    MatDatepickerModule,
    Select2Module,
    DataTableModule,
    ProcessHeaderModule
  ],
  declarations: [
    ProcessTransmissionComponent,
    TransmissionProductDetailsComponent,
    TransmissionBankDetailsComponent,
    TransmissionDateComponent,
    TransmissionCommentComponent
  ],
  entryComponents: [
    TransmissionProductDetailsComponent,
    TransmissionDateComponent,
    TransmissionBankDetailsComponent,
    TransmissionCommentComponent
  ],
  exports: [ProcessTransmissionComponent],
  providers: []
})
export class ProcessTransmissionModule {}
