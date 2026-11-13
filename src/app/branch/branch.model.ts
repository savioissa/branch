export interface Branch {
  codigo: string;
  descricao: string;
}

/** Almoxarifado vinculado a uma filial. */
export interface Warehouse {
  codigo: string;
  descricao: string;
}

/** Filtro e ordenação servem para qualquer registro com código + descrição (filial, almoxarifado). */
export interface CodeDescription {
  codigo: string;
  descricao: string;
}

export type FilterOperator = 'igual' | 'diferente' | 'contem' | 'comeca' | 'termina';

export interface FilterField {
  operador: FilterOperator | null;
  valor: string;
}

export interface BranchFilter {
  codigo: FilterField;
  descricao: FilterField;
}

export type SortField = keyof CodeDescription;
export type SortDirection = 'asc' | 'desc';

export interface SortState {
  campo: SortField | null;
  direcao: SortDirection;
}

export function emptyFilter(): BranchFilter {
  return {
    codigo: { operador: 'igual', valor: '' },
    descricao: { operador: null, valor: '' }
  };
}

export function emptySort(): SortState {
  return { campo: null, direcao: 'asc' };
}

/* ---------- Repositório ---------- */

export type RepositoryType = 'equipe' | 'credenciada' | 'armazem' | 'oficina' | 'cluster';

export const REPOSITORY_TYPES: { label: string; value: RepositoryType }[] = [
  { label: 'Equipe', value: 'equipe' },
  { label: 'Credenciada', value: 'credenciada' },
  { label: 'Armazém', value: 'armazem' },
  { label: 'Oficina', value: 'oficina' },
  { label: 'Cluster', value: 'cluster' }
];

/** Repositório do catálogo. Para o tipo Equipe, `codigo` é o login e `nome` é o técnico. */
export interface Repository {
  tipo: RepositoryType;
  codigo: string;
  nome: string;
}

/**
 * Vínculo da filial: um par almoxarifado + repositório (Filial x Repositório x Almoxarifado).
 * O mesmo repositório pode aparecer em vários pares, um por almoxarifado.
 */
export interface LinkedRepository extends Repository {
  almoxarifado: Warehouse;
  /** Quantidade de insumos do repositório neste almoxarifado. */
  insumos: number;
}

/** Vínculo a gravar: repositório + código do almoxarifado. */
export interface RepositoryLink {
  tipo: RepositoryType;
  codigo: string;
  almoxarifado: string;
  /** Insumos do par (só no mock: na API vem do estoque). */
  insumos?: number;
}

/** Par repositório x almoxarifado que ainda tem insumos: impede desvincular até movimentar tudo. */
export interface SupplyHolder {
  repositorio: Repository;
  almoxarifado: Warehouse;
  quantidade: number;
}

/** Par de campos de um tipo de repositório: código (login, para Equipe) e nome/descrição. */
export interface RepositoryTypeFilter {
  codigo: FilterField;
  nome: FilterField;
}

/**
 * Filtro de repositórios: Tipo repositório + código e descrição/nome de cada tipo
 * (ex.: Código/Descrição do armazém, Login/Nome da equipe, Código/Nome da oficina).
 */
export interface RepositoryFilter {
  tipos: RepositoryType[];
  campos: Record<RepositoryType, RepositoryTypeFilter>;
}

/** Rótulos dos campos de filtro por tipo, na ordem do painel. */
export const REPOSITORY_FILTER_GROUPS: { tipo: RepositoryType; codigo: string; nome: string }[] = [
  { tipo: 'armazem', codigo: 'Código do armazém', nome: 'Descrição do armazém' },
  { tipo: 'credenciada', codigo: 'Código da credenciada', nome: 'Descrição da credenciada' },
  { tipo: 'equipe', codigo: 'Login da equipe', nome: 'Nome da equipe' },
  { tipo: 'oficina', codigo: 'Código da oficina', nome: 'Nome da oficina' },
  { tipo: 'cluster', codigo: 'Código do cluster', nome: 'Nome do cluster' }
];

export type RepositorySortField = keyof Repository;

export interface RepositorySortState {
  campo: RepositorySortField | null;
  direcao: SortDirection;
}

/** O código pode se repetir entre tipos (ex.: um login igual ao código de uma credenciada). */
export function repositoryKey(r: Pick<Repository, 'tipo' | 'codigo'>): string {
  return `${r.tipo}:${r.codigo}`;
}

/** Chave do par almoxarifado + repositório. */
export function repositoryLinkKey(r: Pick<Repository, 'tipo' | 'codigo'>, almoxarifado: string): string {
  return `${repositoryKey(r)}|${almoxarifado}`;
}

export function repositoryTypeLabel(tipo: RepositoryType): string {
  return REPOSITORY_TYPES.find((t) => t.value === tipo)?.label ?? tipo;
}

/** Equipe usa Login / Técnico; os demais tipos usam Código / Nome. */
export function repositoryLabels(tipo: RepositoryType): { codigo: string; nome: string } {
  return tipo === 'equipe' ? { codigo: 'Login', nome: 'Técnico' } : { codigo: 'Código', nome: 'Nome' };
}

export function emptyRepositoryFilter(): RepositoryFilter {
  const par = (): RepositoryTypeFilter => ({
    codigo: { operador: 'igual', valor: '' },
    nome: { operador: null, valor: '' }
  });
  return {
    tipos: [],
    campos: { armazem: par(), credenciada: par(), equipe: par(), oficina: par(), cluster: par() }
  };
}
