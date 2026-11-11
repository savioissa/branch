import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

import { BranchFilterComponent } from '../branch-filter/branch-filter.component';
import { BranchFilter, SortState, Warehouse, emptyFilter } from '../branch.model';
import { BranchService } from '../branch.service';
import { filterAndSort, hasActiveFilter } from '../filter-sort';
import { WarehouseCardComponent } from '../warehouse-card/warehouse-card.component';

type LoadStatus = 'loading' | 'ready' | 'error';

/**
 * Seção "Selecionar almoxarifado" da aba Almoxarifado: lista os almoxarifados ainda não vinculados
 * à filial, permite marcar um ou mais e vinculá-los de uma vez.
 */
@Component({
  selector: 'app-warehouse-link',
  standalone: true,
  imports: [ButtonModule, PaginatorModule, BranchFilterComponent, WarehouseCardComponent],
  templateUrl: './warehouse-link.component.html',
  styleUrl: './warehouse-link.component.scss'
})
export class WarehouseLinkComponent implements OnInit {
  private readonly service = inject(BranchService);
  private readonly messages = inject(MessageService);

  @Input({ required: true }) branchCode!: string;

  /** Usuário fechou a seção sem vincular. */
  @Output() closed = new EventEmitter<void>();
  /** Vínculo feito: a lista de almoxarifados da filial precisa recarregar. */
  @Output() linked = new EventEmitter<void>();

  readonly rows = 5;
  readonly skeletons = Array.from({ length: 3 });

  status: LoadStatus = 'loading';
  disponiveis: Warehouse[] = [];
  resultado: Warehouse[] = [];
  first = 0;

  /** Seleção por código: continua marcada ao trocar de página ou filtrar. */
  readonly selecionados = new Set<string>();
  linking = false;

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
    this.service.listarAlmoxarifadosDisponiveis(this.branchCode).subscribe({
      next: (lista) => {
        this.disponiveis = lista;
        // descarta da seleção o que não está mais disponível
        const codigos = new Set(lista.map((w) => w.codigo));
        for (const c of [...this.selecionados]) if (!codigos.has(c)) this.selecionados.delete(c);
        this.status = 'ready';
        this.aplicar();
      },
      error: () => (this.status = 'error')
    });
  }

  onFilterChange(filtro: BranchFilter): void {
    this.filtro = filtro;
  }

  aplicar(): void {
    this.resultado = filterAndSort(this.disponiveis, this.filtroAplicado, this.ordenacao);
    this.first = 0;
  }

  onPage(event: PaginatorState): void {
    this.first = event.first ?? 0;
  }

  alternar(warehouse: Warehouse, marcado: boolean): void {
    if (marcado) this.selecionados.add(warehouse.codigo);
    else this.selecionados.delete(warehouse.codigo);
  }

  vincular(): void {
    if (!this.selecionados.size || this.linking) return;
    this.linking = true;

    this.service.vincularAlmoxarifados(this.branchCode, [...this.selecionados]).subscribe({
      next: () => {
        this.linking = false;
        this.messages.add({ severity: 'success', summary: 'Almoxarifado(s) vinculado(s) com sucesso', life: 4000 });
        this.linked.emit();
      },
      error: () => {
        this.linking = false;
        this.messages.add({
          severity: 'error',
          summary: 'Não foi possível vincular o(s) almoxarifado(s). Por favor tente novamente',
          life: 6000
        });
      }
    });
  }

  abrir(warehouse: Warehouse): void {
    // TODO: navegar para a home do almoxarifado (a página ainda não existe)
    void warehouse;
  }
}
