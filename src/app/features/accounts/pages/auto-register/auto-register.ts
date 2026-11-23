import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { UiService } from '../../../../core/services/ui.service';
import { Icon } from '../../../../shared/components/icon/icon';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { AccountsService } from '../../../../core/services/accounts.service';
import { AlertPlatform } from '../../../../core/models/account.model';

/**
 * "Conectar avisos": lets the user pick which bank apps FinApp listens to and explains,
 * step by step, how to give the permission on Android or set up the shortcut on iPhone.
 */
@Component({
  selector: 'fa-auto-register',
  imports: [TranslatePipe, Icon, PageHeader],
  templateUrl: './auto-register.html',
  styleUrl: './auto-register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoRegister {
  private readonly ui = inject(UiService);
  protected readonly accounts = inject(AccountsService);

  protected readonly platform = signal<AlertPlatform>('android');
  protected readonly permissionGranted = signal(false);

  protected readonly androidSteps = [1, 2, 3];
  protected readonly iphoneSteps = [1, 2, 3, 4];

  protected grantPermission(): void {
    this.permissionGranted.set(true);
    this.ui.notify('autoRegister.activated');
  }

  protected toggle(appId: string): void {
    this.accounts.toggleAlertApp(appId);
  }
}
