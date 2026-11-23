import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ICON_PATHS } from './icon-paths';

/** Line icon drawn from the paths in icon-paths.ts. Usage: <fa-icon name="wallet" [size]="18" /> */
@Component({
  selector: 'fa-icon',
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  readonly name = input.required<string>();
  readonly size = input(20);

  protected readonly paths = computed(() => ICON_PATHS[this.name()] ?? []);
}
