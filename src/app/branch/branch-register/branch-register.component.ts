import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

import { BranchFieldsComponent, createBranchForm } from '../branch-fields/branch-fields.component';
import { Branch } from '../branch.model';
import { BranchService, DuplicateBranchError } from '../branch.service';

/**
 * Aba Cadastro da home da filial: campos em modo leitura; "Editar" habilita, "Cancelar" desfaz e
 * "Salvar" grava. Avisa o contêiner com a filial gravada (ele atualiza a lateral e a URL).
 */
@Component({
  selector: 'app-branch-register',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, BranchFieldsComponent],
  templateUrl: './branch-register.component.html',
  styleUrl: './branch-register.component.scss'
})
export class BranchRegisterComponent implements OnChanges {
  private readonly service = inject(BranchService);

  /** Filial aberta; `null` enquanto carrega. */
  @Input() branch: Branch | null = null;
  @Input() loading = false;

  /** Gravação concluída: leva a filial com os valores novos. */
  @Output() saved = new EventEmitter<Branch>();

  readonly form = createBranchForm(inject(NonNullableFormBuilder));

  editing = false;
  saving = false;
  erroGeral: string | null = null;

  constructor() {
    this.form.disable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // filial nova (carga ou gravação): campos voltam aos valores gravados, em leitura
    if (changes['branch'] && this.branch) {
      this.resetForm(this.branch);
      this.editing = false;
      this.erroGeral = null;
    }
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
    this.saving = true;
    this.erroGeral = null;

    this.service.atualizar(this.branch.codigo, { codigo: codigo.trim(), descricao: descricao.trim() }).subscribe({
      next: (atualizada) => {
        this.saving = false;
        this.editing = false;
        this.resetForm(atualizada);
        this.saved.emit(atualizada);
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

  /** Volta os campos para os valores gravados, em modo leitura. */
  private resetForm(branch: Branch): void {
    this.form.reset({ codigo: branch.codigo, descricao: branch.descricao });
    this.form.disable();
  }
}
