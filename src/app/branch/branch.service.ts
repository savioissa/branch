import { Injectable } from '@angular/core';
import { Observable, Subject, delay, of, switchMap, tap, throwError, timer } from 'rxjs';

import {
  Branch,
  LinkedRepository,
  Repository,
  RepositoryLink,
  RepositoryType,
  SupplyHolder,
  Warehouse,
  repositoryKey,
  repositoryLinkKey
} from './branch.model';

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

const linkKey = (l: RepositoryLink): string => repositoryLinkKey(l, l.almoxarifado);

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

/** Todos os repositórios do sistema (o que pode ser vinculado a uma filial). */
const MOCK_REPOSITORY_CATALOG: Repository[] = [
  { tipo: 'equipe', codigo: 'jsilva', nome: 'João Silva' },
  { tipo: 'equipe', codigo: 'mferreira', nome: 'Maria Ferreira' },
  { tipo: 'equipe', codigo: 'csouza', nome: 'Carlos Souza' },
  { tipo: 'equipe', codigo: 'aoliveira', nome: 'Ana Oliveira' },
  { tipo: 'equipe', codigo: 'rlima', nome: 'Rafael Lima' },
  { tipo: 'equipe', codigo: 'pcosta', nome: 'Patrícia Costa' },
  { tipo: 'equipe', codigo: 'lmartins', nome: 'Lucas Martins' },
  { tipo: 'credenciada', codigo: 'CR001', nome: 'Refrigeração Polar Ltda' },
  { tipo: 'credenciada', codigo: 'CR002', nome: 'Eletro Norte Serviços' },
  { tipo: 'credenciada', codigo: 'CR003', nome: 'TecnoClima Manutenção' },
  { tipo: 'credenciada', codigo: 'CR004', nome: 'Instaladora Sul' },
  { tipo: 'armazem', codigo: 'ARM01', nome: 'Armazém Guarulhos' },
  { tipo: 'armazem', codigo: 'ARM02', nome: 'Armazém Contagem' },
  { tipo: 'armazem', codigo: 'ARM03', nome: 'Centro de distribuição Barueri' },
  { tipo: 'armazem', codigo: 'ARM04', nome: 'Armazém Porto Seco' },
  { tipo: 'oficina', codigo: 'OF001', nome: 'Oficina Mecânica Centro' },
  { tipo: 'oficina', codigo: 'OF002', nome: 'Oficina Elétrica Norte' },
  { tipo: 'oficina', codigo: 'OF003', nome: 'Auto Center Sul' },
  { tipo: 'cluster', codigo: 'CL001', nome: 'Cluster Sudeste' },
  { tipo: 'cluster', codigo: 'CL002', nome: 'Cluster Nordeste' },
  { tipo: 'cluster', codigo: 'CL003', nome: 'Cluster Sul' }
];

/**
 * Vínculos da filial, por código de filial: pares almoxarifado + repositório, com a quantidade de insumos
 * que o repositório tem naquele almoxarifado (sem `insumos` = 0).
 */
const MOCK_REPOSITORIES: Record<string, RepositoryLink[]> = {
  PRO: [{ tipo: 'armazem', codigo: 'ARM02', almoxarifado: 'Venda' }],
  MTZ: [
    { tipo: 'equipe', codigo: 'jsilva', almoxarifado: 'Central', insumos: 12 },
    { tipo: 'equipe', codigo: 'jsilva', almoxarifado: 'Manut' },
    { tipo: 'equipe', codigo: 'mferreira', almoxarifado: 'Venda' },
    { tipo: 'credenciada', codigo: 'CR001', almoxarifado: 'Manut', insumos: 5 },
    { tipo: 'credenciada', codigo: 'CR001', almoxarifado: 'Obras' },
    { tipo: 'armazem', codigo: 'ARM01', almoxarifado: 'Central', insumos: 40 },
    { tipo: 'armazem', codigo: 'ARM01', almoxarifado: 'Transf' },
    { tipo: 'armazem', codigo: 'ARM01', almoxarifado: 'Frota', insumos: 3 },
    { tipo: 'oficina', codigo: 'OF001', almoxarifado: 'Manut' },
    { tipo: 'cluster', codigo: 'CL001', almoxarifado: 'Central' }
  ],
  SPO: [
    { tipo: 'equipe', codigo: 'aoliveira', almoxarifado: 'Venda', insumos: 8 },
    { tipo: 'equipe', codigo: 'aoliveira', almoxarifado: 'Central' },
    { tipo: 'credenciada', codigo: 'CR002', almoxarifado: 'Manut' }
  ]
};

/** Desvínculo recusado porque ainda há insumos: o usuário precisa movimentá-los antes. */
export class SuppliesPendingError extends Error {
  constructor(readonly pendentes: SupplyHolder[]) {
    super('Há insumos nos repositórios: movimente-os antes de desvincular');
  }
}

/** Aviso de vínculo alterado numa aba: a outra aba da mesma filial recarrega para não ficar desatualizada. */
export interface LinkChange {
  filial: string;
  origem: 'almoxarifado' | 'repositorio';
}

@Injectable({ providedIn: 'root' })
export class BranchService {
  /** Mantém o que foi cadastrado/alterado enquanto a aplicação estiver aberta. */
  private readonly data: Branch[] = MOCK.map((b) => ({ ...b }));
  private readonly warehouses: Record<string, Warehouse[]> = structuredClone(MOCK_WAREHOUSES);
  private readonly repositories: Record<string, RepositoryLink[]> = structuredClone(MOCK_REPOSITORIES);

  private readonly changes = new Subject<LinkChange>();
  /** Emite depois de cada vínculo/desvínculo/edição de almoxarifados ou repositórios. */
  readonly linkChanges$ = this.changes.asObservable();

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
    if (atual.codigo !== branch.codigo && this.repositories[atual.codigo]) {
      this.repositories[branch.codigo] = this.repositories[atual.codigo];
      delete this.repositories[atual.codigo];
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
    return of(undefined).pipe(delay(600), tap(() => this.avisar(codigoFilial, 'almoxarifado')));
  }

  /** Repositórios da filial que ainda têm insumos no almoxarifado: enquanto houver, não dá para desvinculá-lo. */
  insumosNoAlmoxarifado(codigoFilial: string, codigo: string): Observable<SupplyHolder[]> {
    return of(this.pendencias(codigoFilial, (link) => link.almoxarifado === codigo)).pipe(delay(400));
  }

  /** Insumos do repositório no almoxarifado do par: enquanto houver, não dá para desvincular o par. */
  insumosNoVinculo(codigoFilial: string, vinculo: RepositoryLink): Observable<SupplyHolder[]> {
    const chave = linkKey(vinculo);
    return of(this.pendencias(codigoFilial, (link) => linkKey(link) === chave)).pipe(delay(400));
  }

  /**
   * Desvincula o almoxarifado da filial; os pares com ele saem também.
   * Recusa (SuppliesPendingError) se algum repositório ainda tiver insumos nele.
   */
  desvincularAlmoxarifado(codigoFilial: string, codigo: string): Observable<void> {
    const pendentes = this.pendencias(codigoFilial, (link) => link.almoxarifado === codigo);
    if (pendentes.length) return this.recusar(pendentes);

    this.warehouses[codigoFilial] = (this.warehouses[codigoFilial] ?? []).filter((w) => w.codigo !== codigo);
    this.repositories[codigoFilial] = (this.repositories[codigoFilial] ?? []).filter((l) => l.almoxarifado !== codigo);
    return of(undefined).pipe(delay(600), tap(() => this.avisar(codigoFilial, 'almoxarifado')));
  }

  /** Pares almoxarifado + repositório vinculados à filial, com os insumos de cada par. */
  listarRepositorios(codigoFilial: string): Observable<LinkedRepository[]> {
    const lista: LinkedRepository[] = [];
    for (const link of this.repositories[codigoFilial] ?? []) {
      const repo = MOCK_REPOSITORY_CATALOG.find((r) => repositoryKey(r) === repositoryKey(link));
      const almox = MOCK_WAREHOUSE_CATALOG.find((w) => w.codigo === link.almoxarifado);
      if (!repo || !almox) continue;
      lista.push({ ...repo, almoxarifado: { ...almox }, insumos: link.insumos ?? 0 });
    }
    return of(lista).pipe(delay(800));
  }

  /** Repositórios do sistema de um tipo (opções da seleção de repositório ao adicionar). */
  listarRepositoriosPorTipo(tipo: RepositoryType): Observable<Repository[]> {
    const lista = MOCK_REPOSITORY_CATALOG.filter((r) => r.tipo === tipo);
    return of(lista.map((r) => ({ ...r }))).pipe(delay(800));
  }

  /** Todos os almoxarifados do sistema (opções da seleção de almoxarifado ao adicionar repositório). */
  listarCatalogoAlmoxarifados(): Observable<Warehouse[]> {
    return of(MOCK_WAREHOUSE_CATALOG.map((w) => ({ ...w }))).pipe(delay(800));
  }

  /**
   * Adiciona o par almoxarifado + repositório à filial. Almoxarifado que ainda não está vinculado à filial
   * é vinculado a ela também. Recusa o par que já existe.
   */
  adicionarRepositorio(codigoFilial: string, vinculo: RepositoryLink): Observable<void> {
    const atuais = (this.repositories[codigoFilial] ??= []);
    const chave = linkKey(vinculo);
    if (atuais.some((l) => linkKey(l) === chave)) {
      return timer(600).pipe(switchMap(() => throwError(() => new Error('Vínculo já existe'))));
    }
    atuais.push({ tipo: vinculo.tipo, codigo: vinculo.codigo, almoxarifado: vinculo.almoxarifado });
    this.garantirNaFilial(codigoFilial, vinculo.almoxarifado);
    return of(undefined).pipe(delay(600), tap(() => this.avisar(codigoFilial, 'repositorio')));
  }

  /** Desvincula o par. Recusa (SuppliesPendingError) se o repositório ainda tiver insumos no almoxarifado. */
  desvincularRepositorio(codigoFilial: string, vinculo: RepositoryLink): Observable<void> {
    const chave = linkKey(vinculo);
    const pendentes = this.pendencias(codigoFilial, (link) => linkKey(link) === chave);
    if (pendentes.length) return this.recusar(pendentes);

    this.repositories[codigoFilial] = (this.repositories[codigoFilial] ?? []).filter((l) => linkKey(l) !== chave);
    return of(undefined).pipe(delay(600), tap(() => this.avisar(codigoFilial, 'repositorio')));
  }

  /** Pares da filial com insumo > 0 que passam no filtro. */
  private pendencias(codigoFilial: string, filtro: (link: RepositoryLink) => boolean): SupplyHolder[] {
    const lista: SupplyHolder[] = [];
    for (const link of this.repositories[codigoFilial] ?? []) {
      const quantidade = link.insumos ?? 0;
      if (quantidade <= 0 || !filtro(link)) continue;
      const repositorio = MOCK_REPOSITORY_CATALOG.find((r) => repositoryKey(r) === repositoryKey(link));
      const almoxarifado = MOCK_WAREHOUSE_CATALOG.find((w) => w.codigo === link.almoxarifado);
      if (repositorio && almoxarifado) {
        lista.push({ repositorio: { ...repositorio }, almoxarifado: { ...almoxarifado }, quantidade });
      }
    }
    return lista;
  }

  private recusar(pendentes: SupplyHolder[]): Observable<never> {
    return timer(600).pipe(switchMap(() => throwError(() => new SuppliesPendingError(pendentes))));
  }

  /** Vincula à filial o almoxarifado, se ainda não estiver nela. */
  private garantirNaFilial(codigoFilial: string, codigo: string): void {
    const almoxFilial = (this.warehouses[codigoFilial] ??= []);
    const w = MOCK_WAREHOUSE_CATALOG.find((c) => c.codigo === codigo);
    if (w && !almoxFilial.some((a) => a.codigo === codigo)) almoxFilial.push({ ...w });
  }

  private avisar(filial: string, origem: LinkChange['origem']): void {
    this.changes.next({ filial, origem });
  }

  private find(codigo: string): Branch | undefined {
    const c = codigo.toLowerCase();
    return this.data.find((b) => b.codigo.toLowerCase() === c);
  }

  private duplicado(codigo: string): Observable<never> {
    return timer(600).pipe(switchMap(() => throwError(() => new DuplicateBranchError(codigo))));
  }
}
