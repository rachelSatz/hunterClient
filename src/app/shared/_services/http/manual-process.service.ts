import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { BaseHttpService } from './base-http.service';
import { EmployeePayment } from '../../_models/employee-payment.model';
import { Process } from '../../_models/process.model';


@Injectable()
export class ManualProcessService extends BaseHttpService {

  readonly endPoint = this.apiUrl + '/manual';

  constructor(private http: HttpClient) {
    super();
  }

  newManualProcess(process: Process): Promise<Process> {
    return this.http.post(this.endPoint, process, this.getTokenHeader())
    .toPromise()
    .then(response => response as Process);
  }

  AddPreHafrashot(payment: EmployeePayment): Promise<{errors: string, success: boolean}> {
    return this.http.post(this.endPoint + '/payment', payment, this.getTokenHeader())
    .toPromise()
    .then(response => response as { errors: string, success: boolean });
  }

  getPreHafrashot(process: Process): Promise<EmployeePayment[]> {
    return this.http.post(this.endPoint + 'Process/payment', process, this.getTokenHeader())
    .toPromise()
    .then(response => response as EmployeePayment[]);
  }
}
