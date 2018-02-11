import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProcessService } from '../../../_services/http/process.service';
import { UserSessionService } from '../../../../shared/_services/user-session.service';

@Component({
  selector: 'app-transmission-date',
  templateUrl: './transmission-date.component.html',
  styleUrls: ['./transmission-date.component.css']
})
export class TransmissionDateComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public payment: any, private userSession: UserSessionService, private processService: ProcessService
  , public dialogRef: MatDialogRef<TransmissionDateComponent>) { }

date: string;

ngOnInit() { }

submit(isValid: boolean): void {
  //debugger;
  if (isValid) {
    this.processService.postNewDateDetails(this.payment, this.date, this.userSession.getToken()).then(response => this.dialogRef.close(response));
  }
}

}
