import { BranchFilter, CodeDescription, FilterOperator, SortState } from './branch.model';

/** Há filtro com valor preenchido: o vazio vira "nenhum resultado" em vez de "nenhum cadastrado". */
export function hasActiveFilter(filter: BranchFilter): boolean {
  return !!(filter.codigo.valor.trim() || filter.descricao.valor.trim());
}

/** Aplica filtro (sem diferenciar maiúsculas nem acentos) e ordenação. Não altera a lista original. */
export function filterAndSort<T extends CodeDescription>(items: T[], filter: BranchFilter, sort: SortState): T[] {
  const { codigo, descricao } = filter;
  let lista = items.filter(
    (i) => match(i.codigo, codigo.operador, codigo.valor) && match(i.descricao, descricao.operador, descricao.valor)
  );

  const { campo, direcao } = sort;
  if (campo) {
    const sinal = direcao === 'asc' ? 1 : -1;
    lista = [...lista].sort((a, b) => a[campo].localeCompare(b[campo], 'pt-BR', { sensitivity: 'base' }) * sinal);
  }
  return lista;
}

function match(campo: string, operador: FilterOperator | null, valor: string): boolean {
  const v = normalizar(valor);
  if (!v) return true;
  const c = normalizar(campo);
  switch (operador ?? 'contem') {
    case 'igual':
      return c === v;
    case 'diferente':
      return c !== v;
    case 'comeca':
      return c.startsWith(v);
    case 'termina':
      return c.endsWith(v);
    default:
      return c.includes(v);
  }
}

function normalizar(texto: string): string {
  return texto.trim().toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[̀-ͯ]/g, '');
}
