import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {EmployeeFeedback} from '../../../shared/_models/employee-feedback.model';
import {Employer} from '../../../shared/_models/employer.model';

@Component({
  selector: 'app-feedback-employee-table-details',
  templateUrl: './feedback-employee-table-details.component.html',
  styleUrls: ['./feedback-employee-table-details.component.css']
})
export class FeedbackEmployeeTableDetailsComponent {

  dialogStep = 0;
  feedback: EmployeeFeedback;
  employerId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<FeedbackEmployeeTableDetailsComponent>) {
    this.feedback = data.feedback;
    this.employerId = data.employerId;
  }

  setDialogStep(step: number): void {
    this.dialogStep = step;
  }

  onCloseClicked(): void {
    this.dialogRef.close();
  }
}
