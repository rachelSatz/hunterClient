import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';

import { FeedbackGraphComponent } from './feedback-graph.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    MatFormFieldModule, MatSelectModule
  ],
  declarations: [FeedbackGraphComponent],
  exports: [FeedbackGraphComponent]
})
export class FeedbackGraphModule {}
