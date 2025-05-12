/*
 *   Copyright (c) 2025 
 *   All rights reserved.
 */
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: any): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter((item: any) => {
      for (const key in filter) {
        if (filter.hasOwnProperty(key) && item[key] !== filter[key]) {
          return false;
        }
      }
      return true;
    });
  }
}