import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { filter, map, switchMap, tap } from 'rxjs';

import { BranchRegisterComponent } from '../branch-register/branch-register.component';
import { BranchRepositoriesComponent } from '../branch-repositories/branch-repositories.component';
import { BranchSidebarComponent } from '../branch-sidebar/branch-sidebar.component';
import { BranchStockPartitionsComponent } from '../branch-stock-partitions/branch-stock-partitions.component';
import { Branch } from '../branch.model';
import { BranchService } from '../branch.service';

type LoadStatus = 'loading' | 'ready' | 'notfound' | 'error';

/**
 * Página de uma filial: resumo à esquerda e abas à direita.
 * Aba Cadastro: app-branch-register (leitura e edição do cadastro); ao gravar, a lateral e a URL acompanham.
 * Aba Almoxarifado: almoxarifados vinculados (carregada só quando a aba é aberta).
 * Aba Repositório: repositórios vinculados, com os almoxarifados da filial associados (também lazy).
 */
@Component({
  selector: 'app-branch-detail',
  standalone: true,
  imports: [
    ButtonModule,
    TabViewModule,
    BranchRegisterComponent,
    BranchSidebarComponent,
    BranchStockPartitionsComponent,
    BranchRepositoriesComponent
  ],
  templateUrl: './branch-detail.component.html',
  styleUrl: './branch-detail.component.scss'
})
export class BranchDetailComponent implements OnInit {
  private readonly service = inject(BranchService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  status: LoadStatus = 'loading';
  branch: Branch | null = null;
  activeTab = 0;

  ngOnInit(): void {
    // link direto para uma aba: /filial/PRO?aba=almoxarifado ou ?aba=repositorio
    const abas: Record<string, number> = { almoxarifado: 1, repositorio: 2 };
    this.activeTab = abas[this.route.snapshot.queryParamMap.get('aba') ?? ''] ?? 0;

    this.route.paramMap
      .pipe(
        map((params) => params.get('codigo') ?? ''),
        // depois de salvar com outro código a URL muda; a filial já está carregada, não recarrega
        filter((codigo) => codigo !== this.branch?.codigo),
        tap(() => (this.status = 'loading')),
        switchMap((codigo) => this.service.obter(codigo)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (branch) => {
          this.branch = branch;
          this.status = branch ? 'ready' : 'notfound';
        },
        error: () => (this.status = 'error')
      });
  }

  /** Cadastro gravado: a lateral mostra os valores novos; código alterado troca a URL sem recarregar. */
  onSaved(atualizada: Branch): void {
    const codigoAnterior = this.branch?.codigo;
    this.branch = atualizada;
    if (atualizada.codigo !== codigoAnterior) {
      this.router.navigate(['/filial', atualizada.codigo], { replaceUrl: true });
    }
  }

  voltarParaLista(): void {
    this.router.navigate(['/filial']);
  }
}
