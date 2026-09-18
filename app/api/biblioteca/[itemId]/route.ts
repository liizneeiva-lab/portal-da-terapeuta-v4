import { NextRequest, NextResponse } from 'next/server';
import { atualizarItemBiblioteca, excluirItemBiblioteca } from '@/lib/data';

export async function PUT(
  req: NextRequest,
  { params }: { params: { itemId: string } }
) {
  const dados = await req.json();
  const atualizado = atualizarItemBiblioteca(params.itemId, dados);
  if (!atualizado) {
    return NextResponse.json({ erro: 'Item não encontrado' }, { status: 404 });
  }
  return NextResponse.json(atualizado);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { itemId: string } }
) {
  const ok = excluirItemBiblioteca(params.itemId);
  if (!ok) {
    return NextResponse.json({ erro: 'Item não encontrado' }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
