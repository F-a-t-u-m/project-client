import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateAddress',
  standalone: true,
})
@Injectable({ providedIn: 'root' })
export class TruncateAddressPipe implements PipeTransform {
  transform(value: string): string {
    console.log(value);

    if (!value) return '';
    return value?.slice(0, 6) + '...' + value?.slice(-4);
  }
}
