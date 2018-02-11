import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

import { ContactService } from '../../_services/http/contact.service';
import { EmployerService } from '../../_services/http/employer.service';
import { UserSessionService } from '../../../shared/_services/user-session.service';

import { Contact } from '../../../shared/_models/contact.model';
import { DataTableHeader } from '../../../shared/_models/data-table/data-table-header.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['../../../shared/data-table/data-table.component.css']
})
export class ContactsComponent extends DataTableComponent implements OnInit {

  readonly headers: DataTableHeader[] = [
    { column: 'firstName', label: 'שם פרטי' }, { column: 'lastName', label: 'שם משפחה' }, { column: 'phone', label: 'טלפון' },
    { column: 'mobile', label: 'נייד' }, { column: 'email', label: 'כתובת מייל' }, { column: 'role', label: 'תפקיד' }
  ];

  typeEntities: any[];

  constructor(protected route: ActivatedRoute, private dialog: MatDialog, private userSession: UserSessionService,
              private contactService: ContactService, private employerService: EmployerService) {
    super(route);
  }


  fetchItems(): void {
    this.contactService.getContacts(this.userSession.getToken(), this.searchCriteria).then(response => this.setItems(response));
  }

  openFormDialog(item: Contact): void {
    const contact = item ? item : new Contact;

    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '800px',
      data: {
        contact: contact
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contactService.newContact(result, this.userSession.getToken())
          .then(response => response['id'] ? this.setNewItem(response) : '');
      }
    });
  }

  setEntityType(): void {
    switch (this.searchCriteria['entityType']) {
      case 0:
        this.employerService.getEmployers(this.userSession.getToken()).then(response => this.typeEntities = response);
    }

    this.search();
  }
}
