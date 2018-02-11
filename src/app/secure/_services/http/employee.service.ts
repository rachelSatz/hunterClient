import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { BaseHttpService } from '../../../shared/_services/http/base-http.service';

import { Employee } from '../../../shared/_models/employee.model';

@Injectable()
export class EmployeeService extends BaseHttpService {

  readonly endPoint = this.apiUrl + '/employee';

  constructor(private http: HttpClient) {
    super();
  }

  getEmployees(token: string, searchCriteria?: Object): Promise<Employee[]> {
    const options = this.getTokenHeader(token);
    options['params'] = searchCriteria;

    return this.http.get(this.endPoint, options).toPromise().then(response => response as Employee[]);
  }

  getEmployee(id: number, token: string): Promise<Employee> {
    return this.http.get(this.endPoint + '/' + id, this.getTokenHeader(token)).toPromise()
      .then(response => response as Employee);
  }

  newEmployee(employee: Employee, token: string): Promise<Employee> {
    return this.http.post(this.endPoint, employee, this.getTokenHeader(token)).toPromise()
      .then(response => response as Employee);
  }

  updateEmployee(employee: Employee, token: string): Promise<Employee> {
    return this.http.put(this.endPoint + '/' + employee.id, employee, this.getTokenHeader(token)).toPromise()
      .then(response => response as Employee);
  }

  deleteEmployee(id: number, token: string): Promise<{ responseCode: number }> {
    return this.http.delete(this.endPoint + '/' + id, this.getTokenHeader(token)).toPromise()
      .then(response => response as { responseCode: number });
  }
}
