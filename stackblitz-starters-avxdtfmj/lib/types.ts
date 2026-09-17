export type StatusTratamento = 'em_andamento' | 'concluido' | 'pausado';
export interface Cliente {
  id: string;
  nomeCompleto: string;
  dataNascimento: string;
  email: string;
  telefone: string;
  endereco?: string;
  observacoesInternas?: string;
  criadoEm: string;
}
export interface Tratamento {
  id: string;
  clienteId: string;
  tipo: string;
  dataInicio: string;
  status: StatusTratamento;
  temaInicial: string;
  questoesTrazidas?: string;
  sessoesEstimadas?: number;
  areasRelacionadas: string[];
  observacoes?: string;
}
export interface AreaTrabalhadaSelecao {
  areaIds: string[];
  anotacoes?: string;
  incluirNoPdf: boolean;
}
export interface ChakraTrabalhado {
  chakraId: string;
  anotacao?: string;
  incluirNoPdf: boolean;
}
export type StatusSessao = 'rascunho' | 'em_revisao' | 'publicada';
export interface Sessao {
  id: string;
  tratamentoId: string;
  numero: number;
  data: string;
  temaPrincipal: string;
  questoesTrazidas?: string;
  status: StatusSessao;
  areasTrabalhadas?: AreaTrabalhadaSelecao;
  chakrasTrabalhados?: ChakraTrabalhado[];
  casasTrabalhadas?: CasaTrabalhada[];
}
export type CategoriaRegistro =
  | 'energia'
  | 'chakras'
  | 'vidas_passadas'
  | 'bloqueios'
  | 'relacionamentos'
  | 'familia'
  | 'trabalho'
  | 'financeiro'
  | 'emocional'
  | 'feminino'
  | 'traumas'
  | 'espiritualidade'
  | 'mensagens_recebidas'
  | 'recomendacoes'
  | 'orientacoes'
  | 'praticas'
  | 'referencias'
  | 'personalizado';
export type Visibilidade = 'interno' | 'cliente';
export interface Mensagem {
  id: string;
  texto: string;
  incluirNoPdf: boolean;
}
export interface Registro {
  id: string;
  sessaoId: string;
  tiposConteudoIds: string[];
  presencaId?: string;
  oQueSurgiuTexto?: string;
  oQueSurgiuIncluirNoPdf: boolean;
  mensagens: Mensagem[];
  indicacoesIds: string[];
  informacoesInternas?: string;
  criadoEm: string;
}
export type OrigemDocumento = 'upload' | 'sessao';
export interface Documento {
  id: string;
  clienteId: string;
  nome: string;
  tipoArquivo: string;
  tamanho: number;
  dados: string;
  origem: OrigemDocumento;
  sessaoId?: string;
  criadoEm: string;
}
export type TipoItemBiblioteca = 'modelo' | 'conteudo_educativo';
export interface ItemBiblioteca {
  id: string;
  tipo: TipoItemBiblioteca;
  titulo: string;
  texto: string;
  categoria?: CategoriaRegistro;
  criadoEm: string;
}
export interface Tema {
  id: string;
  nome: string;
  nomeNormalizado: string;
  criadoEm: string;
}
export interface Ferramenta {
  id: string;
  nome: string;
  nomeNormalizado: string;
  criadoEm: string;
}
export interface Area {
  id: string;
  nome: string;
  nomeNormalizado: string;
  criadoEm: string;
}
export interface TipoConteudo {
  id: string;
  nome: string;
  nomeNormalizado: string;
  criadoEm: string;
}
export interface Presenca {
  id: string;
  nome: string;
  nomeNormalizado: string;
  criadoEm: string;
}
export interface CategoriaIndicacao {
  id: string;
  nome: string;
  nomeNormalizado: string;
  criadoEm: string;
}
export interface Indicacao {
  id: string;
  clienteId: string;
  categoriaId: string;
  titulo: string;
  autorCriador?: string;
  link?: string;
  anexoNome?: string;
  anexoDados?: string;
  comentario?: string;
  incluirNoPdf: boolean;
  sessoesOrigemIds: string[];
  criadoEm: string;
}
export interface CasaTrabalhada {
  numero: number;
  identificacao?: string;
  trabalhoRealizado?: string;
  observacao?: string;
  mostrarAoCliente: boolean;
  incluirNoPdf: boolean;
}
export interface SessaoInicialInfo {
  quantidade?: number;
  tipo?: string;
  descricao?: string;
  tempoAtuacaoCampo?: string;
}
export interface ManutencoesInfo {
  quantidade?: number;
  modalidade?: string;
  devolutiva?: string;
  intervaloAproximado?: string;
  descricao?: string;
}
export interface EncontrosSuporteInfo {
  quantidade?: number;
  modalidade?: string;
  descricao?: string;
}
export interface DuracaoEstimadaInfo {
  de?: number;
  ate?: number;
}
export interface PlanoTratamento {
  sessaoInicial: SessaoInicialInfo;
  manutencoes: ManutencoesInfo;
  encontrosSuporte: EncontrosSuporteInfo;
  duracaoEstimada: DuracaoEstimadaInfo;
  descricao?: string;
}
export interface AnoPessoalInfo {
  ano?: number;
  anotacoes?: string;
}
export interface TratamentoIndicado {
  ferramentaId: string;
  porqueIndicado?: string;
  incluirNoPdf: boolean;
  plano: PlanoTratamento;
}
export type StatusResumo = 'nao_gerado' | 'rascunho' | 'aprovado';
export interface DiagnosticoInicial {
  id: string;
  tratamentoId: string;
  temasIds: string[];
  anoPessoal: AnoPessoalInfo;
  resultadoOriginal?: string;
  resultadoCliente?: string;
  tratamentosIndicados: TratamentoIndicado[];
  informacoesInternas?: string;
  resumoTexto?: string;
  resumoStatus: StatusResumo;
  criadoEm: string;
  atualizadoEm: string;
}
