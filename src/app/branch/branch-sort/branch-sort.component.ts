import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

import { SortField, SortState } from '../branch.model';

/** Painel de ordenação por Código ou Descrição, com direção crescente/decrescente. */
@Component({
  selector: 'app-branch-sort',
  standalone: true,
  imports: [FormsModule, ButtonModule, DropdownModule],
  templateUrl: './branch-sort.component.html',
  styleUrl: './branch-sort.component.scss'
})
export class BranchSortComponent {
  @Input({ required: true }) sort!: SortState;
  @Output() sortChange = new EventEmitter<SortState>();

  readonly campos: { label: string; value: SortField }[] = [
    { label: 'Código', value: 'codigo' },
    { label: 'Descrição', value: 'descricao' }
  ];

  setCampo(campo: SortField | null): void {
    this.emit({ ...this.sort, campo });
  }

  inverterDirecao(): void {
    this.emit({ ...this.sort, direcao: this.sort.direcao === 'asc' ? 'desc' : 'asc' });
  }

  private emit(sort: SortState): void {
    this.sort = sort;
    this.sortChange.emit(sort);
  }
}
