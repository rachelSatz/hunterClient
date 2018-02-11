import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule, MatInputModule, MatDialogModule, MatProgressSpinnerModule, MatProgressBarModule,
         MatSelectModule } from '@angular/material';
import { Ng2FileDropModule } from 'ng2-file-drop';
import { TransitionDialogModule } from '../../../shared/transition-dialog/transition-dialog.module';

import { ProcessUploadComponent } from './process-upload.component';

import { ProcessService } from '../../_services/http/process.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogModule, MatProgressSpinnerModule,
    MatProgressBarModule,
    Ng2FileDropModule,
    TransitionDialogModule
  ],
  exports: [ProcessUploadComponent],
  declarations: [ProcessUploadComponent],
  entryComponents: [ProcessUploadComponent],
  providers: [ProcessService]
})
export class ProcessUploadModule {}
