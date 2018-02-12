import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule, MatSelectModule, MatProgressSpinnerModule } from '@angular/material';

import { DataTableModule } from '../../shared/data-table/data-table.module';

import { ProcessTableComponent } from './process-table.component';

import { NotificationService } from '../../shared/_services/notification.service';
import { ProcessService } from '../../shared/_services/http/process.service';
import { ProcessFileService } from '../../shared/_services/http/process-file.service';
import { EmployerService } from '../../shared/_services/http/employer.service';
import { UserSessionService } from '../../shared/_services/user-session.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    MatProgressSpinnerModule, MatFormFieldModule, MatSelectModule,
    DataTableModule
  ],
  declarations: [ProcessTableComponent],
  providers: [NotificationService, ProcessService, ProcessFileService,
    EmployerService, UserSessionService]
})
export class ProcessTableModule {}
