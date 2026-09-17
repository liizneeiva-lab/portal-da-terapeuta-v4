import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  buscarCliente,
  buscarTratamento,
  contarSessoesRealizadas,
  listarSessoesPorTratamento,
} from '@/lib/data';
import EditarTratamentoForm from '@/components/EditarTratamentoForm';

const STATUS_LABEL: Record<string, string> = {
  rascunho: 'Rascunho',
  em_revisao: 'Em revisão',
  publicada: 'Publicada',
};

function formatarData(iso: string) {
  if (!iso) return '—';
  return new Date(iso + 'T00:00:00').toLocaleDateString('pt-BR');
}

export default function EditarTratamentoPage({
  params,
}: {
  params: { id: string; tratamentoId: string };
}) {
  const cliente = buscarCliente(params.id);
  const tratamento = buscarTratamento(params.tratamentoId);
  if (!cliente || !tratamento || tratamento.clienteId !== cliente.id)
    notFound();

  const realizadas = contarSessoesRealizadas(tratamento.id);
  const sessoes = listarSessoesPorTratamento(tratamento.id);

  return (
    <div className="max-w-2xl">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-wide text-salvia-600 mb-2">
          {cliente.nomeCompleto}
        </p>
        <h1 className="font-display text-3xl text-tinta">{tratamento.tipo}</h1>
        <p className="text-sm text-tinta-muted mt-2">
          {realizadas} sessão(ões) já publicada(s) para este tratamento — isso
          não muda aqui, é calculado automaticamente a partir das sessões.
        </p>
      </header>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl text-tinta">Sessões</h2>
          <Link
            href={`/portal/clientes/${cliente.id}/tratamentos/${tratamento.id}/sessoes/nova`}
            className="rounded-xl2 bg-terracota-500 text-white text-sm px-5 py-2.5 hover:bg-terracota-600 transition-colors shadow-soft"
          >
            + Nova sessão
          </Link>
        </div>

        {sessoes.length === 0 ? (
          <div className="rounded-xl3 border border-dashed border-bege-300 px-8 py-12 text-center">
            <p className="text-tinta-muted text-sm">
              Nenhuma sessão registrada ainda.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessoes.map((sessao) => (
              <Link
                key={sessao.id}
                href={`/portal/clientes/${cliente.id}/tratamentos/${tratamento.id}/sessoes/${sessao.id}`}
                className="block rounded-xl3 border border-bege-300 bg-white/70 px-6 py-4 hover:border-salvia-400 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-lg text-tinta">
                      Sessão {sessao.numero}
                    </p>
                    <p className="text-sm text-tinta-muted mt-1">
                      {formatarData(sessao.data)} · {sessao.temaPrincipal}
                    </p>
                  </div>
                  <span className="text-xs rounded-full px-3 py-1 bg-bege-200 text-tinta-soft">
                    {STATUS_LABEL[sessao.status] ?? sessao.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-display text-xl text-tinta mb-4">
          Dados do tratamento
        </h2>
        <EditarTratamentoForm
          clienteId={cliente.id}
          tratamentoId={tratamento.id}
          tratamento={tratamento}
        />
      </section>
    </div>
  );
}
