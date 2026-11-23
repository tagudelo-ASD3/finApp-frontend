import { DOCUMENT, Injectable, effect, inject } from '@angular/core';
import { persistedSignal } from '../utils/persisted-signal';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  readonly isDark = persistedSignal<boolean>('dark-mode', false);

  constructor() {
    effect(() => {
      this.document.documentElement.dataset['theme'] = this.isDark() ? 'dark' : 'light';
    });
  }

  toggle(): void {
    this.isDark.update((dark) => !dark);
  }
}
