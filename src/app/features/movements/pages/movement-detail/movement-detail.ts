import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { UiService } from '../../../../core/services/ui.service';
import { Icon } from '../../../../shared/components/icon/icon';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { CopCurrencyPipe } from '../../../../shared/pipes/cop-currency.pipe';
import { AccountsService } from '../../../../core/services/accounts.service';
import { MovementsService, signedAmount } from '../../../../core/services/movements.service';

@Component({
  selector: 'fa-movement-detail',
  imports: [DatePipe, RouterLink, TranslatePipe, Icon, PageHeader, CopCurrencyPipe],
  templateUrl: './movement-detail.html',
  styleUrl: './movement-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovementDetail {
  private readonly router = inject(Router);
  private readonly ui = inject(UiService);
  protected readonly movements = inject(MovementsService);
  protected readonly accounts = inject(AccountsService);

  readonly id = input.required<string>();

  protected readonly movement = computed(() => this.movements.byId(this.id()));
  protected readonly account = computed(() => {
    const movement = this.movement();
    return movement ? this.accounts.byId(movement.accountId) : undefined;
  });
  protected readonly categoryOptions = computed(() => {
    const movement = this.movement();
    return this.movements.categories.filter((category) => category.type === movement?.type);
  });
  protected readonly signedAmount = signedAmount;

  protected changeCategory(categoryId: string): void {
    this.movements.changeCategory(this.id(), categoryId);
    this.ui.notify('movements.categoryChanged');
  }

  protected remove(): void {
    this.movements.remove(this.id());
    this.ui.notify('movements.deleted');
    void this.router.navigate(['/movements']);
  }
}
