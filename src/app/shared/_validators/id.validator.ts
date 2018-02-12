import { ValidatorFn, AbstractControl } from '@angular/forms';

export function IDValidator(): ValidatorFn {
	return (control: AbstractControl): any => {

		let IDnum = String(control.value);

		if ((IDnum.length > 9) || (IDnum.length < 5)) {
			return { id: control.value };
		}

		if (IDnum.length < 9) {
			while(IDnum.length < 9) {
				IDnum = '0' + IDnum;
			}
		}

		let counter = 0, incNum;
		for (let i = 0; i < 9; i++) {
			incNum = Number(IDnum.charAt(i));
			incNum *= (i % 2) + 1;
			if (incNum > 9) {
				incNum -= 9;
			}
			counter += incNum;
		}

		return (counter % 10 !== 0) ? { id: control.value } : null;
	};
}
