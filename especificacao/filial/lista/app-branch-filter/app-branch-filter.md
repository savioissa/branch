---
componente: app-branch-filter
papel: filter
status: definido
---
Painel em que o usuário restringe o resultado por Código e Descrição.

Usado também na aba Almoxarifado e na seção de vinculação da home (`../../home/app-branch-warehouses/app-branch-warehouses.md`, `../../home/app-warehouse-link/app-warehouse-link.md`), com o mesmo conteúdo; cada contêiner guarda o próprio filtro.

## Entrada e saída
| Direção | Nome | Conteúdo |
|---|---|---|
| entrada | filter | Filtro atual: operador e valor de Código e de Descrição |
| saída | filterChange | Filtro completo, emitido a cada alteração de operador ou valor; o contêiner só o aplica quando o usuário clica em Atualizar |

## Composição
Folha. Externos: `p-dropdown`, `input pInputText`.

## Layout
Painel `.filter-panel` em grid. Cada campo é uma coluna com tag em cima e, embaixo, operador e valor lado a lado.

| Região ou coluna | Largura |
|---|---|
| Campo Código | metade da largura (uma coluna inteira até 700px) |
| Campo Descrição | metade da largura (uma coluna inteira até 700px) |
| Operador (dentro do campo) | 104px |
| Valor (dentro do campo) | restante |

## Elementos

### Campos de entrada

#### Código

- **Tag:** `[[iclass.generic.label.code]]`
- **Entrada:** `p-dropdown` (operador) + `input` texto (valor)
- **Operadores:** Igual, Diferente, Contém, Começa com, Termina com; padrão **Igual**
- **Dado:** Código do registro listado
- **Obrigatório:** Não
- **Placeholder:** operador: "Operador"; valor: —

#### Descrição

- **Tag:** `[[iclass.generic.label.description]]`
- **Entrada:** `p-dropdown` (operador) + `input` texto (valor)
- **Operadores:** mesmas opções; padrão **vazio**, e vazio funciona como Contém
- **Dado:** Descrição do registro listado
- **Obrigatório:** Não
- **Placeholder:** operador: "Operador"; valor: —

## Estados
| Estado | Quando | O que aparece |
|---|---|---|
| Fechado | Botão Filtrar do contêiner desligado | Painel não aparece; o filtro preenchido é mantido |
| Aberto | Botão Filtrar do contêiner ligado | Painel com os dois campos |
| Com filtro ativo | O último Atualizar aplicou algum valor preenchido | Com o painel aberto, os valores ficam visíveis; com o painel fechado, nada indica o filtro |

## Comportamentos
Dado o painel aberto, quando o usuário digita um valor ou troca um operador, então o painel emite `filterChange` com o filtro completo. A lista não muda: o filtro só é aplicado quando o usuário clica em Atualizar.

Dado um operador escolhido, quando o usuário abre o dropdown, então a lista de operadores abre anexada ao corpo da página (não é cortada pelo painel).

## Estilo
| Classe | Onde |
|---|---|
| `.filter-panel` (global) | container |
| `.filter-panel--cols-2` (própria) | duas colunas iguais; uma coluna até 700px |
| `.filter-panel__field` (global) | cada campo |
| `.filter-panel__label` (global) | tag: Geist 11px/16px, peso 500, maiúsculas, espaçamento .03em |
| `.filter-panel__control` (global) | linha operador + valor |
| `.filter-panel__operator` / `.filter-panel__operator-panel` (globais) | dropdown de operador e sua lista |
| `.filter-panel__input` (global) | campo de valor |

| Onde | Valor |
|---|---|
| `.filter-panel` | respiro 10px 12px, fundo #EBEDF0, borda #D9DCE1, raio 4px, espaço 16px |
| `.filter-panel__label` | cor #6B7280 |
| operador e valor | altura 32px, borda #D9DCE1, raio 4px, texto 13px #1F2937; hover e foco borda #3B82F6, foco com halo #EFF6FF |
| item destacado na lista de operadores | fundo #E9F2FF, texto #1d4ed8 |
