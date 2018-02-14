import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

import { DataTableComponent } from '../../shared/data-table/data-table.component';

import { ProcessService } from '../../shared/_services/http/process.service';
import { ProcessFileService } from '../../shared/_services/http/process-file.service';
import { EmployerService } from '../../shared/_services/http/employer.service';
import { NotificationService, NotificationType } from '../../shared/_services/notification.service';

import { Employer } from '../../shared/_models/employer.model';
import { Process, ValidityStatus, StepStatus } from '../../shared/_models/process.model';

import { MONTHS } from '../../shared/_const/months';

import * as FileSaver from 'file-saver';

declare let swal: any;

@Component({
  selector: 'app-process-table',
  templateUrl: './process-table.component.html',
  styleUrls: ['../../shared/data-table/data-table.component.css']
})
export class ProcessTableComponent extends DataTableComponent implements OnInit {

  readonly months = MONTHS;
  readonly currentYear = new Date().getFullYear();

  employers: Employer[];
  process = new Process;

  validityStatus = ValidityStatus;
  stepStatus = StepStatus;

  readonly headers = [
    { column: 'addToProcessName', label: 'שם תהליך' }, { column: 'id', label: 'מספר תהליך' },
    { column: 'month', label: 'חודש' }, { column: 'year', label: 'שנה' },
    { column: 'codeFile', label: 'קוד' }, { column: 'totalPaymentFile', label: 'סכום' },
    { column: 'statusTransmit', label: 'סטטוס שידור' },
  ];

  searchCriteria: { employerID: number, year: number, months: number[] };

  constructor(protected route: ActivatedRoute, private processService: ProcessService,
              private processFileService: ProcessFileService,
              private employerService: EmployerService, private router: Router,
              private notificationService: NotificationService) {
    super(route);
  }

  ngOnInit() {
    this.employerService.getEmployers().then(response => this.init(response));
  }

  private init(response: Employer[]): void {
    this.employers = response;
    this.searchCriteria.employerID = this.employers[0].id;
    this.searchCriteria.year = (new Date().getMonth() === 0) ? new Date().getFullYear() -  1 : new Date().getFullYear();
    this.fetchItems();
  }

  selectAllMonths() {
    this.searchCriteria.months = [];

    for (let i = 1; i < 13; i++) {
      this.searchCriteria.months.push(i);
    }

    this.fetchItems();
  }

  fetchItems(): void {
    this.processService.getProcesses(this.searchCriteria, this.orderCriteria).then(
      response => this.setItems(response)
    );
  }

  downloadFile(processID: number): void {
    this.processFileService.downloadProcessFile(processID).then(response => {
      FileSaver.save(response, 'export.dat');
    })
    .catch(() =>
      this.notificationService.showResult('הקובץ אינו קיים במערכת', NotificationType.error)
    );
  }

  openProcessStatusErrorMessageComponent(): void {
    swal({
      title: '',
      text: 'שגיאה בטעינת הנתונים',
      type: 'warning',
      confirmButtonText: 'המשך'
    });
  }

  handleProcessClick(process: Process): void {

    switch (process.stepStatus) {
      case -1:
        this.openProcessStatusErrorMessageComponent();
      break;
      case 1:
        this.router.navigate(['/process', 'new', process.id]);
      break;
      case 2:
        const url = process.pay ? 'transmission' : 'payment';
        this.router.navigate(['/process', 'new', process.id, url]);
      break;
      default:
        this.router.navigate(['/feedback', 'table', 'files'],
        <NavigationExtras>{ queryParams: { month: process.month, year: process.year, processId: process.id }});
    }
  }

}
