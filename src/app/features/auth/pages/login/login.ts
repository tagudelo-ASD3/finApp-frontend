import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../../core/services/auth.service';
import { DEMO_CREDENTIALS } from '../../../../../mocks/auth.mock';
import { ThemeService } from '../../../../core/services/theme.service';
import { UiService } from '../../../../core/services/ui.service';
import { Logo } from '../../../../shared/components/logo/logo';
import { SocialProvider } from '../../../../core/models/session.model';

@Component({
  selector: 'fa-login',
  imports: [FormsModule, RouterLink, TranslatePipe, Logo],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly theme = inject(ThemeService);
  protected readonly ui = inject(UiService);

  protected readonly email = signal('');
  protected readonly password = signal('');
  protected readonly showError = signal(false);
  protected readonly demo = DEMO_CREDENTIALS;

  protected submit(): void {
    const ok = this.auth.login(this.email().trim(), this.password());
    this.showError.set(!ok);
    if (ok) {
      void this.router.navigate(['/dashboard']);
    }
  }

  protected useDemoAccount(): void {
    this.email.set(this.demo.email);
    this.password.set(this.demo.password);
    this.showError.set(false);
  }

  protected continueWith(provider: SocialProvider): void {
    this.auth.loginWith(provider);
    void this.router.navigate(['/dashboard']);
  }
}
