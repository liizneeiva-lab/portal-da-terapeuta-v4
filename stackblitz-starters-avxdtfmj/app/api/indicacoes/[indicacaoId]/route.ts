import { NextResponse } from "next/server";
import { excluirIndicacao } from "@/lib/data";

export async function DELETE(
  request: Request,
  { params }: { params: { indicacaoId: string } }
) {
  const sucesso = excluirIndicacao(params.indicacaoId);

  if (!sucesso) {
    return NextResponse.json({ error: "Indicação não encontrada." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
