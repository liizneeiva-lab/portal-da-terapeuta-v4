// Modelo de dados central da plataforma.
// Reflete a arquitetura definida: Terapeuta -> Cliente -> Tratamento -> Sessão -> Registro.
// Por enquanto os dados vivem em memória (lib/data.ts). Quando ligarmos a um banco
// de verdade (Postgres), estes tipos viram praticamente o schema do Prisma.

export type StatusTratamento = "em_andamento" | "concluido" | "pausado";

export interface Cliente {
  id: string;
  nomeCompleto: string;
  dataNascimento: string; // ISO date (YYYY-MM-DD)
  email: string;
  telefone: string;
  endereco?: string;
  observacoesInternas?: string;
  criadoEm: string;
}

export interface Tratamento {
  id: string;
  clienteId: string;
  tipo: string; // ex: "Mesa Quântica" — string livre, não um enum fixo
  dataInicio: string;
  status: StatusTratamento;
  temaInicial: string;
  questoesTrazidas?: string;
  sessoesEstimadas?: number; // opcional — pode não ser definida de início
  areasRelacionadas: string[];
  observacoes?: string;
}

export type StatusSessao = "rascunho" | "em_revisao" | "publicada";

export interface Sessao {
  id: string;
  tratamentoId: string;
  numero: number;
  data: string;
  temaPrincipal: string;
  questoesTrazidas?: string;
  status: StatusSessao;
}

export type CategoriaRegistro =
  | "energia"
  | "chakras"
  | "vidas_passadas"
  | "bloqueios"
  | "relacionamentos"
  | "familia"
  | "trabalho"
  | "financeiro"
  | "emocional"
  | "feminino"
  | "traumas"
  | "espiritualidade"
  | "mensagens_recebidas"
  | "recomendacoes"
  | "orientacoes"
  | "praticas"
  | "referencias"
  | "personalizado";

export type Visibilidade = "interno" | "cliente";

export interface Registro {
  id: string;
  sessaoId: string;
  categoria: CategoriaRegistro;
  tituloPersonalizado?: string; // usado quando categoria === "personalizado"
  notaInterna?: string;
  versaoCliente?: string;
  visibilidade: Visibilidade;
  incluirNoPdf: boolean;
  destacar: boolean;
  criadoEm: string;
}
