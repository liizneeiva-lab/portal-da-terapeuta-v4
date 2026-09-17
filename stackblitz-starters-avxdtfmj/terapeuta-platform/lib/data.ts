import { Cliente, Tratamento, Sessao, Registro } from "./types";

// ATENÇÃO: isto é um armazenamento em memória, só para desenvolvimento.
// Os dados são perdidos quando o servidor reinicia. Quando conectarmos um
// banco de dados de verdade (Postgres), estas funções passam a fazer
// consultas reais, mas a "forma" de cada função continua a mesma —
// é por isso que vale a pena já separar os dados da interface agora.

let clientes: Cliente[] = [
  {
    id: "cli_1",
    nomeCompleto: "Ana Beatriz Ferreira",
    dataNascimento: "1990-04-12",
    email: "ana.ferreira@email.com",
    telefone: "(11) 98888-1234",
    endereco: "São Paulo, SP",
    observacoesInternas: "Muito receptiva. Sensível a temas familiares.",
    criadoEm: "2026-07-20T10:00:00.000Z",
  },
  {
    id: "cli_2",
    nomeCompleto: "Marcos Vinícius Oliveira",
    dataNascimento: "1985-11-02",
    email: "marcos.oliveira@email.com",
    telefone: "(11) 97777-5678",
    endereco: "Campinas, SP",
    criadoEm: "2026-06-15T10:00:00.000Z",
  },
];

let tratamentos: Tratamento[] = [
  {
    id: "trat_1",
    clienteId: "cli_1",
    tipo: "Mesa Quântica",
    dataInicio: "2026-08-12",
    status: "em_andamento",
    temaInicial: "Problemas relacionados à vida profissional e financeira.",
    sessoesEstimadas: 6,
    areasRelacionadas: ["Profissional", "Financeiro", "Emocional"],
  },
  {
    id: "trat_2",
    clienteId: "cli_2",
    tipo: "Mesa Quântica",
    dataInicio: "2026-07-01",
    status: "em_andamento",
    temaInicial: "Bloqueios em relacionamentos.",
    sessoesEstimadas: 4,
    areasRelacionadas: ["Relacionamentos", "Emocional"],
  },
];

let sessoes: Sessao[] = [
  {
    id: "ses_1",
    tratamentoId: "trat_1",
    numero: 1,
    data: "2026-07-21",
    temaPrincipal: "Abertura do campo",
    status: "publicada",
  },
  {
    id: "ses_2",
    tratamentoId: "trat_1",
    numero: 2,
    data: "2026-08-04",
    temaPrincipal: "Relacionamentos e feminino",
    status: "publicada",
  },
  {
    id: "ses_3",
    tratamentoId: "trat_1",
    numero: 3,
    data: "2026-08-18",
    temaPrincipal: "Profissional, emocional e familiar",
    status: "rascunho",
  },
];

let registros: Registro[] = [];

function gerarId(prefixo: string) {
  return `${prefixo}_${Math.random().toString(36).slice(2, 10)}`;
}

// ---------- Clientes ----------

export function listarClientes(): Cliente[] {
  return [...clientes].sort((a, b) => a.nomeCompleto.localeCompare(b.nomeCompleto));
}

export function buscarCliente(id: string): Cliente | undefined {
  return clientes.find((c) => c.id === id);
}

export function criarCliente(
  dados: Omit<Cliente, "id" | "criadoEm">
): Cliente {
  const novo: Cliente = {
    ...dados,
    id: gerarId("cli"),
    criadoEm: new Date().toISOString(),
  };
  clientes.push(novo);
  return novo;
}

// ---------- Tratamentos ----------

export function listarTratamentosPorCliente(clienteId: string): Tratamento[] {
  return tratamentos.filter((t) => t.clienteId === clienteId);
}

export function buscarTratamento(id: string): Tratamento | undefined {
  return tratamentos.find((t) => t.id === id);
}

export function criarTratamento(dados: Omit<Tratamento, "id">): Tratamento {
  const novo: Tratamento = { ...dados, id: gerarId("trat") };
  tratamentos.push(novo);
  return novo;
}

export function atualizarTratamento(
  id: string,
  dados: Partial<Omit<Tratamento, "id" | "clienteId">>
): Tratamento | undefined {
  const idx = tratamentos.findIndex((t) => t.id === id);
  if (idx === -1) return undefined;
  tratamentos[idx] = { ...tratamentos[idx], ...dados };
  return tratamentos[idx];
}

// ---------- Sessões ----------

export function listarSessoesPorTratamento(tratamentoId: string): Sessao[] {
  return sessoes
    .filter((s) => s.tratamentoId === tratamentoId)
    .sort((a, b) => b.numero - a.numero);
}

export function contarSessoesRealizadas(tratamentoId: string): number {
  return sessoes.filter(
    (s) => s.tratamentoId === tratamentoId && s.status === "publicada"
  ).length;
}
