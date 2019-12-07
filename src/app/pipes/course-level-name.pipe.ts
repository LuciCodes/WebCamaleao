import { Pipe, PipeTransform } from '@angular/core';

import { AppConstants } from '../etc/appConstants';

@Pipe({
  name: 'courseLevelName'
})
export class CourseLevelNamePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    let result = AppConstants.courseLevels.find(l => l.value == value) || { name: 'n/d' };
    
    return result.name;
  }

}
