import { NextResponse } from 'next/server';
import { criarSessao } from '@/lib/data';

export async function POST(request: Request) {
  const body = await request.json();
  const tratamentoId = String(body.tratamentoId || '');
  const numeroRaw = body.numero;
  const data = String(body.data || '');
  const temaPrincipal = String(body.temaPrincipal || '').trim();

  if (!tratamentoId || !numeroRaw || !temaPrincipal) {
    return NextResponse.json(
      { error: 'Preencha número e tema principal para continuar.' },
      { status: 400 }
    );
  }

  const sessao = criarSessao({
    tratamentoId,
    numero: Number(numeroRaw),
    data,
    temaPrincipal,
    questoesTrazidas: body.questoesTrazidas
      ? String(body.questoesTrazidas)
      : undefined,
    status: 'rascunho',
  });

  return NextResponse.json(sessao);
}
