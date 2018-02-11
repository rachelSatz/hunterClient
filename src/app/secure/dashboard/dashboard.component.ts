import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GeneralHttpService } from '../_services/http/general-http.service';
import { UserSessionService } from '../../shared/_services/user-session.service';

import { Employer } from '../../shared/_models/employer.model';

import { MONTHS } from '../../shared/_const/months';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [GeneralHttpService, UserSessionService]
})
export class DashboardComponent implements OnInit {

  readonly doughnutGraph = {
    data: [300, 150],
    labels: ['נפרע', 'לא נפרע'],
    colors: [{
        backgroundColor: ['rgba(66, 167, 239, 1)', 'rgba(204, 204, 200, 1)']
      }]
  };

  employers: Employer[] = [];
  selectedEmployer: Employer;

  readonly months = MONTHS;

  year: string;
  month: string;

  selectedDate = new Date();
  searchCriteria = {};
  countsData = {
    numberEmp: 0,
    numberRef: 0,
    totalNumberRef: 0,
    paidMoney: 0,
    numberSentFiles: 0
  };

  constructor(private route: ActivatedRoute, private generalService: GeneralHttpService, private userSession: UserSessionService) {}

  ngOnInit() {
    this.employers = this.route.snapshot.data['employers'];
    this.selectedEmployer = this.employers[0];

    this.fetchData();
  }

  fetchData(): void {
    this.searchCriteria['employerId'] = this.selectedEmployer.id;
    this.searchCriteria['month'] = this.selectedDate.getMonth() + 1;
    this.searchCriteria['year'] = this.selectedDate.getFullYear();

    this.generalService.getDashboardCounts(this.userSession.getToken(), this.searchCriteria)
      .then(response => {
       if (response.success === 1) {
         this.countsData = response.Data;
       }
      });
  }

  setDate(date: Date): void {
    this.selectedDate = date;
    this.fetchData();
  }

  setEmployer(employer: Employer): void {
    this.selectedEmployer = employer;
    this.fetchData();
  }

}
