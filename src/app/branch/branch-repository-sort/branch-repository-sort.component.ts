import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

import { RepositorySortField, RepositorySortState } from '../branch.model';

/** Painel de ordenação de repositórios por Tipo, Código / Login ou Nome / Técnico. Usa o template do painel da filial. */
@Component({
  selector: 'app-branch-repository-sort',
  standalone: true,
  imports: [FormsModule, ButtonModule, DropdownModule],
  templateUrl: '../branch-sort/branch-sort.component.html',
  styleUrl: '../branch-sort/branch-sort.component.scss'
})
export class BranchRepositorySortComponent {
  @Input({ required: true }) sort!: RepositorySortState;
  @Output() sortChange = new EventEmitter<RepositorySortState>();

  readonly campos: { label: string; value: RepositorySortField }[] = [
    { label: 'Tipo', value: 'tipo' },
    { label: 'Código / Login', value: 'codigo' },
    { label: 'Nome / Técnico', value: 'nome' }
  ];

  setCampo(campo: RepositorySortField | null): void {
    this.emit({ ...this.sort, campo });
  }

  inverterDirecao(): void {
    this.emit({ ...this.sort, direcao: this.sort.direcao === 'asc' ? 'desc' : 'asc' });
  }

  private emit(sort: RepositorySortState): void {
    this.sort = sort;
    this.sortChange.emit(sort);
  }
}
