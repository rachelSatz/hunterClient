import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProcessService } from '../../../shared/_services/http/process.service';
import { ProcessMethodService } from '../../../shared/_services/http/process-method.service';
import { NotificationService, NotificationType } from '../../../shared/_services/notification.service';

import { Process } from '../../../shared/_models/process.model';

import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-process-payment',
  templateUrl: './process-payment.component.html',
  styleUrls: ['./process-payment.component.css'],
  providers: [ProcessService, ProcessMethodService, NotificationService]
})
export class ProcessPaymentComponent implements OnInit {

  process: Process;
  paymentOption: 'downloadExcel' | 'downloadMasab' | 'mailMasab';

  showPaymentOptions = false;

  constructor(private route: ActivatedRoute, private processService: ProcessService,
              private processMethodService: ProcessMethodService, private notificationService: NotificationService) {}

  ngOnInit() {
    this.process = this.route.parent.snapshot.data['process'].data.process;

    this.processService.getProcessDetail(this.process.id).then(
      response => this.process.details = response
    );
  }

  downloadExcel(): void {
    this.paymentOption = 'downloadExcel';
    this.processMethodService.downloadExcel(this.process.id)
    .then(response => FileSaver.save(response, 'export.xls'))
    .catch(res => {
      this.notificationService.showResult(res.error.Message, NotificationType.error);
    });
  }

  downloadMasab(): void {
    this.paymentOption = 'downloadMasab';
    this.processMethodService.downloadMasab(this.process.id)
    .then(response => {
      FileSaver.save(response, 'export.001');
    })
    .catch(res => {
     this.notificationService.showResult(res.error.Message, NotificationType.error);
    });
  }

  mailMasab(): void {
    this.paymentOption = 'mailMasab';
    this.processMethodService.mailMasab(this.process.id)
    .catch(res => {
      this.notificationService.showResult(res.error.Message, NotificationType.error);
    });
  }
}
