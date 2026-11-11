import { Injectable } from '@angular/core';
import { Observable, delay, of, switchMap, throwError, timer } from 'rxjs';

import { Branch, Warehouse } from './branch.model';

/** Dados de exemplo. Troque pela chamada HTTP real (HttpClient) quando a API existir. */
const MOCK: Branch[] = [
  { codigo: 'PRO', descricao: 'Proaces' },
  { codigo: 'MTZ', descricao: 'Matriz' },
  { codigo: 'SPO', descricao: 'São Paulo' },
  { codigo: 'RJO', descricao: 'Rio de Janeiro' },
  { codigo: 'BHZ', descricao: 'Belo Horizonte' },
  { codigo: 'CWB', descricao: 'Curitiba' },
  { codigo: 'POA', descricao: 'Porto Alegre' },
  { codigo: 'FLN', descricao: 'Florianópolis' },
  { codigo: 'SSA', descricao: 'Salvador' },
  { codigo: 'REC', descricao: 'Recife' },
  { codigo: 'FOR', descricao: 'Fortaleza' },
  { codigo: 'BSB', descricao: 'Brasília' },
  { codigo: 'GYN', descricao: 'Goiânia' },
  { codigo: 'MAO', descricao: 'Manaus' },
  { codigo: 'BEL', descricao: 'Belém' },
  { codigo: 'VIX', descricao: 'Vitória' },
  { codigo: 'CGR', descricao: 'Campo Grande' },
  { codigo: 'CGB', descricao: 'Cuiabá' },
  { codigo: 'NAT', descricao: 'Natal' },
  { codigo: 'JPA', descricao: 'João Pessoa' },
  { codigo: 'MCZ', descricao: 'Maceió' },
  { codigo: 'AJU', descricao: 'Aracaju' },
  { codigo: 'THE', descricao: 'Teresina' },
  { codigo: 'SLZ', descricao: 'São Luís' },
  { codigo: 'PMW', descricao: 'Palmas' },
  { codigo: 'PVH', descricao: 'Porto Velho' },
  { codigo: 'RBR', descricao: 'Rio Branco' },
  { codigo: 'BVB', descricao: 'Boa Vista' },
  { codigo: 'MCP', descricao: 'Macapá' },
  { codigo: 'CPQ', descricao: 'Campinas' },
  { codigo: 'SJC', descricao: 'São José dos Campos' },
  { codigo: 'RAO', descricao: 'Ribeirão Preto' },
  { codigo: 'LDB', descricao: 'Londrina' },
  { codigo: 'JOI', descricao: 'Joinville' },
  { codigo: 'UDI', descricao: 'Uberlândia' }
];

export class DuplicateBranchError extends Error {
  constructor(readonly codigo: string) {
    super(`Já existe uma filial com o código ${codigo}`);
  }
}

/** Todos os almoxarifados do sistema (o que pode ser vinculado a uma filial). */
const MOCK_WAREHOUSE_CATALOG: Warehouse[] = [
  { codigo: 'Venda', descricao: 'Partição de venda' },
  { codigo: 'Compra', descricao: 'Partição de compra' },
  { codigo: 'Uso interno', descricao: 'Partição de uso interno' },
  { codigo: 'Central', descricao: 'Almoxarifado central' },
  { codigo: 'Manut', descricao: 'Manutenção' },
  { codigo: 'Obras', descricao: 'Obras e expansão' },
  { codigo: 'Frota', descricao: 'Peças de frota' },
  { codigo: 'EPI', descricao: 'Equipamentos de proteção' },
  { codigo: 'TI', descricao: 'Tecnologia da informação' },
  { codigo: 'Desc', descricao: 'Material descartado' },
  { codigo: 'Transf', descricao: 'Em transferência' },
  { codigo: 'Devol', descricao: 'Devoluções' },
  { codigo: 'Quarent', descricao: 'Quarentena' },
  { codigo: 'Consig', descricao: 'Material consignado' },
  { codigo: 'Exped', descricao: 'Expedição' }
];

/** Almoxarifados vinculados, por código de filial. Filiais fora daqui não têm vínculo. */
const MOCK_WAREHOUSES: Record<string, Warehouse[]> = {
  PRO: [{ codigo: 'Venda', descricao: 'Partição de venda' }],
  MTZ: [
    { codigo: 'Venda', descricao: 'Partição de venda' },
    { codigo: 'Central', descricao: 'Almoxarifado central' },
    { codigo: 'Manut', descricao: 'Manutenção' },
    { codigo: 'Obras', descricao: 'Obras e expansão' },
    { codigo: 'Frota', descricao: 'Peças de frota' },
    { codigo: 'EPI', descricao: 'Equipamentos de proteção' },
    { codigo: 'TI', descricao: 'Tecnologia da informação' },
    { codigo: 'Desc', descricao: 'Material descartado' },
    { codigo: 'Transf', descricao: 'Em transferência' }
  ],
  SPO: [
    { codigo: 'Venda', descricao: 'Partição de venda' },
    { codigo: 'Central', descricao: 'Almoxarifado central' },
    { codigo: 'Manut', descricao: 'Manutenção' }
  ]
};

@Injectable({ providedIn: 'root' })
export class BranchService {
  /** Mantém o que foi cadastrado/alterado enquanto a aplicação estiver aberta. */
  private readonly data: Branch[] = MOCK.map((b) => ({ ...b }));
  private readonly warehouses: Record<string, Warehouse[]> = structuredClone(MOCK_WAREHOUSES);

  listar(): Observable<Branch[]> {
    return of(this.data.map((b) => ({ ...b }))).pipe(delay(1200));
  }

  /** Emite `null` quando a filial não existe. */
  obter(codigo: string): Observable<Branch | null> {
    const branch = this.find(codigo);
    return of(branch ? { ...branch } : null).pipe(delay(600));
  }

  criar(branch: Branch): Observable<Branch> {
    if (this.find(branch.codigo)) {
      return this.duplicado(branch.codigo);
    }
    this.data.unshift({ ...branch });
    return of({ ...branch }).pipe(delay(600));
  }

  /** Atualiza a filial `codigoOriginal`; o código também pode mudar. */
  atualizar(codigoOriginal: string, branch: Branch): Observable<Branch> {
    const atual = this.find(codigoOriginal);
    if (!atual) {
      return timer(600).pipe(switchMap(() => throwError(() => new Error('Filial não encontrada'))));
    }
    const outro = this.find(branch.codigo);
    if (outro && outro !== atual) {
      return this.duplicado(branch.codigo);
    }

    if (atual.codigo !== branch.codigo && this.warehouses[atual.codigo]) {
      this.warehouses[branch.codigo] = this.warehouses[atual.codigo];
      delete this.warehouses[atual.codigo];
    }
    Object.assign(atual, branch);
    return of({ ...atual }).pipe(delay(600));
  }

  listarAlmoxarifados(codigoFilial: string): Observable<Warehouse[]> {
    const lista = this.warehouses[codigoFilial] ?? [];
    return of(lista.map((w) => ({ ...w }))).pipe(delay(800));
  }

  /** Almoxarifados que ainda não estão vinculados à filial. */
  listarAlmoxarifadosDisponiveis(codigoFilial: string): Observable<Warehouse[]> {
    const vinculados = new Set((this.warehouses[codigoFilial] ?? []).map((w) => w.codigo));
    const lista = MOCK_WAREHOUSE_CATALOG.filter((w) => !vinculados.has(w.codigo));
    return of(lista.map((w) => ({ ...w }))).pipe(delay(800));
  }

  vincularAlmoxarifados(codigoFilial: string, codigos: string[]): Observable<void> {
    const atuais = (this.warehouses[codigoFilial] ??= []);
    const jaVinculados = new Set(atuais.map((w) => w.codigo));
    for (const w of MOCK_WAREHOUSE_CATALOG) {
      if (codigos.includes(w.codigo) && !jaVinculados.has(w.codigo)) {
        atuais.push({ ...w });
      }
    }
    return of(undefined).pipe(delay(600));
  }

  private find(codigo: string): Branch | undefined {
    const c = codigo.toLowerCase();
    return this.data.find((b) => b.codigo.toLowerCase() === c);
  }

  private duplicado(codigo: string): Observable<never> {
    return timer(600).pipe(switchMap(() => throwError(() => new DuplicateBranchError(codigo))));
  }
}
