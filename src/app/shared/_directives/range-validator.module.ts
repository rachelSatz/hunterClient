import { NgModule } from '@angular/core';

import { RangeValidatorDirective } from './range-validator.directive';

@NgModule({
  declarations: [RangeValidatorDirective],
  exports: [RangeValidatorDirective]
})
export class RangeValidatorModule {}
