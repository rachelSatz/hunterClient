import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable()
export class ServiceDashboardService {
  isChangeSelect: Subject<boolean> = new Subject;
  year :number;
  month:number;
  EmployerID:number;
  searchCriteria:{};
  constructor() {
   }
SetSelect(EmployerID: number, year: number,month:number): void {
	console.log('SetSelect year-', year);
  console.log('SetSelect month-', month);
     this.EmployerID = EmployerID;
     this.year = year;
     this.month = month;
     console.log('SetSelect-EmployerID', EmployerID);
     
     	this.isChangeSelect.next(true);
  }
getSelect(){
  console.log('getSelect-EmployerID', this.EmployerID);
 return this.searchCriteria = { employerId: this.EmployerID, year: this.year, months: [this.month]};
}
}
