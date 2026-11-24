import { CurrencyStyle } from '../models/currency-style.model';

const NBSP = ' ';
const numberFormat = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 });

export function formatCop(value: number | null | undefined, style: CurrencyStyle = 'plain'): string {
  if (value === null || value === undefined) {
    return '—';
  }
  if (style === 'thousands') {
    return `${numberFormat.format(Math.round(value / 1000))}${NBSP}mil`;
  }
  const amount = `$${NBSP}${numberFormat.format(Math.abs(Math.round(value)))}`;
  if (style === 'signed') {
    return `${value < 0 ? '-' : '+'}${NBSP}${amount}`;
  }
  return value < 0 ? `-${NBSP}${amount}` : amount;
}
