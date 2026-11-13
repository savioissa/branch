# app-branch-stock-partition-picker

### Aplicação
Bloco "Selecionar almoxarifado" da tela de adicionar repositório (`app-branch-repository-add`).
Lista todos os almoxarifados do sistema para o usuário escolher **um**. Depois da escolha, a
lista recolhe e fica só o card do almoxarifado escolhido, com "Alterar" e "Remover" acima dele.

### Componentização
| Componente                        | Tipo    | Onde é usado                                                                 |
| --------------------------------- | ------- | ---------------------------------------------------------------------------- |
| `app-branch-filter`               | Interno | Filtro do bloco, quando aberto (`../lista/app-branch-filter.md`)             |
| `app-branch-stock-partition-card` | Interno | Um por almoxarifado da página atual, com "Selecionar"; ou o escolhido, só com "Abrir" (`app-branch-stock-partition-card.md`) |
| `p-button`                        | Externo | Filtrar, Atualizar, Alterar, Remover, Tentar novamente                       |
| `p-paginator`                     | Externo | Paginação dos almoxarifados                                                  |

### Elementos

#### Título
- **Tag:** sem escolha: `iclass.generic.label.select-stock-partition`; com escolha: `iclass.generic.label.stock-partition`
- **CSS:** `.pick-section__title`; h3.

#### Botão "Filtrar"
- **Componente:** `p-button`
- **Ícone:** `pi pi-filter`
- **CSS:** `btn--md btn--neutral` (globais)
- **Comportamento:** ao clicar, abre ou fecha o filtro do bloco; fechar não limpa o que foi preenchido.
- **Regras:** com o filtro aberto, recebe `is-active` (globais); só aparece com a lista à mostra.

#### Botão "Atualizar"
- **Componente:** `p-button`
- **Ícone:** `pi pi-refresh`
- **CSS:** `btn--md btn--neutral` (globais)
- **Comportamento:** ao clicar, recarrega os almoxarifados, aplica o filtro preenchido e volta à página 1.
- **Regras:** desabilitado durante a carga; só aparece com a lista à mostra.

#### Coluna de cards
- **Componente:** `app-branch-stock-partition-card` com "Selecionar", um por almoxarifado da página atual
- **CSS:** `.list-stack` (globais)
- **Comportamento:** ao clicar em "Selecionar" num card, aquele almoxarifado passa a ser o escolhido (substituindo o anterior, se houver) e a lista recolhe.
- **Regras:** todos os almoxarifados do sistema, vinculados ou não à filial, sem distinção visual; ordenados por Descrição, crescente, sem opção de mudar. Almoxarifado de fora da filial passa a ser vinculado a ela quando o par é salvo (`app-branch-repository-add.md`).
- **Origem do dado:** `--` (todos os almoxarifados cadastrados)

#### Card do almoxarifado escolhido
- **Componente:** `app-branch-stock-partition-card`, só com "Abrir almoxarifado"
- **Regras:** só aparece com escolha, no lugar da lista.

#### Botão "Alterar"
- **Tag:** `portal.generic.button.change`
- **Componente:** `p-button` (text)
- **CSS:** `btn--md` (globais); texto azul do tema, sem fundo nem borda.
- **Comportamento:** ao clicar, a lista volta, com o filtro, a página e os dados de antes (sem recarregar). O almoxarifado escolhido continua valendo até o usuário selecionar outro.
- **Regras:** só aparece com escolha, acima do card, à direita.

#### Botão "Remover"
- **Tag:** `iclass.generic.button.remove`
- **Componente:** `p-button` (text)
- **CSS:** `btn--md btn--danger btn--text` (globais); texto vermelho, sem fundo nem borda.
- **Comportamento:** ao clicar, desfaz a escolha e a lista volta (resultado na tela em `app-branch-repository-add.md`).
- **Regras:** só aparece com escolha, ao lado de "Alterar", à direita dele.

#### Paginador
- **Componente:** `p-paginator`
- **CSS:** `paginator--md` (globais); sem fundo, com linha superior (regra `.insumo-layer .p-paginator`, globais).
- **Comportamento:** ao trocar de página, exibe os cards da página escolhida.
- **Regras:** 3 itens por página; só aparece com mais de 3 resultados; controles primeira, anterior, até 5 números, próxima e última; volta à página 1 ao atualizar.

#### Botão "Tentar novamente"
- **Tag:** `portal.generic.button.try-again`
- **Componente:** `p-button`
- **Ícone:** `pi pi-refresh`
- **CSS:** `btn--md btn--secondary` (globais)
- **Comportamento:** ao clicar, recarrega os almoxarifados.
- **Regras:** só no estado Erro.

### Layout
O bloco é azul-claro (`.pick-section`, mesmas cores da seção de vinculação de almoxarifado), em
coluna, com 12px entre as partes:

1. **Cabeçalho:** título à esquerda; à direita, "Filtrar" e "Atualizar" (com a lista à mostra)
   ou "Alterar" e "Remover" (com escolha), com 8px entre eles.
2. **Filtro** (se aberto), **cards** (ou o estado) e **paginador**, na largura toda; com
   escolha, só o card escolhido.

### Estados
| Estado                     | Quando                                            | O que deve ser exibido                                                                                     |
| -------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Carregando                 | Ao abrir a tela de adicionar e no "Atualizar"     | 3 cards em skeleton; `aria-busy`                                                                           |
| Com resultados             | Há almoxarifados após o filtro                    | Cards com "Selecionar" e, se houver mais de 3, paginador                                                    |
| Vazio                      | Não há almoxarifado cadastrado                    | Ícone `pi pi-folder-open` e `iclass.generic.label.no-stock-partition-registered` (`.load-state`, globais)  |
| Sem resultado (com filtro) | Há almoxarifados, há filtro ativo e nenhum atende | Ícone `pi pi-search` e `portal.generic.results-not-found` (`.load-state`, globais)                         |
| Erro                       | A carga falhou                                    | Ícone `pi pi-exclamation-circle` vermelho, `iclass.generic.label.could-not-load-stock-partitions` e "Tentar novamente" (`.load-state .load-state--error`, globais) |
| Escolhido                  | Depois de "Selecionar"                            | Título `iclass.generic.label.stock-partition`, "Alterar" e "Remover" e o card escolhido; sem ferramentas, filtro, lista e paginador |
| Alterando                  | Depois de "Alterar"                               | A lista de novo, como em Com resultados; a escolha anterior continua valendo                               |

### Comportamentos
- **Dado** o filtro aberto, **quando** o usuário altera um campo, **então** a lista não muda: o
  filtro só é aplicado no "Atualizar" do bloco.

### CSS
| Classe | Definição |
|---|---|
| :host | display: block; |
| .pick-section | display: flex;<br>flex-direction: column;<br>gap: 12px;<br>padding: 12px 16px 16px;<br>background: #F6FAFF;<br>border: 1px solid #C6DFFF;<br>border-radius: 10px; |
| .pick-section__header | display: flex;<br>align-items: center;<br>flex-wrap: wrap;<br>gap: 12px; |
| .pick-section__title | margin: 0;<br>font: var(--label-field);<br>color: #1F2937; |
| .pick-section__title--closed | color: #9CA3AF; |
| .pick-section__tools | display: flex;<br>gap: 8px;<br>margin-left: auto; |
| .pick-section__type | display: flex;<br>align-items: center;<br>gap: 8px; |
| .pick-section__type-label | font: var(--secondary-md);<br>color: #6B7280; |
| .pick-section__type-select.p-dropdown | width: 180px;<br>height: 32px;<br>align-items: center; |
| .pick-section__type-select.p-dropdown .p-dropdown-label | padding: 0 10px;<br>font: var(--secondary-md); |

`.pick-section__title--closed` e as classes `.pick-section__type*` são de
`app-branch-repository-picker`, que usa este mesmo arquivo de estilo. As regras do `.p-dropdown`
alcançam o markup interno do PrimeNG e valem só dentro do componente.
