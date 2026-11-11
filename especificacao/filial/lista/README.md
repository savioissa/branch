---
pasta: lista
objeto: filial
---
# Filial — lista

## Propósito
Encontrar uma filial para acessá-la.

## Composição
- app-branch-list — contêiner da página: cabeçalho, estados, paginação
  - app-branch-filter (painel opcional) — restringe o resultado por Código e Descrição
  - app-branch-sort (painel opcional) — escolhe campo e direção da ordenação
  - app-branch-card (repete por filial da página) — representa uma filial
  - p-paginator (externo)
  - p-button (externo)

## Layout da página
Rota `/filial` (a raiz do aplicativo redireciona para cá). Uma coluna com a largura toda:

1. Cabeçalho fixo ao rolar: título à esquerda; Novo, Filtrar, Ordenar e Atualizar à direita.
2. Painel de filtro (se aberto).
3. Painel de ordenação (se aberto).
4. Cards empilhados, ou o estado vazio, sem resultado ou erro ocupando o espaço restante.
5. Paginador alinhado à direita.

Detalhes de cada região no arquivo do componente dono.

## Fluxos entre componentes
Dado o painel de filtro aberto, quando o usuário altera um operador ou valor em `app-branch-filter` (saída `filterChange`), então `app-branch-list` guarda o filtro sem aplicá-lo, e a lista não muda.

Dado um filtro preenchido no painel, quando o usuário clica em Atualizar, então `app-branch-list` recarrega aplicando esse filtro, volta à página 1 e mostra Com resultados ou Sem resultado.

Dado o painel de ordenação aberto, quando o usuário escolhe um campo ou inverte a direção em `app-branch-sort` (saída `sortChange`), então `app-branch-list` reordena o resultado e volta à página 1.

Dado a lista com resultados, quando o usuário clica em Abrir em `app-branch-card` (saída `open`), então `app-branch-list` vai para a home da filial (`/filial/:codigo`; ver `../home/README.md`).

Dado qualquer estado, quando o usuário clica em Novo em `app-branch-list`, então a página de criação abre (`/filial/nova`; ver `../criacao/README.md`).

## Referências visuais
| Arquivo | Mostra |
|---|---|
| print 1 (fornecido pelo usuário, não copiado) | Lista com resultados e paginador; dados repetidos e paginador pulando a página 3 são artefatos |
| print 2 | Estado Vazio: "Nenhuma filial cadastrada" |
| print 3 | Estado Sem resultado ("Nenhuma resultado encontrado" no print; a casca diz "Nenhum") |
| print 4 | Painel de filtro aberto; o print mostra "Operator" e uma coluna vazia, a casca não |
