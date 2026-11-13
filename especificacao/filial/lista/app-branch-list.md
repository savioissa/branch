# app-branch-list

### Aplicação
Contêiner da página de lista de filiais. Organiza o cabeçalho, os painéis de filtro e de
ordenação, os cards e o paginador, e controla qual resultado é exibido.

### Componentização
| Componente          | Tipo    | Onde é usado                                              |
| ------------------- | ------- | --------------------------------------------------------- |
| `app-branch-filter` | Interno | Painel de filtro, quando aberto (`app-branch-filter.md`)  |
| `app-branch-sort`   | Interno | Painel de ordenação, quando aberto (`app-branch-sort.md`) |
| `app-branch-card`   | Interno | Um por filial da página atual (`app-branch-card.md`)      |
| `p-button`          | Externo | Botões do cabeçalho e "Tentar novamente"                  |
| `p-paginator`       | Externo | Paginação do resultado                                    |

### Elementos

#### Título da página
- **Tag:** `branch`
- **CSS:** `.t-title-lg .page-header__title` (globais); h1.

#### Botão "Novo"
- **Tag:** `portal-iam.userlist.button.new`
- **Componente:** `p-button`
- **Ícone:** `pi pi-plus`
- **CSS:** `btn--md btn--secondary header-btn` (globais)
- **Comportamento:** ao clicar, abre a página de criação (ver Fluxo no `README.md`).

#### Botão "Filtrar"
- **Componente:** `p-button`
- **Ícone:** `pi pi-filter`
- **CSS:** `btn--md btn--neutral header-btn` (globais)
- **Comportamento:** ao clicar, abre ou fecha o painel de filtro; fechar não limpa o que foi preenchido.
- **Regras:** com o painel aberto, o botão recebe `is-active` (globais).

#### Botão "Ordenar"
- **Componente:** `p-button`
- **Ícone:** `pi pi-sort-amount-down`
- **CSS:** `btn--md btn--neutral header-btn` (globais)
- **Comportamento:** ao clicar, abre ou fecha o painel de ordenação; fechar não desfaz a ordenação.
- **Regras:** com o painel aberto, o botão recebe `is-active` (globais).

#### Botão "Atualizar"
- **Tag:** `portal.generic.button.refresh`
- **Componente:** `p-button`
- **Ícone:** `pi pi-refresh`
- **CSS:** `btn--md btn--primary header-btn` (globais)
- **Comportamento:** ao clicar, recarrega as filiais aplicando o filtro preenchido no painel, mantém a ordenação e volta à página 1.
- **Regras:** desabilitado durante a carga.

#### Coluna de cards
- **Componente:** `app-branch-card`, um por filial da página atual
- **CSS:** `.list-stack` (globais)
- **Regras:** sem campo de ordenação escolhido, os cards seguem a ordem em que os dados chegaram.
- **Origem do dado:** `--`

#### Paginador
- **Componente:** `p-paginator`
- **CSS:** `paginator--md` (globais); alinhado à direita.
- **Comportamento:** ao trocar de página, exibe os cards da página escolhida.
- **Regras:** 7 itens por página; aparece sempre que houver ao menos um resultado, mesmo com uma página só; controles primeira, anterior, até 5 números de página, próxima e última; o total é a quantidade de filiais após o filtro; volta à página 1 ao ordenar e ao atualizar.

#### Botão "Tentar novamente"
- **Tag:** `portal.generic.button.try-again`
- **Componente:** `p-button`
- **Ícone:** `pi pi-refresh`
- **CSS:** `btn--md btn--secondary` (globais)
- **Comportamento:** ao clicar, recarrega a lista.
- **Regras:** só aparece no estado Erro.

### Layout
A página é uma coluna com altura mínima da tela, dividida em duas seções:

1. **Cabeçalho (topo, fixo ao rolar, `.page-header`, globais):** título à esquerda; botões
   Novo, Filtrar, Ordenar e Atualizar à direita (`.page-header__actions`, globais), com 10px
   entre eles.
2. **Conteúdo (`.page-content`, largura toda):** painel de filtro (se aberto), painel de
   ordenação (se aberto), coluna de cards (ou o estado) e paginador, nesta ordem, com 16px
   entre os blocos. Os estados Vazio, Sem resultado e Erro ocupam o espaço restante, centralizados.

### Estados
| Estado                     | Quando                                                            | O que deve ser exibido                                                                                                                                       |
| -------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Carregando                 | Ao abrir a página e durante o "Atualizar"                         | 7 cards em skeleton e um skeleton de 300px × 32px no lugar do paginador (`.skeleton-paginator`, globais); `aria-busy`; "Atualizar" desabilitado |
| Com resultados             | Carga concluída e ao menos uma filial após o filtro               | Cards da página atual e paginador                                                                                                                            |
| Vazio (sem cadastro)       | Nenhuma filial cadastrada                                         | Ícone `pi pi-folder-open` e `iclass.generic.label.no-branch-registered` (`.req-empty .state-fill`, globais)                                                   |
| Sem resultado (com filtro) | Existe filial cadastrada, há filtro ativo e nenhuma filial atende | Ícone `pi pi-search` e `portal.generic.results-not-found` (`.req-empty .state-fill`, globais)                                                                 |
| Erro                       | A carga falhou                                                    | Ícone `pi pi-exclamation-circle` em vermelho, `iclass.generic.label.could-not-load-branches` e o botão "Tentar novamente" (`.load-state .load-state--error .state-fill`, globais) |

Filtro ativo é o filtro com ao menos um valor preenchido, aplicado no último "Atualizar".

### Comportamentos
- **Dado** qualquer estado, **quando** o usuário abre os dois painéis, **então** os dois
  ficam abertos ao mesmo tempo, com o filtro acima da ordenação.

### CSS
| Classe | Definição |
|---|---|
| :host | display: flex;<br>flex-direction: column;<br>min-height: 100vh; |
