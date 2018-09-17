import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { BaseHttpService } from './base-http.service';
import { UserSessionService } from '../user-session.service';

@Injectable()
export class ProcessMethodService extends BaseHttpService {

  readonly endPoint = this.apiUrl + '/process/';

  constructor(userSession: UserSessionService, private http: HttpClient) {
    super(userSession);
  }

  downloadExcel(processID: number): Promise<Blob> {
    return this.http.get(this.endPoint + processID + '/method/excel', this.getBlobOptions() )
    .toPromise()
    .then(response => response as Blob);
  }

  downloadMasab(processID: number): Promise<Blob> {
    return this.http.get(this.endPoint + processID + '/method/masab', this.getBlobOptions())
    .toPromise()
    .then(response => response as Blob);
  }

  mailMasab(processID: number): Promise<Object> {
    return this.http.get(this.endPoint + processID + '/method/mail', this.getTokenHeader())
    .toPromise()
    .then(response => response as Object);
  }

}
