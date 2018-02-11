import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { BaseHttpService } from '../../../shared/_services/http/base-http.service';

import { Contact } from '../../../shared/_models/contact.model';

@Injectable()
export class ContactService extends BaseHttpService {

  readonly endPoint = this.apiUrl + '/contact';

  constructor(private http: HttpClient) {
    super();
  }

  getContacts(token: string, searchCriteria?: Object): Promise<Contact[]> {
    const options = this.getTokenHeader(token);
    options['params'] = searchCriteria;

    return this.http.get(this.endPoint, options).toPromise().then(response => response as Contact[]);
  }

  newContact(contact: Contact, token: string): Promise<Contact> {
    return this.http.post(this.endPoint, contact, this.getTokenHeader(token)).toPromise().then(response => response as Contact);
  }
}
