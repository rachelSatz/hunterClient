import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { BaseHttpService } from './base-http.service';

import { Contact } from '../../_models/contact.model';

@Injectable()
export class ContactService extends BaseHttpService {

  readonly endPoint = this.apiUrl + '/contact';

  constructor(private http: HttpClient) {
    super();
  }

  getContacts(searchCriteria?: Object): Promise<Contact[]> {
    const options = this.getTokenHeader();
    options['params'] = searchCriteria;

    return this.http.get(this.endPoint, options)
    .toPromise()
    .then(response => response as Contact[]);
  }

  storeContact(contact: Contact): Promise<Contact> {
    return this.http.post(this.endPoint, contact, this.getTokenHeader())
    .toPromise()
    .then(response => response as Contact);
  }
}
