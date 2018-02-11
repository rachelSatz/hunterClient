import {Component, Inject, OnInit} from '@angular/core';
import {FileFeedback} from '../../../shared/_models/file-feedback.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Select2OptionData} from "ng2-select2";
import {ContactService} from "../../_services/http/contact.service";
import {UserSessionService} from "../../../shared/_services/user-session.service";
import {Contact} from "../../../shared/_models/contact.model";
import {FeedbackService} from "../../_services/http/feedback.service";
import {GeneralHttpService} from "../../_services/http/general-http.service";
import {NotificationService} from "../../_services/notification.service";

@Component({
  selector: 'app-feedback-file-application',
  templateUrl: './feedback-file-application.component.html',
  styleUrls: ['./feedback-file-application.component.css']
})
export class FeedbackFileApplicationComponent implements OnInit {
  searchCriteria = {};
  contacts:  Contact[] = [];
  files: {id: string, fileName: string}[] = [];
  feedback: FileFeedback;
  employerId: number;

  selectedFileIds: number[];
  uplodedFile: File = <File>{};
  comments: string;
  selectedContactIds: number[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private contactService: ContactService,
              private userSession: UserSessionService,
              private feedbackService: FeedbackService,
              private generalService: GeneralHttpService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<FeedbackFileApplicationComponent>) {
    this.feedback = data.feedback;
    this.employerId = data.employerId;
  }

  ngOnInit() {

    this.searchCriteria['manufacturerId'] = this.feedback.manufacturer.id;
    this.searchCriteria['productType'] = this.feedback.productType;
    this.searchCriteria['distribution'] = 7;
    this.contactService.getContacts(this.userSession.getToken(), this.searchCriteria)
      .then(response => {
        this.contacts = response;
      });
    this.generalService.getFilesByEmployer(this.userSession.getToken(), this.employerId)
      .then(response => this.files = response);
  }

  onSubmit(): void {
    this.feedbackService.createFileApplication(this.userSession.getToken(),
      this.feedback,
      this.uplodedFile,
      this.selectedFileIds,
      this.selectedContactIds,
      this.comments)
      .then(res => {
        this.notificationService.showResult(String(res.message), Boolean(res.success) ? 0 : 1);
        // console.log(res));
      });
  }

  onCloseClicked(): void {
    this.dialogRef.close();
  }

}
