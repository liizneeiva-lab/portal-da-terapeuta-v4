import { NextRequest, NextResponse } from 'next/server';
import { listarItensBiblioteca, criarItemBiblioteca } from '@/lib/data';
import type { ItemBiblioteca } from '@/lib/types';

export async function GET(req: NextRequest) {
  const tipo = req.nextUrl.searchParams.get('tipo') as
    | ItemBiblioteca['tipo']
    | null;
  return NextResponse.json(listarItensBiblioteca(tipo ?? undefined));
}

export async function POST(req: NextRequest) {
  const dados = await req.json();
  const novo = criarItemBiblioteca(dados);
  return NextResponse.json(novo, { status: 201 });
}
