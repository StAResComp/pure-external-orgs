import { Pipe, PipeTransform  } from '@angular/core';

@Pipe({name: 'camelspace'})
export class CamelSpacePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/([a-z])([A-Z])/g, '$1 $2');
  }

}
