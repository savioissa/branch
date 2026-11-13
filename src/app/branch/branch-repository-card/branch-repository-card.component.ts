import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { Repository, Warehouse, repositoryLabels, repositoryTypeLabel } from '../branch.model';

/**
 * Card de um repositório: Tipo | Código (Login) | Nome (Técnico). Para o tipo Equipe os rótulos
 * passam a ser Login e Técnico.
 * - Com `stockPartition`, vira o card do vínculo: Almoxarifado vem antes, na mesma linha.
 * - Com `unlinkable` ganha o ícone de desvincular (lista da aba Repositório).
 * - Com `pickable` ganha o botão "Selecionar", antes de "Abrir" (escolha de um repositório ao adicionar).
 */
@Component({
  selector: 'app-branch-repository-card',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './branch-repository-card.component.html',
  styleUrl: './branch-repository-card.component.scss'
})
export class BranchRepositoryCardComponent {
  @Input() repository: Repository | null = null;
  /** Almoxarifado do vínculo: quando há, aparece como primeira coluna. */
  @Input() stockPartition: Warehouse | null = null;
  @Input() loading = false;
  @Input() unlinkable = false;
  @Input() pickable = false;

  @Output() open = new EventEmitter<Repository>();
  @Output() unlink = new EventEmitter<Repository>();
  @Output() pick = new EventEmitter<Repository>();

  get labels(): { codigo: string; nome: string } {
    return repositoryLabels(this.repository?.tipo ?? 'armazem');
  }

  get tipoLabel(): string {
    return this.repository ? repositoryTypeLabel(this.repository.tipo) : '';
  }

  get almoxarifadoLabel(): string {
    return this.stockPartition ? `${this.stockPartition.codigo} - ${this.stockPartition.descricao}` : '';
  }
}
