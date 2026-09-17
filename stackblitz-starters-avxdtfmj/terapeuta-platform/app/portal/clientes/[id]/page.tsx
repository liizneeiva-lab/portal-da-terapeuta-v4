import Link from "next/link";
import { notFound } from "next/navigation";
import {
  buscarCliente,
  listarTratamentosPorCliente,
  listarSessoesPorTratamento,
  contarSessoesRealizadas,
} from "@/lib/data";
import ProgressArc from "@/components/ProgressArc";

function formatarData(iso: string) {
  if (!iso) return "—";
  return new Date(iso + "T00:00:00").toLocaleDateString("pt-BR");
}

export default function PerfilClientePage({
  params,
}: {
  params: { id: string };
}) {
  const cliente = buscarCliente(params.id);
  if (!cliente) notFound();

  const tratamentos = listarTratamentosPorCliente(cliente.id);

  return (
    <div>
      <header className="mb-10">
        <p className="text-xs uppercase tracking-wide text-salvia-600 mb-2">
          Cliente
        </p>
        <h1 className="font-display text-3xl text-tinta">{cliente.nomeCompleto}</h1>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Coluna principal: tratamentos */}
        <div className="md:col-span-2 space-y-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-display text-xl text-tinta">Tratamentos ativos</h2>
            <Link
              href={`/portal/clientes/${cliente.id}/tratamentos/novo`}
              className="text-sm text-salvia-600 hover:text-salvia-700"
            >
              + Novo tratamento
            </Link>
          </div>

          {tratamentos.length === 0 && (
            <p className="text-tinta-muted text-sm">
              Nenhum tratamento registrado ainda.
            </p>
          )}

          {tratamentos.map((tratamento) => {
            const realizadas = contarSessoesRealizadas(tratamento.id);
            const sessoes = listarSessoesPorTratamento(tratamento.id);
            const ultima = sessoes.find((s) => s.status === "publicada");

            return (
              <Link
                key={tratamento.id}
                href={`/portal/clientes/${cliente.id}/tratamentos/${tratamento.id}`}
                className="rounded-xl3 bg-white/70 border border-bege-300/50 shadow-soft p-6 flex gap-6 items-center hover:border-salvia-400/40 hover:shadow-card transition-all"
              >
                <ProgressArc
                  realizadas={realizadas}
                  total={tratamento.sessoesEstimadas ?? realizadas}
                  size={88}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-lg text-tinta">
                      {tratamento.tipo}
                    </p>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-salvia-50 text-salvia-700">
                      {tratamento.status === "em_andamento"
                        ? "Em andamento"
                        : tratamento.status === "concluido"
                        ? "Concluído"
                        : "Pausado"}
                    </span>
                  </div>
                  <p className="text-sm text-tinta-muted mt-1">
                    Início em {formatarData(tratamento.dataInicio)}
                  </p>
                  <p className="text-sm text-tinta-soft mt-2">{tratamento.temaInicial}</p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {tratamento.areasRelacionadas.map((area) => (
                      <span
                        key={area}
                        className="text-xs px-2.5 py-1 rounded-full bg-bege-200 text-tinta-soft"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                  {ultima && (
                    <p className="text-xs text-tinta-muted mt-3">
                      Última sessão: {formatarData(ultima.data)} — {ultima.temaPrincipal}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Coluna lateral: dados do perfil */}
        <div className="space-y-6">
          <div className="rounded-xl3 bg-white/70 border border-bege-300/50 shadow-soft p-6">
            <h3 className="font-display text-base text-tinta mb-4">Dados pessoais</h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-tinta-muted">E-mail</dt>
                <dd className="text-tinta">{cliente.email}</dd>
              </div>
              <div>
                <dt className="text-tinta-muted">Telefone</dt>
                <dd className="text-tinta">{cliente.telefone || "—"}</dd>
              </div>
              <div>
                <dt className="text-tinta-muted">Data de nascimento</dt>
                <dd className="text-tinta">{formatarData(cliente.dataNascimento)}</dd>
              </div>
              <div>
                <dt className="text-tinta-muted">Endereço</dt>
                <dd className="text-tinta">{cliente.endereco || "—"}</dd>
              </div>
            </dl>
          </div>

          {cliente.observacoesInternas && (
            <div className="rounded-xl3 bg-terracota-100/40 border border-terracota-100 p-6">
              <h3 className="font-display text-base text-tinta mb-2 flex items-center gap-2">
                🔒 Notas internas
              </h3>
              <p className="text-sm text-tinta-soft">{cliente.observacoesInternas}</p>
              <p className="text-xs text-tinta-muted mt-3">
                Visível apenas para você — a cliente nunca vê este conteúdo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
