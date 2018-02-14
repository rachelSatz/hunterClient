import { Routes } from '@angular/router';

import { DashboardComponent } from '../../secure/dashboard/dashboard.component';
import { ProcessComponent } from '../../secure/process/process.component';
import { ProcessUploadComponent } from '../../secure/process/process-upload/process-upload.component';
import { ProcessPaymentComponent } from '../../secure/process/process-payment/process-payment.component';
import { ProcessPaymentTableComponent } from '../../secure/process/process-payment/process-payment-table/process-payment-table.component';
import { ProcessEmployeePaymentsComponent } from '../../secure/process/process-payment/process-employee-payments/process-employee-payments.component';

import { ProcessTableComponent } from '../../secure/process-table/process-table.component';
import { FeedbackGraphComponent } from '../../secure/feedback/feedback-graph/feedback-graph.component';
import { FeedbackEmployeeTableComponent } from '../../secure/feedback/feedback-employee-table/feedback-employee-table.component';
import { FeedbackFileTableComponent } from '../../secure/feedback/feedback-file-table/feedback-file-table.component';
import { RejectedFileComponent } from '../../secure/feedback/rejected-file/rejected-file.component';
import { RejectedEmployeeComponent } from '../../secure/feedback/rejected-employee/rejected-employee.component';
import { EmployersComponent } from '../../secure/settings/employers/employers.component';
import { EmployerFormComponent } from '../../secure/settings/employers/employer-form/employer-form.component';
import { EmployeesComponent } from '../../secure/settings/employees/employees.component';
import { ContactsComponent } from '../../secure/settings/contacts/contacts.component';

import { EmployersResolve } from '../_resolves/employers.resolve';
import { ProcessResolve } from '../_resolves/process.resolve';

export const SECURE_ROUTES: Routes = [
  { path: 'dashboard', component: DashboardComponent, resolve: { employers: EmployersResolve } },
  { path: 'process', redirectTo: 'new' },
  { path: 'process/table', component: ProcessTableComponent },
  { path: 'process/new', component: ProcessComponent, children: [
      { path: '', redirectTo: 'upload', pathMatch: 'full' },
      { path: 'upload', component: ProcessUploadComponent }
    ]},
  { path: 'process/new/:id', component: ProcessComponent, resolve: { process: ProcessResolve }, children: [
      { path: '', redirectTo: 'upload', pathMatch: 'full' },
      { path: 'upload', component: ProcessUploadComponent },
      { path: 'payment', component: ProcessPaymentComponent },
      { path: 'payment-table', component: ProcessPaymentTableComponent },
      { path: 'employee-payments', component: ProcessEmployeePaymentsComponent },
      { path: 'transmission', component: ProcessPaymentComponent },
    ]},
  { path: 'feedback', children: [
    { path: '', redirectTo: 'graph', pathMatch: 'full' },
    { path: 'graph', component: FeedbackGraphComponent },
    { path: 'table/employees', component: FeedbackEmployeeTableComponent, resolve: { employers: EmployersResolve } },
    { path: 'table/files', component: FeedbackFileTableComponent, resolve: { employers: EmployersResolve } }
  ]},
  { path: 'rejected/employees', component: RejectedEmployeeComponent, resolve: {employers: EmployersResolve } },
  { path: 'rejected/files', component: RejectedFileComponent, resolve: {employers: EmployersResolve } },
  { path: 'settings/employers', component: EmployersComponent },
  { path: 'settings/employers/form', component: EmployerFormComponent },
  { path: 'settings/employers/form/:id', component: EmployerFormComponent },
  { path: 'settings/employees', component: EmployeesComponent },
  { path: 'settings/contacts', component: ContactsComponent }
];
