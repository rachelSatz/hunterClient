import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { BaseHttpService } from './base-http.service';
import { UserSessionService } from '../user-session.service';

import { Bank } from '../../_models/bank.model';
import { BankBranch } from '../../_models/bank-branch.model';
import { Manufacturer } from '../../_models/manufacturer.model';
import { Product } from '../../_models/product.model';

@Injectable()
export class GeneralHttpService extends BaseHttpService {
  constructor(userSession: UserSessionService, private http: HttpClient) {
    super(userSession);
  }

  getBanks(): Promise<Bank[]> {
    return this.http.get(this.apiUrl  + '/bank', this.getTokenHeader())
    .toPromise()
    .then(response => response as Bank[]);
  }

  getBankBranches(bankID: number): Promise<BankBranch[]> {
    return this.http.get(this.apiUrl  + '/bank/' + +bankID + '/branch', this.getTokenHeader())
    .toPromise()
    .then(response => response as BankBranch[]);
  }

  getManufacturers(): Promise<Manufacturer[]> {
    return this.http.get(this.apiUrl  + '/manufacturer', this.getTokenHeader())
    .toPromise()
    .then(response => response as Manufacturer[]);
  }

  getProducts(): Promise<Product[]> {
    return this.http.get(this.apiUrl  + '/product', this.getTokenHeader())
    .toPromise()
    .then(response => response as Product[]);
  }

  getProductsByManuf(manufacturerId: number): Promise<Product[]> {
    return this.http.get(this.apiUrl + '/manufacturer/' + manufacturerId + '/product', this.getTokenHeader())
    .toPromise()
    .then(response => response as Product[]);
  }

  getSugTakbulEnum(): Promise<{Key: string, Value: number}[]> {
    return this.http.get(this.apiUrl  + '/sugTakbul', this.getTokenHeader())
    .toPromise()
    .then(response => response as {Key: string, Value: number}[]);
  }

  getStatusDepositEnum(): Promise<{Key: string, Value: number}[]> {
    return this.http.get(this.apiUrl  + '/statusdeposit', this.getTokenHeader())
    .toPromise()
    .then(response => response as {Key: string, Value: number}[]);
  }

  getEmployerTypeSentEnum(): Promise<{Key: string, Value: number}[]> {
    return this.http.get(this.apiUrl  + '/employerTypeSent', this.getTokenHeader())
    .toPromise()
    .then(response => response as {Key: string, Value: number}[]);
  }

  getWorksInSalaryEnum(): Promise<{Key: string, Value: number}[]> {
    return this.http.get(this.apiUrl  + '/statusWorksInSalary', this.getTokenHeader())
    .toPromise()
    .then(response => response as {Key: string, Value: number}[]);
  }

  getFilesByEmployer(employerId: Number): Promise<any> {
    return this.http.get(this.apiUrl + '/employer/' + employerId + '/folders', this.getTokenHeader())
    .toPromise()
    .then(response => response);
  }

  getFilesByEmployee(employeeId: Number): Promise<any> {
    return this.http.get(this.apiUrl + '/employee/' + employeeId + '/folders', this.getTokenHeader())
    .toPromise()
    .then(response => response);
  }

  getDashboardCounts(searchCriteria: Object): Promise<any> {
    const options = this.getTokenHeader();
    options['params'] = searchCriteria;

    return this.http.get(this.apiUrl + '/stats/common', options)
    .toPromise()
    .then(response => response);
  }

  getBarChartData(searchCriteria: Object): Promise<any> {
    const options = this.getTokenHeader();
    options['params'] = searchCriteria;

    return this.http.get(this.apiUrl + '/stats/feedbackCounts', options)
    .toPromise()
    .then(response => response);
  }
}
