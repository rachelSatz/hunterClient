import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { UserSessionService } from '../../../../shared/_services/user-session.service';
import { EmployerService } from '../../../_services/http/employer.service';
import { ContactService } from '../../../_services/http/contact.service';

import { Contact } from '../../../../shared/_models/contact.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html'
})
export class ContactFormComponent implements OnInit {

  contact: Contact;

  isSubmitting: boolean;

  typeEntities: any[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ContactFormComponent>, private userSession: UserSessionService,
              private employerService: EmployerService, private contactService: ContactService) {
    this.contact = data.contact;
  }

  ngOnInit() {
    if (this.contact['entityType']) {
    }
    // this.employerService.getEmployers()
  }

  submit(isValid: boolean): void {
    if (isValid) {
      this.isSubmitting = true;
      setTimeout(() => this.dialogRef.close(this.contact), 2000);
    }
  }

  setEntityType(): void {
    switch (this.contact.entityType) {
      case 0:
        this.employerService.getEmployers(this.userSession.getToken()).then(response => this.typeEntities = response);
    }
  }
}
