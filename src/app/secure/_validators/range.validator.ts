import { ValidatorFn, AbstractControl } from '@angular/forms';

export function RangeValidator(min: number, max: number): ValidatorFn {
	return (control: AbstractControl): any => {
		return (control.value >= min && control.value <= max) ? null : { range: "הערך צריך להיות בין " + min + " ו" + max };
	};
}
