import { notFound } from "next/navigation";
import { buscarCliente, buscarTratamento, buscarSessao } from "@/lib/data";
import EditarSessaoForm from "@/components/EditarSessaoForm";

export default function EditarSessaoPage({
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
      <header className="mb-8">
        <p className="text-xs uppercase tracking-wide text-salvia-600 mb-2">
          {cliente.nomeCompleto} · {tratamento.tipo}
        </p>
        <h1 className="font-display text-3xl text-tinta">
          Editar Sessão {sessao.numero}
        </h1>
      </header>
      <EditarSessaoForm
        clienteId={cliente.id}
        tratamentoId={tratamento.id}
        sessao={sessao}
      />
    </div>
  );
}
