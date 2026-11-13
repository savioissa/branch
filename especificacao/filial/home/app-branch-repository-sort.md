# app-branch-repository-sort

### Aplicação
Painel em que o usuário escolhe o campo (Tipo, Código / Login ou Nome / Técnico) e a direção da
ordenação dos repositórios na aba Repositório. Tem o mesmo conteúdo, layout, estados e CSS de
`../lista/app-branch-sort.md`; só os campos e o padrão mudam.

### Componentização
| Componente   | Tipo    | Onde é usado        |
| ------------ | ------- | ------------------- |
| `p-dropdown` | Externo | Campo "Ordenar por" |
| `p-button`   | Externo | Botão de direção    |

### Elementos

#### Campo "Ordenar por"
- **Tag:** placeholder `portal.generic.label.select`; opções `portal.generic.label.type` (Tipo), `iclass.generic.label.code-login` (Código / Login) e `iclass.generic.label.name-technician` (Nome / Técnico)
- **Componente:** `p-dropdown` com botão de limpar
- **Comportamento:** igual ao de `../lista/app-branch-sort.md`.
- **Regras:** padrão Nome / Técnico, crescente. Tipo ordena pelo nome do tipo (Armazém, Credenciada, Equipe), e não pelo valor interno.

Os demais elementos (painel, rótulo "Ordenar por", botão de direção) são os de
`../lista/app-branch-sort.md`.

### Layout
Igual ao de `../lista/app-branch-sort.md`.

### Estados
Iguais aos de `../lista/app-branch-sort.md`; como o padrão é Nome / Técnico, o painel abre no
estado "Aberto com campo".

### Comportamentos
— (não se aplica)

### CSS
— (usa o CSS de `../lista/app-branch-sort.md`)
