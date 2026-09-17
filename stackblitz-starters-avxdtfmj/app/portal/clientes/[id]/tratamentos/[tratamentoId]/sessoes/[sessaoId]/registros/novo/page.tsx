import { notFound } from "next/navigation";
import { buscarCliente, buscarTratamento, buscarSessao } from "@/lib/data";
import NovoRegistroForm from "@/components/NovoRegistroForm";
import Link from "next/link";

export default function NovoRegistroPage({
  params,
}: {
  params: { id: string; tratamentoId: string; sessaoId: string };
}) {
  const cliente = buscarCliente(params.id);
  const tratamento = buscarTratamento(params.tratamentoId);
  const sessao = buscarSessao(params.sessaoId);

  if (
    !cliente ||
    !tratamento ||
    !sessao ||
    tratamento.clienteId !== cliente.id ||
    sessao.tratamentoId !== tratamento.id
  ) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <Link
        href={`/portal/clientes/${cliente.id}/tratamentos/${tratamento.id}/sessoes/${sessao.id}`}
        className="text-sm text-salvia-600 hover:text-salvia-700 mb-4 inline-block"
      >
        ← Cancelar e voltar para a Sessão {sessao.numero}
      </Link>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-wide text-salvia-600 mb-2">
          {cliente.nomeCompleto} · Sessão {sessao.numero}
        </p>
        <h1 className="font-display text-3xl text-tinta">Adicionar informação</h1>
      </header>
      <NovoRegistroForm
        clienteId={cliente.id}
        tratamentoId={tratamento.id}
        sessaoId={sessao.id}
      />
    </div>
  );
}
