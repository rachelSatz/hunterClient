import { Directive, Attribute } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { RangeValidator } from '../_validators/range.validator';

@Directive({
	selector: '[range]',
	providers: [{provide: NG_VALIDATORS, useExisting: RangeValidatorDirective, multi: true}]
})
export class RangeValidatorDirective implements Validator {
	constructor(@Attribute('range') public range){}

	validate(control: AbstractControl): {[key: string]: any} {
		let min = this.range.substr(0,this.range.indexOf(','));
		let max = this.range.substr(this.range.indexOf(',') + 1);

		return control.value ? RangeValidator(min, max)(control) : null;
	}
}
