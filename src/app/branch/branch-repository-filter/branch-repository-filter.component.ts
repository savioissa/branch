import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';

import {
  FilterField,
  FilterOperator,
  REPOSITORY_FILTER_GROUPS,
  REPOSITORY_TYPES,
  RepositoryFilter,
  RepositoryType,
  RepositoryTypeFilter
} from '../branch.model';
import { repositoryTypeAllowed } from '../filter-sort';

/**
 * Painel de filtro de repositórios: Tipo repositório (seleção múltipla) e, para cada tipo, código e
 * descrição/nome com operador + valor (Código/Descrição do armazém, Código/Descrição da credenciada,
 * Login/Nome da equipe, Código/Nome da oficina e do cluster). Com Tipo repositório marcado, os campos dos tipos
 * não marcados ficam desabilitados.
 * Com `tipo` (escolha de repositório ao adicionar) o painel mostra só os dois campos desse tipo, sem Tipo repositório.
 */
@Component({
  selector: 'app-branch-repository-filter',
  standalone: true,
  imports: [FormsModule, DropdownModule, InputTextModule, MultiSelectModule],
  templateUrl: './branch-repository-filter.component.html',
  styleUrl: './branch-repository-filter.component.scss'
})
export class BranchRepositoryFilterComponent {
  @Input({ required: true }) filter!: RepositoryFilter;
  /** Prefixo dos ids dos campos: a aba e a seção de adicionar podem estar abertas ao mesmo tempo. */
  @Input() idPrefix = 'repository-filter';
  /** Tipo fixo: mostra só os campos dele. */
  @Input() tipo: RepositoryType | null = null;
  @Output() filterChange = new EventEmitter<RepositoryFilter>();

  readonly tipos = REPOSITORY_TYPES;

  readonly operadores: { label: string; value: FilterOperator }[] = [
    { label: 'Igual', value: 'igual' },
    { label: 'Diferente', value: 'diferente' },
    { label: 'Contém', value: 'contem' },
    { label: 'Começa com', value: 'comeca' },
    { label: 'Termina com', value: 'termina' }
  ];

  get grupos(): typeof REPOSITORY_FILTER_GROUPS {
    return this.tipo ? REPOSITORY_FILTER_GROUPS.filter((g) => g.tipo === this.tipo) : REPOSITORY_FILTER_GROUPS;
  }

  habilitado(tipo: RepositoryType): boolean {
    return repositoryTypeAllowed(this.filter, tipo);
  }

  setTipos(tipos: RepositoryType[] | null): void {
    this.emit({ ...this.filter, tipos: tipos ?? [] });
  }

  update(tipo: RepositoryType, campo: keyof RepositoryTypeFilter, patch: Partial<FilterField>): void {
    const grupo = this.filter.campos[tipo];
    this.emit({
      ...this.filter,
      campos: { ...this.filter.campos, [tipo]: { ...grupo, [campo]: { ...grupo[campo], ...patch } } }
    });
  }

  private emit(filter: RepositoryFilter): void {
    this.filter = filter;
    this.filterChange.emit(filter);
  }
}
