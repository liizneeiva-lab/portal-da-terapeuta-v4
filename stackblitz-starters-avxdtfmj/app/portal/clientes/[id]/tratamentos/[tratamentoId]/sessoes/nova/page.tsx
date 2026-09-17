import { notFound } from 'next/navigation';
import {
  buscarCliente,
  buscarTratamento,
  proximoNumeroSessao,
} from '@/lib/data';
import NovoSessaoForm from '@/components/NovoSessaoForm';

export default function NovaSessaoPage({
  params,
}: {
  params: { id: string; tratamentoId: string };
}) {
  const cliente = buscarCliente(params.id);
  const tratamento = buscarTratamento(params.tratamentoId);
  if (!cliente || !tratamento || tratamento.clienteId !== cliente.id)
    notFound();

  const proximoNumero = proximoNumeroSessao(tratamento.id);

  return (
    <div className="max-w-2xl">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-wide text-salvia-600 mb-2">
          {cliente.nomeCompleto} · {tratamento.tipo}
        </p>
        <h1 className="font-display text-3xl text-tinta">Nova sessão</h1>
      </header>
      <NovoSessaoForm
        clienteId={cliente.id}
        tratamentoId={tratamento.id}
        proximoNumero={proximoNumero}
      />
    </div>
  );
}
