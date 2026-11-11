---
pasta: home
objeto: filial
---
# Filial — home

## Propósito
Consultar e manter uma filial específica.

## Composição
- app-branch-detail — contêiner da página: carga da filial, abas, edição do cadastro
  - app-branch-summary — lateral com a identificação da filial
  - p-tabView (externo)
    - aba Cadastro
      - p-button (externo): Editar, Cancelar, Salvar
      - app-branch-fields (de `../criacao/app-branch-fields/`) — campos Código e Descrição
    - aba Almoxarifado
      - app-branch-warehouses — almoxarifados vinculados
        - app-warehouse-link (seção opcional) — seleção e vínculo de almoxarifados
          - app-branch-filter (de `../lista/app-branch-filter/`)
          - app-warehouse-card (repete, selecionável)
          - p-paginator (externo)
        - app-branch-filter (de `../lista/app-branch-filter/`)
        - app-branch-sort (de `../lista/app-branch-sort/`)
        - app-warehouse-card (repete por vinculado)
        - p-paginator (externo)
  - p-toast (externo, global)

## Layout da página
Rota `/filial/:codigo`. Grid de 10 colunas: lateral em 2 colunas à esquerda (fixa ao rolar); abas em 8 colunas à direita. Até 900px, lateral em cima e abas embaixo, as duas com a largura toda. Nos estados Não encontrada e Erro, um único bloco ocupa as 10 colunas.

## Fluxos entre componentes
Dado a filial em carga, quando `app-branch-detail` recebe a filial, então `app-branch-summary` e `app-branch-fields` saem do skeleton e `app-branch-warehouses` passa a poder carregar (carrega quando a aba Almoxarifado é aberta).

Dado a aba Cadastro em edição, quando o usuário salva em `app-branch-detail` e a gravação é concluída, então `app-branch-summary` mostra os novos valores e `app-branch-fields` volta à leitura.

Dado a aba Almoxarifado aberta, quando o usuário clica em Vincular em `app-branch-warehouses`, então `app-warehouse-link` abre e carrega os almoxarifados disponíveis.

Dado a seção de vinculação aberta, quando o usuário clica em Fechar em `app-warehouse-link` (saída `closed`), então `app-branch-warehouses` fecha a seção e desliga o Vincular.

Dado almoxarifados selecionados, quando o vínculo é concluído em `app-warehouse-link` (saída `linked`), então `app-branch-warehouses` fecha a seção e recarrega os vinculados, voltando à página 1.

Dado a seção de vinculação aberta, quando o usuário marca um card em `app-warehouse-card` (saída `selectedChange`), então `app-warehouse-link` atualiza a seleção e o contador do Vincular (n).

Dado o painel de filtro aberto, quando o usuário altera `app-branch-filter` (saída `filterChange`), então o contêiner dono (`app-branch-warehouses` ou `app-warehouse-link`) guarda o filtro sem aplicá-lo; ele só é aplicado quando o usuário clica em Atualizar desse contêiner, que também volta à página 1.

Dado o painel de ordenação aberto, quando o usuário altera `app-branch-sort` (saída `sortChange`), então `app-branch-warehouses` reordena a lista na hora e volta à página 1.

Dado um card de almoxarifado, quando o usuário clica em Abrir em `app-warehouse-card` (saída `open`), então nada acontece na casca.

## Referências visuais
| Arquivo | Mostra |
|---|---|
| print 6 (fornecido pelo usuário, não copiado) | Aba Cadastro em leitura |
| print 7 | Aba Cadastro em edição (Salvar desabilitado sem alteração) |
| print 8 | Aba Almoxarifado vazia ("Nenhuma almoxarifado vinculado" no print; a casca diz "Nenhum") |
| print 9 | Aba Almoxarifado com um vinculado |
| print da seção de vinculação (PDF 2) | Seção "Selecione Almoxarifado" com seleção; o já vinculado aparece marcado |
| PDF 2 "Especificação - Home da Filial" | Regras da lateral, abas, edição, almoxarifado, vinculação e tags |
