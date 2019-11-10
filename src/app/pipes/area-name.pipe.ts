import { Pipe, PipeTransform } from '@angular/core';
import { AppConstants } from '../etc/appConstants';

@Pipe({
  name: 'areaName'
})
export class AreaNamePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    let area = AppConstants.businessAreas.find(a => a.value == value);

    return area ? area.name : 'n/d';
  }
}
