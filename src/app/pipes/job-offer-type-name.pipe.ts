import { Pipe, PipeTransform } from '@angular/core';

import { AppConstants } from '../etc/appConstants';

@Pipe({
  name: 'jobOfferTypeName'
})
export class JobOfferTypeNamePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    let result = AppConstants.jobOfferTypes.find(l => l.value == value) || { name: 'n/d' };
    
    return result.name;
  }

}
