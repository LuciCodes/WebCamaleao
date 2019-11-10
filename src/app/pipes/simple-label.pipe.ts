import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simpleLabel'
})
export class SimpleLabelPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    let result = value;

    if (result.split) {

      result = result.split(':');

      result = `<strong>${ result[0] }:</strong>${ (result.length > 1) ? result[1] : '' }`;
    }

    return result;
  }

}
