---
componente: app-branch-summary
papel: summary
status: definido
---
Identifica a filial aberta na lateral da home.

Faz o papel do `-sidebar` do padrão, mas sem navegação: as abas ficam em `app-branch-detail`.

## Entrada e saída
| Direção | Nome | Conteúdo |
|---|---|---|
| entrada | branch | Filial aberta (código e descrição) |
| entrada | loading | Quando verdadeiro, a lateral inteira vira skeleton |
| saída | — | Nenhuma |

## Composição
Folha. Sem externos.

## Layout
Lateral (`aside`) com a altura da tela menos 32px, fixa ao rolar (16px do topo). Conteúdo em coluna: nome do objeto, título, lista de campos. Até 900px a lateral vai para cima do conteúdo, com a altura do conteúdo, e deixa de ser fixa. A largura vem da página (`../README.md`).

| Região ou coluna | Largura |
|---|---|
| Lateral inteira | definida pela página (2 de 10 colunas) |

## Elementos

### Campos de exibição

#### Nome do objeto

- **Tag:** `[[iclass.generic.label.branch]]`
- **Formato:** texto fixo, acima do título
- **Classe da tag / valor:** — / `.summary__overline`

#### Título

- **Dado:** `{{ DTO:filial.descricao }}`
- **Formato:** h1; quebra em qualquer ponto se não couber
- **Vazio:** — (obrigatório)
- **Classe da tag / valor:** — / `.summary__title`

#### Código

- **Tag:** `[[iclass.generic.label.code]]`
- **Dado:** `{{ DTO:filial.codigo }}`
- **Formato:** texto; quebra se não couber
- **Vazio:** — (obrigatório)
- **Classe da tag / valor:** `.kv-k .summary__k` / `.summary__v`

#### Descrição

- **Tag:** `[[iclass.generic.label.description]]`
- **Dado:** `{{ DTO:filial.descricao }}`
- **Formato:** texto; quebra se não couber
- **Vazio:** — (obrigatório)
- **Classe da tag / valor:** `.kv-k .summary__k` / `.summary__v`

A lateral tem aria-label "Resumo da filial". Os campos formam uma lista de definição (tag e valor).

## Estados
| Estado | Quando | O que aparece |
|---|---|---|
| Carregando | `loading` verdadeiro ou sem filial | Um bloco de skeleton com o tamanho da lateral (140px de altura até 900px) |
| Padrão | Filial recebida | Nome do objeto, título e campos |

## Comportamentos
Dado a filial salva na aba Cadastro, quando a página recebe os novos dados, então a lateral mostra o código e a descrição atualizados.

## Estilo
| Classe | Onde |
|---|---|
| `.summary` (própria) | container |
| `.summary__overline`, `.summary__title`, `.summary__list`, `.summary__k`, `.summary__v` (próprias) | partes |
| `.summary-skeleton` (própria) + `.skeleton` (global) | carregando |
| `.kv`, `.kv-k` (globais) | par tag/valor |

| Onde | Valor |
|---|---|
| `:host` | topo fixo 16px, altura calc(100vh - 32px) |
| `.summary` | respiro 16px, fundo #fff, borda #E5E7EB, raio 4px, sombra 0 2px 6px rgba(16,24,40,.08) |
| `__overline` | Geist 13px/20px, peso 400, cor #3B82F6 |
| `__title` | Geist 18px/24px, peso 500, cor #111827, margem inferior 12px |
| `__list` | espaço 8px |
| `__k` | cor #6B7280 |
| `__v` | Geist 13px/20px, peso 400, cor #212121 |
| `.summary-skeleton` até 900px | altura 140px |
