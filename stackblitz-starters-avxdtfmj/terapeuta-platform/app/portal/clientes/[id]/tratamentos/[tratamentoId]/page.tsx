import { notFound } from "next/navigation";
import { buscarCliente, buscarTratamento, contarSessoesRealizadas } from "@/lib/data";
import EditarTratamentoForm from "@/components/EditarTratamentoForm";

export default function EditarTratamentoPage({
  params,
}: {
  params: { id: string; tratamentoId: string };
}) {
  const cliente = buscarCliente(params.id);
  const tratamento = buscarTratamento(params.tratamentoId);
  if (!cliente || !tratamento || tratamento.clienteId !== cliente.id) notFound();

  const realizadas = contarSessoesRealizadas(tratamento.id);

  return (
    <div className="max-w-2xl">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-wide text-salvia-600 mb-2">
          {cliente.nomeCompleto}
        </p>
        <h1 className="font-display text-3xl text-tinta">{tratamento.tipo}</h1>
        <p className="text-sm text-tinta-muted mt-2">
          {realizadas} sessão(ões) já publicada(s) para este tratamento — isso não muda aqui,
          é calculado automaticamente a partir das sessões.
        </p>
      </header>
      <EditarTratamentoForm
        clienteId={cliente.id}
        tratamentoId={tratamento.id}
        tratamento={tratamento}
      />
    </div>
  );
}
