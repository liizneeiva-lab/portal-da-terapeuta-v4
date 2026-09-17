'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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

export default function NovoTratamentoForm({
  clienteId,
}: {
  clienteId: string;
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

    const res = await fetch('/api/tratamentos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...dados, clienteId }),
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
          className={inputClass}
          placeholder="Ex: Mesa Quântica"
        />
      </Campo>

      <div className="grid grid-cols-2 gap-4">
        <Campo label="Data de início">
          <input
            name="dataInicio"
            type="date"
            max={hoje}
            className={inputClass}
          />
        </Campo>
        <Campo label="Sessões estimadas (opcional)">
          <input
            name="sessoesEstimadas"
            type="number"
            min={1}
            className={inputClass}
            placeholder="Ex: 6"
          />
        </Campo>
      </div>

      <Campo label="Tema inicial">
        <textarea
          name="temaInicial"
          rows={3}
          required
          className={inputClass}
          placeholder="O que trouxe a cliente a este tratamento"
        />
      </Campo>

      <Campo label="Questões trazidas pela cliente (opcional)">
        <textarea name="questoesTrazidas" rows={3} className={inputClass} />
      </Campo>

      <Campo label="Áreas relacionadas">
        <input
          name="areasRelacionadas"
          type="text"
          className={inputClass}
          placeholder="Profissional, Financeiro, Emocional (separadas por vírgula)"
        />
      </Campo>

      <Campo label="Observações (opcional)">
        <textarea name="observacoes" rows={3} className={inputClass} />
      </Campo>

      {erro && <p className="text-sm text-red-700">{erro}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={enviando}
          className="rounded-xl2 bg-terracota-500 text-white text-sm px-6 py-2.5 hover:bg-terracota-600 transition-colors shadow-soft disabled:opacity-60"
        >
          {enviando ? 'Salvando...' : 'Salvar tratamento'}
        </button>
      </div>
    </form>
  );
}
