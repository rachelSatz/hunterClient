import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { BaseHttpService } from '../../../shared/_services/http/base-http.service';

import { EmployeeFeedback } from '../../../shared/_models/employee-feedback.model';
import { FileFeedback } from '../../../shared/_models/file-feedback.model';
import {FileFeedbackError} from "../../../shared/_models/file-feedback-error";

@Injectable()
export class FeedbackService extends BaseHttpService {

  readonly endPoint = this.apiUrl + '/feedback';

  constructor(private http: HttpClient) {
    super();
  }

  getEmployeeFeedbacks(token: string, searchCriteria?: Object): Promise<EmployeeFeedback[]> {
    const options = this.getTokenHeader(token);
    options['params'] = searchCriteria;

    return this.http.get(this.endPoint + '/employee', options).toPromise().then(response => response as EmployeeFeedback[]);
  }

  getFileFeedbacks(token: string, searchCriteria?: Object): Promise<FileFeedback[]> {
    const options = this.getTokenHeader(token);
    options['params'] = searchCriteria;

    return this.http.get(this.endPoint + '/file', options).toPromise().then(response => response as FileFeedback[]);
  }

  getErrorFileFeedbacks(token: string, searchCriteria?: Object): Promise<FileFeedbackError[]> {
    const options = this.getTokenHeader(token);
    options['params'] = searchCriteria;

    return this.http.get(this.endPoint + '/errorFile', options).toPromise().then(response => response as FileFeedbackError[]);
  }

  createEmployeeApplication(data: Object, file: File, token: string): Promise<any> {

    const formData = new FormData;
    formData.append('applicationType', data['applicationType']);
    formData.append('feedback', JSON.stringify(data['feedback']));
    formData.append('uploadFile', data['uploadedFile']);
    formData.append('systemFileIds', JSON.stringify(data['selectedFileIds']));
    formData.append('contactsIds', JSON.stringify(data['selectedContactsIds']));
    formData.append('comments', data['comments']);

    return this.http.post(this.endPoint + '/application', formData , this.getTokenHeader(token))
    .toPromise()
    .then(response => response);
  }

  createFileApplication(token: string,
                            feedback: FileFeedback,
                            uplodedFile: File,
                            selectedFileIds: number[],
                            selectedContactsIds: number[],
                            comments: string): Promise<any> {
    const formData = new FormData;
    const options = this.getTokenHeader(token);
    formData.append('feedback', JSON.stringify(feedback));
    formData.append('uploadFile', uplodedFile);
    formData.append('systemFileIds', JSON.stringify(selectedFileIds));
    formData.append('contactsIds', JSON.stringify(selectedContactsIds));
    formData.append('comments', comments);
    return this.http.post(this.endPoint + 'File/application', formData , options).toPromise()
      .then(response => response);
  }



}
