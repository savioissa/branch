---
componente: app-branch-detail
papel: detail
status: definido
---
Contêiner da home: carrega a filial, organiza lateral e abas e conduz a edição da aba Cadastro.

Concentra duas responsabilidades (contêiner da página e edição do cadastro).

## Entrada e saída
| Direção | Nome | Conteúdo |
|---|---|---|
| entrada | código da rota | `:codigo` de `/filial/:codigo` |
| entrada | aba da rota | `?aba=almoxarifado` abre a aba Almoxarifado; qualquer outro valor ou ausência abre Cadastro |
| entrada | filial | `{{ DTO:filial }}` obtida pelo código |
| saída | filial alterada | Envia Código e Descrição alterados `{{ DTO:filial }}` |
| saída | navegação | `/filial` (Voltar para a lista) ou `/filial/:novoCodigo` (código alterado) |

## Composição
- `app-branch-summary` (`../app-branch-summary/app-branch-summary.md`)
- `p-tabView` (externo) com dois `p-tabPanel`:
  - Cadastro: barra de ações + alerta de erro + `app-branch-fields` (`../../criacao/app-branch-fields/app-branch-fields.md`)
  - Almoxarifado: `app-branch-warehouses` (`../app-branch-warehouses/app-branch-warehouses.md`)
- Externos: `p-button`

## Layout
Grid de 10 colunas com espaço de 16px e respiro de 16px em volta, altura mínima da tela.

| Região ou coluna | Largura |
|---|---|
| Lateral (`app-branch-summary`) | 2 colunas; largura toda até 900px (em cima) |
| Abas (`.branch-main`) | 8 colunas; largura toda até 900px (embaixo) |
| Estados Não encontrada e Erro | 10 colunas, centralizados na altura |
| Barra de ações da aba Cadastro | à direita, espaço de 8px |

## Elementos

### Ações

#### Aba Cadastro

- **Tag:** `[[portal.generic.label.register]]`
- **Componente:** `p-tabPanel`
- **Aparência:** `req-tabs`
- **Resultado:** mostra o cadastro

#### Aba Almoxarifado

- **Tag:** `[[iclass.generic.label.stock-partition]]`
- **Componente:** `p-tabPanel`
- **Aparência:** `req-tabs`
- **Resultado:** mostra os almoxarifados; carrega na primeira abertura e mantém o conteúdo ao trocar de aba

#### Editar

- **Tag:** "Editar"
- **Componente:** `p-button`
- **Ícone:** `pi pi-pencil`
- **Aparência:** `btn--md btn--primary`
- **Estado:** desabilitado enquanto carrega
- **Resultado:** entra em edição

#### Cancelar

- **Tag:** `[[portal.generic.button.cancel]]`
- **Componente:** `p-button`
- **Aparência:** `btn--md btn--neutral`
- **Estado:** desabilitado enquanto salva
- **Resultado:** desfaz e volta à leitura, sem confirmação

#### Salvar

- **Tag:** `[[portal.generic.button.save]]`
- **Componente:** `p-button` (envia o formulário)
- **Aparência:** `btn--md btn--primary`
- **Estado:** habilitado só com alteração e formulário válido; carregando enquanto salva
- **Resultado:** grava a alteração

#### Voltar para a lista

- **Tag:** "Voltar para a lista"
- **Componente:** `p-button`
- **Aparência:** `btn--md btn--secondary`
- **Resultado:** vai para `/filial` (só nos estados Não encontrada e Erro)

### Campos de exibição

#### Alerta de erro ao salvar

- **Formato:** ícone `pi-exclamation-circle` + "Não foi possível salvar a filial. Tente novamente.", com papel de alerta para leitor de tela
- **Vazio:** não aparece
- **Classe da tag / valor:** — / `.form-alert`

### Campos de entrada

Código e Descrição, especificados em `app-branch-fields`. Código pode ser alterado.

## Estados
| Estado | Quando | O que aparece |
|---|---|---|
| Carregando | Ao abrir a página ou trocar o código na URL | Lateral e campos em skeleton, abas visíveis, Editar desabilitado; área das abas marcada como ocupada (aria-busy) |
| Leitura | Filial carregada, fora de edição | Campos desabilitados (cinza) e botão Editar |
| Edição | Depois de Editar | Campos editáveis, Cancelar e Salvar no lugar de Editar |
| Salvando | Depois de Salvar | Salvar carregando, Cancelar desabilitado |
| Erro de validação | Campo inválido em edição | Mensagem no campo (dono: `app-branch-fields`); Salvar desabilitado |
| Erro ao salvar: código duplicado | A alteração recusa o código | Erro "Já existe uma filial com este código" no Código; continua em edição |
| Erro ao salvar: outro erro | A alteração falha | Alerta de erro acima dos campos; continua em edição |
| Não encontrada | Não existe filial com o código | Página inteira: ícone `pi-search`, "Filial não encontrada" e Voltar para a lista |
| Erro de carga | A busca da filial falhou | Página inteira: ícone `pi-exclamation-circle` vermelho, "Não foi possível carregar a filial" e Voltar para a lista |

## Comportamentos
Dado a aba Cadastro em leitura, quando o usuário clica em Editar, então os campos ficam editáveis e o alerta de erro, se houver, some.

Dado a edição com alterações, quando o usuário clica em Cancelar, então os campos voltam aos valores gravados, em leitura, sem pedir confirmação.

Dado a edição com alteração válida, quando o usuário clica em Salvar (ou pressiona Enter num campo), então a filial é gravada com os valores sem espaços nas pontas e volta à leitura; não aparece toast. Se o código mudou, a URL passa a `/filial/:novoCodigo`, substituindo a anterior no histórico, sem recarregar a página.

Dado a edição em andamento, quando o usuário troca de aba, então a edição continua aberta ao voltar para Cadastro.

Dado a página aberta, quando o usuário troca de aba, então a URL não muda.

## Estilo
| Classe | Onde |
|---|---|
| `:host` (próprio) | grid da página |
| `.branch-main` (própria) | região das abas |
| `.state-fill` (própria + global) | estados Não encontrada e Erro ocupando a linha toda |
| `.tab-body`, `.tab-toolbar` (próprias) | conteúdo e barra de ações da aba Cadastro |
| `.req-tabs` (global) | abas: navegação transparente, título 14px peso 600, respiro 10px 16px, painel sem fundo com 16px no topo |
| `.branch-tabs` | aplicada nas abas, sem definição |
| `.form-alert` (global) | alerta de erro |
| `.req-empty`, `.load-state--error` (globais) | estados Não encontrada e Erro |

| Onde | Valor |
|---|---|
| `:host` | 10 colunas, espaço 16px, respiro 16px |
| `.tab-body` | espaço 4px |
| `.tab-toolbar` | espaço 8px |
| `.form-alert` | respiro 10px 12px, borda #FECACA, raio 6px, fundo #FEF2F2, texto #B91C1C, Geist 13px/20px, peso 400 |
| quebra de layout | 900px |
