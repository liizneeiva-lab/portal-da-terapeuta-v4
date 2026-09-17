import { NextResponse } from "next/server";
import { atualizarSessao, excluirSessao } from "@/lib/data";
import { StatusSessao } from "@/lib/types";

export async function PATCH(
  request: Request,
  { params }: { params: { sessaoId: string } }
) {
  const body = await request.json();

  const dados: Partial<{
    numero: number;
    data: string;
    temaPrincipal: string;
    questoesTrazidas?: string;
    status: StatusSessao;
  }> = {};

  if (body.status) dados.status = String(body.status) as StatusSessao;
  if (body.numero) dados.numero = Number(body.numero);
  if (body.temaPrincipal) dados.temaPrincipal = String(body.temaPrincipal).trim();
  if (body.data) dados.data = String(body.data);
  if (body.questoesTrazidas !== undefined) {
    dados.questoesTrazidas = body.questoesTrazidas ? String(body.questoesTrazidas) : undefined;
  }

  const atualizada = atualizarSessao(params.sessaoId, dados);

  if (!atualizada) {
    return NextResponse.json({ error: "Sessão não encontrada." }, { status: 404 });
  }

  return NextResponse.json(atualizada);
}

export async function DELETE(
  request: Request,
  { params }: { params: { sessaoId: string } }
) {
  const sucesso = excluirSessao(params.sessaoId);

  if (!sucesso) {
    return NextResponse.json({ error: "Sessão não encontrada." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
