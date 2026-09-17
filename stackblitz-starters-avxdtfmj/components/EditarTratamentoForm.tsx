'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tratamento } from '@/lib/types';

const inputClass =
  'w-full rounded-xl2 border border-bege-300 bg-white/80 px-4 py-2.5 text-tinta placeholder:text-tinta-muted/60 focus:border-salvia-400 focus:outline-none transition-colors';

function Campo({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm text-tinta-soft mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}

export default function EditarTratamentoForm({
  clienteId,
  tratamentoId,
  tratamento,
}: {
  clienteId: string;
  tratamentoId: string;
  tratamento: Tratamento;
}) {
  const hoje = new Date().toISOString().split('T')[0];
  const router = useRouter();
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro('');
    setEnviando(true);

    const formData = new FormData(e.currentTarget);
    const dados = Object.fromEntries(formData.entries());

    const res = await fetch(`/api/tratamentos/${tratamentoId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });

    setEnviando(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setErro(data.error || 'Não foi possível salvar. Tente novamente.');
      return;
    }

    router.push(`/portal/clientes/${clienteId}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Campo label="Tipo de tratamento">
        <input
          name="tipo"
          type="text"
          required
          defaultValue={tratamento.tipo}
          className={inputClass}
        />
      </Campo>

      <div className="grid grid-cols-2 gap-4">
        <Campo label="Data de início">
          <input
            name="dataInicio"
            type="date"
            max={hoje}
            defaultValue={tratamento.dataInicio}
            className={inputClass}
          />
        </Campo>
        <Campo label="Sessões estimadas">
          <input
            name="sessoesEstimadas"
            type="number"
            min={1}
            defaultValue={tratamento.sessoesEstimadas}
            className={inputClass}
            placeholder="Deixe em branco se ainda não souber"
          />
        </Campo>
      </div>

      <Campo label="Status">
        <select
          name="status"
          defaultValue={tratamento.status}
          className={inputClass}
        >
          <option value="em_andamento">Em andamento</option>
          <option value="concluido">Concluído</option>
          <option value="pausado">Pausado</option>
        </select>
      </Campo>

      <Campo label="Tema inicial">
        <textarea
          name="temaInicial"
          rows={3}
          required
          defaultValue={tratamento.temaInicial}
          className={inputClass}
        />
      </Campo>

      <Campo label="Questões trazidas pela cliente">
        <textarea
          name="questoesTrazidas"
          rows={3}
          defaultValue={tratamento.questoesTrazidas}
          className={inputClass}
        />
      </Campo>

      <Campo label="Áreas relacionadas">
        <input
          name="areasRelacionadas"
          type="text"
          defaultValue={tratamento.areasRelacionadas.join(', ')}
          className={inputClass}
          placeholder="Separadas por vírgula"
        />
      </Campo>

      <Campo label="Observações">
        <textarea
          name="observacoes"
          rows={3}
          defaultValue={tratamento.observacoes}
          className={inputClass}
        />
      </Campo>

      {erro && <p className="text-sm text-red-700">{erro}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={enviando}
          className="rounded-xl2 bg-terracota-500 text-white text-sm px-6 py-2.5 hover:bg-terracota-600 transition-colors shadow-soft disabled:opacity-60"
        >
          {enviando ? 'Salvando...' : 'Salvar alterações'}
        </button>
      </div>
    </form>
  );
}
