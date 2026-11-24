import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { UiService } from '../../../../core/services/ui.service';
import { Icon } from '../../../../shared/components/icon/icon';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { CopCurrencyPipe } from '../../../../shared/pipes/cop-currency.pipe';
import { ReportsService } from '../../../../core/services/reports.service';

const SLICE_COLORS = ['var(--primary)', 'var(--accent)', 'var(--warn)', 'var(--good)', 'var(--surface-3)'];
const DONUT_RADIUS = 52;

@Component({
  selector: 'fa-reports',
  imports: [DatePipe, TranslatePipe, Icon, PageHeader, CopCurrencyPipe],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Reports {
  private readonly ui = inject(UiService);
  protected readonly reports = inject(ReportsService);
  protected readonly today = new Date();
  protected readonly radius = DONUT_RADIUS;

  protected readonly slices = computed(() => {
    const circumference = 2 * Math.PI * DONUT_RADIUS;
    const total = this.reports.byCategory().reduce((sum, share) => sum + share.amount, 0) || 1;
    let offset = 0;
    return this.reports.byCategory().map((share, index) => {
      const length = (share.amount / total) * circumference;
      const slice = {
        ...share,
        color: SLICE_COLORS[index % SLICE_COLORS.length],
        dasharray: `${length} ${circumference - length}`,
        dashoffset: -offset,
      };
      offset += length;
      return slice;
    });
  });

  protected barHeight(value: number): number {
    return Math.round((value / this.reports.chartMax()) * 100);
  }

  protected download(): void {
    this.ui.notify('reports.downloadSoon');
  }
}
