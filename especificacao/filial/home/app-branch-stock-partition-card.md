# app-branch-stock-partition-card

### Aplicação
Card que representa um almoxarifado. Na aba Almoxarifado, mostra o almoxarifado vinculado com as
ações de desvincular e abrir; na seção de vinculação, ganha uma caixa de seleção para o usuário
marcar os que vai vincular; na escolha de almoxarifado ao adicionar repositório
(`app-branch-stock-partition-picker`), ganha "Selecionar"; o almoxarifado já escolhido aparece só com "Abrir".

### Componentização
| Componente   | Tipo    | Onde é usado                                      |
| ------------ | ------- | ------------------------------------------------- |
| `p-checkbox` | Externo | Caixa de seleção (só na seção de vinculação)      |
| `p-button`   | Externo | Desvincular almoxarifado, Selecionar e Abrir almoxarifado |

### Elementos

#### Caixa de seleção
- **Componente:** `p-checkbox` (binário)
- **Comportamento:** ao clicar, avisa o contêiner do novo valor; quem decide se fica marcado é o contêiner, e o card só reflete a seleção. Clicar no restante do card não marca.
- **Regras:** só aparece na seção de vinculação.

#### Código
- **Tag:** `portal.generic.label.code`
- **CSS:** `.kv`, `.kv-k`, `.kv-v` (globais); uma linha, cortado com reticências.
- **Comportamento:** ao passar o mouse sobre o valor, o tooltip nativo mostra o código inteiro.
- **Origem do dado:** `--`

#### Descrição
- **Tag:** `portal.generic.label.decription`
- **CSS:** `.kv`, `.kv-k`, `.kv-v` (globais); uma linha, cortada com reticências.
- **Comportamento:** ao passar o mouse sobre o valor, o tooltip nativo mostra a descrição inteira.
- **Origem do dado:** `--`

#### Botão "Desvincular almoxarifado"
- **Componente:** `p-button` (text)
- **Ícone:** `pi pi-link-slash` (corrente cortada, desenhada no CSS global)
- **CSS:** `btn--md btn--danger btn--text` (globais); ícone vermelho.
- **Comportamento:** ao clicar, pede o desvínculo do almoxarifado (a verificação de insumos e a confirmação estão em `app-branch-stock-partitions.md`).
- **Regras:** só aparece na aba Almoxarifado (não na seção de vinculação).

#### Botão "Abrir almoxarifado"
- **Componente:** `p-button` (text)
- **Ícone:** `pi pi-window-maximize`
- **CSS:** `btn--md btn--text icon-neutral` (globais)
- **Comportamento:** ao clicar, pede a abertura da home do almoxarifado (ver Fluxo no `README.md`).

#### Botão "Selecionar"
- **Tag:** `iclass.generic.button.select`
- **Componente:** `p-button`
- **CSS:** `btn--md btn--primary` (globais) + `card-actions__pick` (globais), 8px antes de "Abrir".
- **Comportamento:** ao clicar, escolhe o almoxarifado (resultado em `app-branch-stock-partition-picker.md`).
- **Regras:** só nos cards da lista de escolha.

### Layout
O card é uma linha única (`.reg-card`, globais), alinhada ao centro na vertical:

1. **Caixa de seleção (só na seção de vinculação):** largura da caixa.
2. **Código:** 255px; 240px com caixa de seleção; até 700px, metade do espaço livre.
3. **Descrição:** espaço restante.
4. **Ações (`.card-actions`, globais):** "Desvincular almoxarifado" (se houver), "Selecionar" (se houver) e "Abrir almoxarifado", à direita, com 2px entre os ícones e 8px entre "Selecionar" e "Abrir".

### Estados
| Estado                   | Quando                                   | O que deve ser exibido                                                  |
| ------------------------ | ---------------------------------------- | ----------------------------------------------------------------------- |
| Carregando               | A lista do contêiner está carregando     | Bloco de skeleton de 52px, cantos de 10px, oculto para leitor de tela   |
| Padrão                   | Almoxarifado vinculado, na aba           | Código, Descrição, "Desvincular almoxarifado" e "Abrir almoxarifado"    |
| Hover/foco               | Ponteiro ou foco sobre um botão ou a caixa | Só o controle muda; o card não tem hover próprio                      |
| Selecionável, desmarcado | Na seção de vinculação, não marcado      | Caixa vazia à esquerda; sem "Desvincular almoxarifado"                  |
| Selecionado              | Na seção de vinculação, marcado          | Caixa marcada e borda azul-clara (#93C5FD)                              |
| Escolha                  | Na lista de escolha de almoxarifado      | Código, Descrição, "Selecionar" e "Abrir almoxarifado"                  |
| Escolhido                | Almoxarifado já escolhido                | Código, Descrição e "Abrir almoxarifado"                                |

### Comportamentos
— (não se aplica)

### CSS
| Classe | Definição |
|---|---|
| :host | display: block; |
| .stock-partition-card | grid-template-columns: 255px minmax(0, 1fr) auto;<br>min-height: 52px;<br>padding: 6px 12px 6px 20px; |
| .stock-partition-card--selectable | grid-template-columns: auto 240px minmax(0, 1fr) auto;<br>padding-left: 16px; |
| .stock-partition-card--selected | border-color: #93C5FD; |
| .card-skeleton | height: 52px;<br>border-radius: 10px; |
| .stock-partition-card (até 700px) | grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto; |
| .stock-partition-card--selectable (até 700px) | grid-template-columns: auto minmax(0, 1fr) minmax(0, 1fr) auto; |
