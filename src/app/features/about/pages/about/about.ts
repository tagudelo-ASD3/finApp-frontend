import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Icon } from '../../../../shared/components/icon/icon';
import { Logo } from '../../../../shared/components/logo/logo';
import { BUILD_STEPS, DEMO_VIDEO_URL, REPOSITORY_URL, TOOLS } from '../../../../core/constants/about.constants';

@Component({
  selector: 'fa-about',
  imports: [RouterLink, TranslatePipe, Icon, Logo],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly isLoggedIn = inject(AuthService).isLoggedIn;
  protected readonly tools = TOOLS;
  protected readonly steps = BUILD_STEPS;
  protected readonly repositoryUrl = REPOSITORY_URL;

  protected readonly videoUrl = DEMO_VIDEO_URL;
}
