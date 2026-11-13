# app-branch-filter

### Aplicação
Painel em que o usuário restringe o resultado por Código e Descrição, cada um com operador e
valor. É usado na lista de filiais e, com o mesmo conteúdo, na aba Almoxarifado, na seção de
vinculação de almoxarifado e na escolha de almoxarifado ao adicionar repositório da home
(`../home/app-branch-stock-partitions.md`, `../home/app-branch-stock-partition-link.md`,
`../home/app-branch-stock-partition-picker.md`). Cada contêiner guarda o próprio filtro e decide quando aplicá-lo.

### Componentização
| Componente     | Tipo    | Onde é usado                         |
| -------------- | ------- | ------------------------------------ |
| `p-dropdown`   | Externo | Operador de Código e de Descrição    |
| `pInputText`   | Externo | Valor de Código e de Descrição       |

### Elementos

#### Painel
- **CSS:** `.filter-panel` (globais) + `.filter-panel--cols-2`.

#### Rótulo "Código"
- **Tag:** `iclass.generic.label.code`
- **CSS:** `.filter-panel__label` (globais); ligado ao campo de valor do Código.

#### Operador do Código
- **Tag:** placeholder `iclass.generic.label.select-operator`; opções `iclass.generic.label.equals`, `iclass.generic.label.different`, `iclass.generic.label.contains`, `iclass.generic.label.starts-with`, `iclass.generic.label.ends-with`
- **Componente:** `p-dropdown`, com a lista anexada ao corpo da página (não é cortada pelo painel)
- **CSS:** `.filter-panel__operator` e, na lista, `.filter-panel__operator-panel` (globais)
- **Comportamento:** ao escolher um operador, o painel avisa o contêiner com o filtro completo.
- **Regras:** padrão Igual.

#### Valor do Código
- **Componente:** `pInputText`
- **CSS:** `.filter-panel__input` (globais)
- **Comportamento:** a cada caractere digitado, o painel avisa o contêiner com o filtro completo.

#### Rótulo "Descrição"
- **Tag:** `iclass.generic.label.description`
- **CSS:** `.filter-panel__label` (globais); ligado ao campo de valor da Descrição.

#### Operador da Descrição
- **Tag:** as mesmas do Operador do Código
- **Componente:** `p-dropdown`, com a lista anexada ao corpo da página
- **CSS:** `.filter-panel__operator`, `.filter-panel__operator-panel` (globais)
- **Comportamento:** ao escolher um operador, o painel avisa o contêiner com o filtro completo.
- **Regras:** padrão vazio (placeholder "Operador"); vazio funciona como Contém.

#### Valor da Descrição
- **Componente:** `pInputText`
- **CSS:** `.filter-panel__input` (globais)
- **Comportamento:** a cada caractere digitado, o painel avisa o contêiner com o filtro completo.

### Layout
O painel é um grid de duas colunas iguais, com 16px entre elas:

1. **Esquerda:** campo Código.
2. **Direita:** campo Descrição.

Cada campo (`.filter-panel__field`, globais) é uma coluna com o rótulo em cima e, embaixo
(`.filter-panel__control`, globais), o operador (104px) e o valor (espaço restante) lado a lado,
com 2px entre eles. Até 700px os campos ficam um abaixo do outro.

### Estados
| Estado           | Quando                                              | O que deve ser exibido                                                              |
| ---------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Fechado          | O botão de filtrar do contêiner está desligado      | Painel não aparece; o que foi preenchido é mantido para quando ele abrir de novo    |
| Aberto           | O botão de filtrar do contêiner está ligado         | Painel com os dois campos                                                           |
| Com filtro ativo | O último "Atualizar" do contêiner aplicou algum valor preenchido | Com o painel aberto, os valores ficam visíveis; com o painel fechado, nada indica o filtro |

### Comportamentos
- **Dado** o painel aberto, **quando** o usuário altera um operador ou valor, **então** a
  lista do contêiner não muda: o filtro só é aplicado quando o usuário clica em "Atualizar" no
  contêiner.
- **Dado** um filtro aplicado, **quando** a lista é filtrada, **então** a comparação não
  diferencia maiúsculas nem acentos e ignora espaços nas pontas do valor; campo sem valor não
  filtra; Código e Descrição se combinam (as duas condições valem ao mesmo tempo).

### CSS
| Classe | Definição |
|---|---|
| :host | display: block; |
| .filter-panel--cols-2 | grid-template-columns: repeat(2, minmax(0, 1fr)); |
| .filter-panel--cols-2 (até 700px) | grid-template-columns: minmax(0, 1fr); |
