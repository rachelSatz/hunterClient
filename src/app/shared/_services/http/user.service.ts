import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { BaseHttpService } from './base-http.service';
import { UserSessionService } from '../user-session.service';

import { Employer } from '../../_models/employer.model';

@Injectable()
export class UserService extends BaseHttpService {
  constructor(userSession: UserSessionService, private http: HttpClient) {
    super(userSession);
  }

  getEmployers(): Promise<Employer[]> {
    return this.http.get(this.apiUrl  + '/employers', this.getTokenHeader())
    .toPromise()
    .then(response => response as Employer[]);
  }
}
