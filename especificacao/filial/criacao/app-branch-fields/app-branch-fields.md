---
componente: app-branch-fields
papel: fields
status: definido
---
Exibe os campos cadastrais da filial (Código e Descrição) com as suas validações.

Compartilhado: usado na criação (`../app-branch-form/app-branch-form.md`) e na aba Cadastro da home (`../../home/app-branch-detail/app-branch-detail.md`). Faz parte do papel `-register`, que na casca está dividido entre este componente e o contêiner de cada página.

## Entrada e saída
| Direção | Nome | Conteúdo |
|---|---|---|
| entrada | group | Formulário da filial (Código, Descrição). Habilitado = edição; desabilitado = leitura |
| entrada | loading | Quando verdadeiro, cada campo vira skeleton |
| saída | — | Nenhuma: os valores ficam no formulário recebido, e o contêiner lê |

## Composição
Folha. Externos: `input pInputText`.

## Layout
Grid de dois campos lado a lado, com espaço de 16px; cada campo é uma coluna com tag, entrada e mensagem de erro.

| Região ou coluna | Largura |
|---|---|
| Código | metade da largura (largura toda até 700px) |
| Descrição | metade da largura (largura toda até 700px, abaixo do Código) |

## Elementos

### Campos de entrada

#### Código

- **Tag:** `[[iclass.generic.label.code]]` + asterisco vermelho (oculto para leitor de tela; o campo informa obrigatório)
- **Entrada:** `input` texto, sem autocompletar
- **Validação:** não pode ficar vazio nem só com espaços; até 100 caracteres (não deixa digitar além); único entre filiais
- **Dado:** `{{ DTO:filial.codigo }}`
- **Obrigatório:** Sim

#### Descrição

- **Tag:** `[[iclass.generic.label.description]]` + asterisco vermelho
- **Entrada:** `input` texto, sem autocompletar
- **Validação:** não pode ficar vazia nem só com espaços; até 100 caracteres
- **Dado:** `{{ DTO:filial.descricao }}`
- **Obrigatório:** Sim

Os valores são gravados sem os espaços das pontas.

### Mensagens de erro

Abaixo do campo, ligadas a ele para leitor de tela.

- **Código** · vazio ou só espaços → "Informe o código"
- **Código** · já existe outra filial com o código (resposta do salvar) → "Já existe uma filial com este código"
- **Descrição** · vazia ou só espaços → "Informe a descrição"

A mensagem só aparece depois que o usuário saiu do campo ou digitou nele (ou depois de uma tentativa de salvar).

### Variações

#### Inválido

- **Quando:** campo com erro visível
- **Classe:** `.form-field__input--invalid` (borda vermelha, também no foco)

#### Leitura

- **Quando:** formulário desabilitado
- **Classe:** `:disabled` no `.form-field__input`: fundo cinza, texto apagado, sem sombra

## Estados
| Estado | Quando | O que aparece |
|---|---|---|
| Carregando | `loading` verdadeiro | Um bloco de skeleton de 66px por campo (tag + entrada), ocultos para leitor de tela |
| Leitura | formulário desabilitado (home fora de edição) | Valores em campos cinza, não editáveis |
| Edição | formulário habilitado (criação; home em edição) | Campos brancos e editáveis |
| Erro de validação | campo inválido depois de tocado | Borda vermelha e mensagem abaixo do campo |
| Salvando / Erro ao salvar | — | Donos: o contêiner de cada página (`app-branch-form`, `app-branch-detail`) |

## Comportamentos
Dado um campo editável, quando o usuário apaga o valor e sai do campo, então a mensagem de obrigatório aparece e a borda fica vermelha.

Dado um campo editável, quando o usuário tenta passar de 100 caracteres, então os caracteres excedentes não entram.

## Estilo
| Classe | Onde |
|---|---|
| `.form-grid` (própria) | grid dos dois campos |
| `.form-field`, `__label`, `__required`, `__input`, `__input--invalid`, `__error` (próprias) | partes de cada campo |
| `.t-label-field` (global) | tag, Geist 13px/20px, peso 500 |
| `.ui-input` (global) | entrada, Geist 14px/21px, peso 400 |
| `.field-skeleton` (própria) + `.skeleton` (global) | carregando |

| Onde | Valor |
|---|---|
| `.form-grid` | espaço 16px |
| `.form-field` | espaço 6px |
| `__label` | cor #1F2937 |
| `__required`, `__error`, borda inválida | #DC2626 (halo do foco #DC262655) |
| `__error` | Geist 11px/16px, peso 400 |
| `__input` | altura 40px, raio 6px, borda #CBD5E1, sombra 0 1px 2px rgba(16,24,40,.06); foco borda #3B82F6 |
| `__input:disabled` | fundo #EDEEF0, borda #D9DCE1, texto #9CA3AF, opacidade 1 |
| `.field-skeleton` | altura 66px, raio 6px |
