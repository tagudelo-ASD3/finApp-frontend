import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { CountKeyPipe } from '../../../../shared/pipes/count-key.pipe';
import { UiService } from '../../../../core/services/ui.service';
import { Icon } from '../../../../shared/components/icon/icon';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { CopCurrencyPipe } from '../../../../shared/pipes/cop-currency.pipe';
import { DebtsService } from '../../../../core/services/debts.service';

@Component({
  selector: 'fa-debt-list',
  imports: [DecimalPipe, RouterLink, TranslatePipe, Icon, PageHeader, CopCurrencyPipe, CountKeyPipe],
  templateUrl: './debt-list.html',
  styleUrl: './debt-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebtList {
  protected readonly ui = inject(UiService);
  protected readonly debts = inject(DebtsService);
}
