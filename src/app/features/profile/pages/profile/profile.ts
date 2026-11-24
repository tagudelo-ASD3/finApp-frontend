import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../../core/services/auth.service';
import { clearPersistedData } from '../../../../core/utils/persisted-signal';
import { ThemeService } from '../../../../core/services/theme.service';
import { UiService } from '../../../../core/services/ui.service';
import { Icon } from '../../../../shared/components/icon/icon';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { ProfileService } from '../../../../core/services/profile.service';
import { TogglePreference } from '../../../../core/models/user-profile.model';

@Component({
  selector: 'fa-profile',
  imports: [DatePipe, TranslatePipe, Icon, PageHeader],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly ui = inject(UiService);
  protected readonly theme = inject(ThemeService);
  protected readonly profileService = inject(ProfileService);

  protected readonly profile = this.profileService.profile;
  protected readonly preferences = this.profileService.preferences;
  protected readonly session = this.auth.currentSession;

  protected readonly initials = computed(() =>
    this.profile()
      .fullName.split(' ')
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join(''),
  );

  protected readonly securityOptions: TogglePreference[] = ['biometricLogin', 'twoStepVerification'];

  protected toggle(key: TogglePreference): void {
    this.profileService.togglePreference(key);
    this.ui.notify('profile.saved');
  }

  protected logout(): void {
    this.auth.logout();
    void this.router.navigate(['/login']);
  }

  protected resetDemoData(): void {
    clearPersistedData();
    window.location.reload();
  }
}
