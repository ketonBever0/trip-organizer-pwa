import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncStrPipe',
})
export class TruncStrPipe implements PipeTransform {
  transform(str: string, limit: number = 10): string {
    if (!str) {
      return '';
    }

    return str.length > limit ? `${str.substring(0, limit)}...` : str;
  }
}
