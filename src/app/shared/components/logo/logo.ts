import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** FinApp "wallet" logo: espresso wallet, caramel card and the F. */
@Component({
  selector: 'fa-logo',
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Logo {
  readonly size = input(44);
  readonly showName = input(true);
}
