# Filial — criação

### Propósito
Página de cadastro de uma nova filial (rota `/filial/nova`). Permite ao usuário informar Código
e Descrição, salvar a filial e seguir para a home dela, ou desistir e voltar à lista.

### Componentização
| Componente          | Tipo    | Papel na página                                                        |
| ------------------- | ------- | ---------------------------------------------------------------------- |
| `app-branch-form`   | Interno | Contêiner da página: cabeçalho, salvar, cancelar e confirmação de saída. |
| `app-branch-fields` | Interno | Campos Código e Descrição, com validação.                              |
| `p-confirmDialog`   | Externo | Confirmação de saída com dados preenchidos.                            |
| `p-button`          | Externo | Cancelar e Salvar.                                                     |
| `p-toast`           | Externo | Toasts de sucesso e erro (global).                                     |

### Layout
A página é uma coluna com a largura toda, dividida em duas seções:

1. **Cabeçalho (topo, fixo ao rolar):** título à esquerda; Cancelar e Salvar à direita
   (`app-branch-form`).
2. **Conteúdo:** `app-branch-fields`, com Código e Descrição lado a lado (um abaixo do outro
   até 700px).

### Fluxo entre os componentes
- **Dado** o formulário aberto, **quando** o usuário preenche os campos em
  `app-branch-fields`, **então** `app-branch-form` habilita "Salvar" assim que os dois ficam
  válidos.
- **Dado** o formulário válido, **quando** o usuário salva em `app-branch-form` e o código já
  existe, **então** `app-branch-fields` mostra a mensagem de código duplicado no Código.
- **Dado** a criação concluída, **quando** `app-branch-form` recebe o sucesso, **então** o
  toast de sucesso aparece e a home da filial criada abre (`/filial/:codigo`; ver
  `../home/README.md`), substituindo a criação no histórico (o Voltar do navegador não reabre o
  formulário).
- **Dado** o modal de saída aberto, **quando** o usuário clica em "Sair", **então** a lista de
  filiais abre (`/filial`; ver `../lista/README.md`).

### Referências visuais
— (não se aplica)
