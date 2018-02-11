import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { FeedbackEmployeeTableDetailsComponent } from '../feedback-employee-table-details/feedback-employee-table-details.component';

import { UserSessionService } from '../../../shared/_services/user-session.service';
import { FeedbackService } from '../../_services/http/feedback.service';
import { GeneralHttpService } from '../../_services/http/general-http.service';

import { MONTHS } from '../../../shared/_const/months';
import { FileFeedback } from '../../../shared/_models/file-feedback.model';
import { EmployeeFeedback } from '../../../shared/_models/employee-feedback.model';

import { Select2OptionData } from 'ng2-select2/ng2-select2.interface';
import { PaginationData } from '../../../shared/_models/pagination-data.model';

@Component({
  selector: 'app-feedback-employee-table',
  templateUrl: './feedback-employee-table.component.html',
  styleUrls: ['../../../shared/data-table/data-table.component.css'],
})
export class FeedbackEmployeeTableComponent extends DataTableComponent implements OnInit {

  select2Options: Select2Options;
  manufacturers: Select2OptionData[] = [];
  employers: Select2OptionData[] = [];
  statuses: Select2OptionData[] = [];
  products: Select2OptionData[] = [];
  employees: Select2OptionData[] = [];
  paginationData: PaginationData;
  fileCodes: Select2OptionData[] = [];

  feedback = new FileFeedback;
  selectedValue: string;



  activeFilter: 'manufacturerId' | 'employeeID' | 'fileCodeId';
  isLoadingData = false;
  mode: 'standard' | 'rejected' = 'standard';

  readonly months = MONTHS;
  readonly currentYear = new Date().getFullYear();


  constructor(protected route: ActivatedRoute, private dialog: MatDialog, private userSession: UserSessionService,
              private generalService: GeneralHttpService, private feedbackService: FeedbackService) {
    super(route);
  }

  ngOnInit() {
    if (this.route.snapshot.url[0].path === 'rejected') {
      this.mode = 'rejected';
    }

    this.employers = this.route.snapshot.data['employers'];
    this.searchCriteria['employerID'] = +this.employers[0].id;
//debugger;
    const year = this.route.snapshot.queryParams['year'];
    const month = this.route.snapshot.queryParams['month'];
    const fileCodeId = this.route.snapshot.queryParams['fileCodeId'];
    if (year && month && fileCodeId) {
      this.searchCriteria['month'] = +month;
      this.searchCriteria['year'] = +year;
      this.searchCriteria['fileCodeId'] = +fileCodeId;
    } else {
      const currentMonth = new Date().getMonth() + 1;
      if (currentMonth === 1 ) {
        this.searchCriteria['year'] = this.currentYear - 1;
        this.searchCriteria['month'] = 12;
      } else {
        this.searchCriteria['year'] = this.currentYear;
        this.searchCriteria['month'] = currentMonth - 1;
      }
    }

    this.route.queryParams.subscribe(params => this.setCriteria(params));
    super.ngOnInit();
  }

  private setCriteria(params: Object): void {
    for (const param in params) {
      if (params[param]) {
        if (param === 'months') {
          this.searchCriteria['months'] = JSON.parse(params['months']);
        } else {
          this.searchCriteria[param] = params[param];
        }
      }
    }
  }

  fetchItems(): void {
    this.feedbackService.getEmployeeFeedbacks(this.userSession.getToken(), this.searchCriteria).then(response => this.setItems(response));
  }

  setItems(response: any): void {
    this.isSearching = false;
    this.isLoadingData = true;
    this.products = response.products;
    this.statuses = response.statuses;
    this.items = response.feedbacks;
    this.paginationData = response.paginationData;
    //debugger;
    if (this.activeFilter !== 'manufacturerId') {
      this.manufacturers = this.setSelect2Data(response['manufacturers'], 'בחר חברה מנהלת');
    }
    if (this.activeFilter !== 'fileCodeId') {
      this.fileCodes = this.setSelect2Data(response['fileCodes'], 'בחר קוד קובץ');
      if (this.searchCriteria['fileCodeId']) {
        this.selectedValue = this.searchCriteria['fileCodeId'];
      }
    }

    if (this.activeFilter !== 'employeeID') {
       this.employees = this.setSelect2Data(response['employees'], 'בחר עובד');
     }



    setTimeout(() => this.isLoadingData = false, 0);
  }

  paginateItems(): void {
  this.fetchItems();
  }

  setMonths(month: number): void {
    this.searchCriteria['month'] = month;
    this.newSearch();
  }


  openDetailsDialog(feedback: FileFeedback): void {
    this.dialog.open(FeedbackEmployeeTableDetailsComponent, {
      width: '700px',
      data: {
        feedback: feedback,
        employerId: +this.searchCriteria['employerID']
      }
    });
  }

  getEnumLabel(key:number, enumStr: 'status' | 'productType'): string{
    if (enumStr === 'status' ) {
      return EmployeeFeedback.statusLabel.get(key);
    }
    if (enumStr === 'productType') {
      return EmployeeFeedback.productTypeLabel.get(key);
    }
  }

  getMonthLable(date: string): string {
    const d: Date = new Date(date);
    return this.months[d.getMonth()];
  }

  setSearch(name: 'manufacturerId' | 'employeeID' | 'fileCodeId' , value: number): void {
      if (value !== 0) {
        this.activeFilter = name;

        if (this.isLoadingData) {
          return;
        }
        this.searchCriteria[name] = value;
        this.search();
      }
  }


  private setSelect2Data(values: Object[], textLable: string): Select2OptionData[] {

    const data = [
      { id: '0', text: textLable },
      { id: '-1', text: 'הכל' }
    ];

    for (let i = 0; i < values.length; i++) {
      data[i + 2] = { id: values[i]['id'], text: values[i]['text'] };
    }

    return data;
  }



  private setEmployeeSelect2Data(values: Object[]): Select2OptionData[] {
    const data = [
      { id: '0', text: 'בחר עובד' },
      { id: '-1', text: 'הכל' }
    ];

    for (let i = 0; i < values.length; i++) {
      data[i + 2] = { id: values[i]['id'], text: values[i]['text'] };
    }

    return data;
  }

  newSearch(keyCode?: number): void {
    //debugger;
    this.activeFilter = null;
    this.searchCriteria['manufacturerId'] = -1;
    this.searchCriteria['employeeID'] = -1;
    this.searchCriteria['fileCodeId'] = -1;
    super.search(keyCode);
  }

}
