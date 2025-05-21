import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appliedFor',
})
export class AppliedForPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value > 1) {
      return `${value} members applied.`;
    } else if (value == 1) {
      return `Only ${value} member applied yet.`;
    } else return 'No members applied yet.';
  }
}
