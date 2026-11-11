import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

import { BranchFilter, FilterOperator } from '../branch.model';

/** Painel de filtro da lista de filiais: Código e Descrição, cada um com operador + valor. */
@Component({
  selector: 'app-branch-filter',
  standalone: true,
  imports: [FormsModule, DropdownModule, InputTextModule],
  templateUrl: './branch-filter.component.html',
  styleUrl: './branch-filter.component.scss'
})
export class BranchFilterComponent {
  @Input({ required: true }) filter!: BranchFilter;
  @Output() filterChange = new EventEmitter<BranchFilter>();

  readonly operadores: { label: string; value: FilterOperator }[] = [
    { label: 'Igual', value: 'igual' },
    { label: 'Diferente', value: 'diferente' },
    { label: 'Contém', value: 'contem' },
    { label: 'Começa com', value: 'comeca' },
    { label: 'Termina com', value: 'termina' }
  ];

  update<K extends keyof BranchFilter>(campo: K, patch: Partial<BranchFilter[K]>): void {
    this.filter = { ...this.filter, [campo]: { ...this.filter[campo], ...patch } };
    this.filterChange.emit(this.filter);
  }
}
