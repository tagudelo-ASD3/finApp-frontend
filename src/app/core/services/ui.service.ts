import { Injectable, signal } from '@angular/core';
import { DialogName } from '../models/dialog.model';

@Injectable({ providedIn: 'root' })
export class UiService {
  readonly openDialog = signal<DialogName | null>(null);
  readonly toastKey = signal<string | null>(null);

  private toastTimer: ReturnType<typeof setTimeout> | undefined;

  open(dialog: DialogName): void {
    this.openDialog.set(dialog);
  }

  close(): void {
    this.openDialog.set(null);
  }

  notify(translationKey: string): void {
    clearTimeout(this.toastTimer);
    this.toastKey.set(translationKey);
    this.toastTimer = setTimeout(() => this.toastKey.set(null), 2800);
  }
}
