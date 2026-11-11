import { Component, Input } from '@angular/core';

import { Branch } from '../branch.model';

/** Resumo da filial na lateral do detalhe. Com `loading` a lateral inteira vira um bloco de skeleton. */
@Component({
  selector: 'app-branch-summary',
  standalone: true,
  templateUrl: './branch-summary.component.html',
  styleUrl: './branch-summary.component.scss'
})
export class BranchSummaryComponent {
  @Input() branch: Branch | null = null;
  @Input() loading = false;
}
