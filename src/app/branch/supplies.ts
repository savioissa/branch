import { Confirmation } from 'primeng/api';

import { SupplyHolder } from './branch.model';

/**
 * Aviso de desvínculo bloqueado por insumos (almoxarifado da filial ou repositório).
 * Vai no mesmo <p-confirmDialog> da aba, só com o botão "Entendi".
 * `itens`: por almoxarifado → lista os repositórios; por repositório → lista os almoxarifados (sem quantidades).
 */
export function suppliesBlockedDialog(
  alvo: string,
  pendentes: SupplyHolder[],
  itens: 'repositorios' | 'almoxarifados'
): Confirmation {
  const linhas = pendentes
    .map((p) => {
      const nome =
        itens === 'repositorios'
          ? `${p.repositorio.codigo} - ${p.repositorio.nome}`
          : `${p.almoxarifado.codigo} - ${p.almoxarifado.descricao}`;
      return `<li>${escapeHtml(nome)}</li>`;
    })
    .join('');
  const onde = itens === 'repositorios' ? 'nos repositórios abaixo' : 'nos almoxarifados abaixo';

  return {
    message:
      `<strong>Não é possível desvincular ${escapeHtml(alvo)}.</strong>` +
      `<p>Ainda há insumos ${onde}. Movimente todos os insumos antes de desvincular.</p>` +
      `<ul>${linhas}</ul>`,
    acceptLabel: 'Entendi',
    acceptButtonStyleClass: 'btn--md btn--primary',
    acceptIcon: 'none',
    rejectVisible: false,
    defaultFocus: 'accept'
  };
}

function escapeHtml(texto: string): string {
  return texto.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}