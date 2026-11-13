# CSS global — Filial

Classes de `src/styles.css` e `src/styles.scss` usadas pelos componentes desta especificação. O
tema é o `lara-light-blue` do PrimeNG 17, com PrimeIcons 7; aqui entram só as sobrescritas.

## Tokens de texto

```css
:root {
  --font-family: 'Geist', system-ui, sans-serif;
  --font-family-text: 'Geist', system-ui, sans-serif;

  --title-lg: 600 24px/32px var(--font-family-text);
  --title-sm: 600 16px/24px var(--font-family-text);

  --secondary-lg: 400 14px/21px var(--font-family-text);
  --secondary-md: 400 13px/20px var(--font-family-text);
  --secondary-sm: 400 11px/16px var(--font-family-text);

  --label-field: 500 13px/20px var(--font-family-text);
  --label-overline: 500 11px/16px var(--font-family-text);

  --letter-spacing-overline: .03em;
}

.t-title-lg { font: var(--title-lg); letter-spacing: -.015em; }
.t-title-sm { font: var(--title-sm); letter-spacing: -.005em; }
.t-label-field { font: var(--label-field); }

body, button, input, select, textarea { font-family: 'Geist', system-ui, sans-serif; }
body { margin: 0; background: #FAFAFA; font-family: 'Geist', system-ui, sans-serif; color: #1E293B; }
```

## Página

```css
.page-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 32px;
  background: #FAFAFA;
  border-bottom: 1px solid #E2E8F0;
}

.page-header .page-header__title {
  margin: 0;
  font-weight: 500;
  color: #1F2937;
}

.page-header__actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}

.page-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 32px 24px;
}

@media (max-width: 700px) {
  .page-header,
  .page-content {
    padding-left: 16px;
    padding-right: 16px;
  }
}
```

## Abas

```css
.req-tabs .p-tabview-nav { background: transparent; }
.req-tabs .p-tabview-nav li .p-tabview-nav-link { background: transparent; padding: 10px 16px; font-size: 14px; font-weight: 600; }
.req-tabs .p-tabview-panels { background: transparent; padding: 16px 0 0; }
```

## Botões

```css
.p-button.p-button-icon-only { width: auto; aspect-ratio: 1 / 1; padding: 0; justify-content: center; }
.p-button.p-button-icon-only { gap: 0; }
.p-button:disabled { opacity: .5; }

.p-button.btn--md, .p-button.btn--lg { box-sizing: border-box; line-height: 1; }

.p-button.btn--md { height: 32px; padding: 0 16px; font-size: 16px; gap: 6px; font-weight: 500; }
.p-button.btn--md .p-button-icon { font-size: 16px; }
.p-button.btn--md .p-button-label { font-weight: 500; }

.p-button.btn--lg { height: 40px; padding: 0 20px; font-size: 16px; gap: 8px; font-weight: 500; }
.p-button.btn--lg .p-button-icon { font-size: 20px; }
.p-button.btn--lg .p-button-label { font-weight: 500; }

.p-button.btn--primary { background: #3b82f6; color: #ffffff; border-color: transparent; border-radius: 4px; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10); }
.p-button.btn--primary:not(:disabled):hover { background: #1d4ed8; color: #ffffff; border-color: transparent; }

.p-button.btn--secondary { background: #ffffff; color: #1d4ed8; border-color: #d9dce1; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10); }
.p-button.btn--secondary:not(:disabled):hover { background: #f1f2f4; color: #1e40af; border-color: #d9dce1; }
.p-button.btn--secondary:not(:disabled):active { background: #e2e4e8; color: #1d4ed8; border-color: #d9dce1; }
.is-active > .p-button.btn--secondary { background: #e9f2ff; color: #1d4ed8; border-color: #60a5fa; }
.p-button.btn--secondary:disabled { background: #ffffff; color: #93c5fd; border-color: #d9dce1; }

.p-button.btn--neutral { background: #ffffff; color: #1f2937; border-color: #d9dce1; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10); }
.p-button.btn--neutral:not(:disabled):hover { background: #f1f2f4; color: #111827; border-color: #d9dce1; }
.p-button.btn--neutral:not(:disabled):active { background: #e2e4e8; color: #111827; border-color: #d9dce1; }
.is-active > .p-button.btn--neutral { background: #e9f2ff; color: #1d4ed8; border-color: #60a5fa; }
.is-active > .p-button.btn--neutral:not(:disabled):hover { background: #e9f2ff; color: #1d4ed8; border-color: #60a5fa; }

.p-button.btn--danger { background: #dc2626; color: #ffffff; border-color: transparent; border-radius: 4px; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10); }
.p-button.btn--danger:not(:disabled):hover { background: #b91c1c; color: #ffffff; border-color: transparent; }

.p-button.btn--danger.btn--text { color: #dc2626; justify-content: center; background: transparent; box-shadow: none; border: none; }
.p-button.btn--danger.btn--text:not(:disabled):hover { background: #fef2f2; color: #dc2626; border-color: transparent; }

/* botão de texto com a cor dos ícones do botão neutro (abrir, editar) */
.p-button.btn--text.icon-neutral { color: #1f2937; }
.p-button.btn--text.icon-neutral:not(:disabled):hover { background: #f1f2f4; color: #111827; }

/* ícones de 16px nos botões do cabeçalho da lista */
.p-button.header-btn .p-button-icon { font-size: 16px; }
```

`is-active` vai no `p-button` (o host), e não no botão interno.

## Ícone "desvincular"

O PrimeIcons 7 não tem o ícone de corrente cortada. Ele é desenhado em SVG e aplicado como
máscara: segue a cor do botão e o tamanho da fonte, como os outros `.pi`. Uso: `pi pi-link-slash`.

```css
.pi.pi-link-slash::before {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: -0.125em;
  background-color: currentColor;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9 15l3-3m2-2l1-1'/%3E%3Cpath d='M11 6l.463-.536a5 5 0 0 1 7.071 7.072l-.534.464'/%3E%3Cpath d='M13 18l-.397.534a5.068 5.068 0 0 1-7.127 0a4.972 4.972 0 0 1 0-7.071l.524-.463'/%3E%3Cpath d='M3 3l18 18'/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9 15l3-3m2-2l1-1'/%3E%3Cpath d='M11 6l.463-.536a5 5 0 0 1 7.071 7.072l-.534.464'/%3E%3Cpath d='M13 18l-.397.534a5.068 5.068 0 0 1-7.127 0a4.972 4.972 0 0 1 0-7.071l.524-.463'/%3E%3Cpath d='M3 3l18 18'/%3E%3C/svg%3E") center / contain no-repeat;
}
```

## Cards e listas

```css
.reg-card { display: grid; align-items: center; gap: 16px; min-height: 48px; padding: 8px 16px; box-sizing: border-box; background: #fff; border: 1px solid #E9EBF2; border-radius: 10px; box-shadow: 0 2px 6px rgba(16, 24, 40, .13); }

.kv { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.kv-k { font: var(--secondary-md); color: #9CA3AF; }
.kv-v { font: var(--secondary-md); color: #212121; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* ações à direita dos cards (desvincular, selecionar, abrir) */
.card-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2px;
}

.card-actions .p-button + .p-button,
.card-actions p-button + p-button {
  margin-left: 0;
}

/* "Selecionar" na escolha de almoxarifado e repositório: antes de "Abrir", afastado dele */
.card-actions .p-button.card-actions__pick {
  margin-right: 8px;
}

.list-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
```

## Painéis de filtro e ordenação

```css
.filter-panel, .sort-panel { padding: 10px 12px; background: #EBEDF0; border: 1px solid #D9DCE1; border-radius: 4px; }
.filter-panel { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
.filter-panel__field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.filter-panel__label { font: var(--label-overline); letter-spacing: var(--letter-spacing-overline); text-transform: uppercase; color: #6B7280; }
/* campo desabilitado pelo que já foi escolhido em outro filtro (ex.: tipo de repositório) */
.filter-panel__field--disabled .filter-panel__label { color: #C2C7D0; }
.filter-panel__control { display: flex; gap: 2px; min-width: 0; }
.filter-panel__input.p-inputtext { flex: 1; min-width: 0; width: 100%; height: 32px; padding: 0 10px; border-color: #D9DCE1; border-radius: 4px; font-size: 13px; color: #1F2937; }
.filter-panel__input.p-inputtext:enabled:hover { border-color: #3B82F6; }
.filter-panel__input.p-inputtext:enabled:focus { border-color: #3B82F6; box-shadow: 0 0 0 2px #EFF6FF; }

.sort-panel { display: flex; flex-direction: column; gap: 4px; }
.sort-panel__label { font: var(--label-field); color: #4B5563; }
.sort-panel__control { display: flex; align-items: center; gap: 6px; min-width: 0; }
.sort-panel__field { flex: 1; min-width: 0; }

.filter-panel__operator.p-dropdown, .sort-panel__select.p-dropdown { width: 104px; height: 32px; align-items: center; border-color: #D9DCE1; border-radius: 4px; }
.sort-panel__select.p-dropdown { width: 100%; }
.filter-panel__operator.p-dropdown .p-dropdown-label, .sort-panel__select.p-dropdown .p-dropdown-label { padding: 0 0 0 10px; font-size: 13px; color: #1F2937; }
.filter-panel__operator.p-dropdown .p-dropdown-trigger, .sort-panel__select.p-dropdown .p-dropdown-trigger { width: 28px; }
.filter-panel__operator.p-dropdown .p-dropdown-trigger .p-icon, .sort-panel__select.p-dropdown .p-dropdown-trigger .p-icon { width: 12px; height: 12px; }
.filter-panel__operator.p-dropdown:not(.p-disabled):hover, .sort-panel__select.p-dropdown:not(.p-disabled):hover { border-color: #3B82F6; }
.filter-panel__operator.p-dropdown:not(.p-disabled).p-focus, .sort-panel__select.p-dropdown:not(.p-disabled).p-focus { border-color: #3B82F6; box-shadow: 0 0 0 2px #EFF6FF; }
.filter-panel__operator-panel.p-dropdown-panel .p-dropdown-items, .sort-panel__select-panel.p-dropdown-panel .p-dropdown-items { padding: 4px; }
.filter-panel__operator-panel.p-dropdown-panel .p-dropdown-item, .sort-panel__select-panel.p-dropdown-panel .p-dropdown-item { padding: 6px 10px; border-radius: 4px; font-size: 13px; }
.filter-panel__operator-panel.p-dropdown-panel .p-dropdown-item.p-highlight, .sort-panel__select-panel.p-dropdown-panel .p-dropdown-item.p-highlight { background: #E9F2FF; color: #1d4ed8; }

/* campo multiselect (Tipo repositório) */
.filter-panel__multi.p-multiselect { width: 100%; }
.filter-panel__multi.p-multiselect { height: 32px; align-items: center; border-color: #D9DCE1; border-radius: 4px; }
.filter-panel__multi.p-multiselect .p-multiselect-label { padding: 0 0 0 10px; font-size: 13px; color: #1F2937; }
.filter-panel__multi.p-multiselect .p-multiselect-label.p-placeholder { color: #6B7280; }
.filter-panel__multi.p-multiselect .p-multiselect-trigger { width: 28px; }
.filter-panel__multi.p-multiselect .p-multiselect-trigger .p-icon { width: 12px; height: 12px; }
.filter-panel__multi.p-multiselect:not(.p-disabled):hover { border-color: #3B82F6; }
.filter-panel__multi.p-multiselect:not(.p-disabled).p-focus { border-color: #3B82F6; box-shadow: 0 0 0 2px #EFF6FF; }
.filter-panel__multi-panel .p-multiselect-items { padding: 4px; }
.filter-panel__multi-panel .p-multiselect-item { padding: 6px 10px; border-radius: 4px; font-size: 13px; }
.filter-panel__multi-panel .p-multiselect-item.p-highlight { background: #E9F2FF; color: #1d4ed8; }
```

## Painel de vinculação e de adicionar

Painel da tela de adicionar repositório (cinza, como abaixo) e da seção de vinculação de
almoxarifado, que troca o fundo e a borda por azul-claros (#F6FAFF e #C6DFFF) com `.link-panel`,
no CSS do componente (`home/app-branch-stock-partition-link.md`).

```css
.insumo-layer { display: flex; flex-direction: column; gap: 12px; padding: 16px; background: #F1F2F4; border: 1px solid #E5E7EB; border-radius: 10px; }
```

## Paginador

Sem fundo em todas as listas.

```css
.p-paginator { background: transparent; border: none; padding: 4px 0; justify-content: flex-end; }
.insumo-layer .p-paginator { border-top: 1px solid #F1F5F9; border-radius: 0 0 10px 10px; padding: 6px 12px; }

.p-paginator.paginator--md .p-paginator-first,
.p-paginator.paginator--md .p-paginator-prev,
.p-paginator.paginator--md .p-paginator-next,
.p-paginator.paginator--md .p-paginator-last,
.p-paginator.paginator--md .p-paginator-pages .p-paginator-page { min-width: 32px; height: 32px; }
```

## Formulário

```css
.ui-input { height: 40px; padding: 0 12px; border-radius: 6px; border: 1px solid #CBD5E1; background: #fff; color: #1E293B; font: var(--secondary-lg); box-sizing: border-box; width: 100%; }
.ui-input:focus { outline: 2px solid #3B82F655; border-color: #3B82F6; }

/* alerta de erro geral em formulários */
.form-alert {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid #FECACA;
  border-radius: 6px;
  background: #FEF2F2;
  color: #B91C1C;
  font: var(--secondary-md);
}
```

## Modal de confirmação

Modal sem título: só a mensagem e as ações. Usado na saída da criação, nas confirmações de
desvínculo e nos avisos de desvínculo bloqueado (título em negrito, texto e lista).

```css
.p-confirm-dialog.leave-dialog .p-dialog-header { display: none; }
.p-confirm-dialog.leave-dialog .p-dialog-content { padding-top: 24px; border-top-left-radius: 6px; border-top-right-radius: 6px; }

.p-confirm-dialog.leave-dialog .p-confirm-dialog-message { display: block; }
.p-confirm-dialog.leave-dialog .p-confirm-dialog-message p { margin: 6px 0 0; }
.p-confirm-dialog.leave-dialog .p-confirm-dialog-message ul { margin: 8px 0 0; padding-left: 18px; }
.p-confirm-dialog.leave-dialog .p-confirm-dialog-message li + li { margin-top: 2px; }

.p-dialog .p-dialog-footer .p-button { white-space: nowrap; }
```

## Estados

```css
@keyframes ui-skeleton { 0% { background-position: 100% 50%; } 100% { background-position: 0 50%; } }
.skeleton { height: 18px; border-radius: 4px; background: linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 37%, #F1F5F9 63%); background-size: 400% 100%; animation: ui-skeleton 1.4s ease infinite; }

/* skeleton do paginador durante o carregamento: um bloco só, no lugar do paginador */
.skeleton.skeleton-paginator {
  align-self: flex-end;
  width: 300px;
  max-width: 100%;
  height: 32px;
  margin: 4px 0;
  border-radius: 16px;
}

/* vazio e sem resultado */
.req-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; min-height: 240px; color: #6B7280; font: var(--secondary-lg); }
.req-empty p { margin: 0; }
.req-empty > .pi { font-size: 18px; }

/* estado que ocupa o espaço restante e fica centralizado */
.state-fill { flex: 1; }

/* vazio, sem resultado e erro na seção de vinculação e nas escolhas da tela de adicionar; erro nas listas */
.load-state { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 24px; text-align: center; font: var(--secondary-md); color: #6A7282; }
.load-state > .pi { font-size: 20px; color: #94A3B8; }
.load-state--error > .pi { color: #DC2626; }
.load-state p { margin: 0; }
```
