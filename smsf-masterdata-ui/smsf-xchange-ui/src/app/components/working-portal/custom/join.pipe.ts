import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value instanceof Array && typeof args === 'string') {
      return value.join(args);
    } else {
      return '';
    }

  }

}
