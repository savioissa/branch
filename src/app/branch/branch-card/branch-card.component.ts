import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { Branch } from '../branch.model';

/**
 * Card de uma filial na lista. Com `loading` o card inteiro vira um bloco de skeleton
 * da mesma altura, para a lista não pular quando os dados chegam.
 */
@Component({
  selector: 'app-branch-card',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './branch-card.component.html',
  styleUrl: './branch-card.component.scss'
})
export class BranchCardComponent {
  @Input() branch: Branch | null = null;
  @Input() loading = false;

  @Output() open = new EventEmitter<Branch>();
}
