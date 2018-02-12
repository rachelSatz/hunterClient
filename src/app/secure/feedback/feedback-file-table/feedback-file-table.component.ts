import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Select2OptionData } from 'ng2-select2/ng2-select2.interface';

import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { FeedbackFileApplicationComponent } from '../feedback-file-application/feedback-file-application.component';

import { FeedbackService } from '../../../shared/_services/http/feedback.service';

import { Employer } from '../../../shared/_models/employer.model';
import { Product } from '../../../shared/_models/product.model';
import { productTypeLable, payTypeLabel } from '../../../shared/_const/EnumLabels';
import { FileFeedback } from '../../../shared/_models/file-feedback.model';

import { MONTHS } from '../../../shared/_const/months';

@Component({
  selector: 'app-feedback-file-table',
  templateUrl: './feedback-file-table.component.html',
  styleUrls: ['../../../shared/data-table/data-table.component.css']
})
export class FeedbackFileTableComponent extends DataTableComponent implements OnInit {

  employers: Employer[] = [];
  product = new Product();

  manufacturers: Select2OptionData[] = [];
  statuses: Select2OptionData[] = [];
  processes: Select2OptionData[] = [];

  activeFilter: 'processId';
  isLoadingData = false;

  selectedValue: string;

  selectedMonthValue: number;
  selectedYearValue: number;


  readonly statusLabels = { 'successful': 'תקין', partial: 'בטיפול', failed: 'שגוי' };
  readonly months = MONTHS;
  readonly currentYear = new Date().getFullYear();

  constructor(protected route: ActivatedRoute, private router: Router, private feedbackService: FeedbackService,
              private dialog: MatDialog) {
    super(route);
  }

  ngOnInit() {

    this.employers = this.route.snapshot.data['employers'];
    this.searchCriteria['employerID'] = +this.employers[0].id;
    const year = this.route.snapshot.queryParams['year'];
    const month = this.route.snapshot.queryParams['month'];
    const processId = this.route.snapshot.queryParams['processId'];
    if (year && month && processId) {
      this.searchCriteria['months'] = [+month];
      this.searchCriteria['year'] = +year;
      this.searchCriteria['processId'] = +processId;
    } else {
      const currentMonth = new Date().getMonth() + 1;
      if (currentMonth === 1 ) {
        this.searchCriteria['year'] = this.currentYear - 1;
        this.searchCriteria['months'] = [12];
      } else {
        this.searchCriteria['year'] = this.currentYear;
        this.searchCriteria['months'] = [currentMonth - 1];
      }
    }
    this.selectedMonthValue = this.searchCriteria['months'];
    this.selectedYearValue = this.searchCriteria['year'];

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

  paginateItems(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.feedbackService.getFileFeedbacks(this.searchCriteria).then(response => this.setItems(response));
  }

  setMonths(month: number): void {
    this.searchCriteria['months'] = month;
    this.selectedMonthValue = month;

    this.newSearch();
  }

  setYear(year: number): void {
    this.searchCriteria['year'] = year;
    this.selectedYearValue = year;
    this.newSearch();
  }


  getPayTypeLabel(key: number): string{
    return payTypeLabel.get(key);
  }

  getproductTypeLable(key: number): string{
    return productTypeLable.get(key);
  }

  setItems(response: any): void {
    this.isLoadingData = true;
    this.isSearching = false;

    this.manufacturers = response.manufacturers;
    this.statuses = response.statuses;
    this.items = response.feedbacks;
    this.paginationData = response.paginationData;

    if (this.activeFilter !== 'processId') {
      this.processes = this.setProcessSelect2Data(response['processes']);
      if (this.searchCriteria['processId']) {
        this.selectedValue = this.searchCriteria['processId'];
      }
    }

    setTimeout(() => this.isLoadingData = false, 0);
  }

  setSearch(name: 'processId', value: number): void {

    if (value !== 0) {
      this.activeFilter = name;

      if (this.isLoadingData) {
        return;
      }
      this.searchCriteria[name] = value;
      this.search();
    }
  }

  private setProcessSelect2Data(values: Object[]): Select2OptionData[] {

    const data = [
      { id: '0', text: 'בחר תהליך' },
      { id: '-1', text: 'הכל' }
    ];

    for (let i = 0; i < values.length; i++) {
      data[i + 2] = { id: values[i]['id'], text: values[i]['text'] };
    }

    return data;
  }

  handleEmployeeInfoClick(fileCodeId: number): void {
    const queryParams = { month: this.selectedMonthValue, year: this.selectedYearValue, fileCodeId: fileCodeId };

    this.router.navigate(['/feedback', 'table', 'employees'], <NavigationExtras>{ queryParams: queryParams });
  }

  newSearch(keyCode?: number): void {

    this.activeFilter = null;
    this.searchCriteria['processId'] = -1;
    super.search(keyCode);
  }

  openDetailsDialog(feedback: FileFeedback): void {
    this.dialog.open(FeedbackFileApplicationComponent, {
      width: '800px',
      data: {
        feedback: feedback,
        employerId: +this.searchCriteria['employerID']
      }
    });
  }

  selectAllMonths() {
    this.searchCriteria['months'] = [];

    for (let i = 1; i < 13; i++) {
      this.searchCriteria['months'].push(i);
    }

    this.fetchItems();
  }
}
