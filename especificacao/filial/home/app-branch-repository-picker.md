# app-branch-repository-picker

### Aplicação
Bloco "Selecionar repositório" da tela de adicionar repositório (`app-branch-repository-add`).
Fica fechado até o usuário escolher um almoxarifado. Aberto, o select de tipo, ao lado do
título, define quais repositórios do sistema aparecem; o usuário escolhe **um**. Depois da
escolha, a lista recolhe e fica só o card do repositório escolhido, com "Alterar" e "Remover"
acima dele.

### Componentização
| Componente                     | Tipo    | Onde é usado                                                                    |
| ------------------------------ | ------- | ------------------------------------------------------------------------------- |
| `app-branch-repository-filter` | Interno | Filtro do bloco com o tipo fixo, quando aberto (`app-branch-repository-filter.md`) |
| `app-branch-repository-card`   | Interno | Um por repositório da página atual, com "Selecionar"; ou o escolhido, só com "Abrir" (`app-branch-repository-card.md`) |
| `p-dropdown`                   | Externo | Tipo repositório                                                                |
| `p-button`                     | Externo | Filtrar, Atualizar, Alterar, Remover, Tentar novamente                          |
| `p-paginator`                  | Externo | Paginação dos repositórios                                                      |

### Elementos

#### Título
- **Tag:** fechado ou sem escolha: `iclass.generic.label.select-repository`; com escolha: `iclass.generic.label.repository`
- **CSS:** `.pick-section__title` (`app-branch-stock-partition-picker.md`); fechado: `.pick-section__title--closed`, cinza (#9CA3AF); h3.

#### Tipo repositório
- **Tag:** rótulo `iclass.generic.label.repository-type`; opções `portal.generic.label.team` (Equipe), `third.party` (Credenciada), `iclass.generic.label.warehouse` (Armazém), `portal.generic.label.workshop` (Oficina), `iclass.generic.label.cluster` (Cluster)
- **Componente:** `p-dropdown`, lista anexada ao corpo da página
- **CSS:** `.pick-section__type`, `.pick-section__type-label`, `pick-section__type-select` (`app-branch-stock-partition-picker.md`); campo de 180px.
- **Comportamento:** ao escolher outro tipo, o filtro do bloco é limpo, os repositórios do tipo novo carregam e a lista volta à página 1.
- **Regras:** começa em Equipe; sempre tem um tipo (sem opção vazia); só aparece com a lista à mostra. Ao reabrir a lista com "Alterar", mantém o último tipo.

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
- **Comportamento:** ao clicar, recarrega os repositórios do tipo, aplica o filtro preenchido e volta à página 1.
- **Regras:** desabilitado durante a carga; só aparece com a lista à mostra.

#### Coluna de cards
- **Componente:** `app-branch-repository-card` com "Selecionar", um por repositório da página atual
- **CSS:** `.list-stack` (globais)
- **Comportamento:** ao clicar em "Selecionar" num card, aquele repositório passa a ser o escolhido (substituindo o anterior, se houver) e a lista recolhe.
- **Regras:** todos os repositórios do sistema do tipo escolhido, inclusive os que já estão vinculados à filial com outro almoxarifado; ordenados por Nome / Técnico, crescente, sem opção de mudar.
- **Origem do dado:** `--` (repositórios cadastrados do tipo)

#### Card do repositório escolhido
- **Componente:** `app-branch-repository-card`, só com "Abrir repositório"
- **Regras:** só aparece com escolha, no lugar do select, das ferramentas e da lista.

#### Botão "Alterar"
- **Tag:** `portal.generic.button.change`
- **Componente:** `p-button` (text)
- **CSS:** `btn--md` (globais); texto azul do tema, sem fundo nem borda.
- **Comportamento:** ao clicar, a lista volta, com o tipo, o filtro, a página e os dados de antes (sem recarregar). O repositório escolhido continua valendo até o usuário selecionar outro.
- **Regras:** só aparece com escolha, acima do card, à direita.

#### Botão "Remover"
- **Tag:** `iclass.generic.button.remove`
- **Componente:** `p-button` (text)
- **CSS:** `btn--md btn--danger btn--text` (globais); texto vermelho, sem fundo nem borda.
- **Comportamento:** ao clicar, desfaz a escolha e a lista volta.
- **Regras:** só aparece com escolha, ao lado de "Alterar", à direita dele.

#### Paginador
- **Componente:** `p-paginator`
- **CSS:** `paginator--md` (globais); sem fundo, com linha superior (regra `.insumo-layer .p-paginator`, globais).
- **Comportamento:** ao trocar de página, exibe os cards da página escolhida.
- **Regras:** 3 itens por página; só aparece com mais de 3 resultados; controles primeira, anterior, até 5 números, próxima e última; volta à página 1 ao atualizar e ao trocar o tipo.

#### Botão "Tentar novamente"
- **Tag:** `portal.generic.button.try-again`
- **Componente:** `p-button`
- **Ícone:** `pi pi-refresh`
- **CSS:** `btn--md btn--secondary` (globais)
- **Comportamento:** ao clicar, recarrega os repositórios do tipo.
- **Regras:** só no estado Erro.

### Layout
Igual ao de `app-branch-stock-partition-picker.md`, com o select de tipo no cabeçalho: título,
rótulo "Tipo repositório" e o campo à esquerda, com 12px entre o título e o rótulo e 8px entre
o rótulo e o campo; "Filtrar" e "Atualizar" à direita. Se faltar espaço, o cabeçalho quebra
linha. Fechado, o bloco tem só o título.

### Estados
| Estado                     | Quando                                                  | O que deve ser exibido                                                                                     |
| -------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Fechado                    | Nenhum almoxarifado escolhido na tela                   | Só o título, em cinza; nada carrega                                                                        |
| Carregando                 | Na primeira abertura, ao trocar o tipo e no "Atualizar" | 3 cards em skeleton; `aria-busy`                                                                           |
| Com resultados             | Há repositórios do tipo após o filtro                   | Cards com "Selecionar" e, se houver mais de 3, paginador                                                    |
| Vazio                      | Não há repositório cadastrado do tipo                   | Ícone `pi pi-folder-open` e `iclass.generic.label.no-repository-of-type-registered` (`.load-state`, globais) |
| Sem resultado (com filtro) | Há repositórios, há filtro ativo e nenhum atende        | Ícone `pi pi-search` e `portal.generic.results-not-found` (`.load-state`, globais)                         |
| Erro                       | A carga falhou                                          | Ícone `pi pi-exclamation-circle` vermelho, `iclass.generic.label.could-not-load-repositories` e "Tentar novamente" (`.load-state .load-state--error`, globais) |
| Escolhido                  | Depois de "Selecionar"                                  | Título `iclass.generic.label.repository`, "Alterar" e "Remover" e o card escolhido; sem select, ferramentas, filtro, lista e paginador |
| Alterando                  | Depois de "Alterar"                                     | A lista de novo, como em Com resultados; a escolha anterior continua valendo                               |

### Comportamentos
- **Dado** o bloco fechado, **quando** o usuário escolhe um almoxarifado, **então** o bloco abre
  e, na primeira vez, carrega os repositórios do tipo Equipe. Ao fechar e abrir de novo, a lista,
  o tipo e o filtro continuam como estavam.
- **Dado** o filtro aberto, **quando** o usuário altera um campo, **então** a lista não muda: o
  filtro só é aplicado no "Atualizar" do bloco.
- **Dado** uma carga em andamento, **quando** o usuário troca o tipo de novo, **então** só a
  carga do último tipo escolhido é exibida.

### CSS
— (usa as classes de `app-branch-stock-partition-picker.md`, mesmo arquivo de estilo)
