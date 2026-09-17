import { NextResponse } from 'next/server';
import { criarTratamento } from '@/lib/data';

function parseAreas(raw: string): string[] {
  return raw
    .split(',')
    .map((a) => a.trim())
    .filter(Boolean);
}

export async function POST(request: Request) {
  const body = await request.json();
  const clienteId = String(body.clienteId || '');
  const tipo = String(body.tipo || '').trim();
  const temaInicial = String(body.temaInicial || '').trim();

  if (!clienteId || !tipo || !temaInicial) {
    return NextResponse.json(
      { error: 'Preencha tipo e tema inicial para continuar.' },
      { status: 400 }
    );
  }

  const tratamento = criarTratamento({
    clienteId,
    tipo,
    dataInicio: String(body.dataInicio || ''),
    status: 'em_andamento',
    temaInicial,
    questoesTrazidas: body.questoesTrazidas
      ? String(body.questoesTrazidas)
      : undefined,
    sessoesEstimadas: body.sessoesEstimadas
      ? Number(body.sessoesEstimadas)
      : undefined,
    areasRelacionadas: parseAreas(String(body.areasRelacionadas || '')),
    observacoes: body.observacoes ? String(body.observacoes) : undefined,
  });

  return NextResponse.json(tratamento);
}
