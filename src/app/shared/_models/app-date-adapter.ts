import { NativeDateAdapter } from '@angular/material';

export class AppDateAdapter extends NativeDateAdapter {
	format(date: Date, displayFormat: Object): string {

	

		let month = (date.getMonth() + 1).toString();
		if (month.length === 1) {
			month = '0' + month;
		}

		const year = date.getFullYear();

		return   month + '/' + year;
	}

	createDate(year: number, month: number): Date {
		const dateObj = new Date;
		dateObj.setUTCFullYear(year);
		dateObj.setUTCMonth(month);
		return dateObj;
	}
}
