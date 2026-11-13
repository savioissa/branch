# app-branch-repository-card

### Aplicação
Card que representa um repositório (Equipe, Credenciada, Armazém, Oficina ou Cluster). Mostra
tipo, código e nome do repositório. Tem dois usos:

- **Vínculo da filial** (aba Repositório): o almoxarifado do par vem antes, na mesma linha, com
  as ações de desvincular e abrir.
- **Escolha** (`app-branch-repository-picker`): repositório do sistema com "Selecionar"; o
  repositório já escolhido aparece só com "Abrir".

### Componentização
| Componente | Tipo    | Onde é usado                                                  |
| ---------- | ------- | ------------------------------------------------------------- |
| `p-button` | Externo | Desvincular, Selecionar e Abrir                               |

### Elementos

#### Almoxarifado
- **Tag:** `iclass.generic.label.stock-partition`
- **CSS:** `.kv`, `.kv-k`, `.kv-v` (globais); valor "código - descrição", uma linha, cortado com reticências.
- **Comportamento:** ao passar o mouse sobre o valor, o tooltip nativo mostra "código - descrição" inteiro.
- **Regras:** só no card do vínculo; é sempre a primeira coluna.
- **Origem do dado:** `--` (almoxarifado do par)

#### Tipo
- **Tag:** rótulo `portal.generic.label.type`; valor `portal.generic.label.team` (Equipe), `third.party` (Credenciada), `iclass.generic.label.warehouse` (Armazém), `portal.generic.label.workshop` (Oficina) ou `iclass.generic.label.cluster` (Cluster)
- **CSS:** `.kv`, `.kv-k`, `.kv-v` (globais)
- **Origem do dado:** `--`

#### Código / Login
- **Tag:** Equipe: `iclass.generic.label.login`; os demais tipos: `iclass.generic.label.code`
- **CSS:** `.kv`, `.kv-k`, `.kv-v` (globais); uma linha, cortado com reticências.
- **Comportamento:** ao passar o mouse sobre o valor, o tooltip nativo mostra o valor inteiro.
- **Origem do dado:** `--` (login, para Equipe)

#### Nome / Técnico
- **Tag:** Equipe: `iclass.generic.label.technician`; os demais tipos: `portal.generic.label.name`
- **CSS:** `.kv`, `.kv-k`, `.kv-v` (globais); uma linha, cortado com reticências.
- **Comportamento:** ao passar o mouse sobre o valor, o tooltip nativo mostra o valor inteiro.
- **Origem do dado:** `--` (técnico, para Equipe)

#### Botão "Desvincular repositório"
- **Componente:** `p-button` (text)
- **Ícone:** `pi pi-link-slash` (corrente cortada, desenhada no CSS global)
- **CSS:** `btn--md btn--danger btn--text` (globais); ícone vermelho.
- **Comportamento:** ao clicar, pede o desvínculo do par (verificação de insumos e confirmação em `app-branch-repositories.md`).
- **Regras:** só no card do vínculo.

#### Botão "Abrir repositório"
- **Componente:** `p-button` (text)
- **Ícone:** `pi pi-window-maximize`
- **CSS:** `btn--md btn--text icon-neutral` (globais)
- **Comportamento:** ao clicar, pede a abertura da home do repositório (ver Fluxo no `README.md`).

#### Botão "Selecionar"
- **Tag:** `iclass.generic.button.select`
- **Componente:** `p-button`
- **CSS:** `btn--md btn--primary` (globais) + `card-actions__pick` (globais), 8px antes de "Abrir".
- **Comportamento:** ao clicar, escolhe o repositório (resultado em `app-branch-repository-picker.md`).
- **Regras:** só nos cards da lista de escolha.

### Layout
O card (`.reg-card`, globais) é uma linha única, alinhada ao centro na vertical, com 16px entre
as colunas:

1. **Repositório sozinho (escolha):** Tipo (140px), Código / Login (220px), Nome / Técnico
   (espaço restante) e ações à direita.
2. **Vínculo:** Almoxarifado (espaço restante), Tipo (120px), Código / Login (180px), Nome /
   Técnico (espaço restante, dividido em partes iguais com Almoxarifado) e ações à direita.

As ações (`.card-actions`, globais) ficam lado a lado, com 2px entre os ícones: Desvincular ou
Selecionar e, por último, Abrir, com 8px entre Selecionar e Abrir. Até 700px, no repositório
sozinho, as colunas de dados dividem o espaço na proporção 0,8 : 1 : 1, com 10px entre elas; no
vínculo, as quatro colunas de dados dividem o espaço em partes iguais.

### Estados
| Estado     | Quando                               | O que deve ser exibido                                                                 |
| ---------- | ------------------------------------ | -------------------------------------------------------------------------------------- |
| Carregando | A lista do contêiner está carregando | Bloco de skeleton de 52px, cantos de 10px, oculto para leitor de tela                  |
| Vínculo    | Na aba Repositório                   | Almoxarifado, Tipo, Código/Login, Nome/Técnico, "Desvincular repositório" e "Abrir repositório" |
| Escolha    | Na lista de escolha de repositório   | Tipo, Código/Login, Nome/Técnico, "Selecionar" e "Abrir repositório"                    |
| Escolhido  | Repositório já escolhido             | Tipo, Código/Login, Nome/Técnico e "Abrir repositório"                                  |
| Hover/foco | Ponteiro ou foco sobre um botão      | Só o botão muda; o card não tem hover próprio                                           |

### Comportamentos
— (não se aplica)

### CSS
| Classe | Definição |
|---|---|
| :host | display: block; |
| .repository-card | grid-template-columns: 140px 220px minmax(0, 1fr) auto;<br>min-height: 52px;<br>padding: 6px 12px 6px 20px; |
| .repository-card--link | grid-template-columns: minmax(0, 1fr) 120px 180px minmax(0, 1fr) auto; |
| .card-skeleton | height: 52px;<br>border-radius: 10px; |
| .repository-card (até 700px) | grid-template-columns: minmax(0, 0.8fr) minmax(0, 1fr) minmax(0, 1fr) auto;<br>column-gap: 10px;<br>padding-left: 12px; |
| .repository-card--link (até 700px) | grid-template-columns: repeat(4, minmax(0, 1fr)) auto; |
