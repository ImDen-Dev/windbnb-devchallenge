import { Pipe, PipeTransform } from '@angular/core';
import { Apartment } from './apartment';

@Pipe({
  name: 'filterLocation',
  pure: false,
})
export class FilterLocationPipe implements PipeTransform {
  transform(
    value: { city: string; country: string }[],
    filterString = ''
  ): any {
    if (value.length === 0 || filterString === '' || filterString === null) {
      return value;
    }
    const resultArray: { city: string; country: string }[] = [];
    for (const item of value) {
      const reg = new RegExp(filterString.toLowerCase(), 'gi');
      if (
        item.city.match(reg) ||
        item.country.match(reg) ||
        `${item.city} ${item.country}`.match(reg) ||
        `${item.city}, ${item.country}`.match(reg) ||
        `${item.country}, ${item.city}`.match(reg) ||
        `${item.country} ${item.city}`.match(reg)
      ) {
        resultArray.push(item);
      }
    }

    return resultArray;
  }
}
