import { NextRequest, NextResponse } from 'next/server';
import { excluirDocumento } from '@/lib/data';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { documentoId: string } }
) {
  const ok = excluirDocumento(params.documentoId);
  if (!ok) {
    return NextResponse.json({ erro: 'Documento não encontrado' }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
