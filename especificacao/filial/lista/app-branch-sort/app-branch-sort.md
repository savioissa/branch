---
componente: app-branch-sort
papel: sort
status: definido
---
Painel em que o usuário escolhe o campo e a direção da ordenação.

Usado também na aba Almoxarifado da home (`../../home/app-branch-warehouses/app-branch-warehouses.md`), com o mesmo conteúdo; cada contêiner guarda a própria ordenação e define o padrão.

## Entrada e saída
| Direção | Nome | Conteúdo |
|---|---|---|
| entrada | sort | Ordenação atual: campo (ou nenhum) e direção |
| saída | sortChange | Ordenação completa, emitida a cada troca de campo ou de direção |

## Composição
Folha. Externos: `p-dropdown`, `p-button`.

## Layout
Painel `.sort-panel` em coluna: tag em cima; embaixo, campo e botão de direção lado a lado.

| Região ou coluna | Largura |
|---|---|
| Painel inteiro | até 360px |
| Campo | restante |
| Botão de direção | quadrado de 32px |

## Elementos

### Ações

#### Inverter direção

- **Tag:** sem tag visível
- **Componente:** `p-button`
- **Ícone:** crescente: `pi pi-sort-amount-up-alt`; decrescente: `pi pi-sort-amount-down`
- **Aparência:** `btn--md btn--neutral`
- **Estado:** desabilitado sem campo escolhido
- **Resultado:** alterna a direção e emite `sortChange`

### Campos de entrada

#### Ordenar por

- **Tag:** "Ordenar por"
- **Entrada:** `p-dropdown` com botão de limpar
- **Opções:** opções `[[iclass.generic.label.code]]`, `[[iclass.generic.label.description]]`
- **Obrigatório:** Não
- **Placeholder:** "Selecione"

### Ordenação

#### Código

- **Tag:** `[[iclass.generic.label.code]]`
- **Campo:** código do registro
- **Padrão:** Definido pelo contêiner: lista de filiais sem ordenação; aba Almoxarifado em Descrição crescente

#### Descrição

- **Tag:** `[[iclass.generic.label.description]]`
- **Campo:** descrição do registro
- **Padrão:** Idem

### Regras

A comparação ignora maiúsculas e acentos (ordem alfabética do português). A direção inicial é crescente. Limpar o campo volta à ordem em que os dados chegaram; a direção escolhida é mantida para a próxima escolha de campo.

## Estados
| Estado | Quando | O que aparece |
|---|---|---|
| Fechado | Botão Ordenar do contêiner desligado | Painel não aparece; a ordenação escolhida continua valendo |
| Aberto sem campo | Nenhum campo escolhido | Placeholder no campo; botão de direção desabilitado |
| Aberto com campo | Campo escolhido | Campo preenchido, botão de limpar e botão de direção habilitado |

## Comportamentos
Dado o painel aberto, quando o usuário escolhe ou limpa o campo, então o painel emite `sortChange`.

Dado um campo escolhido, quando o usuário clica no botão de direção, então a direção alterna entre crescente e decrescente, o ícone e o aria-label acompanham e o painel emite `sortChange`.

## Estilo
| Classe | Onde |
|---|---|
| `.sort-panel` (global) | container |
| `.sort-panel__label` (global) | tag, Geist 13px/20px, peso 500 |
| `.sort-panel__control`, `.sort-panel__field` (globais) | linha campo + botão |
| `.sort-panel__select` / `.sort-panel__select-panel` (globais) | dropdown e sua lista |

| Onde | Valor |
|---|---|
| `:host` | largura máxima 360px |
| `.sort-panel` | respiro 10px 12px, fundo #EBEDF0, borda #D9DCE1, raio 4px |
| `.sort-panel__label` | cor #4B5563 |
| dropdown | altura 32px, borda #D9DCE1, raio 4px, texto 13px #1F2937; hover e foco #3B82F6 |
