import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { BaseHttpService } from '../../../shared/_services/http/base-http.service';

import { Employer } from '../../../shared/_models/employer.model';

@Injectable()
export class UserService extends BaseHttpService {
  constructor(private http: HttpClient) {
    super();
  }

  getEmployers(token: string): Promise<Employer[]> {
    return this.http.get(this.apiUrl  + '/employers', this.getTokenHeader(token)).toPromise().then(response => response as Employer[]);
  }
}
