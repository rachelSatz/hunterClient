import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { IDValidator } from '../_validators/id.validator';

@Directive({
	selector: '[appIDValidator]',
	providers: [{provide: NG_VALIDATORS, useExisting: IDValidatorDirective, multi: true}]
})
export class IDValidatorDirective implements Validator {
	validate(control: AbstractControl): {[key: string]: any} {
		return control.value ? IDValidator()(control) : null;
	}
}
