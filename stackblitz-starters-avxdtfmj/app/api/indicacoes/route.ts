import { NextResponse } from "next/server";
import { criarIndicacao, listarIndicacoesPorCliente } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clienteId = searchParams.get("clienteId");

  if (!clienteId) {
    return NextResponse.json({ error: "clienteId é obrigatório." }, { status: 400 });
  }

  return NextResponse.json(listarIndicacoesPorCliente(clienteId));
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.clienteId || !body.categoriaId || !body.titulo) {
    return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
  }

  const nova = criarIndicacao({
    clienteId: String(body.clienteId),
    categoriaId: String(body.categoriaId),
    titulo: String(body.titulo).trim(),
    autorCriador: body.autorCriador || undefined,
    link: body.link || undefined,
    anexoNome: body.anexoNome || undefined,
    anexoDados: body.anexoDados || undefined,
    comentario: body.comentario || undefined,
    incluirNoPdf: Boolean(body.incluirNoPdf),
    sessoesOrigemIds: Array.isArray(body.sessoesOrigemIds) ? body.sessoesOrigemIds : [],
  });

  return NextResponse.json(nova, { status: 201 });
}
