import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { BaseHttpService } from './base-http.service';
import { UserSessionService } from '../user-session.service';

import { Employee } from '../../_models/employee.model';

@Injectable()
export class EmployeeService extends BaseHttpService {

  readonly endPoint = this.apiUrl + '/employee';

  constructor(userSession: UserSessionService, private http: HttpClient) {
    super(userSession);
  }

  getEmployees(searchCriteria?: Object): Promise<Employee[]> {
    const options = this.getTokenHeader();
    options['params'] = searchCriteria;

    return this.http.get(this.endPoint, options)
    .toPromise()
    .then(response => response as Employee[]);
  }

  getEmployee(id: number): Promise<Employee> {
    return this.http.get(this.endPoint + '/' + id, this.getTokenHeader())
    .toPromise()
    .then(response => response as Employee);
  }

  newEmployee(employee: Employee): Promise<Employee> {
    return this.http.post(this.endPoint, employee, this.getTokenHeader())
    .toPromise()
    .then(response => response as Employee);
  }

  updateEmployee(employee: Employee): Promise<Employee> {
    return this.http.put(this.endPoint + '/' + employee.id, employee, this.getTokenHeader())
    .toPromise()
    .then(response => response as Employee);
  }

  deleteEmployee(id: number): Promise<{ responseCode: number }> {
    return this.http.delete(this.endPoint + '/' + id, this.getTokenHeader())
    .toPromise()
    .then(response => response as { responseCode: number });
  }
}
