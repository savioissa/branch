# app-branch-form

### Aplicação
Contêiner da página de criação de filial. Mostra o cabeçalho com Cancelar e Salvar em volta dos
campos da filial nova, grava a filial e confirma a saída quando há dados preenchidos.

### Componentização
| Componente          | Tipo    | Onde é usado                                                  |
| ------------------- | ------- | ------------------------------------------------------------- |
| `app-branch-fields` | Interno | Campos Código e Descrição, sempre editáveis (`app-branch-fields.md`) |
| `p-button`          | Externo | Cancelar e Salvar                                             |
| `p-confirmDialog`   | Externo | Confirmação de saída                                          |
| `p-toast`           | Externo | Toasts de sucesso e erro (único, global, no canto superior direito) |

### Elementos

#### Título da página
- **Tag:** `iclass.generic.label.new-branch`
- **CSS:** `.t-title-lg .page-header__title` (globais); h1.

#### Botão "Cancelar"
- **Tag:** `portal.generic.button.cancel`
- **Componente:** `p-button`
- **CSS:** `btn--lg btn--neutral` (globais)
- **Comportamento:** ao clicar com os dois campos vazios, volta à lista; com algum campo preenchido (inclusive só com espaços), abre o modal de confirmação de saída.
- **Regras:** desabilitado enquanto salva.

#### Botão "Salvar"
- **Tag:** `portal.generic.button.save`
- **Componente:** `p-button` (envia o formulário; Enter num campo também envia)
- **CSS:** `btn--lg btn--primary` (globais)
- **Comportamento:** ao clicar, cria a filial com os valores sem os espaços das pontas.
- **Regras:** desabilitado enquanto o formulário for inválido; mostra carregando enquanto salva.

#### Modal de confirmação de saída
- **Tag:** mensagem `portal.generic.label.branch-leave-description`; sem título
- **Componente:** `p-confirmDialog`
- **CSS:** `leave-dialog` (globais); largura 420px, centralizado.

#### Botão "Continuar editando" (modal)
- **Tag:** `portal.generic.label.keep-editing`
- **Componente:** botão de rejeitar do `p-confirmDialog`, sem ícone
- **CSS:** `btn--md btn--neutral` (globais)
- **Comportamento:** ao clicar, fecha o modal e mantém os dados.
- **Regras:** recebe o foco quando o modal abre.

#### Botão "Sair" (modal)
- **Tag:** `iclass.generic.label.leave`
- **Componente:** botão de aceitar do `p-confirmDialog`, sem ícone
- **CSS:** `btn--md btn--danger` (globais)
- **Comportamento:** ao clicar, descarta os dados e volta à lista.

#### Toast de sucesso
- **Tag:** `iclass.generic.label.branch-created-successfully`
- **Componente:** `p-toast`
- **Regras:** sucesso, some em 4 s; continua visível depois da navegação.

#### Toast de erro
- **Tag:** `iclass.generic.label.could-not-create-branch`
- **Componente:** `p-toast`
- **Regras:** erro, some em 6 s; aparece quando a criação falha por outro motivo que não o código duplicado.

### Layout
A página é uma coluna com altura mínima da tela, dividida em duas seções:

1. **Cabeçalho (topo, fixo ao rolar, `.page-header`, globais):** título à esquerda; Cancelar e
   Salvar à direita (`.page-header__actions`, globais), com 10px entre eles.
2. **Conteúdo (`.page-content`, globais):** os campos de `app-branch-fields`, na largura toda.

### Estados
| Estado                           | Quando                                    | O que deve ser exibido                                                                 |
| -------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------- |
| Edição                           | Ao abrir a página                         | Campos vazios e editáveis; Salvar desabilitado                                         |
| Pronto para salvar               | Os dois campos válidos                    | Salvar habilitado                                                                      |
| Erro de validação                | Campo inválido depois de tocado           | Mensagem no campo (em `app-branch-fields`); Salvar desabilitado                        |
| Salvando                         | Depois de clicar em Salvar                | Salvar com carregando; Cancelar desabilitado                                           |
| Erro ao salvar: código duplicado | A criação recusa o código                 | Mensagem `iclass.generic.label.branch-code-already-exists` no Código; botões voltam ao normal |
| Erro ao salvar: outro erro       | A criação falha por outro motivo          | Toast de erro; o formulário continua preenchido                                        |
| Confirmação de saída             | "Cancelar" com algum campo preenchido     | Modal sem título com a mensagem, "Continuar editando" e "Sair"                         |

Leitura não se aplica: a criação é sempre edição.

### Comportamentos
- **Dado** o formulário salvando, **quando** a criação falha, **então** o usuário pode
  corrigir e salvar de novo sem perder o que preencheu.

### CSS
| Classe | Definição |
|---|---|
| :host | display: block; |
| .branch-form | display: flex;<br>flex-direction: column;<br>min-height: 100vh; |
