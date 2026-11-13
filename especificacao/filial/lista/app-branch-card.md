# app-branch-card

### Aplicação
Card que representa uma filial na lista de filiais. Mostra o código e a descrição da filial e
dá acesso à home dela.

### Componentização
| Componente | Tipo    | Onde é usado                         |
| ---------- | ------- | ------------------------------------ |
| `p-button` | Externo | Botão "Abrir filial"                 |

### Elementos

#### Código
- **Tag:** `iclass.generic.label.code`
- **CSS:** `.kv`, `.kv-k` (tag), `.kv-v` (valor) (globais); uma linha, cortado com reticências.
- **Comportamento:** ao passar o mouse sobre o valor, o tooltip nativo mostra o código inteiro.
- **Origem do dado:** `--`

#### Descrição
- **Tag:** `iclass.generic.label.description`
- **CSS:** `.kv`, `.kv-k` (tag), `.kv-v` (valor) (globais); uma linha, cortada com reticências.
- **Comportamento:** ao passar o mouse sobre o valor, o tooltip nativo mostra a descrição inteira.
- **Origem do dado:** `--`

#### Botão "Abrir filial"
- **Componente:** `p-button` (text)
- **Ícone:** `pi pi-window-maximize`
- **CSS:** `btn--md btn--text icon-neutral` (globais)
- **Comportamento:** ao clicar, pede a abertura da filial (o destino está no Fluxo do `README.md` da página). Só o botão é clicável; o restante do card não reage ao clique.

### Layout
O card é uma linha única (`.reg-card`, globais) dividida em três colunas, alinhadas ao centro na vertical:

1. **Código:** 290px (acima de 700px); até 700px, metade do espaço livre.
2. **Descrição:** ocupa o espaço restante.
3. **Abrir filial:** largura do botão.

### Estados
| Estado      | Quando                                     | O que deve ser exibido                                                                                 |
| ----------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Carregando  | A lista está carregando                    | Um bloco de skeleton de 60px de altura e cantos de 10px no lugar do card, oculto para leitor de tela    |
| Padrão      | Filial recebida                            | Código, Descrição e o botão "Abrir filial"                                                             |
| Hover/foco  | Ponteiro ou foco sobre o botão             | Só o botão muda (fundo cinza-claro, ícone mais escuro); o card não tem hover próprio                   |

### Comportamentos
— (não se aplica)

### CSS
| Classe | Definição |
|---|---|
| :host | display: block; |
| .branch-card | grid-template-columns: 290px minmax(0, 1fr) auto;<br>min-height: 60px;<br>padding: 8px 12px 8px 22px; |
| .card-skeleton | height: 60px;<br>border-radius: 10px; |
| .branch-card (até 700px) | grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto; |
