import { Pipe, PipeTransform } from '@angular/core';

import { AppConstants } from '../etc/appConstants';

@Pipe({
  name: 'educationLevel'
})
export class EducationLevelPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    
    let result = AppConstants.educationalLevels.find(l => l.value == value) || { name: 'n/d' };
    
    return result.name;
  }

}
