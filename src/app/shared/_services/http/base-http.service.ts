import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { UserSessionService } from '../user-session.service';

@Injectable()
export abstract class BaseHttpService {

	//readonly apiUrl = 'http://212.150.186.197';
	readonly apiUrl = 'http://localhost:51787/';
	constructor(protected userSession?: UserSessionService) {}

  getTokenHeader(): { headers: HttpHeaders } {
    const headers = new HttpHeaders({ 'Authorization': this.userSession.getToken() });
    return { headers: headers };
  }

  getBlobOptions(): { headers: HttpHeaders, responseType: 'blob' } {
    return {
      headers: new HttpHeaders({ 'Authorization': this.userSession.getToken() }),
      responseType: 'blob'
    };
  }
}
