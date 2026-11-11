import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

export type BranchFormGroup = FormGroup<{
  codigo: FormControl<string>;
  descricao: FormControl<string>;
}>;

/** Validador: rejeita valor só com espaços (o `required` aceita "   "). */
const notBlank = Validators.pattern(/\S/);

/** Limite de caracteres de Código e Descrição (especificação do cadastro). */
export const BRANCH_FIELD_MAX_LENGTH = 100;

/** Cria o formulário de filial usado no cadastro e na edição. */
export function createBranchForm(fb: NonNullableFormBuilder): BranchFormGroup {
  const max = Validators.maxLength(BRANCH_FIELD_MAX_LENGTH);
  return fb.group({
    codigo: ['', [Validators.required, notBlank, max]],
    descricao: ['', [Validators.required, notBlank, max]]
  });
}

/**
 * Campos Código e Descrição da filial, lado a lado. Usado no cadastro (Nova Filial) e na aba Cadastro
 * do detalhe. Quando o grupo está desabilitado, os campos aparecem em modo de leitura; com `loading`, em skeleton.
 */
@Component({
  selector: 'app-branch-fields',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule],
  templateUrl: './branch-fields.component.html',
  styleUrl: './branch-fields.component.scss'
})
export class BranchFieldsComponent {
  @Input({ required: true }) group!: BranchFormGroup;
  /** Carregando: cada campo (rótulo + input) vira um bloco de skeleton. */
  @Input() loading = false;

  readonly maxLength = BRANCH_FIELD_MAX_LENGTH;

  /** Mostra erro do campo só depois que o usuário passou por ele. */
  invalido(campo: 'codigo' | 'descricao'): boolean {
    const c = this.group.controls[campo];
    return c.invalid && (c.touched || c.dirty);
  }
}
