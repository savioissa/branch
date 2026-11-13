import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { LinkedRepository, Repository, Warehouse, repositoryLinkKey } from '../branch.model';
import { BranchService } from '../branch.service';
import { BranchRepositoryPickerComponent } from '../branch-repository-picker/branch-repository-picker.component';
import { BranchStockPartitionPickerComponent } from '../branch-stock-partition-picker/branch-stock-partition-picker.component';

/**
 * Tela cinza "Adicionar repositório" da aba Repositório: o usuário escolhe um almoxarifado e, depois, um
 * repositório (a escolha de repositório fica fechada até haver almoxarifado) e salva o par na filial. O card do
 * par só aparece na lista da aba, depois de salvar. Almoxarifado fora da filial é vinculado a ela também ao
 * salvar. Par que já existe não pode ser salvo.
 */
@Component({
  selector: 'app-branch-repository-add',
  standalone: true,
  imports: [ButtonModule, BranchRepositoryPickerComponent, BranchStockPartitionPickerComponent],
  templateUrl: './branch-repository-add.component.html',
  styleUrl: './branch-repository-add.component.scss'
})
export class BranchRepositoryAddComponent {
  private readonly service = inject(BranchService);
  private readonly messages = inject(MessageService);

  @Input({ required: true }) branchCode!: string;
  /** Vínculos que a filial já tem: o par escolhido não pode repetir nenhum deles. */
  @Input() linked: LinkedRepository[] = [];

  /** Usuário cancelou sem salvar. */
  @Output() closed = new EventEmitter<void>();
  /** Par salvo: a lista de repositórios da filial precisa recarregar. */
  @Output() added = new EventEmitter<void>();

  almoxarifado: Warehouse | null = null;
  repositorio: Repository | null = null;
  saving = false;

  /** O par escolhido já está vinculado à filial. */
  get duplicado(): boolean {
    if (!this.almoxarifado || !this.repositorio) return false;
    const chave = repositoryLinkKey(this.repositorio, this.almoxarifado.codigo);
    return this.linked.some((l) => repositoryLinkKey(l, l.almoxarifado.codigo) === chave);
  }

  /** Sem almoxarifado a escolha de repositório fecha e perde o que tinha. */
  onAlmoxarifado(almoxarifado: Warehouse | null): void {
    this.almoxarifado = almoxarifado;
    if (!almoxarifado) this.repositorio = null;
  }

  get podeSalvar(): boolean {
    return !!this.almoxarifado && !!this.repositorio && !this.duplicado && !this.saving;
  }

  salvar(): void {
    if (!this.podeSalvar || !this.almoxarifado || !this.repositorio) return;
    this.saving = true;
    const { tipo, codigo } = this.repositorio;

    this.service.adicionarRepositorio(this.branchCode, { tipo, codigo, almoxarifado: this.almoxarifado.codigo }).subscribe({
      next: () => {
        this.saving = false;
        this.messages.add({ severity: 'success', summary: 'Repositório adicionado com sucesso', life: 4000 });
        this.added.emit();
      },
      error: () => {
        this.saving = false;
        this.messages.add({
          severity: 'error',
          summary: 'Não foi possível adicionar o repositório. Por favor tente novamente',
          life: 6000
        });
      }
    });
  }
}
