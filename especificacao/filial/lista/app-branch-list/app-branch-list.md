---
componente: app-branch-list
papel: list
status: definido
---
Contêiner da página de lista: organiza cabeçalho, painéis e cards e controla o resultado exibido.

## Entrada e saída
| Direção | Nome | Conteúdo |
|---|---|---|
| entrada | lista de filiais | `{{ DTO:filial[] }}` (carregada ao abrir a página e no Atualizar) |
| saída | navegação | Vai para `/filial/nova` (Novo) ou `/filial/:codigo` (abrir card) |

## Composição
- `app-branch-filter` (`../app-branch-filter/app-branch-filter.md`), quando o painel de filtro está aberto
- `app-branch-sort` (`../app-branch-sort/app-branch-sort.md`), quando o painel de ordenação está aberto
- `app-branch-card` (`../app-branch-card/app-branch-card.md`), um por filial da página atual
- Externos: `p-button`, `p-paginator`

## Layout
Página em coluna com altura mínima da tela. Cabeçalho `.page-header` no topo (fixo ao rolar) e conteúdo `.page-content` abaixo. Nenhuma coluna de grid: cada bloco do conteúdo ocupa a largura toda.

| Região ou coluna                    | Largura                                    |
| ----------------------------------- | ------------------------------------------ |
| Cabeçalho: título                   | à esquerda                                 |
| Cabeçalho: ações                    | à direita, espaço de 8px entre botões      |
| Conteúdo: painéis, cards, paginador | largura toda; paginador alinhado à direita |

## Elementos

### Ações

#### Novo

- **Tag:** `[[portal-iam.userlist.button.new]]`
- **Componente:** `p-button`
- **Ícone:** `pi pi-plus`
- **Aparência:** `btn--md btn--secondary header-btn`
- **Resultado:** vai para `/filial/nova`

#### Filtrar

- **Tag:** sem tag visível
- **Componente:** `p-button`
- **Ícone:** `pi pi-filter`
- **Aparência:** `btn--md btn--neutral header-btn`
- **Estado:** `is-active` com o painel aberto
- **Resultado:** abre ou fecha o painel de filtro

#### Ordenar

- **Tag:** sem tag visível
- **Componente:** `p-button`
- **Ícone:** `pi pi-sort-amount-down`
- **Aparência:** `btn--md btn--neutral header-btn`
- **Estado:** `is-active` com o painel aberto
- **Resultado:** abre ou fecha o painel de ordenação

#### Atualizar

- **Tag:** `[[portal.generic.button.refresh]]`
- **Componente:** `p-button`
- **Ícone:** `pi pi-refresh`
- **Aparência:** `btn--md btn--primary header-btn`
- **Estado:** desabilitado durante a carga
- **Resultado:** recarrega a lista; aplica o filtro preenchido no painel

#### Tentar novamente

- **Tag:** "Tentar novamente"
- **Componente:** `p-button`
- **Ícone:** `pi pi-refresh`
- **Aparência:** `btn--md btn--secondary`
- **Resultado:** recarrega a lista (só no estado Erro)

### Campos de exibição

#### Título da página

- **Tag:** `[[iclass.generic.label.branch]]`
- **Formato:** texto fixo, h1
- **Classe da tag / valor:** — / `.t-title-lg .page-header__title`

### Paginação

- **Itens por página:** 7
- **Quando o paginador aparece:** Sempre que houver ao menos um resultado, mesmo com uma página só
- **Controles:** primeira, anterior, até 5 números de página, próxima, última
- **Componente:** `p-paginator` com `paginator--md`
- **Volta à página 1:** Ao ordenar ou atualizar (o filtro só é aplicado no Atualizar)
- **Total:** Quantidade de filiais após o filtro

### Ordenação

Padrão desta lista é nenhum campo (ordem de chegada dos dados); campos e regras em `app-branch-sort`.

## Estados
| Estado | Quando | O que aparece |
|---|---|---|
| Carregando | Ao abrir a página e durante o Atualizar | 7 cards em skeleton e um bloco de skeleton no lugar do paginador; aria-busy e aria-label "Carregando filiais"; Atualizar desabilitado |
| Com resultados | Carga concluída e ao menos uma filial após o filtro | Cards da página atual e paginador |
| Vazio (sem cadastro) | Nenhuma filial cadastrada | Ícone `pi-folder-open` e "Nenhuma filial cadastrada", centralizados no espaço restante |
| Sem resultado (com filtro) | Existe filial cadastrada, há filtro ativo e nenhuma filial atende | Ícone `pi-search` e "Nenhum resultado encontrado", centralizados |
| Erro | A carga falhou | Ícone `pi-exclamation-circle` vermelho, "Não foi possível carregar as filiais" e Tentar novamente |

## Comportamentos
Dado qualquer estado, quando o usuário clica em Filtrar ou Ordenar, então o painel correspondente abre ou fecha; os dois podem ficar abertos ao mesmo tempo (filtro acima da ordenação). Fechar o painel não limpa o que foi escolhido.

Dado a lista carregada, quando o usuário clica em Atualizar, então a lista recarrega aplicando o filtro preenchido no painel e mantendo a ordenação e volta à página 1.

Dado a lista com mais de uma página, quando o usuário troca de página no paginador, então os cards da página escolhida aparecem.

Dado qualquer estado, quando o usuário clica em Novo, então a página vai para `/filial/nova`.

## Estilo
| Classe | Onde |
|---|---|
| `.page-header`, `.page-header__title`, `.page-header__actions` (globais) | cabeçalho |
| `.header-btn` (global) | ícones de 16px nos botões do cabeçalho |
| `.page-content` (global) | conteúdo |
| `.list-stack` (global) | coluna de cards, espaço de 10px |
| `.skeleton.skeleton-paginator` (global) | skeleton do paginador: 300px × 32px, à direita |
| `.req-empty`, `.state-fill` (globais) | estados vazio e sem resultado |
| `.load-state`, `.load-state--error`, `.state-fill` (globais) | estado de erro |

| Onde | Valor |
|---|---|
| `.page-header` | respiro 16px 32px, fundo #FAFAFA, borda inferior #E2E8F0 |
| `.page-header__title` | Geist 24px/32px, peso 500, cor #1F2937 |
| `.page-content` | respiro 16px 32px 24px, espaço 16px |
| `.req-empty` | Geist 14px/21px, peso 400, cor #6B7280, altura mínima 240px, ícone 18px |
| `.load-state` | Geist 13px/20px, peso 400, cor #6A7282; ícone 20px #DC2626 no erro |
