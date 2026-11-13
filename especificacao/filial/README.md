# Filial

### Entidade principal e secundárias
| Entidade     | Papel      | Tag                                    | Tradução EN                 |
| ------------ | ---------- | -------------------------------------- | --------------------------- |
| Filial       | Principal  | `branch`                               | Branch                      |
| Almoxarifado | Secundária | `iclass.generic.label.stock-partition` | Stock partition (revisar)   |
| Repositório  | Secundária | `iclass.generic.label.repository`      | Repository (revisar)        |
| Insumo       | Secundária | — (sem tag própria) | Supply (revisar) |

### Glossário
| Termo | Significado |
|---|---|
| Filial | Unidade da empresa, identificada por Código e Descrição (obrigatórios, até 100 caracteres, código único). É a entidade principal desta especificação. |
| Almoxarifado | Local de estoque, identificado por código e descrição, que pode ser vinculado a uma ou mais filiais. |
| Repositório | Quem guarda insumos dentro de uma filial. Tem tipo, código e nome. |
| Tipo de repositório | Equipe, Credenciada, Armazém, Oficina ou Cluster. Para Equipe, o código é o **Login** e o nome é o **Técnico**; para os demais, **Código** e **Nome**. |
| Insumo | Item de estoque que um repositório tem num almoxarifado. Ter insumos impede desvínculos (ver Desvínculo bloqueado). |
| Vínculo Filial × Repositório × Almoxarifado | Cada vínculo de repositório da filial é um par almoxarifado + repositório. O mesmo repositório pode ter vários pares, um por almoxarifado; todo almoxarifado de um par também está vinculado à filial. |
| Par | Um vínculo almoxarifado + repositório da filial; aparece como um card na aba Repositório. |
| Vincular | Associar almoxarifados a uma filial (aba Almoxarifado). |
| Adicionar repositório | Gravar na filial um par almoxarifado + repositório (aba Repositório). Um almoxarifado de fora da filial passa a ser vinculado à filial também. |
| Desvincular | Desfazer o vínculo de um almoxarifado com a filial ou um par. Desvincular um almoxarifado também desfaz todos os pares com ele. |
| Desvínculo bloqueado | Desvincular um almoxarifado da filial ou um par não é permitido enquanto algum repositório tiver insumos naquele almoxarifado (no par, o repositório do par); o usuário precisa movimentar todos os insumos antes. |
| Almoxarifado vinculado / disponível | Já vinculado à filial (listado na aba Almoxarifado) / ainda não vinculado (listado na seção de vinculação de almoxarifado). |
| Lista | Página `/filial`, com as filiais cadastradas, filtro, ordenação e paginação. |
| Criação | Página `/filial/nova`, de cadastro de uma nova filial. |
| Home | Página `/filial/:codigo`, de uma filial específica, com lateral e abas. |
| Lateral | Resumo da filial à esquerda da home. |
| Aba Cadastro | Aba da home com os campos da filial, em leitura ou edição. |
| Aba Almoxarifado | Aba da home com os almoxarifados vinculados. |
| Aba Repositório | Aba da home com os pares almoxarifado + repositório da filial. |
| Seção de vinculação | Painel azul-claro aberto pelo "Vincular" da aba Almoxarifado, para escolher os almoxarifados a vincular. |
| Tela de adicionar repositório | Painel cinza aberto pelo "Adicionar" da aba Repositório, com a escolha de um almoxarifado e, depois, a de um repositório (blocos azul-claros). O card do par só aparece na lista da aba, depois de salvar. |
| Selecionar / Alterar / Remover | Na tela de adicionar repositório, "Selecionar" escolhe um item e recolhe a lista; "Alterar" reabre a lista mantendo a escolha até outra ser feita; "Remover" desfaz a escolha. |
| Leitura / Edição | Modos da aba Cadastro: campos bloqueados / editáveis. |
| Filtro ativo | Filtro com ao menos um valor (ou tipo) preenchido, aplicado no último "Atualizar". |

### Pastas
| Pasta   | Componente                | Papel                                  | Status   |
| ------- | ------------------------- | -------------------------------------- | -------- |
| lista   | `app-branch-list`         | list                                   | definido |
| lista   | `app-branch-filter`       | filter (usado também na home)          | definido |
| lista   | `app-branch-sort`         | sort (usado também na home)            | definido |
| lista   | `app-branch-card`         | card                                   | definido |
| criacao | `app-branch-form`         | form                                   | definido |
| criacao | `app-branch-fields`       | fields (usado também na home)          | definido |
| home    | `app-branch-detail`       | detail                                 | definido |
| home    | `app-branch-register`     | register                               | definido |
| home    | `app-branch-sidebar`      | sidebar                                | definido |
| home    | `app-branch-stock-partitions`   | stock-partitions                          | definido |
| home    | `app-branch-stock-partition-link`      | link                                   | definido |
| home    | `app-branch-stock-partition-card`      | card                                   | definido |
| home    | `app-branch-repositories` | repositories                           | definido |
| home    | `app-branch-repository-add`      | add                                    | definido |
| home    | `app-branch-stock-partition-picker` | picker                              | definido |
| home    | `app-branch-repository-picker`   | picker                                 | definido |
| home    | `app-branch-repository-card`     | card                                   | definido |
| home    | `app-branch-repository-filter`   | filter                                 | definido |
| home    | `app-branch-repository-sort`     | sort                                   | definido |
| —       | home do almoxarifado (destino de "Abrir almoxarifado") | — | pendente |
| —       | home do repositório (destino de "Abrir repositório")   | — | pendente |

### Pendências
| P#  | Tipo            | Pendência | Onde | Impacto |
| --- | --------------- | --------- | ---- | ------- |
| P1  | Inconsistência  | A casca não usa tradução: todos os textos estão fixos no código. 53 tags foram propostas em `traducoes.md`, com EN e ESP a revisar. Sugestão: o time confirma as chaves e as traduções. | `traducoes.md` › Tags novas | As chaves citadas nos componentes podem mudar |
