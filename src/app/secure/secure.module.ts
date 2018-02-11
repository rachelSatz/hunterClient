import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardModule } from './dashboard/dashboard.module';
import { ProcessTableModule } from './process-table/process-table.module';
import { ProcessModule } from './process/process.module';
import { SettingsModule } from './settings/settings.module';
import { FeedbackModule } from './feedback/feedback.module';

import { SecureComponent } from './secure.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DashboardModule,
    ProcessTableModule,
    ProcessModule,
    FeedbackModule,
    SettingsModule,
  ],
  declarations: [SecureComponent],
})
export class SecureModule {}
