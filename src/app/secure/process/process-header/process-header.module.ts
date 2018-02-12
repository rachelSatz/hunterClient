import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessHeaderComponent } from './process-header.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ProcessHeaderComponent],
  exports: [ProcessHeaderComponent]
})
export class ProcessHeaderModule {}
