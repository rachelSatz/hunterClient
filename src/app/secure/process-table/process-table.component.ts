import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

import { DataTableComponent } from '../../shared/data-table/data-table.component';

import { UserSessionService } from '../../shared/_services/user-session.service';
import { ProcessService } from '../_services/http/process.service';
import { ProcessFileService } from '../_services/http/process-file.service';
import { EmployerService } from '../_services/http/employer.service';
import { NotificationService } from '../_services/notification.service';

import { DataTableHeader } from '../../shared/_models/data-table/data-table-header.model';
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

  readonly headers: DataTableHeader[] = [
    { column: 'addToProcessName', label: 'שם תהליך' }, { column: 'id', label: 'מספר תהליך' }, { column: 'month', label: 'חודש' },
    { column: 'year', label: 'שנה' }, { column: 'codeFile', label: 'קוד' }, { column: 'totalPaymentFile', label: 'סכום' },
    { column: 'statusTransmit', label: 'סטטוס שידור' },
  ];

  searchCriteria: { employerID: number, year: number, months: number[] };

  constructor(protected route: ActivatedRoute,
              private userSession: UserSessionService,
              private processService: ProcessService,
              private processFileService: ProcessFileService,
              private employerService: EmployerService,
              private router: Router,
              private notificationService: NotificationService) {
    super(route);
  }

  ngOnInit() {
    this.employerService.getEmployers(this.userSession.getToken()).then(response => this.init(response));
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
    this.processService.getProcesses(this.userSession.getToken(), this.searchCriteria, this.orderCriteria).then(response => this.setItems(response));
  }

  downloadFile(processID: number): void {
    this.processFileService.downloadProcessFile(processID, this.userSession.getToken()).then(response => {
      FileSaver.save(response, 'export.dat');
    }).catch(response => this.notificationService.showResult('הקובץ אינו קיים במערכת', 1));
  }

  openProcessStatusErrorMessageComponent(): void {
    swal({
      title: '',
      text: 'שגיאה בטעינת הנתונים',
      type: 'warning',
      confirmButtonText: 'המשך'
    });
  }

  handleProcessClick(StepStatus: number, processID: number, month: number, year: number): void {
    switch (StepStatus) {
      case -1:
        this.openProcessStatusErrorMessageComponent();
      break;
      case 1:
        this.router.navigate(['/process', 'new', processID]);
      break;
      case 2:
        this.router.navigate(['/process', 'new', processID]);
      break;
      default:
        this.router.navigate(['/feedback', 'table', 'files'],
        <NavigationExtras>{ queryParams: { month: month, year: year, processId: processID}});
    }
  }

}
