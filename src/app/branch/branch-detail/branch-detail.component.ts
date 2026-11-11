import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { filter, map, switchMap, tap } from 'rxjs';

import { BranchFieldsComponent, createBranchForm } from '../branch-fields/branch-fields.component';
import { BranchSummaryComponent } from '../branch-summary/branch-summary.component';
import { BranchWarehousesComponent } from '../branch-warehouses/branch-warehouses.component';
import { Branch } from '../branch.model';
import { BranchService, DuplicateBranchError } from '../branch.service';

type LoadStatus = 'loading' | 'ready' | 'notfound' | 'error';

/**
 * Página de uma filial: resumo à esquerda e abas à direita.
 * Aba Cadastro: campos em modo leitura; "Editar" habilita, "Cancelar" desfaz e "Salvar" grava.
 * Aba Almoxarifado: almoxarifados vinculados (carregada só quando a aba é aberta).
 */
@Component({
  selector: 'app-branch-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    TabViewModule,
    BranchFieldsComponent,
    BranchSummaryComponent,
    BranchWarehousesComponent
  ],
  templateUrl: './branch-detail.component.html',
  styleUrl: './branch-detail.component.scss'
})
export class BranchDetailComponent implements OnInit {
  private readonly service = inject(BranchService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly form = createBranchForm(inject(NonNullableFormBuilder));

  status: LoadStatus = 'loading';
  branch: Branch | null = null;
  activeTab = 0;

  editing = false;
  saving = false;
  erroGeral: string | null = null;

  ngOnInit(): void {
    this.form.disable();
    // link direto para uma aba: /filial/PRO?aba=almoxarifado
    this.activeTab = this.route.snapshot.queryParamMap.get('aba') === 'almoxarifado' ? 1 : 0;

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
          if (branch) this.resetForm(branch);
        },
        error: () => (this.status = 'error')
      });
  }

  editar(): void {
    this.editing = true;
    this.erroGeral = null;
    this.form.enable();
  }

  cancelar(): void {
    if (this.branch) this.resetForm(this.branch);
    this.editing = false;
    this.erroGeral = null;
  }

  salvar(): void {
    if (!this.branch || this.form.invalid || this.saving) {
      this.form.markAllAsTouched();
      return;
    }

    const { codigo, descricao } = this.form.getRawValue();
    const codigoOriginal = this.branch.codigo;
    this.saving = true;
    this.erroGeral = null;

    this.service.atualizar(codigoOriginal, { codigo: codigo.trim(), descricao: descricao.trim() }).subscribe({
      next: (atualizada) => {
        this.saving = false;
        this.editing = false;
        this.branch = atualizada;
        this.resetForm(atualizada);
        if (atualizada.codigo !== codigoOriginal) {
          this.router.navigate(['/filial', atualizada.codigo], { replaceUrl: true });
        }
      },
      error: (err: unknown) => {
        this.saving = false;
        if (err instanceof DuplicateBranchError) {
          this.form.controls.codigo.setErrors({ duplicado: true });
          this.form.controls.codigo.markAsTouched();
        } else {
          this.erroGeral = 'Não foi possível salvar a filial. Tente novamente.';
        }
      }
    });
  }

  voltarParaLista(): void {
    this.router.navigate(['/filial']);
  }

  /** Volta os campos para os valores gravados, em modo leitura. */
  private resetForm(branch: Branch): void {
    this.form.reset({ codigo: branch.codigo, descricao: branch.descricao });
    this.form.disable();
  }
}
