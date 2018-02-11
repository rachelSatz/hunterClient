import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { BaseHttpService } from '../../../shared/_services/http/base-http.service';

import { Process } from '../../../shared/_models/process.model';

@Injectable()
export class ProcessFileService extends BaseHttpService {

  readonly endPoint = this.apiUrl + '/process';

  constructor(private http: HttpClient) {
    super();
  }

  uploadFile(process: Process, file: File, token: string): Promise<number> {
    const formData = new FormData;
    formData.append('process', JSON.stringify(process));
    formData.append('file', file, file.name);

    return this.http.post(this.endPoint + '/file', formData, this.getTokenHeader(token)).toPromise()
      .then(response => response as number);
  }

  getFileUploadStatus(processID: number, token: string): Promise<number> {
    return this.http.get(this.endPoint + '/' + processID + '/file/status', this.getTokenHeader(token)).toPromise()
      .then(response => response as number);
  }

  downloadProcessFile(processID: number, token: string): Promise<Blob> {
    return this.http.get(this.endPoint + '/' + processID + '/file', this.getBlobOptions(token)).toPromise()
      .then(response => response as Blob);
  }

  downloadProductPaymentFile(paymentID: number, token: string): Promise<Blob> {
    return this.http.get(this.endPoint + '/' + paymentID + '/DownloadFile', this.getBlobOptions(token)).toPromise()
      .then(response => response as Blob);
  }
}
