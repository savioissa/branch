import { Component, Input } from '@angular/core';

import { Branch } from '../branch.model';

/** Resumo da filial na lateral do detalhe. Com `loading` a lateral inteira vira um bloco de skeleton. */
@Component({
  selector: 'app-branch-sidebar',
  standalone: true,
  templateUrl: './branch-sidebar.component.html',
  styleUrl: './branch-sidebar.component.scss'
})
export class BranchSidebarComponent {
  @Input() branch: Branch | null = null;
  @Input() loading = false;
}
