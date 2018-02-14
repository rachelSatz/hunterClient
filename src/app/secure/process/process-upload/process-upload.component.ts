import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { trigger, state, style, animate, transition } from '@angular/animations';

import { TransitionDialogComponent } from '../../../shared/transition-dialog/transition-dialog.component';
import { PaymentPromptComponent } from './payment-prompt/payment-prompt.component';

import { EmployerService } from '../../../shared/_services/http/employer.service';
import { ProcessService } from '../../../shared/_services/http/process.service';
import { ProcessFileService } from '../../../shared/_services/http/process-file.service';
import { NotificationService, NotificationType } from '../../../shared/_services/notification.service';

import { Process } from '../../../shared/_models/process.model';
import { Employer } from '../../../shared/_models/employer.model';

import { MONTHS } from '../../../shared/_const/months';

@Component({
  selector: 'app-process-upload',
  templateUrl: './process-upload.component.html',
  styleUrls: ['./process-upload.component.css'],
  animations: [
    trigger('fadeIn', [
      state('inactive', style({
        opacity: '0',
        display: 'none'
      })),
      state('active', style({
        opacity: '1',
        display: '*'
      })),
      transition('inactive => active', animate('400ms ease-in')),
      transition('active => inactive', animate('400ms ease-out'))
    ])
  ],
  providers: [ProcessService, NotificationService]
})
export class ProcessUploadComponent implements OnInit, OnDestroy {

  process: Process;

  employers: Employer[] = [];
  readonly months = MONTHS;
  readonly currentYear = new Date().getFullYear();

  paymentsFile: File;
  selectedUploadMethod: 'xml' | 'manual';

  fileTypeError = false;
  noFileError = false;

  activeUploadStep = 1;
  isPaymentTransferred: boolean;

  paymentDialogSubscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private employerService: EmployerService,
              private processService: ProcessService, private processFileService: ProcessFileService,
              private notificationService: NotificationService, private dialog: MatDialog) {}

  ngOnInit() {
    if (this.route.parent.snapshot.data['process']) {
      this.process = this.route.parent.snapshot.data['process'].data.process;
    } else {
      this.process = new Process;
      this.process.year = this.currentYear;
    }

    this.employerService.getEmployers().then(response => this.employers = response);
  }

  getTitle(): string {
    switch (this.activeUploadStep) {
      case 1:
        return 'נתוני תהליך';
      case 2:
        return 'טעינת קובץ אחיד';
      case 3:
        return 'הקובץ בטעינה';
    }
  }

  openTransitionDialog(): void {
    this.dialog.open(TransitionDialogComponent, {
      data: 'הנחיית התשלום תשלח למייל בסיום עיבוד הקובץ',
      height: '150px',
      width: '300px'
    });
  }

  setFile(file: File) {

    if (this.paymentsFile) {
      return;
    }

    const ext = file.name.substr(file.name.indexOf('.') + 1);
    if (['xml', 'XML', 'dat', 'DAT'].indexOf(ext) === -1) {
      this.fileTypeError = true;
      return;
    }

    if (this.fileTypeError) {
      this.fileTypeError = false;
    }

    if (this.noFileError) {
      this.noFileError = false;
    }

    this.paymentsFile = file;
  }

  removeFile(): void {
    this.paymentsFile = null;
  }

  setActiveUploadStep(nextStep: number, processForm: NgForm): void {

    if (nextStep === 2 && !processForm.valid) {
      return;
    }

    if (nextStep === 3) {
      if (!this.paymentsFile) {
        return;
      }

      const dialog = this.dialog.open(PaymentPromptComponent, {
        height: '200px',
        width: '450px'
      });

      this.paymentDialogSubscription = dialog.afterClosed().subscribe((message) => {

        this.process.pay = message;

        this.processFileService.uploadFile(this.process, this.paymentsFile).then(processNumber => {
          this.activeUploadStep = nextStep;
          this.process.id = processNumber;

          if (processNumber) {
              this.activeUploadStep = nextStep;
              this.checkFileStatus(processNumber);
            } else {
              this.notificationService.showResult('', NotificationType.error);
            }
        });
      });
    }

    if (nextStep === 2) {
      this.activeUploadStep = nextStep;
    }
  }

  private checkFileStatus(processNumber: number): void {
    const checkStatus = new Promise<boolean>((resolve) => {
      const interval = setInterval(() => {
        this.processFileService.getFileUploadStatus(processNumber).then((response) => {
          if (!response) {
            this.notificationService.showResult(response['message'], NotificationType.error);
            return;
          }

          if (response['progressPercent'] === 100) {
            clearInterval(interval);
            resolve();
          }
        });
      }, 5000);
    });

    const url = this.process.pay ? 'transmission' : 'payments';

    checkStatus.then(() => this.router.navigate(['..', this.process.id, url], { relativeTo: this.route }));
  }

  ngOnDestroy() {
    if (this.paymentDialogSubscription) {
      this.paymentDialogSubscription.unsubscribe();
    }
  }
}
