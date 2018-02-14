import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ContactService } from '../../../shared/_services/http/contact.service';
import { FeedbackService } from '../../../shared/_services/http/feedback.service';
import { GeneralHttpService } from '../../../shared/_services/http/general-http.service';
import {NotificationService, NotificationType} from '../../../shared/_services/notification.service';

import { EmployeeFeedback } from '../../../shared/_models/employee-feedback.model';
import { Contact } from '../../../shared/_models/contact.model';

@Component({
  selector: 'app-feedback-employee-application',
  templateUrl: './feedback-employee-application.component.html',
  styleUrls: ['./feedback-employee-application.component.css']
})
export class FeedbackEmployeeApplicationComponent implements OnInit {
  @Output() closeApplication = new EventEmitter<number>();
  @Input() applicationType: number;
  @Input() feedback: EmployeeFeedback;
  @Input() employerId: number;
  searchCriteria = {};
  headerText: string;

  contacts: Contact[] = [];
  files: { id: string, fileName: string }[] = [];

  uploadedFile: File;
  selectedFileIds: number[];
  selectedContactIds: number[];
  comments: string;

  constructor(private contactService: ContactService, private feedbackService: FeedbackService,
              private generalService: GeneralHttpService, private notificationService: NotificationService) {}

  ngOnInit() {
    switch (this.applicationType) {
      case 2: {
        this.headerText = 'פניה לקופה';
        break;
      }
      case 1: {
        this.headerText = 'פניה לסוכן';
        break;
      }
      case 5: {
        this.headerText = 'פניה לעובד';
        break;
      }
    }

    this.searchCriteria['manufacturerId'] = this.feedback.product.manufacturer.id;
    this.searchCriteria['productType'] = this.feedback.product.productType;
    this.searchCriteria['distribution'] = 5;
    this.contactService.getContacts(this.searchCriteria)
      .then(response => {
        this.contacts = response;
      });
    this.generalService.getFilesByEmployee(this.feedback.employee.id)
      .then(response => this.files = response);
  }

  onCloseClicked(): void {
    this.closeApplication.emit(0);
  }

  onSubmit(): void {
    const data = {
      applicationType: this.applicationType,
      feedback: this.feedback,
      selectedFileIds: this.selectedFileIds,
      selectedContactIds: this.selectedContactIds,
      comments: this.comments
    };

    this.feedbackService.createEmployeeApplication(data, this.uploadedFile)
    .then(res => {
        this.notificationService.showResult(res.message, res.success ? NotificationType.success : NotificationType.error);
    });
  }
}
