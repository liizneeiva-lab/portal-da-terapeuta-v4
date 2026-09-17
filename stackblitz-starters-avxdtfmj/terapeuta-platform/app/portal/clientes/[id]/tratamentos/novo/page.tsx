import { notFound } from "next/navigation";
import { buscarCliente } from "@/lib/data";
import NovoTratamentoForm from "@/components/NovoTratamentoForm";

export default function NovoTratamentoPage({
  params,
}: {
  params: { id: string };
}) {
  const cliente = buscarCliente(params.id);
  if (!cliente) notFound();

  return (
    <div className="max-w-2xl">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-wide text-salvia-600 mb-2">
          {cliente.nomeCompleto}
        </p>
        <h1 className="font-display text-3xl text-tinta">Novo tratamento</h1>
      </header>
      <NovoTratamentoForm clienteId={cliente.id} />
    </div>
  );
}
