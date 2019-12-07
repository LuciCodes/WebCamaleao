import { Pipe, PipeTransform } from '@angular/core';

import { AppConstants } from '../etc/appConstants';

@Pipe({
  name: 'sexName'
})
export class SexNamePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    
    let result = AppConstants.sexes.find(l => l.value == value) || { name: 'n/d' };
    
    return result.name;
  }

}
