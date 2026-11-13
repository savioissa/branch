# Filial — lista

### Propósito
Lista as filiais cadastradas (rota `/filial`; a raiz do aplicativo redireciona para cá).
Permite ao usuário localizar uma filial por filtro e ordenação, abrir a home de uma filial e
iniciar a criação de uma nova.

### Componentização
| Componente          | Tipo    | Papel na página                                                |
| ------------------- | ------- | -------------------------------------------------------------- |
| `app-branch-list`   | Interno | Contêiner da página: cabeçalho, estados e paginação.           |
| `app-branch-filter` | Interno | Painel opcional. Restringe o resultado por Código e Descrição. |
| `app-branch-sort`   | Interno | Painel opcional. Escolhe o campo e a direção da ordenação.     |
| `app-branch-card`   | Interno | Representa uma filial. Repete-se para cada filial da página.   |
| `p-paginator`       | Externo | Paginação do resultado.                                        |
| `p-button`          | Externo | Botões de ação do cabeçalho.                                   |
| `p-toast`           | Externo | Toast global (ex.: sucesso da criação, que continua visível ao chegar à home). |

### Layout
A página é uma coluna com a largura toda, dividida em duas seções:

1. **Cabeçalho (topo, fixo ao rolar):** título e botões de ação de `app-branch-list`.
2. **Conteúdo:** `app-branch-filter` (se aberto), `app-branch-sort` (se aberto), os
   `app-branch-card` empilhados (ou o estado vazio, sem resultado ou erro ocupando o espaço
   restante) e o `p-paginator` alinhado à direita.

### Fluxo entre os componentes
- **Dado** o painel de filtro aberto, **quando** o usuário altera um operador ou valor em
  `app-branch-filter` (saída `filterChange`), **então** `app-branch-list` guarda o filtro sem
  aplicá-lo, e a lista não muda.
- **Dado** um filtro preenchido no painel, **quando** o usuário clica em "Atualizar" em
  `app-branch-list`, **então** a lista recarrega aplicando esse filtro, volta à página 1 e
  mostra o estado Com resultados ou Sem resultado.
- **Dado** o painel de ordenação aberto, **quando** o usuário escolhe ou limpa um campo, ou
  inverte a direção, em `app-branch-sort` (saída `sortChange`), **então** `app-branch-list`
  reordena o resultado na hora e volta à página 1.
- **Dado** a lista com resultados, **quando** o usuário clica em "Abrir filial" em
  `app-branch-card` (saída `open`), **então** `app-branch-list` navega para a home da filial
  (`/filial/:codigo`; ver `../home/README.md`).
- **Dado** qualquer estado, **quando** o usuário clica em "Novo" em `app-branch-list`,
  **então** a página de criação abre (`/filial/nova`; ver `../criacao/README.md`).

### Referências visuais
— (não se aplica)
