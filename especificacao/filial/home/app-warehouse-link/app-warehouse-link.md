---
componente: app-warehouse-link
papel: link
status: definido
---
Seção em que o usuário seleciona almoxarifados ainda não vinculados e os vincula à filial.

Seletor fora do padrão `app-<objeto>-<papel>`. O manual pede reaproveitar o componente de vinculação das listas de Tipo OS; a casca criou este.

## Entrada e saída
| Direção | Nome | Conteúdo |
|---|---|---|
| entrada | branchCode | Código da filial que recebe os vínculos `{{ DTO:filial.codigo }}` |
| entrada | almoxarifados disponíveis | `{{ DTO:almoxarifado[] }}` não vinculados à filial (carregados ao abrir e no Atualizar da seção) |
| saída | closed | Usuário fechou a seção sem vincular |
| saída | linked | Vínculo concluído |

## Composição
- `app-branch-filter` (`../../lista/app-branch-filter/app-branch-filter.md`), quando o filtro da seção está aberto
- `app-warehouse-card` (`../app-warehouse-card/app-warehouse-card.md`) selecionável, um por almoxarifado da página atual
- Externos: `p-button`, `p-paginator`

## Layout
Painel `.insumo-layer` (fundo cinza, borda, cantos arredondados) em coluna, espaço de 12px entre blocos:

| Região ou coluna | Largura |
|---|---|
| Cabeçalho: título | à esquerda |
| Cabeçalho: Fechar e Vincular (n) | à direita, espaço de 8px |
| Ferramentas: Filtrar e Atualizar | linha própria, alinhadas à direita |
| Filtro, cards, paginador | largura toda do painel |

## Elementos

### Ações

#### Fechar

- **Tag:** "Fechar"
- **Componente:** `p-button`
- **Aparência:** `btn--md btn--neutral`
- **Estado:** desabilitado enquanto vincula
- **Resultado:** emite `closed`; a seleção e o filtro da seção são perdidos

#### Vincular (n)

- **Tag:** "Vincular ({quantidade selecionada})"
- **Componente:** `p-button`
- **Aparência:** `btn--md btn--primary`
- **Estado:** desabilitado com 0 selecionados; carregando enquanto vincula
- **Resultado:** vincula os selecionados

#### Filtrar

- **Tag:** sem tag visível
- **Componente:** `p-button`
- **Ícone:** `pi pi-filter`
- **Aparência:** `btn--md btn--neutral`
- **Estado:** `is-active` com o filtro aberto
- **Resultado:** abre ou fecha o filtro da seção

#### Atualizar

- **Tag:** sem tag visível
- **Componente:** `p-button`
- **Ícone:** `pi pi-refresh`
- **Aparência:** `btn--md btn--neutral`
- **Estado:** desabilitado durante a carga
- **Resultado:** recarrega os disponíveis; aplica o filtro preenchido no painel

#### Tentar novamente

- **Tag:** "Tentar novamente"
- **Componente:** `p-button`
- **Ícone:** `pi pi-refresh`
- **Aparência:** `btn--md btn--secondary`
- **Resultado:** recarrega (só no estado Erro)

### Campos de exibição

#### Título

- **Tag:** `[[iclass.generic.label.select-stock-partition]]`
- **Formato:** texto fixo, h2
- **Classe da tag / valor:** — / `.t-title-sm .link-panel__title`

#### Toast de sucesso

- **Tag:** `[[iclass.generic.label.stock-partition-s-linked-successfully]]`
- **Formato:** toast de sucesso, 4 s (PrimeNG 17)
- **Classe da tag / valor:** `p-toast` global

#### Toast de erro

- **Tag:** `[[iclass.generic.label.could-not-link-the-stock-partition]]`
- **Formato:** toast de erro, 6 s
- **Classe da tag / valor:** `p-toast` global

### Ordenação

#### Descrição (fixa)

- **Tag:** — (sem painel de ordenação)
- **Campo:** descrição do almoxarifado
- **Padrão:** crescente; o usuário não altera

### Paginação

- **Itens por página:** 5
- **Quando o paginador aparece:** Só com mais de 5 resultados
- **Controles:** primeira, anterior, até 5 números, próxima, última
- **Componente:** `p-paginator` com `paginator--md`
- **Volta à página 1:** Ao atualizar (o filtro só é aplicado no Atualizar)

### Regras de seleção

- **Quais almoxarifados aparecem:** Só os ainda não vinculados à filial
- **Seleção entre páginas e filtros:** Mantida: trocar de página ou filtrar não desmarca
- **Seleção depois de Atualizar:** Mantida, exceto os que deixaram de estar disponíveis
- **Contador:** Total selecionado, inclusive o que não está visível na página ou no filtro

## Estados
| Estado | Quando | O que aparece |
|---|---|---|
| Carregando | Ao abrir a seção e no Atualizar | 3 cards em skeleton; aria-busy e aria-label "Carregando almoxarifados disponíveis" |
| Com resultados | Há disponíveis após o filtro | Cards selecionáveis e, se houver mais de 5, paginador |
| Vazio (todos vinculados) | Não há almoxarifado disponível | Ícone `pi-folder-open` e "Todos os almoxarifados já estão vinculados a esta filial" |
| Sem resultado (com filtro) | Há disponíveis, há filtro ativo e nenhum atende | Ícone `pi-search` e "Nenhum resultado encontrado" |
| Erro | A carga falhou | Ícone `pi-exclamation-circle` vermelho, "Não foi possível carregar os almoxarifados" e Tentar novamente |
| Vinculando | Depois de clicar em Vincular (n) | Vincular (n) carregando; Fechar desabilitado |
| Erro ao vincular | O vínculo falhou | Toast de erro; a seção continua aberta com a seleção |

## Comportamentos
Dado a seção carregada, quando o usuário marca ou desmarca um card, então o contador de Vincular (n) acompanha e o botão habilita com 1 ou mais.

Dado ao menos um selecionado, quando o usuário clica em Vincular (n), então os selecionados são vinculados de uma vez; com sucesso, o toast de sucesso aparece e a seção emite `linked`.

Dado a seção aberta, quando o usuário clica em Fechar, então a seção emite `closed`.

Dado um card da seção, quando o usuário clica em Abrir, então nada acontece na casca.

## Estilo
| Classe | Onde |
|---|---|
| `.insumo-layer` (global) | painel |
| `.link-panel` (própria, raiz) | painel |
| `.link-panel__header`, `.link-panel__title`, `.link-panel__actions`, `.link-panel__tools` (próprias) | cabeçalho, título, ações e ferramentas |
| `.t-title-sm` (global) | título, Geist 16px/24px, peso 600 |
| `.load-state` (global) | estados vazio, sem resultado e erro (sem `.req-empty`, diferente da aba) |
| `.list-stack` (global) | coluna de cards |

| Onde | Valor |
|---|---|
| `.insumo-layer` | respiro 16px, espaço 12px, fundo #F1F2F4, borda #E5E7EB, raio 10px |
| `.insumo-layer .p-paginator` | fundo #fff, borda superior #F1F5F9, cantos inferiores 10px, respiro 6px 12px |
| `.link-panel__title` | cor #1F2937 |
| `.link-panel__header` | espaço 12px |
| `.link-panel__actions`, `__tools` | espaço 8px |
