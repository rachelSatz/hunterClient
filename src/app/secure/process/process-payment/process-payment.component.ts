import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UserSessionService } from '../../../shared/_services/user-session.service';
import { ProcessService } from '../../_services/http/process.service';
import { ProcessMethodService } from '../../_services/http/process-method.service';
import { NotificationService } from '../../_services/notification.service';

import { Process } from '../../../shared/_models/process.model';

import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-process-payment',
  templateUrl: './process-payment.component.html',
  styleUrls: ['./process-payment.component.css']
})
export class ProcessPaymentComponent implements OnInit {

  paymentOption: 'downloadExcel' | 'downloadMasab' | 'mailMasab' | 'paymentMasab';

  @Input() process: Process;
  @Input() isNew: boolean;
  @Output() stepChange = new EventEmitter<{ index: number, process: Process }>();

  constructor(private userSession: UserSessionService, private processService: ProcessService,
              private processMethodService: ProcessMethodService, private notificationService: NotificationService) {}

  ngOnInit() {
    if (this.isNew) {
      this.processService.getProcessDetail(this.process.id, this.userSession.getToken()).then(
        response => this.process.details = response
      );
    }
  }

  downloadExcel(): void {
    this.paymentOption = 'downloadExcel';
    this.processMethodService.downloadExcel(this.process.id, this.userSession.getToken())
    .then(response => FileSaver.save(response, 'export.xls'))
    .catch(res => {
      this.notificationService.showResult(res.error.Message, 1);
    });
  }

  downloadMasab(): void {
    this.paymentOption = 'downloadMasab';
    this.processMethodService.downloadMasab(this.process.id, this.userSession.getToken())
    .then(response => {
      FileSaver.save(response, 'export.001');
    })
    .catch(res => {
     this.notificationService.showResult(res.error.Message, 1);
    });
  }

  mailMasab(): void {
    this.paymentOption = 'mailMasab';
    this.processMethodService.mailMasab(this.process.id, this.userSession.getToken())
    .catch(res => {
      this.notificationService.showResult(res.error.Message, 1);
    });
  }

  setNextStep(): void {
    this.stepChange.emit({ index: 2, process: this.process });
  }
}
