import { NextRequest, NextResponse } from 'next/server';
import { listarDocumentosPorCliente, criarDocumento } from '@/lib/data';

export async function GET(req: NextRequest) {
  const clienteId = req.nextUrl.searchParams.get('clienteId');
  if (!clienteId) {
    return NextResponse.json({ erro: 'clienteId é obrigatório' }, { status: 400 });
  }
  return NextResponse.json(listarDocumentosPorCliente(clienteId));
}

export async function POST(req: NextRequest) {
  const dados = await req.json();
  const novo = criarDocumento(dados);
  return NextResponse.json(novo, { status: 201 });
}
