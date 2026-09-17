import { CategoriaRegistro } from './types';

export const CATEGORIAS: { valor: CategoriaRegistro; label: string }[] = [
  { valor: 'energia', label: 'Energia' },
  { valor: 'chakras', label: 'Chakras' },
  { valor: 'vidas_passadas', label: 'Vidas passadas' },
  { valor: 'bloqueios', label: 'Bloqueios' },
  { valor: 'relacionamentos', label: 'Relacionamentos' },
  { valor: 'familia', label: 'Família' },
  { valor: 'trabalho', label: 'Trabalho' },
  { valor: 'financeiro', label: 'Financeiro' },
  { valor: 'emocional', label: 'Emocional' },
  { valor: 'feminino', label: 'Feminino' },
  { valor: 'traumas', label: 'Traumas' },
  { valor: 'espiritualidade', label: 'Espiritualidade' },
  { valor: 'mensagens_recebidas', label: 'Mensagens recebidas' },
  { valor: 'recomendacoes', label: 'Recomendações' },
  { valor: 'orientacoes', label: 'Orientações' },
  { valor: 'praticas', label: 'Práticas' },
  { valor: 'referencias', label: 'Referências' },
  { valor: 'personalizado', label: 'Campo personalizado' },
];

export function labelCategoria(valor: CategoriaRegistro): string {
  return CATEGORIAS.find((c) => c.valor === valor)?.label ?? valor;
}
