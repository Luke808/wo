import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'customerFormat' })
export class FormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
        return '';
    }
    if (typeof value !== 'number') {
      throw new Error('Invalid pipe argument for WelcomePipe');
    }
    if (value === 1) {
        return 'Y';
    }
    return '';
  }
}
