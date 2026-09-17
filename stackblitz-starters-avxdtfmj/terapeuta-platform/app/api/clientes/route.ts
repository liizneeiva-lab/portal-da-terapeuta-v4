import { NextResponse } from "next/server";
import { criarCliente } from "@/lib/data";

export async function POST(request: Request) {
  const body = await request.json();
  const nomeCompleto = String(body.nomeCompleto || "").trim();
  const email = String(body.email || "").trim();

  if (!nomeCompleto || !email) {
    return NextResponse.json(
      { error: "Preencha nome e e-mail para continuar." },
      { status: 400 }
    );
  }

  const cliente = criarCliente({
    nomeCompleto,
    dataNascimento: String(body.dataNascimento || ""),
    email,
    telefone: String(body.telefone || ""),
    endereco: body.endereco ? String(body.endereco) : undefined,
    observacoesInternas: body.observacoesInternas
      ? String(body.observacoesInternas)
      : undefined,
  });

  return NextResponse.json(cliente);
}
