import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@models/user.model';

@Pipe({
  name: 'username',
})
export class UsernamePipe implements PipeTransform {
  transform(value: User): unknown {
    return value.nick ?? `${value.firstname} ${value.lastname}`;
  }
}
