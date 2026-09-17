import Link from "next/link";
import { notFound } from "next/navigation";
import {
  buscarCliente,
  buscarTratamento,
  buscarSessao,
  listarRegistrosPorSessao,
} from "@/lib/data";
import { labelCategoria } from "@/lib/categorias";
import SessaoStatusControl from "@/components/SessaoStatusControl";

function formatarData(iso: string) {
  if (!iso) return "—";
  return new Date(iso + "T00:00:00").toLocaleDateString("pt-BR");
}

export default function SessaoDetalhePage({
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

  const registros = listarRegistrosPorSessao(sessao.id);

  return (
    <div>
      <Link
        href={`/portal/clientes/${cliente.id}/tratamentos/${tratamento.id}`}
        className="text-sm text-salvia-600 hover:text-salvia-700 mb-4 inline-block"
      >
        ← Voltar para {tratamento.tipo}
      </Link>

      <header className="mb-8">
        <p className="text-xs uppercase tracking-wide text-salvia-600 mb-2">
          {cliente.nomeCompleto} · {tratamento.tipo}
        </p>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="font-display text-3xl text-tinta">
            Sessão {sessao.numero}
          </h1>
          <div className="flex items-center gap-4">
            <SessaoStatusControl sessaoId={sessao.id} statusAtual={sessao.status} />
            <Link
              href={`/portal/clientes/${cliente.id}/tratamentos/${tratamento.id}/sessoes/${sessao.id}/editar`}
              className="text-sm text-tinta-muted hover:text-tinta-soft"
            >
              ✏️ Editar
            </Link>
          </div>
        </div>
        <p className="text-sm text-tinta-muted mt-2">{formatarData(sessao.data)}</p>
        <p className="text-tinta-soft mt-3">{sessao.temaPrincipal}</p>
        {sessao.questoesTrazidas && (
          <p className="text-sm text-tinta-muted mt-2">
            <span className="text-tinta-soft">Questões trazidas: </span>
            {sessao.questoesTrazidas}
          </p>
        )}
      </header>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl text-tinta">Informações registradas</h2>
        <Link
          href={`/portal/clientes/${cliente.id}/tratamentos/${tratamento.id}/sessoes/${sessao.id}/registros/novo`}
          className="rounded-xl2 bg-terracota-500 text-white text-sm px-5 py-2.5 hover:bg-terracota-600 transition-colors shadow-soft"
        >
          + Adicionar informação
        </Link>
      </div>

      {registros.length === 0 ? (
        <div className="rounded-xl3 border border-dashed border-bege-300 px-8 py-16 text-center">
          <p className="text-tinta-muted">
            Nenhuma informação adicionada ainda. Comece pela primeira categoria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {registros.map((registro) => (
            <div
              key={registro.id}
              className={`rounded-xl3 border px-5 py-4 ${registro.destacar ? "border-terracota-400 bg-terracota-50/40" : "border-bege-300 bg-white/70"}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wide text-salvia-600">
                  {labelCategoria(registro.categoria)}
                </span>
                {registro.visibilidade === "interno" ? (
                  <span className="text-[10px] text-tinta-muted">🔒 Interno</span>
                ) : (
                  <span className="text-[10px] text-salvia-600">👁 Cliente</span>
                )}
              </div>
              {registro.notaInterna && (
                <p className="text-sm text-tinta-soft">{registro.notaInterna}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
