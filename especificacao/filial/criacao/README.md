---
pasta: criacao
objeto: filial
---
# Filial — criacao

Nome da pasta adotado sem confirmação.

## Propósito
Cadastrar uma filial nova.

## Composição
- app-branch-form — contêiner da página: cabeçalho, salvar, cancelar e confirmação de saída
  - app-branch-fields — campos Código e Descrição com validação
  - p-confirmDialog (externo)
  - p-button (externo)
  - p-toast (externo, global)

## Layout da página
Rota `/filial/nova`. Uma coluna com a largura toda:

1. Cabeçalho fixo ao rolar: título `[[iclass.generic.label.new-branch]]` à esquerda; Cancelar e Salvar à direita.
2. Campos Código e Descrição lado a lado (um abaixo do outro até 700px).

## Fluxos entre componentes
Dado o formulário aberto, quando o usuário preenche os campos em `app-branch-fields`, então `app-branch-form` habilita o Salvar assim que os dois ficam válidos.

Dado o formulário válido, quando o usuário salva em `app-branch-form` e o código já existe, então `app-branch-fields` mostra "Já existe uma filial com este código" no Código.

Dado a criação concluída, quando `app-branch-form` recebe o sucesso, então o toast global aparece e a home da filial criada abre (`../home/README.md`).

## Referências visuais
| Arquivo | Mostra |
|---|---|
| print 5 (fornecido pelo usuário, não copiado) | Nova Filial com campos vazios e Salvar desabilitado |
| PDF 1 "Especificação - Cadastro de Filial" | Regras de cabeçalho, modal, toasts, limites e tags |
