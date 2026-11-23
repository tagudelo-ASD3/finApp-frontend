import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { daysBetween } from '../../core/utils/date.utils';

const timeFormat = new Intl.DateTimeFormat('es-CO', { hour: 'numeric', minute: '2-digit' });
const dayFormat = new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'short' });

/** "Hoy 7:42 p. m.", "Ayer" or "10 nov", like the movement rows in the wireframe. */
@Pipe({ name: 'relativeDate' })
export class RelativeDatePipe implements PipeTransform {
  private readonly translate = inject(TranslateService);

  transform(value: string | Date, withTime = false): string {
    const date = new Date(value);
    const days = daysBetween(date, new Date());
    if (days === 0) {
      const today = this.translate.instant('common.today') as string;
      return withTime ? `${today} ${timeFormat.format(date)}` : today;
    }
    if (days === 1) {
      return this.translate.instant('common.yesterday') as string;
    }
    return dayFormat.format(date).replace('.', '');
  }
}
