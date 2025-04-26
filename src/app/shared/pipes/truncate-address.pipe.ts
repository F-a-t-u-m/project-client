import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateAddress'
})
export class TruncateAddressPipe implements PipeTransform {
  transform(address: string): string {
    if (!address) return '';
    return address.substring(0, 6) + '...' + address.substring(address.length - 4);
  }
}
