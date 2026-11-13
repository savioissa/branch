import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

import {
  LinkedRepository,
  Repository,
  RepositoryFilter,
  RepositoryLink,
  RepositorySortState,
  emptyRepositoryFilter,
  repositoryLinkKey
} from '../branch.model';
import { BranchService, SuppliesPendingError } from '../branch.service';
import { suppliesBlockedDialog } from '../supplies';
import { filterAndSortRepositories, hasActiveRepositoryFilter } from '../filter-sort';
import { BranchRepositoryAddComponent } from '../branch-repository-add/branch-repository-add.component';
import { BranchRepositoryCardComponent } from '../branch-repository-card/branch-repository-card.component';
import { BranchRepositoryFilterComponent } from '../branch-repository-filter/branch-repository-filter.component';
import { BranchRepositorySortComponent } from '../branch-repository-sort/branch-repository-sort.component';

type LoadStatus = 'loading' | 'ready' | 'error';

/**
 * Aba Repositório do detalhe da filial: vínculos da filial, um card por par almoxarifado + repositório
 * (Equipe, Credenciada, Armazém, Oficina, Cluster). Filtro, ordenação e paginação iguais aos da aba Almoxarifado.
 * "Adicionar" abre a tela cinza de escolha do par; cada card pode ser desvinculado.
 */
@Component({
  selector: 'app-branch-repositories',
  standalone: true,
  imports: [
    ButtonModule,
    ConfirmDialogModule,
    PaginatorModule,
    BranchRepositoryAddComponent,
    BranchRepositoryCardComponent,
    BranchRepositoryFilterComponent,
    BranchRepositorySortComponent
  ],
  // confirmação só desta aba (o <p-confirmDialog> fica no template)
  providers: [ConfirmationService],
  templateUrl: './branch-repositories.component.html',
  styleUrl: '../branch-stock-partitions/branch-stock-partitions.component.scss'
})
export class BranchRepositoriesComponent implements OnChanges {
  private readonly service = inject(BranchService);
  private readonly messages = inject(MessageService);
  private readonly confirmation = inject(ConfirmationService);

  /** `null` enquanto a filial ainda carrega: a aba mostra o próprio skeleton e busca assim que o código chegar. */
  @Input({ required: true }) branchCode!: string | null;

  readonly rows = 7;
  readonly skeletons = Array.from({ length: 3 });

  status: LoadStatus = 'loading';
  repositories: LinkedRepository[] = [];
  resultado: LinkedRepository[] = [];
  first = 0;

  showFilter = false;
  showSort = false;
  showAdd = false;
  /** Consultando insumos antes de desvincular (evita clique duplo). */
  verificando = false;

  /** Filtro em edição no painel. */
  filtro: RepositoryFilter = emptyRepositoryFilter();
  /** Filtro em vigor: o do painel só passa a valer quando o usuário clica em Atualizar. */
  filtroAplicado: RepositoryFilter = emptyRepositoryFilter();
  /** Ordenação padrão: Nome / Técnico, crescente (mesmo critério da aba Almoxarifado). */
  ordenacao: RepositorySortState = { campo: 'nome', direcao: 'asc' };

  constructor() {
    // vínculos mexidos na aba Almoxarifado (ex.: almoxarifado desvinculado leva os pares com ele)
    this.service.linkChanges$.pipe(takeUntilDestroyed()).subscribe((c) => {
      if (c.origem === 'almoxarifado' && c.filial === this.branchCode && this.status !== 'loading') this.carregar();
    });
  }

  get pagina(): LinkedRepository[] {
    return this.resultado.slice(this.first, this.first + this.rows);
  }

  get filtroAtivo(): boolean {
    return hasActiveRepositoryFilter(this.filtroAplicado);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Carrega quando o código chega pela primeira vez; mudanças depois (edição do cadastro) acompanham no serviço.
    const change = changes['branchCode'];
    if (change && change.currentValue && !change.previousValue) {
      this.carregar();
    }
  }

  key(link: LinkedRepository): string {
    return repositoryLinkKey(link, link.almoxarifado.codigo);
  }

  carregar(): void {
    this.status = 'loading';
    this.filtroAplicado = this.filtro;
    if (!this.branchCode) return;
    this.service.listarRepositorios(this.branchCode).subscribe({
      next: (lista) => {
        this.repositories = lista;
        this.status = 'ready';
        this.aplicar();
      },
      error: () => (this.status = 'error')
    });
  }

  onFilterChange(filtro: RepositoryFilter): void {
    this.filtro = filtro;
  }

  onSortChange(ordenacao: RepositorySortState): void {
    this.ordenacao = ordenacao;
    this.aplicar();
  }

  aplicar(): void {
    this.resultado = filterAndSortRepositories(this.repositories, this.filtroAplicado, this.ordenacao);
    this.first = 0;
  }

  onPage(event: PaginatorState): void {
    this.first = event.first ?? 0;
  }

  /** Par salvo na tela de adicionar: fecha a tela e recarrega os vínculos. */
  onAdded(): void {
    this.showAdd = false;
    this.carregar();
  }

  /* ---------- desvincular ---------- */

  /**
   * Desvincula o par almoxarifado + repositório. Se o repositório ainda tiver insumos no almoxarifado, mostra
   * o aviso de bloqueio; senão pede confirmação.
   */
  desvincular(link: LinkedRepository): void {
    if (!this.branchCode || this.verificando) return;
    const filial = this.branchCode;
    const vinculo: RepositoryLink = { tipo: link.tipo, codigo: link.codigo, almoxarifado: link.almoxarifado.codigo };
    const alvo = `"${link.codigo} - ${link.nome}"`;
    this.verificando = true;

    this.service.insumosNoVinculo(filial, vinculo).subscribe({
      next: (pendentes) => {
        this.verificando = false;
        if (pendentes.length) {
          this.confirmation.confirm(suppliesBlockedDialog(alvo, pendentes, 'almoxarifados'));
          return;
        }
        this.confirmarDesvinculo(filial, link, vinculo, alvo);
      },
      error: () => {
        this.verificando = false;
        this.erroDesvincular();
      }
    });
  }

  private confirmarDesvinculo(filial: string, link: LinkedRepository, vinculo: RepositoryLink, alvo: string): void {
    const almoxarifado = `"${link.almoxarifado.codigo} - ${link.almoxarifado.descricao}"`;
    this.confirmation.confirm({
      message: `Deseja desvincular o repositório ${alvo} do almoxarifado ${almoxarifado}?`,
      acceptLabel: 'Desvincular',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'btn--md btn--danger',
      rejectButtonStyleClass: 'btn--md btn--neutral',
      acceptIcon: 'none',
      rejectIcon: 'none',
      defaultFocus: 'reject',
      accept: () =>
        this.service.desvincularRepositorio(filial, vinculo).subscribe({
          next: () => {
            this.messages.add({ severity: 'success', summary: 'Repositório desvinculado com sucesso', life: 4000 });
            this.carregar();
          },
          // insumos entraram entre a verificação e a confirmação: o serviço recusa e o aviso aparece
          error: (err: unknown) =>
            err instanceof SuppliesPendingError
              ? setTimeout(() => this.confirmation.confirm(suppliesBlockedDialog(alvo, err.pendentes, 'almoxarifados')))
              : this.erroDesvincular()
        })
    });
  }

  private erroDesvincular(): void {
    this.messages.add({
      severity: 'error',
      summary: 'Não foi possível desvincular o repositório. Por favor tente novamente',
      life: 6000
    });
  }

  abrir(repository: Repository): void {
    // TODO: navegar para a home do repositório (a página ainda não existe)
    void repository;
  }
}
