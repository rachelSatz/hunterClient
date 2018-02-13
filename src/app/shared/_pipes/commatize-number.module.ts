import { NgModule } from '@angular/core';

import { CommatizeNumberPipe } from './commatize-number.pipe';

@NgModule({
  declarations: [CommatizeNumberPipe],
  exports: [CommatizeNumberPipe]
})
export class CommatizeNumberModule {}
