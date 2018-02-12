import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ProcessService } from '../../../shared/_services/http/process.service';
import { ProcessMethodService } from '../../../shared/_services/http/process-method.service';
import { NotificationService } from '../../../shared/_services/notification.service';

import { Process } from '../../../shared/_models/process.model';

import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-process-payment',
  templateUrl: './process-payment.component.html',
  styleUrls: ['./process-payment.component.css'],
  providers: [ProcessService, ProcessMethodService]
})
export class ProcessPaymentComponent implements OnInit {

  paymentOption: 'downloadExcel' | 'downloadMasab' | 'mailMasab' | 'paymentMasab';

  @Input() process: Process;
  @Input() isNew: boolean;
  @Output() stepChange = new EventEmitter<{ index: number, process: Process }>();

  constructor(private processService: ProcessService, private processMethodService: ProcessMethodService,
              private notificationService: NotificationService) {}

  ngOnInit() {
    if (this.isNew) {
      this.processService.getProcessDetail(this.process.id).then(
        response => this.process.details = response
      );
    }
  }

  downloadExcel(): void {
    this.paymentOption = 'downloadExcel';
    this.processMethodService.downloadExcel(this.process.id)
    .then(response => FileSaver.save(response, 'export.xls'))
    .catch(res => {
      this.notificationService.showResult(res.error.Message, 1);
    });
  }

  downloadMasab(): void {
    this.paymentOption = 'downloadMasab';
    this.processMethodService.downloadMasab(this.process.id)
    .then(response => {
      FileSaver.save(response, 'export.001');
    })
    .catch(res => {
     this.notificationService.showResult(res.error.Message, 1);
    });
  }

  mailMasab(): void {
    this.paymentOption = 'mailMasab';
    this.processMethodService.mailMasab(this.process.id)
    .catch(res => {
      this.notificationService.showResult(res.error.Message, 1);
    });
  }

  setNextStep(): void {
    this.stepChange.emit({ index: 2, process: this.process });
  }
}
