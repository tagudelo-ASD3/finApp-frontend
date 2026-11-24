import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyStyle } from '../../core/models/currency-style.model';
import { formatCop } from '../../core/utils/currency.utils';

@Pipe({ name: 'copCurrency' })
export class CopCurrencyPipe implements PipeTransform {
  transform(value: number | null | undefined, style: CurrencyStyle = 'plain'): string {
    return formatCop(value, style);
  }
}
