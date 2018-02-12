import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { TransmissionIntroFormComponent } from '../transmission-intro-form/transmission-intro-form.component';
import { TransmissionProductDetailsComponent } from './transmission-product-details/transmission-product-details.component';

import { ProcessService } from '../../../shared/_services/http/process.service';

import { Process } from '../../../shared/_models/process.model';
import { EmployeePayment } from '../../../shared/_models/employee-payment.model';
import { TransmissionData } from '../../../shared/_models/transmission-data.model';

import { TransmissionBankDetailsComponent } from './transmission-bank-details/transmission-bank-details.component';
import { TransmissionDateComponent } from './transmission-date/transmission-date.component';
import { TransmissionCommentComponent } from './transmission-comment/transmission-comment.component';
import { productTypeLable, payTypeLabel, SentToSafeBoxes } from '../../../shared/_const/EnumLabels';
import { SendFile } from '../../../shared/_models/send-file.model';
import { NotificationService } from '../../../shared/_services/notification.service';

@Component({
  selector: 'app-process-transmission',
  templateUrl: './process-transmission.component.html',
  styleUrls: ['./process-transmission.component.css']
})
export class ProcessTransmissionComponent implements OnInit {

  @Input() process: Process;
  @Output() stepChange = new EventEmitter<{ index: number, process: Process }>();

  payments: SendFile[] = [];

  public spin = false;

  public checklist: { fileId: number }[] = [{ fileId: 0 }];

  public checkBoxValue = true;

  constructor(private dialog: MatDialog, private processService: ProcessService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    if (this.process.stepStatus !== 1) {
      setTimeout(() => this.setDialog(), 0);
    } else {
      this.loadData();
    }
  }

  private loadData(): void {
    this.spin = true;
    this.processService.loadTransmissionTableData(this.process.id).then(response => {
      this.payments = response['data'];
      this.spin = false;
      this.initChecklist(response['data']);
    });
  }

  private setDialog(): void {
    const dialog = this.dialog.open(TransmissionIntroFormComponent, {
      disableClose: true
    });

    dialog.afterClosed().subscribe(data => {
      if (data === false) {
          this.setPreviousStep();
      } else {
          this.launchTransmission(data);
      }
    });
  }

  private launchTransmission(data: TransmissionData): void {
    this.spin = true;
    this.processService.launchTransmission(this.process.id, data).then(response => {
      this.payments = response['data'];
      this.spin = false;
      this.initChecklist(response['data']);
    });
  }

  initChecklist(data) {
    for (let i = 0; i < data.length; i++) {
      this.checklist.push({ fileId: data[i].id });
    }
  }

  IndexList(i) {
    const x = this.checklist.filter(y => y.fileId === i);
    if (x.length === 0) {
      this.checklist.push({ fileId: i });
    } else {
      this.checklist.splice(this.checklist.findIndex(x => x.fileId === i), 1)
    }
  }

  clearSelectAllIndexList() {
    if (this.checkBoxValue) {
      for (let i = 0; i < this.payments.length; i++) {
        this.checklist.push({ fileId: this.payments[i].id });
      }
    } else {
      this.checklist = [{ fileId: 0 }];
    }
  }

  openProductDetailsDialog(paymentID: number): void {
    this.dialog.open(TransmissionProductDetailsComponent, {
      data: paymentID
    });
  }

  openBankDetailsDialog(payment: EmployeePayment): void {
    const payDetails: { file: EmployeePayment, process: Process } = { file: payment, process: this.process };
    const dialog = this.dialog.open(TransmissionBankDetailsComponent, {
      data: payDetails,
      width: '94%'
    });
    dialog.afterClosed().subscribe(response => {
      this.loadData();
    });
  }

  openCommentDialog(payment: EmployeePayment): void {
    const payDetails: { file: EmployeePayment, process: Process } = { file: payment, process: this.process };
    const dialog = this.dialog.open(TransmissionCommentComponent, {
      data: payDetails
    });
    dialog.afterClosed().subscribe(() => {
      this.loadData();
    });
  }

  openDateDialog(payment: EmployeePayment): void {
    const payDetails: { file: EmployeePayment, process: Process } = { file: payment, process: this.process };
    const dialog = this.dialog.open(TransmissionDateComponent, {
      data: payDetails,
    });
    dialog.afterClosed().subscribe(response => {
      this.loadData();
    });
  }

  SendDetails() {
    if (this.checklist.length > 0) {
      this.checklist.splice(this.checklist.findIndex(x => x.fileId === 0), 1);
    }

    this.processService.postTransition(this.process, this.checklist)
    .then(response => {
       this.notificationService.showResult(response.Message, response.Success);
    });
  }

  setPreviousStep(): void {
    this.stepChange.emit({ index: 1, process: this.process });
  }

  getproductTypeLable(key: number): string{
    return productTypeLable.get(key);
  }

  getPayTypeLabel(key: number): string{
    return payTypeLabel.get(key);
  }

  getSentToSafeBoxesLable(key: number): string{
    return SentToSafeBoxes.get(key);
  }

}
