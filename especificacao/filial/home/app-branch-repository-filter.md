# app-branch-repository-filter

### Aplicação
Painel em que o usuário restringe os repositórios por tipo e pelos campos de cada tipo (código e
descrição do armazém, código e descrição da credenciada, login e nome da equipe, código e nome da
oficina, código e nome do cluster). É usado na aba Repositório (`app-branch-repositories.md`) e,
com o tipo fixo, na escolha de repositório ao adicionar (`app-branch-repository-picker.md`); cada
contêiner guarda o próprio filtro e decide quando aplicá-lo.

### Componentização
| Componente      | Tipo    | Onde é usado                                  |
| --------------- | ------- | --------------------------------------------- |
| `p-multiSelect` | Externo | Tipo repositório                              |
| `p-dropdown`    | Externo | Operador de cada campo de texto               |
| `pInputText`    | Externo | Valor de cada campo de texto                  |

### Elementos

#### Painel
- **CSS:** `.filter-panel` (globais) + `.repo-filter`

#### Tipo repositório
- **Tag:** rótulo `iclass.generic.label.repository-type`; placeholder `portal.technical.sheet.label.all`; opções `portal.generic.label.team` (Equipe), `third.party` (Credenciada), `iclass.generic.label.warehouse` (Armazém), `portal.generic.label.workshop` (Oficina), `iclass.generic.label.cluster` (Cluster)
- **Componente:** `p-multiSelect` sem cabeçalho (sem busca nem "marcar todos"), lista anexada ao corpo da página
- **CSS:** rótulo `.filter-panel__label`; campo `filter-panel__multi`; lista `filter-panel__multi-panel` (globais)
- **Comportamento:** ao marcar ou desmarcar um tipo, o painel avisa o contêiner com o filtro completo, e os campos dos tipos não marcados ficam desabilitados na hora.
- **Regras:** nenhum tipo marcado = todos os tipos. Não aparece com o tipo fixo.

#### Campos de texto por tipo
Dez campos, nesta ordem, cada um com rótulo, operador e valor:

| Campo | Tag do rótulo | Tipo | Compara com |
|---|---|---|---|
| Código do armazém | `iclass.generic.label.warehouse-code` | Armazém | código do repositório |
| Descrição do armazém | `iclass.generic.label.warehouse-description` | Armazém | nome do repositório |
| Código da credenciada | `iclass.generic.label.third-party-code` | Credenciada | código do repositório |
| Descrição da credenciada | `iclass.generic.label.third-party-description` | Credenciada | nome do repositório |
| Login da equipe | `iclass.generic.label.team-login` | Equipe | login (código) do repositório |
| Nome da equipe | `iclass.generic.label.team-name` | Equipe | técnico (nome) do repositório |
| Código da oficina | `iclass.generic.label.workshop-code` | Oficina | código do repositório |
| Nome da oficina | `iclass.generic.label.workshop-name` | Oficina | nome do repositório |
| Código do cluster | `iclass.generic.label.cluster-code` | Cluster | código do repositório |
| Nome do cluster | `iclass.generic.label.cluster-name` | Cluster | nome do repositório |

- **Tag:** rótulos na tabela acima; operador: placeholder `iclass.generic.label.select-operator` e opções `iclass.generic.label.equals`, `iclass.generic.label.different`, `iclass.generic.label.contains`, `iclass.generic.label.starts-with`, `iclass.generic.label.ends-with`
- **Componente:** `p-dropdown` (operador, lista anexada ao corpo da página) + `pInputText` (valor)
- **CSS:** `.filter-panel__field`, `.filter-panel__label`, `.filter-panel__control`, `.filter-panel__operator`, `.filter-panel__operator-panel`, `.filter-panel__input` (globais); desabilitado: `.filter-panel__field--disabled` (globais), rótulo mais claro
- **Comportamento:** ao alterar um operador ou valor, o painel avisa o contêiner com o filtro completo.
- **Regras:** operador padrão: Igual nos campos de código e login; vazio (funciona como Contém) nos de descrição e nome. Com algum tipo marcado em "Tipo repositório", os campos dos tipos não marcados ficam desabilitados e não filtram, mesmo que tenham valor. Com o tipo fixo, só aparecem os dois campos desse tipo.

### Layout
O painel usa a grade de 4 colunas iguais do `.filter-panel` (16px entre elas), em fluxo normal:

1. **Primeira linha:** Tipo repositório, Código do armazém, Descrição do armazém, Código da credenciada.
2. **Segunda linha:** Descrição da credenciada, Login da equipe, Nome da equipe, Código da oficina.
3. **Terceira linha:** Nome da oficina, Código do cluster, Nome do cluster.

Com o tipo fixo, só os dois campos do tipo, nas duas primeiras colunas da primeira linha.

Até 1100px a grade passa a 2 colunas, e até 700px a 1 coluna, na mesma ordem. Em cada campo de
texto, o operador (104px) e o valor (espaço restante) ficam lado a lado, com 2px entre eles.

### Estados
| Estado             | Quando                                                      | O que deve ser exibido                                                                         |
| ------------------ | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Fechado            | O botão de filtrar do contêiner está desligado              | Painel não aparece; o que foi preenchido é mantido                                             |
| Aberto             | O botão de filtrar do contêiner está ligado                 | "Tipo repositório" e os dez campos, todos habilitados                                          |
| Tipo fixo          | Aberto na escolha de repositório                            | Só os dois campos do tipo escolhido no select da escolha, sem "Tipo repositório"               |
| Tipo marcado       | Ao menos um tipo marcado em "Tipo repositório"              | Campos dos tipos não marcados desabilitados, com rótulo mais claro (#C2C7D0)                    |
| Com filtro ativo   | O último "Atualizar" do contêiner aplicou algum tipo ou valor | Com o painel aberto, os valores ficam visíveis; com o painel fechado, nada indica o filtro |

### Comportamentos
- **Dado** o painel aberto, **quando** o usuário altera qualquer campo, **então** a lista do
  contêiner não muda: o filtro só é aplicado quando o usuário clica em "Atualizar" no contêiner.
- **Dado** um filtro aplicado, **quando** a lista é filtrada, **então**:
  - só entram os repositórios dos tipos marcados (nenhum marcado = todos);
  - se algum campo de texto tiver valor, só entram os tipos que têm campo preenchido;
  - os dois campos do mesmo tipo valem ao mesmo tempo (E); campos de tipos diferentes somam
    resultados (OU). Exemplo: Código do armazém = ARM01 e Login da equipe = jsilva trazem o
    armazém ARM01 e a equipe jsilva;
  - a comparação não diferencia maiúsculas nem acentos e ignora espaços nas pontas do valor.

### CSS
| Classe | Definição |
|---|---|
| :host | display: block; |
| .repo-filter (até 1100px) | grid-template-columns: repeat(2, minmax(0, 1fr)); |
| .repo-filter (até 700px) | grid-template-columns: minmax(0, 1fr); |
