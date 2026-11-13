# app-branch-repository-add

### Aplicação
Tela de fundo cinza "Adicionar repositório", aberta pelo botão "Adicionar" da aba Repositório.
O usuário escolhe um almoxarifado e, depois, um repositório (a escolha de repositório fica
fechada até haver almoxarifado) e salva o par na filial (vínculo Filial × Repositório ×
Almoxarifado). O card do par não aparece nesta tela: só na lista da aba, depois de salvar.
Almoxarifado de fora da filial passa a ser vinculado à filial também ao salvar. Um par que a
filial já tem não pode ser salvo de novo.

### Componentização
| Componente                          | Tipo    | Onde é usado                                                       |
| ----------------------------------- | ------- | ------------------------------------------------------------------ |
| `app-branch-stock-partition-picker` | Interno | Escolha do almoxarifado (`app-branch-stock-partition-picker.md`)   |
| `app-branch-repository-picker`      | Interno | Escolha do repositório, fechada até haver almoxarifado (`app-branch-repository-picker.md`) |
| `p-button`                          | Externo | Cancelar e Salvar                                                  |
| `p-toast`                           | Externo | Toasts de sucesso e erro (global)                                  |

### Elementos

#### Título
- **Tag:** `iclass.generic.label.add-repository`
- **CSS:** `.t-title-sm` (globais) + `.add-panel__title`; h2; dá nome à tela para o leitor de tela.

#### Botão "Cancelar"
- **Tag:** `portal.generic.button.cancel`
- **Componente:** `p-button`
- **CSS:** `btn--md btn--neutral` (globais)
- **Comportamento:** ao clicar, fecha a tela sem pedir confirmação; as escolhas e os filtros são perdidos.
- **Regras:** sempre habilitado, menos enquanto salva.

#### Botão "Salvar"
- **Tag:** `portal.generic.button.save`
- **Componente:** `p-button`
- **CSS:** `btn--md btn--primary` (globais)
- **Comportamento:** ao clicar, grava o par na filial; o almoxarifado de fora da filial é vinculado a ela também. Com sucesso, o toast de sucesso aparece, a tela fecha e a aba recarrega os vínculos.
- **Regras:** habilitado só com um almoxarifado e um repositório escolhidos e com o par ainda não vinculado à filial; mostra carregando enquanto salva.
- **Origem do dado:** `--`

#### Escolha do repositório
- **Componente:** `app-branch-repository-picker`
- **Regras:** fechada enquanto não há almoxarifado escolhido; abre assim que o almoxarifado é escolhido. Se o almoxarifado for removido, ela fecha de novo e o repositório escolhido é descartado. "Alterar" no almoxarifado não fecha a escolha de repositório.

#### Aviso de par já vinculado
- **Tag:** `iclass.generic.label.repository-already-linked-to-stock-partition`
- **Ícone:** `pi pi-exclamation-circle`
- **CSS:** `.form-alert` (globais)
- **Regras:** aparece abaixo dos dois blocos de escolha quando a filial já tem o par escolhido; some ao mudar o almoxarifado ou o repositório.
- **Origem do dado:** `--` (vínculos da filial)

#### Toast de sucesso
- **Tag:** `iclass.generic.label.repository-added-successfully`
- **Componente:** `p-toast`
- **Regras:** sucesso, 4 s.

#### Toast de erro
- **Tag:** `iclass.generic.label.could-not-add-repository`
- **Componente:** `p-toast`
- **Regras:** erro, 6 s; a tela continua aberta com as escolhas.

### Layout
A tela é um painel cinza (`.insumo-layer`, globais: fundo #F1F2F4, borda #E5E7EB, cantos de
10px, 16px de respiro), em coluna, com 12px entre os blocos:

1. **Cabeçalho:** título à esquerda; "Cancelar" e "Salvar" à direita, com 8px entre eles.
2. **Escolha do almoxarifado** (`app-branch-stock-partition-picker`), bloco azul-claro.
3. **Escolha do repositório** (`app-branch-repository-picker`), bloco azul-claro.
4. **Aviso de par já vinculado** (quando houver).

### Estados
| Estado             | Quando                                         | O que deve ser exibido                                                       |
| ------------------ | ---------------------------------------------- | ---------------------------------------------------------------------------- |
| Sem escolha        | Ao abrir a tela                                | Lista de almoxarifados; escolha de repositório fechada; "Salvar" desabilitado |
| Só almoxarifado    | Almoxarifado escolhido, repositório não        | Almoxarifado recolhido; escolha de repositório aberta, com a lista; "Salvar" desabilitado |
| Pronto para salvar | Os dois escolhidos, par novo                   | Os dois blocos recolhidos e "Salvar" habilitado                              |
| Par já vinculado   | Os dois escolhidos, par que a filial já tem    | Aviso de par já vinculado e "Salvar" desabilitado                             |
| Salvando           | Depois de "Salvar"                             | "Salvar" com carregando; "Cancelar" desabilitado                             |
| Erro ao salvar     | A gravação falhou                              | Toast de erro; a tela continua aberta com as escolhas                        |

### Comportamentos
- **Dado** a tela aberta, **quando** o usuário fecha e reabre pelo "Adicionar" da aba, **então**
  a tela volta sem escolhas, com Equipe no tipo e sem filtros.

### CSS
| Classe | Definição |
|---|---|
| :host | display: block; |
| .add-panel__header | display: flex;<br>align-items: center;<br>gap: 12px; |
| .add-panel__title | margin: 0;<br>color: #1F2937; |
| .add-panel__actions | display: flex;<br>gap: 8px;<br>margin-left: auto; |
