import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

import { BranchFilterComponent } from '../branch-filter/branch-filter.component';
import { BranchFilter, SortState, Warehouse, emptyFilter } from '../branch.model';
import { BranchService } from '../branch.service';
import { filterAndSort, hasActiveFilter } from '../filter-sort';
import { BranchStockPartitionCardComponent } from '../branch-stock-partition-card/branch-stock-partition-card.component';

type LoadStatus = 'loading' | 'ready' | 'error';

/**
 * Escolha de um almoxarifado ao adicionar repositório: lista todos os almoxarifados do sistema, cada card com
 * "Selecionar". Com um escolhido, a lista recolhe e fica só o card dele; acima, "Alterar" reabre a lista
 * (a escolha vale até outra ser feita) e "Remover" desfaz a escolha.
 */
@Component({
  selector: 'app-branch-stock-partition-picker',
  standalone: true,
  imports: [ButtonModule, PaginatorModule, BranchFilterComponent, BranchStockPartitionCardComponent],
  templateUrl: './branch-stock-partition-picker.component.html',
  styleUrl: './branch-stock-partition-picker.component.scss'
})
export class BranchStockPartitionPickerComponent implements OnInit {
  private readonly service = inject(BranchService);

  @Input() selected: Warehouse | null = null;
  @Output() selectedChange = new EventEmitter<Warehouse | null>();

  readonly rows = 3;
  readonly skeletons = Array.from({ length: 3 });

  status: LoadStatus = 'loading';
  /** Lista reaberta por "Alterar", com a escolha ainda valendo. */
  alterando = false;
  catalogo: Warehouse[] = [];
  resultado: Warehouse[] = [];
  first = 0;

  showFilter = false;
  /** Filtro em edição no painel. */
  filtro: BranchFilter = emptyFilter();
  /** Filtro em vigor: o do painel só passa a valer quando o usuário clica em Atualizar. */
  filtroAplicado: BranchFilter = emptyFilter();
  readonly ordenacao: SortState = { campo: 'descricao', direcao: 'asc' };

  get pagina(): Warehouse[] {
    return this.resultado.slice(this.first, this.first + this.rows);
  }

  get filtroAtivo(): boolean {
    return hasActiveFilter(this.filtroAplicado);
  }

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.status = 'loading';
    this.filtroAplicado = this.filtro;
    this.service.listarCatalogoAlmoxarifados().subscribe({
      next: (lista) => {
        this.catalogo = lista;
        this.status = 'ready';
        this.resultado = filterAndSort(this.catalogo, this.filtroAplicado, this.ordenacao);
        this.first = 0;
      },
      error: () => (this.status = 'error')
    });
  }

  escolher(stockPartition: Warehouse | null): void {
    this.alterando = false;
    this.selectedChange.emit(stockPartition);
  }

  onFilterChange(filtro: BranchFilter): void {
    this.filtro = filtro;
  }

  onPage(event: PaginatorState): void {
    this.first = event.first ?? 0;
  }

  abrir(stockPartition: Warehouse): void {
    // TODO: navegar para a home do almoxarifado (a página ainda não existe)
    void stockPartition;
  }
}
