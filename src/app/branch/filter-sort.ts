import {
  BranchFilter,
  CodeDescription,
  FilterOperator,
  REPOSITORY_TYPES,
  Repository,
  RepositoryFilter,
  RepositorySortState,
  RepositoryType,
  SortState,
  repositoryTypeLabel
} from './branch.model';

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

/** O tipo entra no filtro: nenhum tipo marcado = todos. */
export function repositoryTypeAllowed(filter: RepositoryFilter, tipo: RepositoryType): boolean {
  return !filter.tipos.length || filter.tipos.includes(tipo);
}

/** Algum campo do tipo (código ou nome) preenchido, e o tipo não está excluído pelo Tipo repositório. */
function typeFieldsFilled(filter: RepositoryFilter, tipo: RepositoryType): boolean {
  const { codigo, nome } = filter.campos[tipo];
  return repositoryTypeAllowed(filter, tipo) && !!(codigo.valor.trim() || nome.valor.trim());
}

/** Filtro de repositório com algum valor preenchido (tipo ou algum campo de armazém, credenciada ou equipe). */
export function hasActiveRepositoryFilter(filter: RepositoryFilter): boolean {
  return !!filter.tipos.length || REPOSITORY_TYPES.some((t) => typeFieldsFilled(filter, t.value));
}

/**
 * Filtro de repositórios (sem diferenciar maiúsculas nem acentos) e ordenação (tipo pelo rótulo).
 * - Tipo repositório: só os tipos marcados (nenhum = todos).
 * - Campos de um tipo (ex.: Código/Descrição do armazém) valem para os repositórios desse tipo, em E.
 * - Com campos preenchidos, só aparecem os tipos que têm campo preenchido; entre tipos diferentes é OU
 *   (ex.: Código do armazém = ARM01 e Login da equipe = jsilva → ARM01 e jsilva).
 */
export function filterAndSortRepositories<T extends Repository>(
  items: T[],
  filter: RepositoryFilter,
  sort: RepositorySortState
): T[] {
  const algumCampo = REPOSITORY_TYPES.some((t) => typeFieldsFilled(filter, t.value));
  let lista = items.filter((i) => {
    if (!repositoryTypeAllowed(filter, i.tipo)) return false;
    if (!algumCampo) return true;
    if (!typeFieldsFilled(filter, i.tipo)) return false;
    const { codigo, nome } = filter.campos[i.tipo];
    return match(i.codigo, codigo.operador, codigo.valor) && match(i.nome, nome.operador, nome.valor);
  });

  const { campo, direcao } = sort;
  if (campo) {
    const sinal = direcao === 'asc' ? 1 : -1;
    const valor = (r: T): string => (campo === 'tipo' ? repositoryTypeLabel(r.tipo) : r[campo]);
    lista = [...lista].sort((a, b) => valor(a).localeCompare(valor(b), 'pt-BR', { sensitivity: 'base' }) * sinal);
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
