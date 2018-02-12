import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { ProcessService } from '../../../../shared/_services/http/process.service';

@Component({
  selector: 'app-transmission-bank-details',
  templateUrl: './transmission-bank-details.component.html',
  styleUrls: ['./transmission-bank-details.component.css']
})
export class TransmissionBankDetailsComponent implements OnInit {

  public select = 1;
  public bankNumber: any;
  public bankNumbers: any[] = [];

  public branchNumber: any;
  public bankBranchNumbers: any[] = [];

  public accountNumber: any;
  public bankAccountNumbers: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public payment: any, public dialogRef: MatDialogRef<TransmissionBankDetailsComponent>,
              private processService: ProcessService) {}

  ngOnInit() {
    this.processService.postBankNumbers(this.payment)
    .then(response => this.bankNumbers = response);
  }

  selectionClickBankNumber(): void {
    this.processService.postBankBranchNumbers(this.payment, this.bankNumber)
    .then(response => this.bankBranchNumbers = response);
  }

  selectionClickAccountNumber(): void {
    this.processService.postBankAccountNumbers(this.payment, this.bankNumber, this.branchNumber)
    .then(response => this.bankAccountNumbers = response);
  }

  sendNewBankDetails(): void {
    this.processService.postNewBankDetails(this.payment, this.bankNumber, this.branchNumber, this.accountNumber, this.select)
    .then(response => this.dialogRef.close(response));
  }

}
