import { NextResponse } from "next/server";
import { atualizarRegistro, excluirRegistro } from "@/lib/data";

export async function PATCH(
  request: Request,
  { params }: { params: { registroId: string } }
) {
  const body = await request.json();

  const dados: Partial<{
    tiposConteudoIds: string[];
    presencaId?: string;
    oQueSurgiuTexto?: string;
    oQueSurgiuIncluirNoPdf: boolean;
    mensagens: { id: string; texto: string; incluirNoPdf: boolean }[];
    indicacoesIds: string[];
    informacoesInternas?: string;
  }> = {};

  if (body.tiposConteudoIds !== undefined) dados.tiposConteudoIds = body.tiposConteudoIds;
  if (body.presencaId !== undefined) dados.presencaId = body.presencaId || undefined;
  if (body.oQueSurgiuTexto !== undefined) {
    dados.oQueSurgiuTexto = body.oQueSurgiuTexto || undefined;
  }
  if (body.oQueSurgiuIncluirNoPdf !== undefined) {
    dados.oQueSurgiuIncluirNoPdf = Boolean(body.oQueSurgiuIncluirNoPdf);
  }
  if (body.mensagens !== undefined) dados.mensagens = body.mensagens;
  if (body.indicacoesIds !== undefined) dados.indicacoesIds = body.indicacoesIds;
  if (body.informacoesInternas !== undefined) {
    dados.informacoesInternas = body.informacoesInternas || undefined;
  }

  const atualizado = atualizarRegistro(params.registroId, dados);

  if (!atualizado) {
    return NextResponse.json({ error: "Informação não encontrada." }, { status: 404 });
  }

  return NextResponse.json(atualizado);
}

export async function DELETE(
  request: Request,
  { params }: { params: { registroId: string } }
) {
  const sucesso = excluirRegistro(params.registroId);

  if (!sucesso) {
    return NextResponse.json({ error: "Informação não encontrada." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
