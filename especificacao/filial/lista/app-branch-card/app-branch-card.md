---
componente: app-branch-card
papel: card
status: definido
---
Representa uma filial na lista de filiais.

## Entrada e saída
| Direção | Nome | Conteúdo |
|---|---|---|
| entrada | branch | Filial exibida (código e descrição) |
| entrada | loading | Quando verdadeiro, o card inteiro vira skeleton |
| saída | open | Usuário pediu para abrir a filial; leva a filial |

## Composição
Folha. Externos: `p-button`.

## Layout
Card `.reg-card` em grid de três colunas, alinhado ao centro na vertical. Larguras fixas definidas na classe própria `.branch-card`.

| Região ou coluna | Largura |
|---|---|
| Código | 290px (acima de 700px); metade do espaço livre (até 700px) |
| Descrição | restante (`minmax(0, 1fr)`) |
| Ação Abrir | largura do botão (`auto`) |

## Elementos

### Ações

#### Abrir filial

- **Tag:** sem tag visível
- **Componente:** `p-button` (text)
- **Ícone:** `pi pi-external-link`
- **Aparência:** `btn--md btn--text icon-neutral`
- **Resultado:** emite `open`

### Campos de exibição

#### Código

- **Tag:** `[[iclass.generic.label.code]]`
- **Dado:** `{{ DTO:filial.codigo }}`
- **Formato:** texto, uma linha, reticências se não couber, tooltip nativo com o valor inteiro
- **Vazio:** — (obrigatório no cadastro)
- **Classe da tag / valor:** `.kv-k` / `.kv-v`

#### Descrição

- **Tag:** `[[iclass.generic.label.description]]`
- **Dado:** `{{ DTO:filial.descricao }}`
- **Formato:** texto, uma linha, reticências se não couber, tooltip nativo com o valor inteiro
- **Vazio:** — (obrigatório no cadastro)
- **Classe da tag / valor:** `.kv-k` / `.kv-v`


## Estados
| Estado | Quando | O que aparece |
|---|---|---|
| Carregando | `loading` verdadeiro ou sem filial | Um bloco de skeleton de 60px de altura, cantos de 10px, oculto para leitor de tela |
| Padrão | Filial recebida | Código, Descrição e ação Abrir |
| Hover/foco | Ponteiro ou foco sobre o botão Abrir | Só o botão muda (fundo cinza-claro, ícone mais escuro); o card não tem hover próprio |

## Comportamentos
Dado um card exibido, quando o usuário clica no botão Abrir, então o card emite `open` com a filial. Só o botão é clicável; o restante do card não reage ao clique.

## Estilo
| Classe | Onde |
|---|---|
| `.reg-card` (global) | container do card |
| `.branch-card` (própria) | colunas, altura mínima e respiro interno |
| `.kv`, `.kv-k`, `.kv-v` (globais) | cada par tag/valor |
| `.skeleton` (global) + `.card-skeleton` (própria) | estado carregando |

| Onde | Valor |
|---|---|
| `.branch-card` altura mínima | 60px |
| `.branch-card` respiro | 8px 12px 8px 22px |
| `.card-skeleton` | altura 60px, raio 10px |
| `.reg-card` | fundo #fff, borda #E9EBF2, raio 10px, sombra 0 2px 6px rgba(16,24,40,.13), espaço entre colunas 16px |
| `.kv-k` | Geist 13px/20px, peso 400, cor #9CA3AF |
| `.kv-v` | Geist 13px/20px, peso 400, cor #212121 |
