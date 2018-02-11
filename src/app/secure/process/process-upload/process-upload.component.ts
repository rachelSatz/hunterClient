import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { UserSessionService } from '../../../shared/_services/user-session.service';
import { EmployerService } from '../../_services/http/employer.service';
import { ProcessService } from '../../_services/http/process.service';
import { ProcessFileService } from '../../_services/http/process-file.service';
import { NotificationService } from '../../_services/notification.service';

import { Process } from '../../../shared/_models/process.model';
import { Employer } from '../../../shared/_models/employer.model';

import { MONTHS } from '../../../shared/_const/months';
import {MatDialog} from "@angular/material";
import {TransitionDialogComponent} from "../../../shared/transition-dialog/transition-dialog.component";

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
  ]
})
export class ProcessUploadComponent implements OnInit {

  @Output() stepChange = new EventEmitter<{ index: number, process: Process }>();
  @Input() process: Process;

  employers: Employer[] = [];
  readonly months = MONTHS;
  readonly currentYear = new Date().getFullYear();

  file: File = <File>{};
  selectedUploadMethod: 'xml' | 'manual';

  uploadProgressPercent: number;
  isFileUploaded = false;

  activeUploadStep = 2;

  constructor(private userSession: UserSessionService, private employerService: EmployerService,
              private processService: ProcessService, private processFileService: ProcessFileService,
              private notificationService: NotificationService, private dialog: MatDialog) {}

  ngOnInit() {
    this.employerService.getEmployers(this.userSession.getToken()).then(response => this.employers = response);
  }

  checkFileType(): boolean {
    if (!this.file.name  || !this.selectedUploadMethod) {
      return true;
    }

    const ext = this.file.name.substr(this.file.name.indexOf('.') + 1);

    switch (this.selectedUploadMethod) {
      case 'xml':
        if (['xml', 'XML', 'dat', 'DAT'].indexOf(ext) !== -1) {
          return true;
        }
        break;
      // case 'excel':
      //   if (ext === 'xls' || ext === 'xlsx') {
      //     return true;
      //   }
      //   break;
      case 'manual':
        return true;
    }

    return false;
  }

  uploadFile(isValid: boolean): void {
    if (isValid && this.selectedUploadMethod !== 'manual') {
      this.uploadProgressPercent = 1;
      this.processFileService.uploadFile(this.process, this.file, this.userSession.getToken())
        .then(response => this.setUploadFile(response['processNumber']))
        .catch(response => {
          this.uploadProgressPercent = null;
          if (response.error.message) {
            this.notificationService.showResultHTML(response.error.message , 1);
          }
        });
    }
  }

  private setUploadFile(processID: number): void {
    this.process.id = processID;
    const intervalInstance = setInterval(() => this.processFileService.getFileUploadStatus(this.process.id, this.userSession.getToken())
      .then(response => this.handleCheckFileStatus(response['progressPercent'], intervalInstance))
      .catch(response => {
        debugger;
        this.uploadProgressPercent = null;
        if (response.error.message) {
          clearInterval(intervalInstance);
          this.notificationService.showResultHTML(response.error.message, 1);
        }
      }), 10000);
  }

  private handleCheckFileStatus(percent: number, intervalInstance): void {
    this.uploadProgressPercent = percent > 0 ? percent : 1 ;
    if (percent === 100) {
      clearInterval(intervalInstance);
      setTimeout(() => this.isFileUploaded = true, 3000);
    }
  }

  getTitle(): string {
    switch (this.activeUploadStep) {
      case 1:
        return 'נתוני תהליך';
      case 2:
        return 'טעינת קובץ אחיד';
      case 3:
        return 'האם התשלום הועבר לקופות?';
      case 4:
        return 'הקובץ בטעינה';
    }
  }

  openTransitionDialog(): void {
    this.dialog.open(TransitionDialogComponent, {
      data: 'הנחיית התשלום תשלח למייל בסיום עיבוד הקובץ',
      height: '300px',
      width: '450px'
    });
  }

  setStepChange(index: number): void {
    this.stepChange.emit({ index: index, process: this.process });
  }
}
