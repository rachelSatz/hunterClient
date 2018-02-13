import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commatize'
})
export class CommatizeNumberPipe implements PipeTransform {
  transform(x: number): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
