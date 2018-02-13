import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Select2OptionData } from 'ng2-select2/ng2-select2.interface';

import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { FeedbackFileApplicationComponent } from '../feedback-file-application/feedback-file-application.component';

import { FeedbackService } from '../../../shared/_services/http/feedback.service';

import { FileFeedback } from '../../../shared/_models/file-feedback.model';
import { Product } from '../../../shared/_models/product.model';
import { Employer } from '../../../shared/_models/employer.model';

import { MONTHS } from '../../../shared/_const/months';

@Component({
  selector: 'app-rejected-file',
  templateUrl: './rejected-file.component.html',
  styleUrls: ['../../../shared/data-table/data-table.component.css']
})
export class RejectedFileComponent extends DataTableComponent implements OnInit {
  employers: Employer[] = [];
  product = new Product();

  manufacturers: Select2OptionData[] = [];
  statuses: Select2OptionData[] = [];
  processes: Select2OptionData[] = [];

  appDestiny: Select2OptionData[] = [];
  appSubject: Select2OptionData[] = [];

  activeFilter: 'processId';
  isLoadingData = false;

  selectedValue: string;


  readonly months = MONTHS;
  readonly currentYear = new Date().getFullYear();

  constructor(protected route: ActivatedRoute, private feedbackService: FeedbackService, private dialog: MatDialog) {
    super(route);
  }

  ngOnInit() {
    this.employers = this.route.snapshot.data['employers'];
    this.searchCriteria['employerID'] = +this.employers[0].id;


    const currentMonth = new Date().getMonth() + 1;
    if (currentMonth === 1 ) {
      this.searchCriteria['year'] = this.currentYear - 1;
      this.searchCriteria['months'] = [12];
    } else {
      this.searchCriteria['year'] = this.currentYear;
      this.searchCriteria['months'] = [currentMonth - 1];
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
    this.feedbackService.getErrorFileFeedbacks(this.searchCriteria).then(response => this.setItems(response));
  }

  setItems(response: any): void {

    this.isLoadingData = true;
    this.isSearching = false;
    this.items = response.feedbacks;

    this.paginationData = response.paginationData;
    this.manufacturers = response.manufacturers;
    this.statuses = response.statuses;
    this.appSubject = response.appSubject;
    this.appDestiny = response.appDestiny;

    if (this.activeFilter !== 'processId') {
      this.processes = this.setProcessSelect2Data(response['processes']);
      if (this.searchCriteria['processId']) {
        this.selectedValue = this.searchCriteria['processId'];
      }
    }

    setTimeout(() => this.isLoadingData = false, 0);
  }

  paginateItems(): void {
    this.fetchItems();
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

  setMonths(month: number): void {
    this.searchCriteria['months'] = month;
    this.newSearch();
  }

  setYear(year: number): void {
    this.searchCriteria['year'] = year;
    this.newSearch();
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

  getMonthLabel(date: string): string {
    const d: Date = new Date(date);
    return this.months[d.getMonth()];
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
        feedback: feedback
      }
    });
  }
}
