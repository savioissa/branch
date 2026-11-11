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
