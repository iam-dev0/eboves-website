import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis',
})
export class EllipsisPipe implements PipeTransform {
  transform(value: string, charCount: number): string {
    return `${value.substr(0, charCount)}...`;
  }
}
