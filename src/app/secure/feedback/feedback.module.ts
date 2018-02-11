import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatDialogModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';
import { Select2Module } from 'ng2-select2';

import { DataTableModule } from '../../shared/data-table/data-table.module';
import { FeedbackGraphModule } from './feedback-graph/feedback-graph.module';

import { FeedbackEmployeeTableComponent } from './feedback-employee-table/feedback-employee-table.component';
import { FeedbackEmployeeTableDetailsComponent } from './feedback-employee-table-details/feedback-employee-table-details.component';
import { FeedbackFileTableComponent } from './feedback-file-table/feedback-file-table.component';

import { FeedbackService } from '../_services/http/feedback.service';
import { RejectedEmployeeComponent } from './rejected-employee/rejected-employee.component';
import { RejectedFileComponent } from './rejected-file/rejected-file.component';
import { FeedbackEmployeeApplicationComponent } from './feedback-employee-application/feedback-employee-application.component';
import { FeedbackFileApplicationComponent } from './feedback-file-application/feedback-file-application.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule, MatInputModule, MatDialogModule, MatSelectModule, MatSlideToggleModule,
    Select2Module,
    DataTableModule,
    FeedbackGraphModule,
  ],
  declarations: [
    FeedbackEmployeeTableComponent,
    FeedbackEmployeeTableDetailsComponent,
    FeedbackFileTableComponent,
    RejectedEmployeeComponent,
    RejectedFileComponent,
    FeedbackEmployeeApplicationComponent,
    FeedbackFileApplicationComponent
  ],
  entryComponents: [
    FeedbackEmployeeTableDetailsComponent,
    FeedbackFileApplicationComponent],
  providers: [FeedbackService],
})
export class FeedbackModule {}
