import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material';

import { UserSessionService } from '../../../../shared/_services/user-session.service';
import { ProcessService } from '../../../_services/http/process.service';
import { details } from '../../../../shared/_models/details.model';

@Component({
  selector: 'app-transmission-product-details',
  templateUrl: './transmission-product-details.component.html',
  styleUrls: ['./transmission-product-details.component.css']
})
export class TransmissionProductDetailsComponent implements OnInit {

  details: details[] = [];
  
  constructor(@Inject(MAT_DIALOG_DATA) public paymentID: number, private userSession: UserSessionService, private processService: ProcessService) {}

  ngOnInit() {
    this.processService.getTransmissionFileDetails(this.paymentID, this.userSession.getToken()).then(response => this.details = response);
  }

}
