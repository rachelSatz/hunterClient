import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export abstract class BaseHttpService {

	readonly apiUrl = 'http://212.150.186.197';
  // readonly apiUrl = 'http://localhost:51787/';

	getTokenHeader(token: string): { headers: HttpHeaders } {
    const headers = new HttpHeaders({ 'Authorization': token });
    return { headers: headers };
	}

  getBlobOptions(token: string): Object {
    return {
      headers: new HttpHeaders({ 'Authorization': token }),
      responseType: 'blob'
    };
  }
}
