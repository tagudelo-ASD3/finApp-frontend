import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Icon } from '../../../../shared/components/icon/icon';
import { Logo } from '../../../../shared/components/logo/logo';
import { BUILD_STEPS, DEMO_VIDEO_ID, REPOSITORY_URL, TOOLS } from '../../../../core/constants/about.constants';

/** Public page that explains how the site was built and embeds the demo video. */
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

  protected readonly videoUrl: SafeResourceUrl | null = DEMO_VIDEO_ID
    ? inject(DomSanitizer).bypassSecurityTrustResourceUrl(`https://www.youtube-nocookie.com/embed/${DEMO_VIDEO_ID}`)
    : null;
}
