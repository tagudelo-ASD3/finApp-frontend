import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Icon } from '../../../shared/components/icon/icon';
import { Logo } from '../../../shared/components/logo/logo';
import { NewAccountDialog } from '../../../features/accounts/components/new-account-dialog/new-account-dialog';
import { EditLimitsDialog } from '../../../features/budgets/components/edit-limits-dialog/edit-limits-dialog';
import { RegisterDebtDialog } from '../../../features/debts/components/register-debt-dialog/register-debt-dialog';
import { NewMovementDialog } from '../../../features/movements/components/new-movement-dialog/new-movement-dialog';
import { NotificationsDialog } from '../../../features/notifications/components/notifications-dialog/notifications-dialog';
import { ProfileService } from '../../services/profile.service';
import { ThemeService } from '../../services/theme.service';
import { UiService } from '../../services/ui.service';
import { NavItem } from '../../models/nav-item.model';

/** Signed-in layout: sidebar navigation, the current page and the overlay windows. */
@Component({
  selector: 'fa-shell',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    Icon,
    Logo,
    NewMovementDialog,
    RegisterDebtDialog,
    NewAccountDialog,
    EditLimitsDialog,
    NotificationsDialog,
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shell {
  protected readonly ui = inject(UiService);
  protected readonly theme = inject(ThemeService);
  protected readonly profile = inject(ProfileService).profile;

  protected readonly navItems: NavItem[] = [
    { path: '/dashboard', icon: 'home', labelKey: 'nav.dashboard' },
    { path: '/movements', icon: 'movements', labelKey: 'nav.movements' },
    { path: '/accounts', icon: 'wallet', labelKey: 'nav.accounts' },
    { path: '/budgets', icon: 'pie', labelKey: 'nav.budgets' },
    { path: '/debts', icon: 'card', labelKey: 'nav.debts' },
    { path: '/calendar', icon: 'calendar', labelKey: 'nav.calendar' },
    { path: '/reports', icon: 'chart', labelKey: 'nav.reports' },
  ];
}
