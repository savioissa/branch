# app-branch-fields

### Aplicação
Campos cadastrais da filial (Código e Descrição) com as suas validações. É usado na página de
criação (`app-branch-form.md`) e na aba Cadastro da home (`../home/app-branch-register.md`). Os
campos ficam editáveis quando o contêiner está em edição e em leitura quando não está; as ações
(Salvar, Cancelar, Editar) ficam no contêiner.

### Componentização
| Componente   | Tipo    | Onde é usado                    |
| ------------ | ------- | ------------------------------- |
| `pInputText` | Externo | Campos Código e Descrição       |

### Elementos

#### Rótulo "Código"
- **Tag:** `iclass.generic.label.code`, seguido de asterisco vermelho
- **CSS:** `.t-label-field` (globais) + `.form-field__label`; asterisco `.form-field__required`, oculto para leitor de tela.

#### Campo Código
- **Componente:** `pInputText`
- **CSS:** `.ui-input` (globais) + `.form-field__input`
- **Comportamento:** ao tentar passar de 100 caracteres, os excedentes não entram. Ao sair do campo vazio (ou depois de digitar nele), a mensagem de erro aparece e a borda fica vermelha.
- **Regras:** obrigatório (informado ao leitor de tela); não aceita vazio nem só espaços; até 100 caracteres; único entre as filiais; sem autocompletar; o valor é gravado sem os espaços das pontas. Com o formulário em leitura, fica desabilitado (fundo cinza, texto apagado, sem sombra).
- **Origem do dado:** `--`

#### Mensagem de erro do Código
- **Tag:** vazio ou só espaços: `iclass.generic.label.enter-code`; código já usado por outra filial (resposta do salvar): `iclass.generic.label.branch-code-already-exists`
- **CSS:** `.form-field__error`
- **Regras:** só aparece depois que o usuário saiu do campo, digitou nele ou tentou salvar; fica ligada ao campo para o leitor de tela; com ela, o campo recebe `.form-field__input--invalid`.

#### Rótulo "Descrição"
- **Tag:** `iclass.generic.label.description`, seguido de asterisco vermelho
- **CSS:** `.t-label-field` (globais) + `.form-field__label`; asterisco `.form-field__required`, oculto para leitor de tela.

#### Campo Descrição
- **Componente:** `pInputText`
- **CSS:** `.ui-input` (globais) + `.form-field__input`
- **Comportamento:** igual ao do Campo Código.
- **Regras:** obrigatória; não aceita vazio nem só espaços; até 100 caracteres; sem autocompletar; gravada sem os espaços das pontas. Em leitura, desabilitada.
- **Origem do dado:** `--`

#### Mensagem de erro da Descrição
- **Tag:** `iclass.generic.label.enter-description`
- **CSS:** `.form-field__error`
- **Regras:** mesmas da Mensagem de erro do Código.

### Layout
Grid de duas colunas iguais, com 16px entre elas:

1. **Esquerda:** Código.
2. **Direita:** Descrição.

Cada campo é uma coluna com rótulo, entrada (40px de altura) e mensagem de erro, com 6px entre
eles. Até 700px os campos ficam um abaixo do outro.

### Estados
| Estado            | Quando                                         | O que deve ser exibido                                                              |
| ----------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------- |
| Carregando        | A home está carregando a filial                | Um bloco de skeleton de 66px por campo (rótulo + entrada), ocultos para leitor de tela |
| Leitura           | Formulário desabilitado (home fora de edição)  | Valores em campos cinza, não editáveis                                              |
| Edição            | Formulário habilitado (criação; home em edição) | Campos brancos e editáveis                                                         |
| Erro de validação | Campo inválido depois de tocado                | Borda vermelha (também no foco) e mensagem abaixo do campo                          |

Salvando e Erro ao salvar pertencem ao contêiner de cada página (`app-branch-form.md`, `../home/app-branch-register.md`).

### Comportamentos
— (não se aplica)

### CSS
| Classe | Definição |
|---|---|
| :host | display: block; |
| .form-grid | display: grid;<br>grid-template-columns: repeat(2, minmax(0, 1fr));<br>gap: 16px; |
| .form-field | display: flex;<br>flex-direction: column;<br>gap: 6px;<br>min-width: 0; |
| .form-field__label | color: #1F2937; |
| .form-field__required | color: #DC2626;<br>margin-left: 2px; |
| .form-field__input | box-shadow: 0 1px 2px rgba(16, 24, 40, .06); |
| .form-field__input:disabled | opacity: 1;<br>background: #EDEEF0;<br>border-color: #D9DCE1;<br>color: #9CA3AF;<br>box-shadow: none; |
| .form-field__input--invalid, .form-field__input--invalid:focus | border-color: #DC2626; |
| .form-field__input--invalid:focus | outline-color: #DC262655; |
| .form-field__error | font: var(--secondary-sm);<br>color: #DC2626; |
| .field-skeleton | height: 66px;<br>border-radius: 6px; |
| .form-grid (até 700px) | grid-template-columns: minmax(0, 1fr); |
