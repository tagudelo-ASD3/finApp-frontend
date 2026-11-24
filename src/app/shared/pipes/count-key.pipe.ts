import { Pipe, PipeTransform } from '@angular/core';
import { countKey } from '../../core/utils/plural.utils';

@Pipe({ name: 'countKey' })
export class CountKeyPipe implements PipeTransform {
  transform(base: string, count: number | null): string {
    return countKey(base, count ?? 0);
  }
}
