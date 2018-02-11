import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserSessionService } from '../../../../shared/_services/user-session.service';
import { ProcessService } from '../../../_services/http/process.service';
import { EmployeePayment } from '../../../../shared/_models/employee-payment.model';

@Component({
  selector: 'app-transmissio-bank-details',
  templateUrl: './transmissio-bank-details.component.html',
  styleUrls: ['./transmissio-bank-details.component.css']
})
export class TransmissioBankDetailsComponent implements OnInit {

  public select: number=1;
  public bankNumber: any;
  public bankNumbers: any[] = [];

  public branchNumber: any;
  public bankBranchNumbers : any[] = [];

  public accountNumber: any;
  public bankAccountNumbers : any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public payment: any, public dialogRef: MatDialogRef<TransmissioBankDetailsComponent>, private userSession: UserSessionService,
              private processService: ProcessService) {}

  ngOnInit() {
    this.processService.postBankNumbres(this.payment, this.userSession.getToken()).then(response => this.bankNumbers = response);
  }

  selectionClickBankNumber(): void {
    this.processService.postBankBranchNumbres(this.payment,this.bankNumber, this.userSession.getToken()).then(response => this.bankBranchNumbers = response);
  }

  selectionClickAccountNumber(): void {
    this.processService.postBankAccountNumbres(this.payment,this.bankNumber, this.branchNumber, this.userSession.getToken()).then(response => this.bankAccountNumbers = response);
  }

  sendNewBankDetails(): void {
    this.processService.postNewBankDetails(this.payment,this.bankNumber, this.branchNumber,this.accountNumber, this.select, this.userSession.getToken())
    .then(response => this.dialogRef.close(response));
  }
}
