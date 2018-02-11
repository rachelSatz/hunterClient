import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { BaseHttpService } from '../../../shared/_services/http/base-http.service';

@Injectable()
export class ProcessMethodService extends BaseHttpService {

  readonly endPoint = this.apiUrl + '/process/';

  constructor(private http: HttpClient) {
    super();
  }

  downloadExcel(processID: number, token: string): Promise<Blob> {
    return this.http.get(this.endPoint + processID + '/method/excel', this.getBlobOptions(token) ).toPromise()
    .then(response => response as Blob);
  }

  downloadMasab(processID: number, token: string): Promise<ArrayBuffer> {
    return this.http.get(this.endPoint + processID + '/method/masab', this.getBlobOptions(token)).toPromise()
    .then(response => response as ArrayBuffer);
  }

  mailMasab(processID: number, token: string): Promise<Object> {
    return this.http.get(this.endPoint + processID + '/method/mail', this.getTokenHeader(token)).toPromise()
      .then(response => response as Object);
  }

}
