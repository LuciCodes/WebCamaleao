import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToList'
})
export class StringToListPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    
    if (!value || value.length == 0) { return '-'; }
    
    return value.join(', ');
  }
}
