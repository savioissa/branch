import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { BranchFieldsComponent, createBranchForm } from '../branch-fields/branch-fields.component';
import { BranchService, DuplicateBranchError } from '../branch.service';

@Component({
  selector: 'app-branch-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, ConfirmDialogModule, BranchFieldsComponent],
  // confirmação só deste formulário (o <p-confirmDialog> fica no template)
  providers: [ConfirmationService],
  templateUrl: './branch-form.component.html',
  styleUrl: './branch-form.component.scss'
})
export class BranchFormComponent {
  private readonly service = inject(BranchService);
  private readonly router = inject(Router);
  private readonly messages = inject(MessageService);
  private readonly confirmation = inject(ConfirmationService);

  readonly form = createBranchForm(inject(NonNullableFormBuilder));

  saving = false;

  salvar(): void {
    if (this.form.invalid || this.saving) {
      this.form.markAllAsTouched();
      return;
    }

    const { codigo, descricao } = this.form.getRawValue();
    this.saving = true;

    this.service.criar({ codigo: codigo.trim(), descricao: descricao.trim() }).subscribe({
      next: (criada) => {
        this.messages.add({ severity: 'success', summary: 'Filial criada com sucesso', life: 4000 });
        // vai para a página da filial criada; replaceUrl para o "voltar" do navegador não reabrir o formulário
        this.router.navigate(['/filial', criada.codigo], { replaceUrl: true });
      },
      error: (err: unknown) => {
        this.saving = false;
        if (err instanceof DuplicateBranchError) {
          // código repetido é erro do campo, não do sistema: aparece abaixo do Código
          this.form.controls.codigo.setErrors({ duplicado: true });
          this.form.controls.codigo.markAsTouched();
        } else {
          this.messages.add({
            severity: 'error',
            summary: 'Não foi possível criar a filial. Por favor tente novamente',
            life: 6000
          });
        }
      }
    });
  }

  /** Com algum campo preenchido, pede confirmação antes de sair; vazio, sai direto. */
  cancelar(): void {
    const { codigo, descricao } = this.form.getRawValue();
    if (!codigo && !descricao) {
      this.voltar();
      return;
    }

    this.confirmation.confirm({
      message: 'Se sair agora, as informações preenchidas serão perdidas. Deseja realmente sair?',
      acceptLabel: 'Sair',
      rejectLabel: 'Continuar editando',
      acceptButtonStyleClass: 'btn--md btn--danger',
      rejectButtonStyleClass: 'btn--md btn--neutral',
      acceptIcon: 'none',
      rejectIcon: 'none',
      defaultFocus: 'reject',
      accept: () => this.voltar()
    });
  }

  private voltar(): void {
    this.router.navigate(['/filial']);
  }
}
