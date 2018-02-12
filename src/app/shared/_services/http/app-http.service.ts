import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { BaseHttpService } from './base-http.service';

@Injectable()
export class AppHttpService extends BaseHttpService {
  constructor(private http: HttpClient) {
    super();
  }

  login(username: string, password: string): Promise<{ responseCode: number }> {
    return this.http.post(this.apiUrl  + '/login', { username: username, password: password })
    .toPromise()
    .then(response => response as { responseCode: number, token: string });
  }
}
