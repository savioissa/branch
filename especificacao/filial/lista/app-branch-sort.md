# app-branch-sort

### Aplicação
Painel em que o usuário escolhe o campo (Código ou Descrição) e a direção da ordenação. É usado
na lista de filiais e, com o mesmo conteúdo, na aba Almoxarifado da home
(`../home/app-branch-stock-partitions.md`). O mesmo painel, com outros campos, é usado na aba
Repositório (`../home/app-branch-repository-sort.md`). Cada contêiner guarda a própria ordenação e
define o padrão.

### Componentização
| Componente   | Tipo    | Onde é usado                    |
| ------------ | ------- | ------------------------------- |
| `p-dropdown` | Externo | Campo "Ordenar por"             |
| `p-button`   | Externo | Botão de direção                |

### Elementos

#### Painel
- **CSS:** `.sort-panel` (globais)

#### Rótulo "Ordenar por"
- **Tag:** `portal.generic.label.sort-by`
- **CSS:** `.sort-panel__label` (globais)

#### Campo "Ordenar por"
- **Tag:** placeholder `portal.generic.label.select`; opções `iclass.generic.label.code` e `iclass.generic.label.description`
- **Componente:** `p-dropdown` com botão de limpar, lista anexada ao corpo da página
- **CSS:** `.sort-panel__field`, `.sort-panel__select` e, na lista, `.sort-panel__select-panel` (globais)
- **Comportamento:** ao escolher ou limpar o campo, o painel avisa o contêiner com a ordenação completa.
- **Regras:** o valor inicial vem do contêiner (lista de filiais: nenhum campo; aba Almoxarifado: Descrição). Sem campo, os itens seguem a ordem em que os dados chegaram.

#### Botão de direção
- **Componente:** `p-button`
- **Ícone:** crescente `pi pi-sort-amount-up-alt`; decrescente `pi pi-sort-amount-down`
- **CSS:** `btn--md btn--neutral` (globais); quadrado de 32px.
- **Comportamento:** ao clicar, alterna entre crescente e decrescente, troca o ícone e avisa o contêiner.
- **Regras:** desabilitado sem campo escolhido. A direção inicial é crescente; limpar o campo mantém a direção escolhida para a próxima escolha.

### Layout
O painel tem largura máxima de 360px e é uma coluna:

1. **Topo:** rótulo "Ordenar por".
2. **Abaixo (`.sort-panel__control`, globais):** o campo (espaço restante) e o botão de
   direção, lado a lado, com 6px entre eles.

### Estados
| Estado           | Quando                                         | O que deve ser exibido                                                  |
| ---------------- | ---------------------------------------------- | ----------------------------------------------------------------------- |
| Fechado          | O botão de ordenar do contêiner está desligado | Painel não aparece; a ordenação escolhida continua valendo              |
| Aberto sem campo | Nenhum campo escolhido                         | Placeholder "Selecione" no campo; botão de direção desabilitado         |
| Aberto com campo | Campo escolhido                                | Campo preenchido com botão de limpar; botão de direção habilitado       |

### Comportamentos
- **Dado** um campo escolhido, **quando** a lista é ordenada, **então** a comparação ignora
  maiúsculas e acentos e segue a ordem alfabética do português.

### CSS
| Classe | Definição |
|---|---|
| :host | display: block;<br>max-width: 360px; |
