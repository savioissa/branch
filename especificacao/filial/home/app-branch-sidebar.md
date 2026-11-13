# app-branch-sidebar

### Aplicação
Lateral da home que identifica a filial aberta: nome da entidade, descrição em destaque, código
e descrição. Não tem navegação: as abas ficam em `app-branch-detail`.

### Componentização
— (não se aplica)

### Elementos

#### Lateral
- **CSS:** `.summary`; elemento `aside`.

#### Nome da entidade
- **Tag:** `branch`
- **CSS:** `.summary__overline`

#### Título
- **CSS:** `.summary__title`; h1; quebra em qualquer ponto se não couber.
- **Origem do dado:** `--`

#### Código
- **Tag:** `iclass.generic.label.code`
- **CSS:** tag `.kv-k` (globais) + `.summary__k`; valor `.summary__v`; quebra se não couber. Par de uma lista de definição (tag e valor).
- **Origem do dado:** `--`

#### Descrição
- **Tag:** `iclass.generic.label.description`
- **CSS:** tag `.kv-k` (globais) + `.summary__k`; valor `.summary__v`; quebra se não couber.
- **Origem do dado:** `--`

### Layout
A lateral é uma coluna com a altura da tela menos 32px, fixa ao rolar (16px do topo), com
rolagem própria se o conteúdo passar da altura:

1. Nome da entidade.
2. Título, com 12px abaixo.
3. Lista com Código e Descrição, com 8px entre os pares.

A largura vem da página (`README.md`). Até 900px a lateral deixa de ser fixa e fica com a
altura do conteúdo.

### Estados
| Estado     | Quando                          | O que deve ser exibido                                                                     |
| ---------- | ------------------------------- | ------------------------------------------------------------------------------------------ |
| Carregando | A home está carregando a filial | Um bloco de skeleton com o tamanho da lateral (140px de altura até 900px), oculto para leitor de tela |
| Padrão     | Filial recebida                 | Nome da entidade, título, Código e Descrição                                               |

### Comportamentos
— (não se aplica)

### CSS
| Classe | Definição |
|---|---|
| :host | position: sticky;<br>top: 16px;<br>display: block;<br>min-width: 0;<br>height: calc(100vh - 32px); |
| .summary, .summary-skeleton | height: 100%;<br>box-sizing: border-box;<br>border-radius: 4px; |
| .summary | padding: 16px;<br>background: #fff;<br>border: 1px solid #E5E7EB;<br>box-shadow: 0 2px 6px rgba(16, 24, 40, .08);<br>overflow-y: auto; |
| .summary__overline | display: block;<br>font: var(--secondary-md);<br>color: #3B82F6; |
| .summary__title | margin: 0 0 12px;<br>font: 500 18px/24px var(--font-family-text);<br>color: #111827;<br>overflow-wrap: anywhere; |
| .summary__list | display: flex;<br>flex-direction: column;<br>gap: 8px;<br>margin: 0; |
| .summary__k | color: #6B7280; |
| .summary__v | margin: 0;<br>font: var(--secondary-md);<br>color: #212121;<br>overflow-wrap: anywhere; |
| :host (até 900px) | position: static;<br>height: auto; |
| .summary-skeleton (até 900px) | height: 140px; |
