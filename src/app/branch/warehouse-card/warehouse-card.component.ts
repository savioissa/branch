import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

import { Warehouse } from '../branch.model';

/**
 * Card de um almoxarifado. Com `loading` o card inteiro vira um bloco de skeleton.
 * Com `selectable` ganha um checkbox à esquerda (usado na seleção para vincular).
 */
@Component({
  selector: 'app-warehouse-card',
  standalone: true,
  imports: [FormsModule, ButtonModule, CheckboxModule],
  templateUrl: './warehouse-card.component.html',
  styleUrl: './warehouse-card.component.scss'
})
export class WarehouseCardComponent {
  @Input() warehouse: Warehouse | null = null;
  @Input() loading = false;
  @Input() selectable = false;
  @Input() selected = false;

  @Output() open = new EventEmitter<Warehouse>();
  @Output() selectedChange = new EventEmitter<boolean>();
}
