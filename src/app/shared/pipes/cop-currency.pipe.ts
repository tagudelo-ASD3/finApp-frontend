import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyStyle } from '../../core/models/currency-style.model';

const numberFormat = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 });

/**
 * Formats Colombian pesos the way the wireframe shows them:
 * plain "$ 2.545.500", signed "+ $ 3.200.000" / "- $ 86.400", thousands "1.300 mil".
 */
@Pipe({ name: 'copCurrency' })
export class CopCurrencyPipe implements PipeTransform {
  transform(value: number | null | undefined, style: CurrencyStyle = 'plain'): string {
    if (value === null || value === undefined) {
      return '—';
    }
    if (style === 'thousands') {
      return `${numberFormat.format(Math.round(value / 1000))} mil`;
    }
    const amount = `$ ${numberFormat.format(Math.abs(Math.round(value)))}`;
    if (style === 'signed') {
      return `${value < 0 ? '-' : '+'} ${amount}`;
    }
    return value < 0 ? `- ${amount}` : amount;
  }
}
