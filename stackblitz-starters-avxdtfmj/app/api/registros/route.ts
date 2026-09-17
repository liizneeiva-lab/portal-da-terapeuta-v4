import { NextResponse } from "next/server";
import { criarRegistro } from "@/lib/data";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.sessaoId) {
    return NextResponse.json({ error: "sessaoId é obrigatório." }, { status: 400 });
  }

  const novo = criarRegistro({
    sessaoId: String(body.sessaoId),
    tiposConteudoIds: Array.isArray(body.tiposConteudoIds) ? body.tiposConteudoIds : [],
    presencaId: body.presencaId || undefined,
    oQueSurgiuTexto: body.oQueSurgiuTexto || undefined,
    oQueSurgiuIncluirNoPdf: Boolean(body.oQueSurgiuIncluirNoPdf),
    mensagens: Array.isArray(body.mensagens) ? body.mensagens : [],
    indicacoesIds: Array.isArray(body.indicacoesIds) ? body.indicacoesIds : [],
    informacoesInternas: body.informacoesInternas || undefined,
  });

  return NextResponse.json(novo, { status: 201 });
}
