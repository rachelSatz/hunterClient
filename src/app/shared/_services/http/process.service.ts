import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { BaseHttpService } from './base-http.service';
import { UserSessionService } from '../user-session.service';

import { Process } from '../../_models/process.model';
import { ProcessDetails } from '../../_models/process-details.model';
import { ProductPayment } from '../../_models/product-payment.model';
import { DataTableOrderCriteria } from '../../_models/data-table/data-table-order-criteria.model';
import { TransmissionData } from '../../_models/transmission-data.model';
import { EmployeePayment } from '../../_models/employee-payment.model';

@Injectable()
export class ProcessService extends BaseHttpService {

  readonly endPoint = this.apiUrl + '/process';

  constructor(userSession: UserSessionService, private http: HttpClient) {
    super(userSession);
  }

  getProcess(processID: number): Promise<Process> {
    return this.http.get(this.endPoint + '/' + processID, this.getTokenHeader())
    .toPromise()
    .then(response => response as Process);
  }

  getProcesses(searchCriteria?: Object, orderCriteria?: DataTableOrderCriteria): Promise<Process[]> {
    const options = this.getTokenHeader();
    options['params'] = Object.assign(searchCriteria, orderCriteria);

    return this.http.get( this.apiUrl + '/process',  options)
    .toPromise()
    .then(response => response as Process[]);
  }

  getProcessDetail(processID: number): Promise<ProcessDetails> {
    return this.http.get( this.endPoint + '/' + processID + '/details', this.getTokenHeader())
    .toPromise()
    .then(response => response as ProcessDetails);
  }

  getEmployeePayments(searchCriteria: Object): Promise<Object[]> {
    const options = this.getTokenHeader();
    options['params'] = searchCriteria;

    return this.http.get( this.endPoint + '/employee', options)
    .toPromise()
    .then(response => response as Object[]);
  }

  getProductPayments(processID: number, searchCriteria?: Object): Promise<Object[]> {

    const options = this.getTokenHeader();
    if (searchCriteria) {
      options['params'] = searchCriteria;
    }

    return this.http.get( this.endPoint + '/' + processID + '/product', options)
    .toPromise()
    .then(response => response as ProductPayment[]);
  }

  launchTransmission(processID: number, data: TransmissionData): Promise<EmployeePayment[]> {
    return this.http.post( this.endPoint + '/' + processID + '/transmission', data, this.getTokenHeader())
    .toPromise()
    .then(response => response as EmployeePayment[]);
  }

  loadTransmissionTableData(processID: number): Promise<EmployeePayment[]> {
    return this.http.get( this.endPoint + '/' + processID + '/transmission', this.getTokenHeader())
    .toPromise()
    .then(response => response as EmployeePayment[]);
  }

  getTransmissionFileDetails(fileID: number): Promise<any[]> {
    return this.http.get( this.endPoint + '/file/' + fileID, this.getTokenHeader())
    .toPromise()
    .then(response => response as any[]);
  }

  postBankNumbers(payment: any): Promise<any[]> {

    const body = {
      processId: payment.process.id,
      fileId: payment.file.id,
    };

    return this.http.post( this.apiUrl + '/bank/numbers', body, this.getTokenHeader())
    .toPromise()
    .then(response => response as any[]);
  }

  postBankBranchNumbers(payment: any, bankNumber: number): Promise<any[]> {

    const body = {
      AutoId: payment.file.employer.id,
      bankId: bankNumber,
      fileId: payment.file.id,
    };

    return this.http.post( this.apiUrl + '/bank/branch/numbers', body, this.getTokenHeader())
    .toPromise()
    .then(response => response as any[]);
  }

  postBankAccountNumbers(payment: any, bankNumber: number, branchNumber: number): Promise<any[]> {

    const body = {
      AutoId: payment.file.employer.id,
      bankId: bankNumber,
      branchId: branchNumber,
      fileId: payment.file.id,
    };

    return this.http.post( this.apiUrl + '/bank/account/numbers', body, this.getTokenHeader())
    .toPromise()
    .then(response => response as any[]);
  }

  postNewBankDetails(payment: any, bankNumber: number, branchNumber: number, accountNumber: number, select: number): Promise<any[]> {

    const body = {
      AutoId: payment.file.employer.id,
      bankId: bankNumber,
      branchId: branchNumber,
      fileId: payment.file.id,
      accountNumber: accountNumber,
      selection: select - 1,
    };

    return this.http.post( this.apiUrl + '/bank/final', body)
    .toPromise()
    .then(response => response as any[]);
  }


  storeComment(payment: any, remark: string): Promise<any[]> {

    const body = {
      processId: payment.process.id,
      remarkManualId: payment.file.id,
      remarkManualValue: remark,
      AutoID: payment.file.employer.id,
    };

    return this.http.post( this.endPoint + '/' + payment.process.id + '/comment', body,
    this.getTokenHeader())
    .toPromise()
    .then(response => response as any[]);
  }

  postTransition(payment: any, checklist: any): Promise<any> {

    const body = {
      processId: payment.id,
      employerId: payment.employer.id,
      monthsPaysIds: checklist.map(item => item.fileId),
    };

    return this.http.post( this.endPoint + '/' + payment.id + '/transmission/transmit', body,
    this.getTokenHeader())
    .toPromise()
    .then(response => response as any);
  }

  postNewDateDetails(payment: any, date: string): Promise<any[]> {

    const body = {
      processId: payment.process.id,
      date: date,
      AutoID: payment.file.employer.id,
      fileId: payment.file.id,
    };

    return this.http.post( this.endPoint + '/' + payment.process.id + '/date', body, this.getTokenHeader())
    .toPromise()
    .then(response => response as any[]);
  }

  closeAllProcess(processId: number, paysIds: number[], close: boolean): Promise<any> {

    const body = {
      processId: processId,
      MonthsPaysIds: paysIds,
      Close: close
    };

    return this.http.post(this.endPoint + '/closeAll', body , this.getTokenHeader())
    .toPromise()
    .then(response => response);
  }
}
