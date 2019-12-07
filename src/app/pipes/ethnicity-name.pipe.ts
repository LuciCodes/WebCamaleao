import { Pipe, PipeTransform } from '@angular/core';

import { AppConstants } from '../etc/appConstants';

@Pipe({
  name: 'ethnicityName'
})
export class EthnicityNamePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    
    let result = AppConstants.ethnicities.find(l => l.value == value) || { name: 'n/d' };
    
    return result.name;
  }
}
