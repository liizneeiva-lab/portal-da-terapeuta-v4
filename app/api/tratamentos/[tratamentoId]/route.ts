import { NextResponse } from 'next/server';
import { atualizarTratamento } from '@/lib/data';
import { StatusTratamento } from '@/lib/types';

function parseAreas(raw: string): string[] {
  return raw
    .split(',')
    .map((a) => a.trim())
    .filter(Boolean);
}

export async function PATCH(
  request: Request,
  { params }: { params: { tratamentoId: string } }
) {
  const body = await request.json();

  const atualizado = atualizarTratamento(params.tratamentoId, {
    tipo: String(body.tipo || '').trim(),
    dataInicio: String(body.dataInicio || ''),
    status: String(body.status || 'em_andamento') as StatusTratamento,
    temaInicial: String(body.temaInicial || '').trim(),
    questoesTrazidas: body.questoesTrazidas
      ? String(body.questoesTrazidas)
      : undefined,
    sessoesEstimadas: body.sessoesEstimadas
      ? Number(body.sessoesEstimadas)
      : undefined,
    areasRelacionadas: parseAreas(String(body.areasRelacionadas || '')),
    observacoes: body.observacoes ? String(body.observacoes) : undefined,
  });

  if (!atualizado) {
    return NextResponse.json(
      { error: 'Tratamento não encontrado.' },
      { status: 404 }
    );
  }

  return NextResponse.json(atualizado);
}
