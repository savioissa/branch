# Filial — home

### Propósito
Página de uma filial específica (rota `/filial/:codigo`). Permite ao usuário consultar e editar o
cadastro da filial, manter os almoxarifados vinculados a ela e manter os vínculos de
repositório, cada um um par almoxarifado + repositório (vínculo Filial × Repositório ×
Almoxarifado).

### Componentização
| Componente                          | Tipo    | Papel na página                                                                         |
| ----------------------------------- | ------- | --------------------------------------------------------------------------------------- |
| `app-branch-detail`                 | Interno | Contêiner da página: carga da filial e abas.                                            |
| `app-branch-register`               | Interno | Aba Cadastro: leitura e edição dos dados da filial.                                     |
| `app-branch-sidebar`                | Interno | Lateral com a identificação da filial.                                                  |
| `app-branch-fields`                 | Interno | Campos Código e Descrição de `app-branch-register` (`../criacao/app-branch-fields.md`). |
| `app-branch-stock-partitions`       | Interno | Aba Almoxarifado: almoxarifados vinculados, vincular e desvincular.                     |
| `app-branch-stock-partition-link`   | Interno | Seção de vinculação de almoxarifado, aberta pelo "Vincular" da aba Almoxarifado.        |
| `app-branch-stock-partition-card`   | Interno | Representa um almoxarifado na aba, na seção de vinculação e na escolha de almoxarifado. |
| `app-branch-repositories`           | Interno | Aba Repositório: pares almoxarifado + repositório, adicionar e desvincular.             |
| `app-branch-repository-add`         | Interno | Tela cinza de adicionar repositório, aberta pelo "Adicionar" da aba Repositório.        |
| `app-branch-stock-partition-picker` | Interno | Escolha de um almoxarifado na tela de adicionar repositório.                            |
| `app-branch-repository-picker`      | Interno | Escolha de um repositório, por tipo, na tela de adicionar repositório (aberta depois do almoxarifado). |
| `app-branch-repository-card`        | Interno | Representa um repositório: par da aba e item da escolha de repositório.                 |
| `app-branch-repository-filter`      | Interno | Painel opcional de filtro de repositórios (aba e escolha de repositório).               |
| `app-branch-repository-sort`        | Interno | Painel opcional de ordenação de repositórios (aba).                                     |
| `app-branch-filter`                 | Interno | Painel opcional de filtro de almoxarifados (aba, seção de vinculação e escolha de almoxarifado; `../lista/app-branch-filter.md`). |
| `app-branch-sort`                   | Interno | Painel opcional de ordenação de almoxarifados (aba; `../lista/app-branch-sort.md`).     |
| `p-tabView`                         | Externo | Abas Cadastro, Almoxarifado e Repositório.                                              |
| `p-confirmDialog`                   | Externo | Confirmação de desvínculo e aviso de desvínculo bloqueado, um por aba.                  |
| `p-toast`                           | Externo | Toasts de sucesso e erro (global).                                                      |

### Layout
A página é dividida em duas colunas (grid de 10):

1. **Lateral (2 colunas, à esquerda, fixa ao rolar):** `app-branch-sidebar`.
2. **Abas (8 colunas, à direita):**
   - **Cadastro:** `app-branch-register`, com a barra de ações e `app-branch-fields`.
   - **Almoxarifado:** `app-branch-stock-partitions`, com `app-branch-stock-partition-link`, `app-branch-filter`
     e `app-branch-sort` (quando abertos) entre a barra de ações e os `app-branch-stock-partition-card`.
   - **Repositório:** `app-branch-repositories`, com `app-branch-repository-add`,
     `app-branch-repository-filter` e `app-branch-repository-sort` (quando abertos) entre a barra de
     ações e os `app-branch-repository-card`. A tela de adicionar tem, um abaixo do outro,
     `app-branch-stock-partition-picker` e `app-branch-repository-picker`.

Até 900px a lateral fica em cima e as abas embaixo, as duas com a largura toda.

### Fluxo entre os componentes
- **Dado** a filial em carga, **quando** `app-branch-detail` recebe a filial, **então**
  `app-branch-sidebar` e `app-branch-register` saem do skeleton, e `app-branch-stock-partitions` e
  `app-branch-repositories` passam a poder carregar (cada um carrega quando a sua aba é aberta).
- **Dado** a aba Cadastro em edição, **quando** o usuário salva em `app-branch-register` e a
  gravação é concluída (saída `saved`), **então** `app-branch-detail` passa a filial gravada a
  `app-branch-sidebar`, que mostra os novos valores, e troca a URL se o código mudou;
  `app-branch-register` volta à leitura.
- **Dado** a aba Almoxarifado aberta, **quando** o usuário clica em "Vincular" em
  `app-branch-stock-partitions`, **então** `app-branch-stock-partition-link` abre e carrega os almoxarifados
  disponíveis.
- **Dado** a seção de vinculação de almoxarifado aberta, **quando** o usuário marca um card em
  `app-branch-stock-partition-card` (saída `selectedChange`), **então** `app-branch-stock-partition-link` atualiza a
  seleção e o contador de "Vincular (n)".
- **Dado** a seção de vinculação de almoxarifado aberta, **quando** o usuário clica em "Fechar"
  (saída `closed`), **então** `app-branch-stock-partitions` fecha a seção e desliga o "Vincular".
  **Quando** o vínculo é concluído (saída `linked`), **então** a aba fecha a seção e recarrega os
  vinculados, voltando à página 1.
- **Dado** a aba Repositório aberta, **quando** o usuário clica em "Adicionar" em
  `app-branch-repositories`, **então** `app-branch-repository-add` abre,
  `app-branch-stock-partition-picker` carrega os almoxarifados e `app-branch-repository-picker`
  fica fechado.
- **Dado** a tela de adicionar aberta, **quando** o usuário clica em "Selecionar" em
  `app-branch-stock-partition-card` ou `app-branch-repository-card` (saída `pick`), **então** o
  bloco de escolha avisa `app-branch-repository-add` (saída `selectedChange`), que guarda a
  escolha; o bloco recolhe e mostra só o card escolhido, com "Alterar" e "Remover" acima. Com o
  almoxarifado escolhido, `app-branch-repository-add` abre `app-branch-repository-picker`, que
  carrega os repositórios do tipo Equipe na primeira vez. Com os dois escolhidos e o par novo,
  "Salvar" habilita.
- **Dado** um almoxarifado ou repositório escolhido, **quando** o usuário clica em "Alterar" no
  bloco, **então** a lista do bloco volta e a escolha continua valendo até outra ser selecionada.
  **Quando** clica em "Remover", **então** o bloco avisa `app-branch-repository-add` com a
  escolha vazia, "Salvar" desabilita e a lista do bloco volta; se foi o almoxarifado,
  `app-branch-repository-add` também descarta o repositório e fecha `app-branch-repository-picker`.
- **Dado** a tela de adicionar aberta, **quando** o usuário clica em "Cancelar" (saída `closed`),
  **então** `app-branch-repositories` fecha a tela e desliga o "Adicionar". **Quando** o par é
  salvo (saída `added`), **então** a aba fecha a tela e recarrega os vínculos, voltando à página 1.
- **Dado** o painel de filtro aberto, **quando** o usuário altera `app-branch-filter` ou
  `app-branch-repository-filter` (saída `filterChange`), **então** o contêiner dono
  (`app-branch-stock-partitions`, `app-branch-stock-partition-link`,
  `app-branch-stock-partition-picker`, `app-branch-repositories` ou `app-branch-repository-picker`)
  guarda o filtro sem aplicá-lo; ele só é aplicado quando o usuário clica em "Atualizar" desse
  contêiner, que também volta à página 1.
- **Dado** o painel de ordenação aberto, **quando** o usuário altera `app-branch-sort` ou
  `app-branch-repository-sort` (saída `sortChange`), **então** a aba dona reordena a lista na hora e
  volta à página 1.
- **Dado** um almoxarifado vinculado, **quando** o usuário clica em "Desvincular almoxarifado"
  em `app-branch-stock-partition-card` (saída `unlink`), **então** `app-branch-stock-partitions` verifica os
  insumos e mostra a confirmação ou o aviso de desvínculo bloqueado.
- **Dado** um par vinculado, **quando** o usuário clica em "Desvincular repositório" em
  `app-branch-repository-card` (saída `unlink`), **então** `app-branch-repositories` verifica os
  insumos do par e mostra a confirmação ou o aviso de desvínculo bloqueado.
- **Dado** as duas abas já abertas, **quando** um vínculo muda na aba Almoxarifado (vincular ou
  desvincular almoxarifado), **então** `app-branch-repositories` recarrega (os pares do
  almoxarifado desvinculado somem). **Quando** um vínculo muda na aba Repositório (adicionar ou
  desvincular par), **então** `app-branch-stock-partitions` recarrega (e passa a listar o
  almoxarifado de fora da filial que entrou com o par). A aba que já está carregando não
  recarrega de novo.
- **Dado** um card de almoxarifado ou de repositório, **quando** o usuário clica em "Abrir" em
  `app-branch-stock-partition-card` ou `app-branch-repository-card` (saída `open`), **então** abre a home do almoxarifado ou a home do repositório, respectivamente
  (páginas fora desta especificação).

### Referências visuais
— (não se aplica)
