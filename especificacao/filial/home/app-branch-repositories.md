# app-branch-repositories

### Aplicação
Conteúdo da aba Repositório: lista os vínculos da filial, um card por par almoxarifado +
repositório (Equipe, Credenciada, Armazém, Oficina ou Cluster), com filtro, ordenação e
paginação. O mesmo repositório aparece uma vez para cada almoxarifado a que está vinculado. Abre
a tela de adicionar repositório e desvincula pares. Não deixa desvincular um par em que o
repositório ainda tenha insumos no almoxarifado.

### Componentização
| Componente                     | Tipo    | Onde é usado                                                              |
| ------------------------------ | ------- | ------------------------------------------------------------------------- |
| `app-branch-repository-add`    | Interno | Tela de adicionar repositório, quando aberta (`app-branch-repository-add.md`) |
| `app-branch-repository-filter` | Interno | Painel de filtro, quando aberto (`app-branch-repository-filter.md`)       |
| `app-branch-repository-sort`   | Interno | Painel de ordenação, quando aberto (`app-branch-repository-sort.md`)      |
| `app-branch-repository-card`   | Interno | Um por par da página atual, no uso Vínculo (`app-branch-repository-card.md`) |
| `p-button`                     | Externo | Barra de ações e "Tentar novamente"                                       |
| `p-paginator`                  | Externo | Paginação dos vínculos                                                    |
| `p-confirmDialog`              | Externo | Confirmação de desvínculo e aviso de desvínculo bloqueado                 |
| `p-toast`                      | Externo | Toasts de sucesso e erro (global)                                         |

### Elementos

#### Botão "Adicionar"
- **Tag:** `portal.generic.button.add`
- **Componente:** `p-button`
- **Ícone:** `pi pi-plus`
- **CSS:** `btn--md btn--secondary` (globais)
- **Comportamento:** ao clicar, abre a tela de adicionar repositório; se já estava aberta, fecha e perde as escolhas.
- **Regras:** com a tela aberta, recebe `is-active` (globais); desabilitado enquanto a filial carrega.

#### Botão "Filtrar"
- **Componente:** `p-button`
- **Ícone:** `pi pi-filter`
- **CSS:** `btn--md btn--neutral` (globais)
- **Comportamento:** ao clicar, abre ou fecha o painel de filtro; fechar não limpa o que foi preenchido.
- **Regras:** com o painel aberto, recebe `is-active` (globais).

#### Botão "Ordenar"
- **Componente:** `p-button`
- **Ícone:** `pi pi-sort-amount-down`
- **CSS:** `btn--md btn--neutral` (globais)
- **Comportamento:** ao clicar, abre ou fecha o painel de ordenação.
- **Regras:** com o painel aberto, recebe `is-active` (globais).

#### Botão "Atualizar"
- **Tag:** `portal.generic.button.refresh`
- **Componente:** `p-button`
- **Ícone:** `pi pi-refresh`
- **CSS:** `btn--md btn--primary` (globais)
- **Comportamento:** ao clicar, recarrega os vínculos aplicando o filtro preenchido no painel, mantém a ordenação e volta à página 1. A tela de adicionar, se aberta, não recarrega.
- **Regras:** desabilitado durante a carga.

#### Coluna de cards
- **Componente:** `app-branch-repository-card` no uso Vínculo (almoxarifado + repositório, com desvincular e abrir), um por par da página atual
- **CSS:** `.list-stack` (globais)
- **Regras:** ordenação padrão por Nome / Técnico, crescente (campos em `app-branch-repository-sort.md`); o filtro e a ordenação usam os dados do repositório do par.
- **Origem do dado:** `--` (pares almoxarifado + repositório da filial); insumos do par: `--`

#### Paginador
- **Componente:** `p-paginator`
- **CSS:** `paginator--md` (globais); alinhado à direita, sem fundo.
- **Comportamento:** ao trocar de página, exibe os cards da página escolhida.
- **Regras:** 7 itens por página; só aparece com mais de 7 resultados; controles primeira, anterior, até 5 números, próxima e última; volta à página 1 ao ordenar, ao atualizar e depois de adicionar ou desvincular.

#### Botão "Tentar novamente"
- **Tag:** `portal.generic.button.try-again`
- **Componente:** `p-button`
- **Ícone:** `pi pi-refresh`
- **CSS:** `btn--md btn--secondary` (globais)
- **Comportamento:** ao clicar, recarrega os vínculos.
- **Regras:** só no estado Erro.

#### Modal de confirmação de desvínculo
- **Tag:** mensagem `iclass.generic.label.confirm-unlink-repository` ("Deseja desvincular o repositório "{0}" do almoxarifado "{1}"?", {0} = "código - nome" do repositório, {1} = "código - descrição" do almoxarifado); botões `portal.generic.button.unlink` e `portal.generic.button.cancel`
- **Componente:** `p-confirmDialog`, sem título
- **CSS:** `leave-dialog` (globais); largura 420px. "Desvincular": `btn--md btn--danger`; "Cancelar": `btn--md btn--neutral` (globais); sem ícones.
- **Comportamento:** ao clicar em "Desvincular", o par sai da filial; o almoxarifado continua vinculado à filial e o repositório continua nos outros pares. Ao clicar em "Cancelar", nada muda.
- **Regras:** "Cancelar" recebe o foco quando o modal abre.

#### Aviso de desvínculo bloqueado
- **Tag:** título `iclass.generic.label.cannot-unlink-name` ("Não é possível desvincular {0}.", {0} = "código - nome" do repositório, entre aspas); texto `iclass.generic.label.supplies-pending-in-stock-partitions`; item da lista: "código - descrição do almoxarifado"; botão `iclass.generic.button.got-it`
- **Componente:** o mesmo `p-confirmDialog`, só com o botão "Entendi"
- **CSS:** `leave-dialog` (globais); "Entendi": `btn--md btn--primary` (globais), sem ícone, com o foco.
- **Comportamento:** ao clicar em "Entendi", o aviso fecha e nada muda.
- **Regras:** aparece no lugar da confirmação quando o repositório tem insumos no almoxarifado do par; a lista tem só o almoxarifado do par, sem quantidade.
- **Origem do dado:** `--`

#### Toasts de desvínculo
- **Tag:** sucesso `iclass.generic.label.repository-unlinked-successfully`; erro `iclass.generic.label.could-not-unlink-repository`
- **Componente:** `p-toast`
- **Regras:** sucesso 4 s; erro 6 s (falha ao consultar os insumos ou ao desvincular).

### Layout
Igual ao de `app-branch-stock-partitions.md` (mesma barra de ações, ordem dos blocos e área mínima
dos estados), com "Adicionar" no lugar de "Vincular" e a tela de adicionar repositório no lugar
da seção de vinculação.

### Estados
| Estado                     | Quando                                                  | O que deve ser exibido                                                                                       |
| -------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Carregando                 | Enquanto a filial carrega, ao abrir a aba e no "Atualizar" | 3 cards em skeleton, sem skeleton de paginador; `aria-busy` |
| Com resultados             | Há vínculos após o filtro                               | Cards e, se houver mais de 7, paginador                                                                      |
| Vazio (sem vínculo)        | A filial não tem repositório vinculado                  | Ícone `pi pi-folder-open` e `iclass.generic.label.no-repository-linked` (`.req-empty .state-fill`, globais)  |
| Sem resultado (com filtro) | Há vínculos, há filtro ativo e nenhum atende            | Ícone `pi pi-search` e `portal.generic.results-not-found` (`.req-empty .state-fill`, globais)                |
| Erro                       | A carga falhou                                          | Ícone `pi pi-exclamation-circle` vermelho, `iclass.generic.label.could-not-load-repositories` e "Tentar novamente" (`.load-state .load-state--error .state-fill`, globais) |
| Tela de adicionar aberta   | "Adicionar" ligado                                      | Tela cinza entre a barra de ações e o filtro; a lista de vínculos continua visível abaixo                    |
| Confirmando desvínculo     | Depois de "Desvincular repositório", sem insumos        | Modal de confirmação                                                                                         |
| Desvínculo bloqueado       | Depois de "Desvincular repositório", com insumos        | Aviso de desvínculo bloqueado                                                                                |

### Comportamentos
- **Dado** um par vinculado, **quando** o usuário clica em "Desvincular repositório", **então**
  a aba consulta se o repositório tem insumos no almoxarifado do par: com insumos, mostra o
  aviso de desvínculo bloqueado; sem insumos, mostra a confirmação. Enquanto consulta, novos
  cliques em desvincular são ignorados. Se entraram insumos entre a consulta e a confirmação, o
  desvínculo é recusado e o aviso aparece.
- **Dado** a confirmação aceita, **quando** o desvínculo termina, **então** o toast de sucesso
  aparece e os vínculos recarregam.

### CSS
— (usa as classes de `app-branch-stock-partitions.md`, mesmo arquivo de estilo)
