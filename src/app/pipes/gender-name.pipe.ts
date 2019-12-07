import { Pipe, PipeTransform } from '@angular/core';

import { AppConstants } from '../etc/appConstants';

@Pipe({
  name: 'genderName'
})
export class GenderNamePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    
    let result = AppConstants.genders.find(l => l.value == value) || { name: 'n/d' };
    
    return result.name;
  }
}
