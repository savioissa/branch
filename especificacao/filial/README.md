---
objeto: filial
status: rascunho
---
# Filial

| Campo | Valor |
|---|---|
| Status | rascunho |
| Responsável | Sávio Issa (autor dos PDFs de origem) |
| Última alteração | 11/11/2026 |
| Herda | `../_global/premissas.md` |
| Fonte | casca em `src/app/branch/` e `src/app/app.routes.ts` (sem controle de versão), PDFs "Especificação - Cadastro de Filial" e "Especificação - Home da Filial" (10/11/2026) e prints 1 a 9 |

## Glossário
| Termo | Significado |
|---|---|
| Filial | Unidade da empresa identificada por Código e Descrição; objeto desta especificação |
| Almoxarifado | Local de estoque (partição de stock) que pode ser vinculado a uma filial |
| Vincular | Associar um ou mais almoxarifados a uma filial |
| Almoxarifado vinculado | Almoxarifado já associado à filial, listado na aba Almoxarifado |
| Almoxarifado disponível | Almoxarifado ainda não vinculado à filial, listado na seção de vinculação |
| Código | Identificador da filial ou do almoxarifado; na filial, obrigatório e com até 100 caracteres |
| Descrição | Nome da filial ou do almoxarifado; na filial, obrigatória e com até 100 caracteres |
| Lista | Página `/filial`, com todas as filiais |
| Criação | Página `/filial/nova`, onde se cadastra uma filial nova |
| Home | Página `/filial/:codigo`, de uma filial específica |
| Lateral | Resumo da filial à esquerda da home |
| Aba Cadastro | Aba da home com os campos da filial, em leitura ou edição |
| Aba Almoxarifado | Aba da home com os almoxarifados vinculados |
| Seção de vinculação | Painel "Selecionar almoxarifado", aberto pelo Vincular da aba Almoxarifado |
| Leitura / Edição | Modos da aba Cadastro: campos bloqueados / editáveis |
| Filtro ativo | Filtro com ao menos um valor preenchido, aplicado no último Atualizar |

## Pastas
| Pasta | Propósito |
|---|---|
| `lista/` | Encontrar uma filial para acessá-la |
| `criacao/` | Cadastrar uma filial nova (nome da pasta) |
| `home/` | Consultar e manter uma filial específica |

## Componentes
| Pasta | Componente | Papel | Status |
|---|---|---|---|
| lista | app-branch-list | list | definido |
| lista | app-branch-filter | filter (compartilhado com home) | definido |
| lista | app-branch-sort | sort (compartilhado com home) | definido |
| lista | app-branch-card | card | definido |
| criacao | app-branch-form | form | definido |
| criacao | app-branch-fields | fields (compartilhado com home) | definido |
| home | app-branch-detail | detail | definido |
| home | app-branch-summary | summary | definido |
| home | app-branch-warehouses | warehouses | definido |
| home | app-warehouse-link | link | definido |
| home | app-warehouse-card | card | definido |
| — | home do almoxarifado (destino de Abrir) | — | referenciado |
| — | componente de vinculação de Tipo OS | — | referenciado |
