import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { BaseHttpService } from './base-http.service';
import { UserSessionService } from '../user-session.service';

import { Process } from '../../_models/process.model';

@Injectable()
export class ProcessFileService extends BaseHttpService {

  readonly endPoint = this.apiUrl + '/process';

  constructor(userSession: UserSessionService, private http: HttpClient) {
    super(userSession);
  }

  uploadFile(process: Process, file: File): Promise<any> {

    const formData = new FormData;
    formData.append('process', JSON.stringify(process));
    formData.append('file', file, file.name);

    return this.http.post(this.endPoint + '/file', formData, this.getTokenHeader())
    .toPromise()
    .then(response => true)
    .catch(response => false);
  }

  getFileUploadStatus(processID: number): Promise<number> {
    return this.http.get(this.endPoint + '/' + processID + '/file/status', this.getTokenHeader())
    .toPromise()
    .then(response => response as number);
  }

  downloadProcessFile(processID: number): Promise<Blob> {
    return this.http.get(this.endPoint + '/' + processID + '/file', this.getBlobOptions())
    .toPromise()
    .then(response => response as Blob);
  }

  downloadProductPaymentFile(paymentID: number): Promise<Blob> {
    return this.http.get(this.endPoint + '/' + paymentID + '/DownloadFile', this.getBlobOptions())
    .toPromise()
    .then(response => response as Blob);
  }
}
