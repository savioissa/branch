import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

import { BranchFilterComponent } from '../branch-filter/branch-filter.component';
import { BranchSortComponent } from '../branch-sort/branch-sort.component';
import { BranchFilter, SortState, Warehouse, emptyFilter } from '../branch.model';
import { BranchService } from '../branch.service';
import { filterAndSort, hasActiveFilter } from '../filter-sort';
import { WarehouseCardComponent } from '../warehouse-card/warehouse-card.component';
import { WarehouseLinkComponent } from '../warehouse-link/warehouse-link.component';

type LoadStatus = 'loading' | 'ready' | 'error';

/** Aba Almoxarifado do detalhe da filial: almoxarifados vinculados, com filtro, ordenação e paginação. */
@Component({
  selector: 'app-branch-warehouses',
  standalone: true,
  imports: [
    ButtonModule,
    PaginatorModule,
    BranchFilterComponent,
    BranchSortComponent,
    WarehouseCardComponent,
    WarehouseLinkComponent
  ],
  templateUrl: './branch-warehouses.component.html',
  styleUrl: './branch-warehouses.component.scss'
})
export class BranchWarehousesComponent implements OnChanges {
  private readonly service = inject(BranchService);

  /** `null` enquanto a filial ainda carrega: a aba mostra o próprio skeleton e busca assim que o código chegar. */
  @Input({ required: true }) branchCode!: string | null;

  readonly rows = 7;
  readonly skeletons = Array.from({ length: 3 });

  status: LoadStatus = 'loading';
  warehouses: Warehouse[] = [];
  resultado: Warehouse[] = [];
  first = 0;

  showFilter = false;
  showSort = false;
  showLink = false;

  /** Filtro em edição no painel. */
  filtro: BranchFilter = emptyFilter();
  /** Filtro em vigor: o do painel só passa a valer quando o usuário clica em Atualizar. */
  filtroAplicado: BranchFilter = emptyFilter();
  /** Ordenação padrão da lista de almoxarifados: Descrição, crescente (especificação da home). */
  ordenacao: SortState = { campo: 'descricao', direcao: 'asc' };

  get pagina(): Warehouse[] {
    return this.resultado.slice(this.first, this.first + this.rows);
  }

  get filtroAtivo(): boolean {
    return hasActiveFilter(this.filtroAplicado);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Carrega quando o código chega pela primeira vez. Se o código mudar depois (edição do cadastro),
    // os vínculos acompanham no serviço e não precisa recarregar.
    const change = changes['branchCode'];
    if (change && change.currentValue && !change.previousValue) {
      this.carregar();
    }
  }

  carregar(): void {
    this.status = 'loading';
    this.filtroAplicado = this.filtro;
    if (!this.branchCode) return;
    this.service.listarAlmoxarifados(this.branchCode).subscribe({
      next: (lista) => {
        this.warehouses = lista;
        this.status = 'ready';
        this.aplicar();
      },
      error: () => (this.status = 'error')
    });
  }

  onFilterChange(filtro: BranchFilter): void {
    this.filtro = filtro;
  }

  onSortChange(ordenacao: SortState): void {
    this.ordenacao = ordenacao;
    this.aplicar();
  }

  aplicar(): void {
    this.resultado = filterAndSort(this.warehouses, this.filtroAplicado, this.ordenacao);
    this.first = 0;
  }

  onPage(event: PaginatorState): void {
    this.first = event.first ?? 0;
  }

  /** Vínculo feito na seção de seleção: fecha a seção e recarrega os vinculados. */
  onLinked(): void {
    this.showLink = false;
    this.carregar();
  }

  abrir(warehouse: Warehouse): void {
    // TODO: navegar para o detalhe do almoxarifado
    void warehouse;
  }
}
