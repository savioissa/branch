# app-branch-stock-partitions

### Aplicação
Conteúdo da aba Almoxarifado: lista os almoxarifados vinculados à filial, com filtro, ordenação
e paginação, abre a seção de vinculação de almoxarifado e desvincula almoxarifados. Não deixa
desvincular um almoxarifado em que algum repositório da filial ainda tenha insumos.

### Componentização
| Componente           | Tipo    | Onde é usado                                                              |
| -------------------- | ------- | ------------------------------------------------------------------------- |
| `app-branch-stock-partition-link` | Interno | Seção de vinculação, quando aberta (`app-branch-stock-partition-link.md`)              |
| `app-branch-filter`  | Interno | Painel de filtro, quando aberto (`../lista/app-branch-filter.md`)         |
| `app-branch-sort`    | Interno | Painel de ordenação, quando aberto (`../lista/app-branch-sort.md`)        |
| `app-branch-stock-partition-card` | Interno | Um por almoxarifado vinculado da página atual, com desvincular (`app-branch-stock-partition-card.md`) |
| `p-button`           | Externo | Barra de ações e "Tentar novamente"                                       |
| `p-paginator`        | Externo | Paginação dos vinculados                                                  |
| `p-confirmDialog`    | Externo | Confirmação de desvínculo e aviso de desvínculo bloqueado                 |
| `p-toast`            | Externo | Toasts de sucesso e erro (global)                                         |

### Elementos

#### Botão "Vincular"
- **Tag:** `portal.generic.button.link`
- **Componente:** `p-button`
- **Ícone:** `pi pi-link`
- **CSS:** `btn--md btn--secondary` (globais)
- **Comportamento:** ao clicar, abre a seção de vinculação; se já estava aberta, fecha e perde a seleção.
- **Regras:** com a seção aberta, recebe `is-active` (globais); desabilitado enquanto a filial carrega.

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
- **Comportamento:** ao clicar, recarrega os vinculados aplicando o filtro preenchido no painel, mantém a ordenação e volta à página 1. A seção de vinculação, se aberta, não recarrega.
- **Regras:** desabilitado durante a carga.

#### Coluna de cards
- **Componente:** `app-branch-stock-partition-card` com "Desvincular almoxarifado", um por almoxarifado da página atual
- **CSS:** `.list-stack` (globais)
- **Regras:** ordenação padrão por Descrição, crescente (campos em `../lista/app-branch-sort.md`).
- **Origem do dado:** `--` (almoxarifados vinculados à filial)

#### Paginador
- **Componente:** `p-paginator`
- **CSS:** `paginator--md` (globais); alinhado à direita, sem fundo.
- **Comportamento:** ao trocar de página, exibe os cards da página escolhida.
- **Regras:** 7 itens por página; só aparece com mais de 7 resultados; controles primeira, anterior, até 5 números, próxima e última; volta à página 1 ao ordenar, ao atualizar, depois de vincular e depois de desvincular.

#### Botão "Tentar novamente"
- **Tag:** `portal.generic.button.try-again`
- **Componente:** `p-button`
- **Ícone:** `pi pi-refresh`
- **CSS:** `btn--md btn--secondary` (globais)
- **Comportamento:** ao clicar, recarrega os vinculados.
- **Regras:** só no estado Erro.

#### Modal de confirmação de desvínculo
- **Tag:** mensagem `iclass.generic.label.confirm-unlink-stock-partition` ("Deseja desvincular o almoxarifado "{0}" desta filial? Os repositórios desta filial também deixarão de usá-lo.", {0} = "código - descrição"); botões `portal.generic.button.unlink` e `portal.generic.button.cancel`
- **Componente:** `p-confirmDialog`, sem título
- **CSS:** `leave-dialog` (globais); largura 420px. "Desvincular": `btn--md btn--danger`; "Cancelar": `btn--md btn--neutral` (globais); sem ícones.
- **Comportamento:** ao clicar em "Desvincular", o almoxarifado sai da filial, e os pares almoxarifado + repositório com ele também; ao clicar em "Cancelar", nada muda.
- **Regras:** "Cancelar" recebe o foco quando o modal abre.

#### Aviso de desvínculo bloqueado
- **Tag:** título `iclass.generic.label.cannot-unlink-name` ("Não é possível desvincular {0}.", {0} = "código - descrição" do almoxarifado, entre aspas); texto `iclass.generic.label.supplies-pending-in-repositories`; cada item da lista: "código - nome do repositório"; botão `iclass.generic.button.got-it`
- **Componente:** o mesmo `p-confirmDialog`, só com o botão "Entendi"
- **CSS:** `leave-dialog` (globais); "Entendi": `btn--md btn--primary` (globais), sem ícone, com o foco.
- **Comportamento:** ao clicar em "Entendi", o aviso fecha e nada muda.
- **Regras:** aparece no lugar da confirmação quando algum repositório da filial tem insumos no almoxarifado; lista os repositórios que ainda têm insumos no almoxarifado, sem quantidade.
- **Origem do dado:** `--` (repositórios com insumos no almoxarifado)

#### Toast de desvínculo
- **Tag:** sucesso `iclass.generic.label.stock-partition-unlinked-successfully`; erro `iclass.generic.label.could-not-unlink-stock-partition`
- **Componente:** `p-toast`
- **Regras:** sucesso 4 s; erro 6 s (falha ao consultar os insumos ou ao desvincular).

### Layout
A aba é uma coluna com 12px entre os blocos, sem título próprio (o nome vem da aba):

1. **Barra de ações:** Vincular, Filtrar, Ordenar e Atualizar à direita, com 8px entre eles; quebram linha se faltar espaço.
2. **Seção de vinculação** (se aberta).
3. **Painel de filtro** (se aberto).
4. **Painel de ordenação** (se aberto).
5. **Cards** ou o estado.
6. **Paginador.**

Os estados Vazio e Sem resultado ficam centralizados numa área de no mínimo 320px de altura.

### Estados
| Estado                     | Quando                                                  | O que deve ser exibido                                                                                       |
| -------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Carregando                 | Enquanto a filial carrega, ao abrir a aba e no "Atualizar" | 3 cards em skeleton, sem skeleton de paginador; `aria-busy` |
| Com resultados             | Há vinculados após o filtro                             | Cards e, se houver mais de 7, paginador                                                                      |
| Vazio (sem vínculo)        | A filial não tem almoxarifado vinculado                 | Ícone `pi pi-folder-open` e `iclass.generic.label.no-stock-partition-linked` (`.req-empty .state-fill`, globais) |
| Sem resultado (com filtro) | Há vinculados, há filtro ativo e nenhum atende          | Ícone `pi pi-search` e `portal.generic.results-not-found` (`.req-empty .state-fill`, globais)                |
| Erro                       | A carga falhou                                          | Ícone `pi pi-exclamation-circle` vermelho, `iclass.generic.label.could-not-load-stock-partitions` e "Tentar novamente" (`.load-state .load-state--error .state-fill`, globais) |
| Seção de vinculação aberta | "Vincular" ligado                                       | Seção entre a barra de ações e o filtro; a lista de vinculados continua visível abaixo                       |
| Confirmando desvínculo     | Depois de "Desvincular almoxarifado", sem insumos       | Modal de confirmação                                                                                         |
| Desvínculo bloqueado       | Depois de "Desvincular almoxarifado", com insumos       | Aviso de desvínculo bloqueado                                                                                |

### Comportamentos
- **Dado** um almoxarifado vinculado, **quando** o usuário clica em "Desvincular almoxarifado",
  **então** a aba consulta se algum repositório da filial tem insumos nele: com insumos, mostra
  o aviso de desvínculo bloqueado; sem insumos, mostra a confirmação. Enquanto consulta, novos
  cliques em desvincular são ignorados.
- **Dado** a confirmação aceita, **quando** o desvínculo termina, **então** o toast de sucesso
  aparece e os vinculados recarregam. Se nesse meio-tempo entraram insumos no almoxarifado, o
  desvínculo é recusado e o aviso de desvínculo bloqueado aparece.

### CSS
| Classe | Definição |
|---|---|
| :host | display: flex;<br>flex-direction: column;<br>gap: 12px;<br>min-height: 100%; |
| .tab-toolbar | display: flex;<br>justify-content: flex-end;<br>flex-wrap: wrap;<br>gap: 8px; |
| .req-empty.state-fill | min-height: 320px; |
