import {
  Cliente,
  Tratamento,
  Sessao,
  Registro,
  Documento,
  ItemBiblioteca,
} from './types';
let clientes: Cliente[] = [
  {
    id: 'cli_1',
    nomeCompleto: 'Ana Beatriz Ferreira',
    dataNascimento: '1990-04-12',
    email: 'ana.ferreira@email.com',
    telefone: '(11) 98888-1234',
    endereco: 'São Paulo, SP',
    observacoesInternas: 'Muito receptiva. Sensível a temas familiares.',
    criadoEm: '2026-07-20T10:00:00.000Z',
  },
  {
    id: 'cli_2',
    nomeCompleto: 'Marcos Vinícius Oliveira',
    dataNascimento: '1985-11-02',
    email: 'marcos.oliveira@email.com',
    telefone: '(11) 97777-5678',
    endereco: 'Campinas, SP',
    criadoEm: '2026-06-15T10:00:00.000Z',
  },
];

let tratamentos: Tratamento[] = [
  {
    id: 'trat_1',
    clienteId: 'cli_1',
    tipo: 'Mesa Quântica',
    dataInicio: '2026-08-12',
    status: 'em_andamento',
    temaInicial: 'Problemas relacionados à vida profissional e financeira.',
    sessoesEstimadas: 6,
    areasRelacionadas: ['Profissional', 'Financeiro', 'Emocional'],
  },
  {
    id: 'trat_2',
    clienteId: 'cli_2',
    tipo: 'Mesa Quântica',
    dataInicio: '2026-07-01',
    status: 'em_andamento',
    temaInicial: 'Bloqueios em relacionamentos.',
    sessoesEstimadas: 4,
    areasRelacionadas: ['Relacionamentos', 'Emocional'],
  },
];

let sessoes: Sessao[] = [
  {
    id: 'ses_1',
    tratamentoId: 'trat_1',
    numero: 1,
    data: '2026-07-21',
    temaPrincipal: 'Abertura do campo',
    status: 'publicada',
  },
  {
    id: 'ses_2',
    tratamentoId: 'trat_1',
    numero: 2,
    data: '2026-08-04',
    temaPrincipal: 'Relacionamentos e feminino',
    status: 'publicada',
  },
  {
    id: 'ses_3',
    tratamentoId: 'trat_1',
    numero: 3,
    data: '2026-08-18',
    temaPrincipal: 'Profissional, emocional e familiar',
    status: 'rascunho',
  },
];

let registros: Registro[] = [];

function gerarId(prefixo: string) {
  return `${prefixo}_${Math.random().toString(36).slice(2, 10)}`;
}

export function listarClientes(): Cliente[] {
  return [...clientes].sort((a, b) =>
    a.nomeCompleto.localeCompare(b.nomeCompleto)
  );
}

export function buscarCliente(id: string): Cliente | undefined {
  return clientes.find((c) => c.id === id);
}

export function criarCliente(dados: Omit<Cliente, 'id' | 'criadoEm'>): Cliente {
  const novo: Cliente = {
    ...dados,
    id: gerarId('cli'),
    criadoEm: new Date().toISOString(),
  };
  clientes.push(novo);
  return novo;
}

export function listarTratamentosPorCliente(clienteId: string): Tratamento[] {
  return tratamentos.filter((t) => t.clienteId === clienteId);
}

export function buscarTratamento(id: string): Tratamento | undefined {
  return tratamentos.find((t) => t.id === id);
}

export function criarTratamento(dados: Omit<Tratamento, 'id'>): Tratamento {
  const novo: Tratamento = { ...dados, id: gerarId('trat') };
  tratamentos.push(novo);
  return novo;
}

export function atualizarTratamento(
  id: string,
  dados: Partial<Omit<Tratamento, 'id' | 'clienteId'>>
): Tratamento | undefined {
  const idx = tratamentos.findIndex((t) => t.id === id);
  if (idx === -1) return undefined;
  tratamentos[idx] = { ...tratamentos[idx], ...dados };
  return tratamentos[idx];
}

export function listarSessoesPorTratamento(tratamentoId: string): Sessao[] {
  return sessoes
    .filter((s) => s.tratamentoId === tratamentoId)
    .sort((a, b) => b.numero - a.numero);
}

export function contarSessoesRealizadas(tratamentoId: string): number {
  return sessoes.filter(
    (s) => s.tratamentoId === tratamentoId && s.status === 'publicada'
  ).length;
}

export function buscarSessao(id: string): Sessao | undefined {
  return sessoes.find((s) => s.id === id);
}

export function proximoNumeroSessao(tratamentoId: string): number {
  const doTratamento = sessoes.filter((s) => s.tratamentoId === tratamentoId);
  if (doTratamento.length === 0) return 1;
  return Math.max(...doTratamento.map((s) => s.numero)) + 1;
}

export function criarSessao(dados: Omit<Sessao, 'id'>): Sessao {
  const nova: Sessao = { ...dados, id: gerarId('ses') };
  sessoes.push(nova);
  return nova;
}

export function atualizarSessao(
  id: string,
  dados: Partial<Omit<Sessao, 'id' | 'tratamentoId'>>
): Sessao | undefined {
  const idx = sessoes.findIndex((s) => s.id === id);
  if (idx === -1) return undefined;
  sessoes[idx] = { ...sessoes[idx], ...dados };
  return sessoes[idx];
}

export function excluirSessao(id: string): boolean {
  const idx = sessoes.findIndex((s) => s.id === id);
  if (idx === -1) return false;
  sessoes.splice(idx, 1);
  registros = registros.filter((r) => r.sessaoId !== id);
  return true;
}

export function listarRegistrosPorSessao(sessaoId: string): Registro[] {
  return registros
    .filter((r) => r.sessaoId === sessaoId)
    .sort((a, b) => a.criadoEm.localeCompare(b.criadoEm));
}

export function buscarRegistro(id: string): Registro | undefined {
  return registros.find((r) => r.id === id);
}

export function criarRegistro(
  dados: Omit<Registro, 'id' | 'criadoEm'>
): Registro {
  const novo: Registro = {
    ...dados,
    id: gerarId('reg'),
    criadoEm: new Date().toISOString(),
  };
  registros.push(novo);
  return novo;
}

export function atualizarRegistro(
  id: string,
  dados: Partial<Omit<Registro, 'id' | 'sessaoId' | 'criadoEm'>>
): Registro | undefined {
  const idx = registros.findIndex((r) => r.id === id);
  if (idx === -1) return undefined;
  registros[idx] = { ...registros[idx], ...dados };
  return registros[idx];
}

export function excluirRegistro(id: string): boolean {
  const idx = registros.findIndex((r) => r.id === id);
  if (idx === -1) return false;
  registros.splice(idx, 1);
  return true;
}
let documentos: Documento[] = [];

export function listarDocumentosPorCliente(clienteId: string): Documento[] {
  return documentos
    .filter((d) => d.clienteId === clienteId)
    .sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
}

export function buscarDocumento(id: string): Documento | undefined {
  return documentos.find((d) => d.id === id);
}

export function criarDocumento(
  dados: Omit<Documento, 'id' | 'criadoEm'>
): Documento {
  const novo: Documento = {
    ...dados,
    id: gerarId('doc'),
    criadoEm: new Date().toISOString(),
  };
  documentos.push(novo);
  return novo;
}

export function excluirDocumento(id: string): boolean {
  const idx = documentos.findIndex((d) => d.id === id);
  if (idx === -1) return false;
  documentos.splice(idx, 1);
  return true;
}
let itensBiblioteca: ItemBiblioteca[] = [];

export function listarItensBiblioteca(
  tipo?: ItemBiblioteca['tipo']
): ItemBiblioteca[] {
  const todos = [...itensBiblioteca].sort((a, b) =>
    a.titulo.localeCompare(b.titulo)
  );
  if (!tipo) return todos;
  return todos.filter((i) => i.tipo === tipo);
}

export function buscarItemBiblioteca(id: string): ItemBiblioteca | undefined {
  return itensBiblioteca.find((i) => i.id === id);
}

export function criarItemBiblioteca(
  dados: Omit<ItemBiblioteca, 'id' | 'criadoEm'>
): ItemBiblioteca {
  const novo: ItemBiblioteca = {
    ...dados,
    id: gerarId('bib'),
    criadoEm: new Date().toISOString(),
  };
  itensBiblioteca.push(novo);
  return novo;
}

export function atualizarItemBiblioteca(
  id: string,
  dados: Partial<Omit<ItemBiblioteca, 'id' | 'criadoEm'>>
): ItemBiblioteca | undefined {
  const idx = itensBiblioteca.findIndex((i) => i.id === id);
  if (idx === -1) return undefined;
  itensBiblioteca[idx] = { ...itensBiblioteca[idx], ...dados };
  return itensBiblioteca[idx];
}

export function excluirItemBiblioteca(id: string): boolean {
  const idx = itensBiblioteca.findIndex((i) => i.id === id);
  if (idx === -1) return false;
  itensBiblioteca.splice(idx, 1);
  return true;
}
