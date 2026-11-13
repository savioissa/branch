# app-branch-stock-partition-link

### Aplicação
Seção de vinculação de almoxarifado, aberta pelo botão "Vincular" da aba Almoxarifado. Lista os
almoxarifados ainda não vinculados à filial para o usuário marcar um ou mais e vinculá-los de
uma vez.

### Componentização
| Componente           | Tipo    | Onde é usado                                                               |
| -------------------- | ------- | -------------------------------------------------------------------------- |
| `app-branch-filter`  | Interno | Filtro da seção, quando aberto (`../lista/app-branch-filter.md`)           |
| `app-branch-stock-partition-card` | Interno | Um por almoxarifado disponível da página atual, selecionável (`app-branch-stock-partition-card.md`) |
| `p-button`           | Externo | Fechar, Vincular (n), Filtrar, Atualizar, Tentar novamente                 |
| `p-paginator`        | Externo | Paginação dos disponíveis                                                  |
| `p-toast`            | Externo | Toasts de sucesso e erro (global)                                          |

### Elementos

#### Título
- **Tag:** `iclass.generic.label.select-stock-partition`
- **CSS:** `.t-title-sm` (globais) + `.link-panel__title`; h2; dá nome à seção para o leitor de tela.

#### Botão "Fechar"
- **Tag:** `portal.generic.button.close`
- **Componente:** `p-button`
- **CSS:** `btn--md btn--neutral` (globais)
- **Comportamento:** ao clicar, fecha a seção; a seleção e o filtro da seção são perdidos.
- **Regras:** desabilitado enquanto vincula.

#### Botão "Vincular (n)"
- **Tag:** `iclass.generic.button.link-count` ("Vincular ({0})", {0} = total selecionado)
- **Componente:** `p-button`
- **CSS:** `btn--md btn--primary` (globais)
- **Comportamento:** ao clicar, vincula todos os selecionados à filial de uma vez.
- **Regras:** desabilitado com 0 selecionados; mostra carregando enquanto vincula. O total inclui os selecionados que não estão visíveis na página ou no filtro.

#### Botão "Filtrar"
- **Componente:** `p-button`
- **Ícone:** `pi pi-filter`
- **CSS:** `btn--md btn--neutral` (globais)
- **Comportamento:** ao clicar, abre ou fecha o filtro da seção.
- **Regras:** com o filtro aberto, o botão recebe `is-active` (globais).

#### Botão "Atualizar"
- **Componente:** `p-button`
- **Ícone:** `pi pi-refresh`
- **CSS:** `btn--md btn--neutral` (globais)
- **Comportamento:** ao clicar, recarrega os disponíveis aplicando o filtro preenchido e volta à página 1; a seleção é mantida, exceto os que deixaram de estar disponíveis.
- **Regras:** desabilitado durante a carga.

#### Coluna de cards
- **Componente:** `app-branch-stock-partition-card` selecionável, um por almoxarifado disponível da página atual
- **CSS:** `.list-stack` (globais)
- **Comportamento:** ao marcar ou desmarcar um card, a seleção e o contador de "Vincular (n)" acompanham. Trocar de página ou filtrar não desmarca.
- **Regras:** só os almoxarifados ainda não vinculados à filial; ordenados por descrição, crescente, sem opção de mudar.
- **Origem do dado:** `--` (não vinculados à filial)

#### Paginador
- **Componente:** `p-paginator`
- **CSS:** `paginator--md` (globais); dentro da seção, sem fundo, com linha superior (regra `.insumo-layer .p-paginator`, globais).
- **Comportamento:** ao trocar de página, exibe os cards da página escolhida.
- **Regras:** 5 itens por página; só aparece com mais de 5 resultados; controles primeira, anterior, até 5 números, próxima e última; volta à página 1 ao atualizar.

#### Botão "Tentar novamente"
- **Tag:** `portal.generic.button.try-again`
- **Componente:** `p-button`
- **Ícone:** `pi pi-refresh`
- **CSS:** `btn--md btn--secondary` (globais)
- **Comportamento:** ao clicar, recarrega os disponíveis.
- **Regras:** só no estado Erro.

#### Toast de sucesso
- **Tag:** `iclass.generic.label.stock-partition-s-linked-successfully`
- **Componente:** `p-toast`
- **Regras:** sucesso, 4 s.

#### Toast de erro
- **Tag:** `iclass.generic.label.could-not-link-the-stock-partition`
- **Componente:** `p-toast`
- **Regras:** erro, 6 s; a seção continua aberta com a seleção.

### Layout
A seção é um painel (`.insumo-layer`, globais, com fundo #F6FAFF e borda #C6DFFF de
`.link-panel`) em coluna, com 16px de respiro e 12px entre os blocos:

1. **Cabeçalho:** título à esquerda; "Fechar" e "Vincular (n)" à direita, com 8px entre eles.
2. **Ferramentas:** "Filtrar" e "Atualizar", alinhados à direita, com 8px entre eles.
3. **Filtro** (se aberto), **cards** (ou o estado) e **paginador**, na largura toda.

### Estados
| Estado                     | Quando                                              | O que deve ser exibido                                                                                     |
| -------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Carregando                 | Ao abrir a seção e no "Atualizar"                   | 3 cards em skeleton; `aria-busy`   |
| Com resultados             | Há disponíveis após o filtro                        | Cards selecionáveis e, se houver mais de 5, paginador                                                      |
| Vazio (todos vinculados)   | Não há almoxarifado disponível                      | Ícone `pi pi-folder-open` e `iclass.generic.label.all-stock-partitions-linked` (`.load-state`, globais)      |
| Sem resultado (com filtro) | Há disponíveis, há filtro ativo e nenhum atende     | Ícone `pi pi-search` e `portal.generic.results-not-found` (`.load-state`, globais)                          |
| Erro                       | A carga falhou                                      | Ícone `pi pi-exclamation-circle` vermelho, `iclass.generic.label.could-not-load-stock-partitions` e "Tentar novamente" (`.load-state .load-state--error`, globais) |
| Vinculando                 | Depois de "Vincular (n)"                            | "Vincular (n)" com carregando; "Fechar" desabilitado                                                        |
| Erro ao vincular           | O vínculo falhou                                    | Toast de erro; a seção continua aberta com a seleção                                                        |

### Comportamentos
— (não se aplica)

### CSS
| Classe | Definição |
|---|---|
| :host | display: block; |
| .link-panel | background: #F6FAFF;<br>border-color: #C6DFFF; |
| .link-panel__header | display: flex;<br>align-items: center;<br>gap: 12px; |
| .link-panel__title | margin: 0;<br>color: #1F2937; |
| .link-panel__actions | display: flex;<br>gap: 8px;<br>margin-left: auto; |
| .link-panel__tools | display: flex;<br>justify-content: flex-end;<br>gap: 8px; |
