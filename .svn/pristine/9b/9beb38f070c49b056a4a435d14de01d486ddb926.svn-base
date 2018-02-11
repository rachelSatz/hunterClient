import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserSessionService } from '../../../../shared/_services/user-session.service';
import { ProcessService } from '../../../_services/http/process.service';
import { EmployeePayment } from '../../../../shared/_models/employee-payment.model';
import { Process } from '../../../../shared/_models/process.model';

@Component({
  selector: 'app-transmissio-comment',
  templateUrl: './transmissio-comment.component.html',
  styleUrls: ['./transmissio-comment.component.css']
})
export class TransmissioCommentComponent implements OnInit {

  public remark: string;

  constructor(@Inject(MAT_DIALOG_DATA) public payment: any, private userSession: UserSessionService, private processService: ProcessService, public dialogRef: MatDialogRef<TransmissioCommentComponent>) {}

  ngOnInit() {
    if(this.payment.file.remark!=="")
    this.remark = this.payment.file.remark;
  }

  SubmitNewComment(){
    this.processService.postNewComment(this.payment, this.remark, this.userSession.getToken()).then(response => this.dialogRef.close(response));
  };
}
