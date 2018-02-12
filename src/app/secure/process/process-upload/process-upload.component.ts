import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { trigger, state, style, animate, transition } from '@angular/animations';

import { TransitionDialogComponent } from '../../../shared/transition-dialog/transition-dialog.component';
import { PaymentPromptComponent } from './payment-prompt/payment-prompt.component';

import { EmployerService } from '../../../shared/_services/http/employer.service';
import { ProcessService } from '../../../shared/_services/http/process.service';
import { ProcessFileService } from '../../../shared/_services/http/process-file.service';
import { NotificationService } from '../../../shared/_services/notification.service';

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
  providers: [ProcessService]
})
export class ProcessUploadComponent implements OnInit {

  @Output() stepChange = new EventEmitter<{ index: number, process: Process }>();
  @Input() process: Process;

  employers: Employer[] = [];
  readonly months = MONTHS;
  readonly currentYear = new Date().getFullYear();

  paymentsFile: File;
  selectedUploadMethod: 'xml' | 'manual';

  fileTypeError = false;
  noFileError = false;
  genericFileError = false;

  isUploadingFile = false;

  activeUploadStep = 1;
  isPaymentTransferred: boolean;


  constructor(private employerService: EmployerService, private processService: ProcessService,
              private processFileService: ProcessFileService, private notificationService: NotificationService,
              private dialog: MatDialog) {}

  ngOnInit() {
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
    this.genericFileError = false;
  }

  setActiveUploadStep(nextStep: number, processForm: NgForm): void {

    if (nextStep === 2 && !processForm.valid) {
      return;
    }

    if (nextStep === 3) {
      if (!this.paymentsFile) {
        return;
      }

      this.dialog.open(PaymentPromptComponent, {
        height: '300px',
        width: '450px'
      });

      this.isUploadingFile = true;

      this.processFileService.uploadFile(this.process, this.paymentsFile).then(response => {
        setTimeout(() => {
          if (response) {
            this.activeUploadStep = nextStep;
          } else {
            this.genericFileError = true;
          }

          this.isUploadingFile = false;
        }, 1500);
      });
    }

    if (nextStep === 2) {
      this.activeUploadStep = nextStep;
    }
  }

  setUploadProgressStep(isPaymentTransferred: boolean): void {
    this.activeUploadStep = 4;
    this.isPaymentTransferred = isPaymentTransferred;
    this.processFileService.getFileUploadStatus(this.process.id);
  }

  setStepChange(index: number): void {
    this.stepChange.emit({ index: index, process: this.process });
  }
}
