---
componente: app-branch-form
papel: form
status: definido
---
Contêiner da página de criação: cabeçalho com Cancelar e Salvar em volta dos campos da filial nova.

## Entrada e saída
| Direção | Nome | Conteúdo |
|---|---|---|
| entrada | — | Nenhuma: o formulário começa vazio |
| saída | filial criada | Envia Código e Descrição para criação `{{ DTO:filial }}` |
| saída | navegação | `/filial` (cancelar) ou `/filial/:codigo` da filial criada (sucesso) |

## Composição
- `app-branch-fields` (`../app-branch-fields/app-branch-fields.md`), habilitado
- Externos: `p-button`, `p-confirmDialog` (PrimeNG 17); toast pelo `p-toast` global (`../../../_global/premissas.md`)

## Layout
Página em coluna com altura mínima da tela: cabeçalho `.page-header` (fixo ao rolar) e conteúdo `.page-content` com os campos.

| Região ou coluna | Largura |
|---|---|
| Cabeçalho: título | à esquerda |
| Cabeçalho: Cancelar e Salvar | à direita, espaço de 10px |
| Conteúdo: campos | largura toda (layout em `app-branch-fields`) |
| Modal de confirmação | 420px, centralizado |

## Elementos

### Ações

#### Cancelar

- **Tag:** `[[portal.generic.button.cancel]]`
- **Componente:** `p-button`
- **Aparência:** `btn--lg btn--neutral`
- **Estado:** desabilitado enquanto salva
- **Resultado:** volta à lista ou abre o modal (ver Comportamentos)

#### Salvar

- **Tag:** `[[portal.generic.button.save]]`
- **Componente:** `p-button` (envia o formulário)
- **Aparência:** `btn--lg btn--primary`
- **Estado:** desabilitado enquanto o formulário for inválido; carregando enquanto salva
- **Resultado:** cria a filial

#### Continuar editando (modal)

- **Tag:** `[[portal.generic.label.keep-editing]]` ou `[[portal.generic.label.no-keep-editing]]`
- **Componente:** botão de rejeitar do `p-confirmDialog`
- **Ícone:** sem ícone
- **Aparência:** `btn--md btn--neutral`
- **Estado:** recebe o foco ao abrir
- **Resultado:** fecha o modal e mantém os dados

#### Sair (modal)

- **Tag:** `[[iclass.generic.label.leave]]` ou `[[iclass.generic.label.exit]]`
- **Componente:** botão de aceitar do `p-confirmDialog`
- **Ícone:** sem ícone
- **Aparência:** `btn--md btn--danger`
- **Resultado:** descarta e vai para `/filial`

### Campos de exibição

#### Título da página

- **Tag:** `[[iclass.generic.label.new-branch]]`
- **Formato:** texto fixo, h1
- **Classe da tag / valor:** — / `.t-title-lg .page-header__title`

#### Mensagem do modal

- **Tag:** `[[portal.generic.label.branch-leave-description]]`
- **Formato:** texto, sem título no modal
- **Classe da tag / valor:** conteúdo do `p-confirmDialog`

#### Toast de sucesso

- **Tag:** `[[iclass.generic.label.branch-created-successfully]]`
- **Formato:** toast de sucesso, 4 s
- **Classe da tag / valor:** `p-toast` global

#### Toast de erro

- **Tag:** `[[iclass.generic.label.could-not-create-branch]]`
- **Formato:** toast de erro, 6 s
- **Classe da tag / valor:** `p-toast` global

## Estados
| Estado | Quando | O que aparece |
|---|---|---|
| Edição (inicial) | Ao abrir a página | Campos vazios e editáveis; Salvar desabilitado |
| Pronto para salvar | Os dois campos válidos | Salvar habilitado |
| Erro de validação | Campo inválido depois de tocado | Mensagem no campo (dono: `app-branch-fields`); Salvar desabilitado |
| Salvando | Depois de clicar em Salvar | Salvar mostra carregando; Cancelar desabilitado |
| Erro ao salvar: código duplicado | A criação recusa o código | Erro "Já existe uma filial com este código" no campo Código; botões voltam ao normal |
| Erro ao salvar: outro erro | A criação falha por outro motivo | Toast de erro; o formulário continua preenchido |
| Confirmação de saída | Cancelar com algum campo preenchido | Modal sem título com a mensagem e os botões Continuar editando e Sair |
| Leitura | — | — (não se aplica: a criação é sempre edição) |

## Comportamentos
Dado os dois campos vazios, quando o usuário clica em Cancelar, então a página vai direto para `/filial`.

Dado algum campo com conteúdo (inclusive só espaços), quando o usuário clica em Cancelar, então o modal de confirmação abre com o foco em Continuar editando. Sair vai para `/filial`; Continuar editando fecha o modal sem perder nada.

Dado o formulário válido, quando o usuário clica em Salvar (ou pressiona Enter num campo), então a filial é criada com os valores sem espaços nas pontas; com sucesso, o toast de sucesso aparece e a página vai para a home da filial criada, substituindo a criação no histórico (o Voltar do navegador não reabre o formulário).

Dado o formulário salvando, quando a criação falha, então aparece o erro de código duplicado no campo Código ou o toast de erro, e o usuário pode corrigir e salvar de novo.

## Estilo
| Classe | Onde |
|---|---|
| `.branch-form` (própria) | o formulário inteiro, em coluna com altura mínima da tela |
| `.page-header`, `.page-content` (globais) | cabeçalho e conteúdo (ver `../../../_global/premissas.md`) |
| `.leave-dialog` (global, em `styles.scss`) | modal: esconde o cabeçalho do diálogo e dá 24px de respiro no topo do conteúdo |

| Onde | Valor |
|---|---|
| `.branch-form` | altura mínima 100vh |
| modal | largura 420px |
| `.leave-dialog .p-dialog-content` | respiro superior 24px, cantos superiores 6px |
