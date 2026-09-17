import Link from "next/link";
import { listarClientes, listarTratamentosPorCliente } from "@/lib/data";

export default function DashboardPage() {
  const clientes = listarClientes();
  const tratamentosEmAndamento = clientes
    .flatMap((c) => listarTratamentosPorCliente(c.id))
    .filter((t) => t.status === "em_andamento");

  const cards = [
    { label: "Clientes ativos", valor: clientes.length },
    { label: "Tratamentos em andamento", valor: tratamentosEmAndamento.length },
    { label: "Sessões recentes", valor: 3 },
    { label: "Próximas sessões", valor: 2 },
    { label: "Dúvidas recebidas", valor: 1 },
    { label: "Documentos recentes", valor: 4 },
  ];

  return (
    <div>
      <header className="mb-10">
        <p className="text-xs uppercase tracking-wide text-salvia-600 mb-2">
          Boa tarde
        </p>
        <h1 className="font-display text-3xl text-tinta">Seu espaço de acompanhamento</h1>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-xl3 bg-white/70 border border-bege-300/50 px-6 py-5 shadow-soft"
          >
            <p className="font-display text-3xl text-tinta">{c.valor}</p>
            <p className="text-sm text-tinta-muted mt-1">{c.label}</p>
          </div>
        ))}
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl text-tinta">Clientes recentes</h2>
          <Link
            href="/portal/clientes"
            className="text-sm text-salvia-600 hover:text-salvia-700"
          >
            Ver todos
          </Link>
        </div>
        <div className="rounded-xl3 bg-white/70 border border-bege-300/50 divide-y divide-bege-200 shadow-soft">
          {clientes.map((cliente) => (
            <Link
              key={cliente.id}
              href={`/portal/clientes/${cliente.id}`}
              className="flex items-center justify-between px-6 py-4 hover:bg-salvia-50/60 transition-colors first:rounded-t-xl3 last:rounded-b-xl3"
            >
              <span className="text-tinta">{cliente.nomeCompleto}</span>
              <span className="text-sm text-tinta-muted">{cliente.email}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
