import Link from "next/link";
import { listarClientes } from "@/lib/data";

export default function ClientesPage() {
  const clientes = listarClientes();

  return (
    <div>
      <header className="flex items-center justify-between mb-10">
        <div>
          <p className="text-xs uppercase tracking-wide text-salvia-600 mb-2">
            {clientes.length} {clientes.length === 1 ? "cliente" : "clientes"}
          </p>
          <h1 className="font-display text-3xl text-tinta">Clientes</h1>
        </div>
        <Link
          href="/portal/clientes/novo"
          className="rounded-xl2 bg-terracota-500 text-white text-sm px-5 py-2.5 hover:bg-terracota-600 transition-colors shadow-soft"
        >
          Novo cliente
        </Link>
      </header>

      {clientes.length === 0 ? (
        <div className="rounded-xl3 border border-dashed border-bege-300 px-8 py-16 text-center">
          <p className="text-tinta-muted">
            Nenhum cliente cadastrado ainda. Comece adicionando o primeiro.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {clientes.map((cliente) => (
            <Link
              key={cliente.id}
              href={`/portal/clientes/${cliente.id}`}
              className="rounded-xl3 bg-white/70 border border-bege-300/50 px-6 py-5 shadow-soft hover:shadow-card hover:border-salvia-400/40 transition-all flex items-center justify-between"
            >
              <div>
                <p className="text-tinta font-medium">{cliente.nomeCompleto}</p>
                <p className="text-sm text-tinta-muted mt-0.5">{cliente.email}</p>
              </div>
              <span className="text-sm text-tinta-muted">{cliente.telefone}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}