# app-branch-detail

### Aplicação
Contêiner da home da filial. Carrega a filial pelo código da URL e organiza a lateral e as abas
Cadastro, Almoxarifado e Repositório. Quando o cadastro é gravado, mantém a lateral e a URL em
dia com os valores novos.

### Componentização
| Componente                    | Tipo    | Onde é usado                                                                      |
| ----------------------------- | ------- | --------------------------------------------------------------------------------- |
| `app-branch-sidebar`          | Interno | Lateral (`app-branch-sidebar.md`)                                                 |
| `app-branch-register`         | Interno | Aba Cadastro (`app-branch-register.md`)                                           |
| `app-branch-stock-partitions` | Interno | Aba Almoxarifado, criado na primeira abertura da aba (`app-branch-stock-partitions.md`) |
| `app-branch-repositories`     | Interno | Aba Repositório, criado na primeira abertura da aba (`app-branch-repositories.md`) |
| `p-tabView`, `p-tabPanel`     | Externo | Abas                                                                              |
| `p-button`                    | Externo | "Voltar para a lista"                                                             |

### Elementos

#### Abas
- **Tag:** Cadastro: `portal.generic.label.register`; Almoxarifado: `iclass.generic.label.stock-partition`; Repositório: `iclass.generic.label.repository`
- **Componente:** `p-tabView` com três `p-tabPanel`
- **CSS:** `req-tabs branch-tabs` (`req-tabs` globais; `branch-tabs` sem definição)
- **Comportamento:** ao clicar numa aba, mostra o conteúdo dela; Almoxarifado e Repositório só carregam na primeira abertura, e todas mantêm o conteúdo (inclusive filtros, seleção e edição em andamento) ao trocar de aba. Trocar de aba não muda a URL.
- **Regras:** a aba inicial vem da URL: `?aba=almoxarifado` abre Almoxarifado, `?aba=repositorio` abre Repositório; qualquer outro valor, ou nenhum, abre Cadastro.

#### Botão "Voltar para a lista"
- **Tag:** `iclass.generic.button.back-to-list`
- **Componente:** `p-button`
- **CSS:** `btn--md btn--secondary` (globais)
- **Comportamento:** ao clicar, vai para a lista de filiais.
- **Regras:** só nos estados Não encontrada e Erro de carga.

### Layout
A página é um grid de 10 colunas, com 16px entre as colunas e 16px de respiro em volta, altura
mínima da tela:

1. **Lateral (2 colunas, à esquerda):** `app-branch-sidebar`.
2. **Abas (8 colunas, à direita):** `p-tabView`.

Até 900px a lateral fica em cima e as abas embaixo, as duas com a largura toda. Nos estados Não
encontrada e Erro de carga, um único bloco ocupa as 10 colunas, centralizado na altura.

### Estados
| Estado         | Quando                                      | O que deve ser exibido                                                                                    |
| -------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Carregando     | Ao abrir a página ou trocar o código na URL | Lateral e aba Cadastro em skeleton, abas visíveis; área das abas com `aria-busy`                          |
| Pronta         | Filial carregada                            | Lateral com a filial e as abas                                                                            |
| Não encontrada | Não existe filial com o código              | Página inteira: ícone `pi pi-search`, `iclass.generic.label.branch-not-found` e "Voltar para a lista" (`.req-empty .state-fill`, globais) |
| Erro de carga  | A busca da filial falhou                    | Página inteira: ícone `pi pi-exclamation-circle` vermelho, `iclass.generic.label.could-not-load-branch` e "Voltar para a lista" (`.load-state .load-state--error .state-fill`, globais) |

### Comportamentos
- **Dado** o cadastro gravado com outro código, **quando** a home recebe a filial gravada,
  **então** a URL passa a `/filial/:novoCodigo`, substituindo a anterior no histórico, sem
  recarregar a página.

### CSS
| Classe | Definição |
|---|---|
| :host | display: grid;<br>grid-template-columns: repeat(10, minmax(0, 1fr));<br>align-items: start;<br>gap: 16px;<br>min-height: 100vh;<br>padding: 16px;<br>box-sizing: border-box; |
| app-branch-sidebar | grid-column: span 2; |
| .branch-main | grid-column: span 8;<br>min-width: 0;<br>display: flex;<br>flex-direction: column; |
| .state-fill | grid-column: 1 / -1;<br>align-self: stretch; |
| app-branch-sidebar, .branch-main (até 900px) | grid-column: 1 / -1; |
