# Premissas globais

Regras herdadas por todas as páginas de todos os objetos. Cada objeto aponta para este arquivo em vez de repetir estas regras.

## Fontes e conflito

| Regra | Valor |
|---|---|
| Fonte principal | Casca Angular 17 + PrimeNG 17 (`src/`) |
| Conflito entre fontes | A casca prevalece |
| Tradução | A casca não tem arquivos de i18n; texto com tag conhecida aparece como `[[tag]]`, e o restante, como o texto da casca entre aspas |

## Marcações

| Marcação | Significado |
|---|---|
| `[[tag]]` | texto por tag de tradução existente |
| `[[tag]]` *(nova)* | tag nova, listada em `traducoes.md` do objeto |
| `{{ Dto.campo }}` | dado de origem conhecida |
| `{{ DTO:campo }}` | dado sem contrato definido |
| — | não se aplica |

## Padrões de interface observados na casca

| Padrão                       | Regra                                                                                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Toast                        | Um único `p-toast` global, no canto superior direito, visível mesmo após navegar. Sucesso fica 4 s; erro fica 6 s.                                                       |
| Cabeçalho de página          | Classe `.page-header`: fixo no topo ao rolar (sticky), título à esquerda (`.t-title-lg .page-header__title`), ações à direita (`.page-header__actions`).                 |
| Conteúdo de página           | Classe `.page-content`: coluna com espaçamento de 16px entre blocos. Abaixo de 700px, o respiro lateral de cabeçalho e conteúdo cai para 16px.                           |
| Botões                       | `p-button` com uma classe de tamanho e uma de aparência; valores na seção [Botões](#botões).                                                                              |
| Botão que abre painel        | Enquanto o painel está aberto, o botão recebe `is-active` (valores na seção [Botões](#botões)).                                                                          |
| Carregando                   | Skeleton (`.skeleton`) com o mesmo tamanho do elemento real; um card inteiro vira um bloco.                                                                              |
| Estado vazio / sem resultado | `.req-empty`: ícone + texto centralizados. Vazio usa `pi-folder-open`; sem resultado usa `pi-search`.                                                                    |
| Estado de erro de carga      | `.load-state.load-state--error`: ícone `pi-exclamation-circle` vermelho, texto e ação de nova tentativa.                                                                 |
| Card de registro             | `.reg-card` com pares tag/valor `.kv` (`.kv-k` tag, `.kv-v` valor). O valor longo é cortado com reticências e mostra o texto inteiro em tooltip nativo.            |
| Filtro em lista              | Só é aplicado quando o usuário clica em Atualizar (alterar o painel não muda a lista). Não diferencia maiúsculas nem acentos e ignora espaços nas pontas do valor. Atualizar ou ordenar volta à página 1. |
| Tipografia                   | Fonte Geist. Título de página 24px/32px peso 600; título de seção 16px/24px peso 600; texto 14px/21px e 13px/20px peso 400; texto principal 14px/20px e 13px/20px peso 500; tag 13px/20px peso 500; texto pequeno 11px/16px peso 400. |

## Botões

Todo botão é um `p-button` com **uma classe de tamanho** e **uma classe de aparência**, definidas em `src/styles.css`. As fichas dos componentes citam só as classes; os valores ficam aqui.

### Tamanho

| Classe | Altura | Respiro | Texto | Ícone | Espaço entre ícone e texto |
|---|---|---|---|---|---|
| `btn--sm` | 26px | 0 12px | Geist 14px, peso 500 | 14px | 4px |
| `btn--md` | 32px | 0 16px | Geist 16px, peso 500 | 16px | 6px |
| `btn--lg` | 40px | 0 20px | Geist 16px, peso 500 | 20px | 8px |

Regras que valem para os três tamanhos:

- **Altura de linha:** 1 (o texto não aumenta a altura do botão).
- **Só ícone:** o botão fica quadrado (largura igual à altura), sem respiro e com o ícone centralizado.
- **`header-btn`:** usado nos botões do cabeçalho da lista; fixa o ícone em 16px.

### Aparência

| Classe | Padrão | Hover | Pressionado | Desabilitado |
|---|---|---|---|---|
| `btn--primary` | fundo #3b82f6, texto #ffffff, sem borda visível, raio 4px, sombra 0 2px 4px rgba(0,0,0,.10) | fundo #1d4ed8 | — | opacidade 50% |
| `btn--secondary` | fundo #ffffff, texto #1d4ed8, borda 1px #d9dce1, raio 6px, sombra 0 2px 4px rgba(0,0,0,.10) | fundo #f1f2f4, texto #1e40af | fundo #e2e4e8, texto #1d4ed8 | texto #93c5fd, fundo #ffffff, opacidade 50% |
| `btn--neutral` | fundo #ffffff, texto #1f2937, borda 1px #d9dce1, raio 6px, sombra 0 2px 4px rgba(0,0,0,.10) | fundo #f1f2f4, texto #111827 | fundo #e2e4e8, texto #111827 | opacidade 50% |
| `btn--danger` | fundo #dc2626, texto #ffffff, sem borda visível, raio 4px, sombra 0 2px 4px rgba(0,0,0,.10) | fundo #b91c1c | — | opacidade 50% |

### Botão de texto (`btn--text`)

Sem fundo, sem sombra; combinado com outra classe, que define a cor.

| Combinação | Padrão | Hover | Desabilitado |
|---|---|---|---|
| `btn--primary btn--text` | texto #1d4ed8 | fundo #f1f2f4, texto #1e40af | texto #9ca3af, opacidade 50% |
| `btn--danger btn--text` | texto #dc2626, sem borda | fundo #fef2f2 | opacidade 50% |
| `btn--text icon-neutral` | ícone #1f2937 (usado no ícone de abrir dos cards) | fundo #f1f2f4, ícone #111827 | opacidade 50% |

### Ativo (`is-active`)

Botão que abre um painel (Filtrar, Ordenar, Vincular) fica ativo enquanto o painel está aberto. A classe vai no `p-button`, e não no botão interno.

| Aparência | Ativo |
|---|---|
| `btn--secondary` | fundo #e9f2ff, texto #1d4ed8, borda #60a5fa |
| `btn--neutral` | fundo #e9f2ff, texto #1d4ed8, borda #60a5fa (inclusive no hover) |
