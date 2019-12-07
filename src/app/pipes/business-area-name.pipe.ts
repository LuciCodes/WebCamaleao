import { Pipe, PipeTransform } from '@angular/core';

import { AppConstants } from '../etc/appConstants';

@Pipe({
  name: 'businessAreaName'
})
export class BusinessAreaNamePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    let result = AppConstants.businessAreas.find(l => l.value == value) || { name: 'n/d' };
    
    return result.name;
  }

}
