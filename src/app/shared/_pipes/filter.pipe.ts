import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
	transform(items: any[], criteria: { [property: string]: string}): any {
		if (!items || !criteria) {
			return items;
		}

		const arr = [];

		for (let i = 0; i < items.length; i++)
		{
			let isValid = true;

			for (const criterion in criteria) {
				if (criteria[criterion] !== items[i][criterion] && criteria[criterion] != null) {
					isValid = false;
					break;
				}
			}

			if (isValid) {
				arr.push(items[i]);
			}
		}

		return arr;
	}
}
