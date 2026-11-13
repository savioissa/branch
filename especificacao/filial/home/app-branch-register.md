# app-branch-register

### Aplicação
Conteúdo da aba Cadastro da home: mostra os dados cadastrais da filial em leitura e conduz a
edição (Editar, Cancelar, Salvar), com o alerta de erro ao salvar. Os campos e as validações
vêm de `app-branch-fields`.

### Componentização
| Componente          | Tipo    | Onde é usado                                                       |
| ------------------- | ------- | ------------------------------------------------------------------ |
| `app-branch-fields` | Interno | Campos Código e Descrição, em leitura ou edição (`../criacao/app-branch-fields.md`) |
| `p-button`          | Externo | Editar, Cancelar e Salvar                                          |

### Elementos

#### Botão "Editar"
- **Tag:** `portal.generic.button.edit`
- **Componente:** `p-button`
- **Ícone:** `pi pi-pencil`
- **CSS:** `btn--md btn--primary` (globais)
- **Comportamento:** ao clicar, os campos ficam editáveis, "Cancelar" e "Salvar" tomam o lugar do botão e o alerta de erro, se houver, some.
- **Regras:** desabilitado enquanto a filial carrega; não aparece em edição.

#### Botão "Cancelar"
- **Tag:** `portal.generic.button.cancel`
- **Componente:** `p-button`
- **CSS:** `btn--md btn--neutral` (globais)
- **Comportamento:** ao clicar, os campos voltam aos valores gravados, em leitura, sem pedir confirmação.
- **Regras:** só em edição; desabilitado enquanto salva.

#### Botão "Salvar"
- **Tag:** `portal.generic.button.save`
- **Componente:** `p-button` (envia o formulário; Enter num campo também envia)
- **CSS:** `btn--md btn--primary` (globais)
- **Comportamento:** ao clicar, grava Código e Descrição sem os espaços das pontas e volta à leitura, sem toast.
- **Regras:** só em edição; habilitado só com alteração e formulário válido; mostra carregando enquanto salva.
- **Origem do dado:** `--`

#### Alerta de erro ao salvar
- **Tag:** `iclass.generic.label.could-not-save-branch`
- **Ícone:** `pi pi-exclamation-circle`
- **CSS:** `.form-alert` (globais); papel de alerta para o leitor de tela.
- **Regras:** aparece acima dos campos quando a gravação falha por outro motivo que não o código duplicado.

#### Campos
- **Componente:** `app-branch-fields`
- **Regras:** em leitura fora da edição; editáveis em edição; em skeleton enquanto a filial carrega. Sempre que a filial muda (carga ou gravação), voltam aos valores gravados, em leitura.

### Layout
Coluna com 4px entre os blocos:

1. **Barra de ações:** à direita, com 8px entre os botões ("Editar", ou "Cancelar" e "Salvar").
2. **Alerta de erro** (quando houver).
3. **Campos** (`app-branch-fields`), na largura toda.

### Estados
| Estado                           | Quando                                      | O que deve ser exibido                                                                 |
| -------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------- |
| Carregando                       | Enquanto a filial carrega                   | Campos em skeleton; "Editar" desabilitado                                              |
| Leitura                          | Filial carregada, fora de edição            | Campos desabilitados (cinza) e "Editar"                                                 |
| Edição                           | Depois de "Editar"                          | Campos editáveis, "Cancelar" e "Salvar"                                                 |
| Salvando                         | Depois de "Salvar"                          | "Salvar" com carregando, "Cancelar" desabilitado                                        |
| Erro de validação                | Campo inválido em edição                    | Mensagem no campo (em `app-branch-fields`); "Salvar" desabilitado                       |
| Erro ao salvar: código duplicado | A gravação recusa o código                  | `iclass.generic.label.branch-code-already-exists` no Código; continua em edição         |
| Erro ao salvar: outro erro       | A gravação falha                            | Alerta de erro acima dos campos; continua em edição                                     |

### Comportamentos
- **Dado** a aba Cadastro em edição, **quando** o usuário troca de aba e volta, **então** a
  edição continua aberta.

### CSS
| Classe | Definição |
|---|---|
| :host | display: block; |
| .tab-body | display: flex;<br>flex-direction: column;<br>gap: 4px; |
| .tab-toolbar | display: flex;<br>justify-content: flex-end;<br>gap: 8px; |
