---
componente: app-warehouse-card
papel: card
status: definido
---
Representa um almoxarifado na aba Almoxarifado e na seção de vinculação.

Seletor fora do padrão `app-<objeto>-<papel>`.

## Entrada e saída
| Direção | Nome | Conteúdo |
|---|---|---|
| entrada | warehouse | Almoxarifado exibido (código e descrição) |
| entrada | loading | Quando verdadeiro, o card inteiro vira skeleton |
| entrada | selectable | Quando verdadeiro, o card mostra uma caixa de seleção à esquerda (seção de vinculação) |
| entrada | selected | Se a caixa de seleção está marcada |
| saída | open | Usuário pediu para abrir o almoxarifado; leva o almoxarifado |
| saída | selectedChange | Usuário marcou ou desmarcou a caixa; leva o novo valor (marcado ou não) |

## Composição
Folha. Externos: `p-checkbox`, `p-button`.

## Layout
Card `.reg-card` em grid alinhado ao centro na vertical. Larguras fixas nas classes próprias.

| Região ou coluna | Largura |
|---|---|
| Caixa de seleção (só `selectable`) | largura da caixa (`auto`) |
| Código | 255px; 240px com caixa de seleção; metade do espaço livre até 700px |
| Descrição | restante (`minmax(0, 1fr)`) |
| Ação Abrir | largura do botão (`auto`) |

## Elementos

### Ações

#### Selecionar

- **Tag:** sem tag visível
- **Componente:** `p-checkbox` (binário)
- **Aparência:** padrão do PrimeNG
- **Resultado:** emite `selectedChange`

#### Abrir almoxarifado

- **Tag:** sem tag visível
- **Componente:** `p-button` (text)
- **Ícone:** `pi pi-external-link`
- **Aparência:** `btn--md btn--text icon-neutral`
- **Resultado:** emite `open`; destino

### Campos de exibição

#### Código

- **Tag:** `[[portal.generic.label.code]]`
- **Dado:** `{{ DTO:almoxarifado.codigo }}`
- **Formato:** texto, uma linha, reticências, tooltip nativo com o valor inteiro
- **Vazio:** — (sempre preenchido)
- **Classe da tag / valor:** `.kv-k` / `.kv-v`

#### Descrição

- **Tag:** `[[portal.generic.label.decription]]`
- **Dado:** `{{ DTO:almoxarifado.descricao }}`
- **Formato:** texto, uma linha, reticências, tooltip nativo com o valor inteiro
- **Vazio:** — (sempre preenchido)
- **Classe da tag / valor:** `.kv-k` / `.kv-v`

### Variações

#### Selecionável

- **Quando:** `selectable` verdadeiro
- **Classe:** `.warehouse-card--selectable` (coluna da caixa à esquerda)

#### Selecionado

- **Quando:** `selectable` e `selected` verdadeiros
- **Classe:** `.warehouse-card--selected` (borda azul-clara)

## Estados
| Estado | Quando | O que aparece |
|---|---|---|
| Carregando | `loading` verdadeiro ou sem almoxarifado | Bloco de skeleton de 52px, cantos de 10px, oculto para leitor de tela |
| Padrão | Almoxarifado recebido, não selecionável | Código, Descrição e Abrir |
| Hover/foco | Ponteiro ou foco sobre Abrir ou a caixa | Só o controle muda; o card não tem hover próprio |
| Selecionável, desmarcado | `selectable` e não `selected` | Caixa vazia à esquerda |
| Selecionado | `selectable` e `selected` | Caixa marcada e borda azul-clara |

## Comportamentos
Dado um card selecionável, quando o usuário clica na caixa, então o card emite `selectedChange` com o novo valor; quem decide se fica marcado é o contêiner (o card só reflete `selected`). Clicar no restante do card não marca.

Dado um card exibido, quando o usuário clica em Abrir, então o card emite `open`.

## Estilo
| Classe | Onde |
|---|---|
| `.reg-card`, `.kv`, `.kv-k`, `.kv-v`, `.skeleton` (globais) | card, pares tag/valor e skeleton (ver `../../lista/app-branch-card/app-branch-card.md` para os valores dessas classes) |
| `.warehouse-card` (própria) | colunas, altura mínima, respiro |
| `.warehouse-card--selectable`, `.warehouse-card--selected` (próprias) | variações |
| `.card-skeleton` (própria) | skeleton |

| Onde | Valor |
|---|---|
| `.warehouse-card` | altura mínima 52px, respiro 6px 12px 6px 20px |
| `.warehouse-card--selectable` | respiro esquerdo 16px |
| `.warehouse-card--selected` | borda #93C5FD |
| `.card-skeleton` | altura 52px, raio 10px |
