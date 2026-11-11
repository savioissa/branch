---
componente: app-branch-warehouses
papel: warehouses
status: definido
---
Conteúdo da aba Almoxarifado: lista os almoxarifados vinculados à filial.

## Entrada e saída
| Direção | Nome | Conteúdo |
|---|---|---|
| entrada | branchCode | Código da filial `{{ DTO:filial.codigo }}`; vazio enquanto a filial carrega |
| entrada | almoxarifados vinculados | `{{ DTO:almoxarifado[] }}` da filial (carregados quando o código chega e no Atualizar) |
| saída | — | Nenhuma |

## Composição
- `app-warehouse-link` (`../app-warehouse-link/app-warehouse-link.md`), quando a seção de vinculação está aberta
- `app-branch-filter` (`../../lista/app-branch-filter/app-branch-filter.md`), quando o painel de filtro está aberto
- `app-branch-sort` (`../../lista/app-branch-sort/app-branch-sort.md`), quando o painel de ordenação está aberto
- `app-warehouse-card` (`../app-warehouse-card/app-warehouse-card.md`), um por almoxarifado da página atual, não selecionável
- Externos: `p-button`, `p-paginator`

## Layout
Coluna com espaço de 12px entre blocos, nesta ordem: barra de ações; seção de vinculação; filtro; ordenação; cards ou estado; paginador. Sem título próprio: o nome vem da aba.

| Região ou coluna | Largura |
|---|---|
| Barra de ações | largura toda, botões à direita com espaço de 8px; quebram linha se faltar espaço |
| Demais blocos | largura toda |

## Elementos

### Ações

#### Vincular

- **Tag:** "Vincular"
- **Componente:** `p-button`
- **Ícone:** `pi pi-link`
- **Aparência:** `btn--md btn--secondary`
- **Estado:** `is-active` com a seção aberta; desabilitado enquanto a filial carrega
- **Resultado:** abre ou fecha a seção de vinculação

#### Filtrar

- **Tag:** sem tag visível
- **Componente:** `p-button`
- **Ícone:** `pi pi-filter`
- **Aparência:** `btn--md btn--neutral`
- **Estado:** `is-active` com o painel aberto
- **Resultado:** abre ou fecha o filtro

#### Ordenar

- **Tag:** sem tag visível
- **Componente:** `p-button`
- **Ícone:** `pi pi-sort-amount-down`
- **Aparência:** `btn--md btn--neutral`
- **Estado:** `is-active` com o painel aberto
- **Resultado:** abre ou fecha a ordenação

#### Atualizar

- **Tag:** `[[portal.generic.button.refresh]]`
- **Componente:** `p-button`
- **Ícone:** `pi pi-refresh`
- **Aparência:** `btn--md btn--primary`
- **Estado:** desabilitado durante a carga
- **Resultado:** recarrega os vinculados; aplica o filtro preenchido no painel

#### Tentar novamente

- **Tag:** "Tentar novamente"
- **Componente:** `p-button`
- **Ícone:** `pi pi-refresh`
- **Aparência:** `btn--md btn--secondary`
- **Resultado:** recarrega (só no estado Erro)

### Ordenação

#### Código

- **Tag:** ver `app-branch-sort`
- **Campo:** código do almoxarifado

#### Descrição

- **Tag:** ver `app-branch-sort`
- **Campo:** descrição do almoxarifado
- **Padrão:** **padrão**, crescente

### Paginação

- **Itens por página:** 7
- **Quando o paginador aparece:** Só com mais de 7 resultados
- **Controles:** primeira, anterior, até 5 números, próxima, última
- **Componente:** `p-paginator` com `paginator--md`
- **Volta à página 1:** Ao ordenar, atualizar e depois de vincular (o filtro só é aplicado no Atualizar)

## Estados
| Estado | Quando | O que aparece |
|---|---|---|
| Carregando | Enquanto a filial carrega, ao abrir a aba e no Atualizar | 3 cards em skeleton, sem skeleton de paginador; aria-busy e aria-label "Carregando almoxarifados" |
| Com resultados | Há vinculados após o filtro | Cards e, se houver mais de 7, paginador |
| Vazio (sem vínculo) | A filial não tem almoxarifado vinculado | Ícone `pi-folder-open` e texto `[[iclass.generic.label.no-stock-partition-linked]]` ou `[[iclass.generic.label.no-stock-partitions-registered]]` (casca: "Nenhum almoxarifado vinculado"), centralizados em área de no mínimo 320px |
| Sem resultado (com filtro) | Há vinculados, há filtro ativo e nenhum atende | Ícone `pi-search` e "Nenhum resultado encontrado" |
| Erro | A carga falhou | Ícone `pi-exclamation-circle` vermelho, "Não foi possível carregar os almoxarifados" e Tentar novamente |
| Seção de vinculação aberta | Vincular ligado | Seção entre a barra de ações e o filtro; a lista de vinculados continua visível abaixo |

## Comportamentos
Dado a aba aberta, quando o usuário clica em Vincular, então a seção de vinculação abre (ou fecha, se já estava aberta, perdendo a seleção).

Dado a lista carregada, quando o usuário clica em Atualizar, então os vinculados recarregam aplicando o filtro preenchido no painel e mantendo a ordenação e voltam à página 1; a seção de vinculação, se aberta, não recarrega.

Dado um card de vinculado, quando o usuário clica em Abrir, então nada acontece na casca; o manual pede ir à home do almoxarifado.

## Estilo
| Classe | Onde |
|---|---|
| `.tab-toolbar` (própria) | barra de ações |
| `.list-stack` (global) | coluna de cards |
| `.req-empty.state-fill` (global, com altura mínima própria) | vazio e sem resultado |
| `.load-state--error` (global) | erro |

| Onde | Valor |
|---|---|
| `:host` | espaço 12px entre blocos |
| `.tab-toolbar` | espaço 8px |
| `.req-empty.state-fill` | altura mínima 320px |
