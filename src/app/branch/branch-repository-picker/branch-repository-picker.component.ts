import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

import {
  REPOSITORY_TYPES,
  Repository,
  RepositoryFilter,
  RepositorySortState,
  RepositoryType,
  emptyRepositoryFilter,
  repositoryKey
} from '../branch.model';
import { BranchService } from '../branch.service';
import { filterAndSortRepositories, hasActiveRepositoryFilter } from '../filter-sort';
import { BranchRepositoryCardComponent } from '../branch-repository-card/branch-repository-card.component';
import { BranchRepositoryFilterComponent } from '../branch-repository-filter/branch-repository-filter.component';

type LoadStatus = 'loading' | 'ready' | 'error';

/**
 * Escolha de um repositório ao adicionar: o select de tipo (Equipe por padrão) define quais repositórios do
 * sistema aparecem, cada card com "Selecionar". Com um escolhido, a lista recolhe e fica só o card dele; acima,
 * "Alterar" reabre a lista (a escolha vale até outra ser feita) e "Remover" desfaz a escolha.
 * Com `closed` (sem almoxarifado escolhido) mostra só o título e não carrega.
 */
@Component({
  selector: 'app-branch-repository-picker',
  standalone: true,
  imports: [FormsModule, ButtonModule, DropdownModule, PaginatorModule, BranchRepositoryCardComponent, BranchRepositoryFilterComponent],
  templateUrl: './branch-repository-picker.component.html',
  styleUrl: '../branch-stock-partition-picker/branch-stock-partition-picker.component.scss'
})
export class BranchRepositoryPickerComponent implements OnChanges {
  private readonly service = inject(BranchService);

  @Input() selected: Repository | null = null;
  /** Fechada: só o título; a lista carrega na primeira vez que abre. */
  @Input() closed = false;
  @Output() selectedChange = new EventEmitter<Repository | null>();

  readonly tipos = REPOSITORY_TYPES;
  readonly rows = 3;
  readonly skeletons = Array.from({ length: 3 });
  readonly key = repositoryKey;

  tipo: RepositoryType = 'equipe';
  status: LoadStatus = 'loading';
  /** Lista reaberta por "Alterar", com a escolha ainda valendo. */
  alterando = false;
  private carregado = false;
  repositorios: Repository[] = [];
  resultado: Repository[] = [];
  first = 0;

  showFilter = false;
  /** Filtro em edição no painel (só os campos do tipo escolhido). */
  filtro: RepositoryFilter = emptyRepositoryFilter();
  /** Filtro em vigor: o do painel só passa a valer quando o usuário clica em Atualizar. */
  filtroAplicado: RepositoryFilter = emptyRepositoryFilter();
  readonly ordenacao: RepositorySortState = { campo: 'nome', direcao: 'asc' };

  get pagina(): Repository[] {
    return this.resultado.slice(this.first, this.first + this.rows);
  }

  get filtroAtivo(): boolean {
    return hasActiveRepositoryFilter(this.filtroAplicado);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['closed'] && this.closed) this.alterando = false;
    if (!this.closed && !this.carregado) {
      this.carregado = true;
      this.carregar();
    }
  }

  escolher(repository: Repository | null): void {
    this.alterando = false;
    this.selectedChange.emit(repository);
  }

  /** Trocar o tipo limpa o filtro (os campos são de outro tipo) e carrega os repositórios do tipo novo. */
  onTipoChange(tipo: RepositoryType): void {
    this.tipo = tipo;
    this.filtro = emptyRepositoryFilter();
    this.carregar();
  }

  carregar(): void {
    this.status = 'loading';
    this.filtroAplicado = this.filtro;
    const tipo = this.tipo;
    this.service.listarRepositoriosPorTipo(tipo).subscribe({
      next: (lista) => {
        if (tipo !== this.tipo) return; // resposta de um tipo que já foi trocado
        this.repositorios = lista;
        this.status = 'ready';
        this.resultado = filterAndSortRepositories(this.repositorios, this.filtroAplicado, this.ordenacao);
        this.first = 0;
      },
      error: () => (this.status = 'error')
    });
  }

  onFilterChange(filtro: RepositoryFilter): void {
    this.filtro = filtro;
  }

  onPage(event: PaginatorState): void {
    this.first = event.first ?? 0;
  }

  abrir(repository: Repository): void {
    // TODO: navegar para a home do repositório (a página ainda não existe)
    void repository;
  }
}
