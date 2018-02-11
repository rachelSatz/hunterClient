import { Component, OnInit, Input } from '@angular/core';
import { Router} from '@angular/router';

import { UserSessionService } from '../../../shared/_services/user-session.service';
import { EmployerService } from '../../_services/http/employer.service';

import { MONTHS } from '../../../shared/_const/months';
import { Employer } from '../../../shared/_models/employer.model';
import { EmployeeFeedback } from '../../../shared/_models/employee-feedback.model';
import { GeneralHttpService } from '../../_services/http/general-http.service';
import { BarChartDataItem } from '../../../shared/_models/BarChartDataItem.model';

@Component({
  selector: 'app-feedback-graph',
  templateUrl: './feedback-graph.component.html',
  styleUrls: ['./feedback-graph.component.css'],
  providers: [EmployerService]
})
export class FeedbackGraphComponent implements OnInit {

  @Input() graphOnly = false;

  constructor(private router: Router,
     private userSession: UserSessionService,
      private employerService: EmployerService,
    private generalService: GeneralHttpService) {}

  feedback = new EmployeeFeedback();

  employers: Employer[] = [];

  readonly months = MONTHS;
  readonly currentYear = new Date().getFullYear();
  readonly currentMonth = new Date().getMonth() + 1;
  readonly searchCriteria = { employerId: 0, year: this.currentYear, months: [this.currentMonth]};

  chartOptions= {};


  // readonly chartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];

  // readonly chartData = [
  //   { data: [28, 28, 20, 12, 56, 12, 40], label: 'לא נפרעו',  },
  //   { data: [55, 55, 40, 21, 86, 34, 55], label: 'נפרעו חלקית' },
  //   { data: [100, 100, 60, 32, 106, 65, 90], label: 'נפרעו' }
  // ];

  chartData : {data: number[], label: string}[] = [];
  chartLabels: string[] = [];

  chartDataReady = false;

  readonly chartColors = [{
      backgroundColor: 'rgba(251, 103, 131, 1)'
    },
    {
      backgroundColor: 'rgba(249, 197, 135, 1)'
    },
    {
      backgroundColor: 'rgba(87, 189, 190, 1)'
  }];

  ngOnInit() {
    this.chartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
    //   tooltips: {
    //     mode: 'index',
    //     intersect: false
    // },
      scales: {
        xAxes: [{
          stacked: true,
           ticks: {
            display: !this.graphOnly,
             autoSkip: this.graphOnly ? true : false
         }
        }
      ],
      yAxes: [{
        stacked: true
    }]
      },
      legend: {
        position: 'bottom'
      }
    };

  this.employerService.getEmployers(this.userSession.getToken()).then(response => {
    this.employers = response;
    this.searchCriteria.employerId = this.employers[0].id;
    this.getBarChartData();
  });
  }

  private getBarChartData(): void {
    if(this.searchCriteria.months.length === 0) {delete this.searchCriteria.months;}
    this.generalService.getBarChartData(this.userSession.getToken(),this.searchCriteria)
    .then(response => this.setChartData(response))
  }

  setChartData(response: BarChartDataItem[]): void {

    this.chartDataReady = false;

    if (response.length === 0) {
      return;
    }

    this.chartData = [];
    this.chartLabels = [];

    const unpaidArr: number[] = [];
    const paidArr: number[] = [];
    const fullyPaidArr: number[] = [];

    for (let i of response) {
      unpaidArr.push(i.unpaid);
      paidArr.push(i.paid);
      fullyPaidArr.push(i.fullyPaid);
      this.chartLabels.push(i.manufacturerName);
   }

   this.chartData.push({data: fullyPaidArr, label: 'נפרעו'})
   this.chartData.push({data: paidArr, label: 'נפרעו חלקית'})
   this.chartData.push({data: unpaidArr, label: 'לא נפרעו'})
   this.chartDataReady = true;
  }

  setMonths(values: number[]): void {

    this.searchCriteria.months = [];
    if (values.findIndex(x => x === 0) !== -1) {

      for (let i = 0; i <= 12; i++) {
        this.searchCriteria.months.push(i);
      }

    } else {
      for (const i of values) {
        this.searchCriteria.months.push(i);
      }
    }

    this.getBarChartData();
    // this.searchCriteria.months = [];
    // for (let i = 0; i < values.length; i++) {
    //   this.searchCriteria.months.push(values[i]);
    //   if (values[i] === 0) {
    //     this.searchCriteria.months = [];
    //     //this.searchCriteria.months = ['full'];
    //     for (let a = 0; a < this.months.length; a++) {
    //       this.searchCriteria.months.push(a + 1);
    //     }

    //     break;
    //   }
    // }
  }

  setEmployer(id: number): void {
    this.searchCriteria.employerId = id;
    this.getBarChartData();
  }

  setYear(year: number): void {
    this.searchCriteria.year = year;
    this.getBarChartData();
  }


  chartClicked(e: { event: MouseEvent, active: any[]}): void {
    let sectionClicked;
debugger;
    const yCords = [];

    for (let i = 0; i < e.active.length; i++) {
      yCords[e.active[i]._model.y] = e.active[i]._model.datasetLabel;
    }

    for (const i in yCords) {
      if (e.event.offsetY >= +i) {
        sectionClicked = yCords[i];
      }
    }

    const status = this.feedback.getStatusLabels(sectionClicked, 'value');
    const company = e.active[0]._model.label;

    this.router.navigate(['/feedback/table/employees'], { queryParams: {
      employer: this.searchCriteria.employerId,
      year: this.searchCriteria.year,
      months: JSON.stringify(this.searchCriteria.months),
      status: status,
      company: company
    }
    });

  }
}
