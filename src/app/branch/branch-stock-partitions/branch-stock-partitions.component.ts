import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

import { BranchFilterComponent } from '../branch-filter/branch-filter.component';
import { BranchSortComponent } from '../branch-sort/branch-sort.component';
import { BranchFilter, SortState, Warehouse, emptyFilter } from '../branch.model';
import { BranchService, SuppliesPendingError } from '../branch.service';
import { suppliesBlockedDialog } from '../supplies';
import { filterAndSort, hasActiveFilter } from '../filter-sort';
import { BranchStockPartitionCardComponent } from '../branch-stock-partition-card/branch-stock-partition-card.component';
import { BranchStockPartitionLinkComponent } from '../branch-stock-partition-link/branch-stock-partition-link.component';

type LoadStatus = 'loading' | 'ready' | 'error';

/** Aba Almoxarifado do detalhe da filial: almoxarifados vinculados, com filtro, ordenação e paginação. */
@Component({
  selector: 'app-branch-stock-partitions',
  standalone: true,
  imports: [
    ButtonModule,
    ConfirmDialogModule,
    PaginatorModule,
    BranchFilterComponent,
    BranchSortComponent,
    BranchStockPartitionCardComponent,
    BranchStockPartitionLinkComponent
  ],
  // confirmação só desta aba (o <p-confirmDialog> fica no template)
  providers: [ConfirmationService],
  templateUrl: './branch-stock-partitions.component.html',
  styleUrl: './branch-stock-partitions.component.scss'
})
export class BranchStockPartitionsComponent implements OnChanges {
  private readonly service = inject(BranchService);
  private readonly messages = inject(MessageService);
  private readonly confirmation = inject(ConfirmationService);

  constructor() {
    // vínculos mexidos na aba Repositório (ex.: almoxarifado vinculado à filial junto com o repositório)
    this.service.linkChanges$.pipe(takeUntilDestroyed()).subscribe((c) => {
      if (c.origem === 'repositorio' && c.filial === this.branchCode && this.status !== 'loading') this.carregar();
    });
  }

  /** `null` enquanto a filial ainda carrega: a aba mostra o próprio skeleton e busca assim que o código chegar. */
  @Input({ required: true }) branchCode!: string | null;

  readonly rows = 7;
  readonly skeletons = Array.from({ length: 3 });

  status: LoadStatus = 'loading';
  stockPartitions: Warehouse[] = [];
  resultado: Warehouse[] = [];
  first = 0;

  showFilter = false;
  showSort = false;
  showLink = false;
  /** Consultando insumos antes de desvincular (evita clique duplo). */
  verificando = false;

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
        this.stockPartitions = lista;
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
    this.resultado = filterAndSort(this.stockPartitions, this.filtroAplicado, this.ordenacao);
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

  /**
   * Desvincula o almoxarifado da filial. Se algum repositório da filial ainda tiver insumos nele, mostra o
   * aviso de bloqueio (com os repositórios e quantidades); senão pede confirmação.
   */
  desvincular(stockPartition: Warehouse): void {
    if (!this.branchCode || this.verificando) return;
    const filial = this.branchCode;
    const alvo = `"${stockPartition.codigo} - ${stockPartition.descricao}"`;
    this.verificando = true;

    this.service.insumosNoAlmoxarifado(filial, stockPartition.codigo).subscribe({
      next: (pendentes) => {
        this.verificando = false;
        if (pendentes.length) {
          this.confirmation.confirm(suppliesBlockedDialog(alvo, pendentes, 'repositorios'));
          return;
        }
        this.confirmarDesvinculo(filial, stockPartition);
      },
      error: () => {
        this.verificando = false;
        this.erroDesvincular();
      }
    });
  }

  private confirmarDesvinculo(filial: string, stockPartition: Warehouse): void {
    const alvo = `"${stockPartition.codigo} - ${stockPartition.descricao}"`;
    this.confirmation.confirm({
      message: `Deseja desvincular o almoxarifado ${alvo} desta filial? Os repositórios desta filial também deixarão de usá-lo.`,
      acceptLabel: 'Desvincular',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'btn--md btn--danger',
      rejectButtonStyleClass: 'btn--md btn--neutral',
      acceptIcon: 'none',
      rejectIcon: 'none',
      defaultFocus: 'reject',
      accept: () =>
        this.service.desvincularAlmoxarifado(filial, stockPartition.codigo).subscribe({
          next: () => {
            this.messages.add({ severity: 'success', summary: 'Almoxarifado desvinculado com sucesso', life: 4000 });
            this.carregar();
          },
          // insumos entraram entre a verificação e a confirmação: o serviço recusa e o aviso aparece
          error: (err: unknown) =>
            err instanceof SuppliesPendingError
              ? setTimeout(() => this.confirmation.confirm(suppliesBlockedDialog(alvo, err.pendentes, 'repositorios')))
              : this.erroDesvincular()
        })
    });
  }

  private erroDesvincular(): void {
    this.messages.add({
      severity: 'error',
      summary: 'Não foi possível desvincular o almoxarifado. Por favor tente novamente',
      life: 6000
    });
  }

  abrir(stockPartition: Warehouse): void {
    // TODO: navegar para a home do almoxarifado (a página ainda não existe)
    void stockPartition;
  }
}
