"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputClass =
  "w-full rounded-xl2 border border-bege-300 bg-white/80 px-4 py-2.5 text-tinta placeholder:text-tinta-muted/60 focus:border-salvia-400 focus:outline-none transition-colors";

function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm text-tinta-soft mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}

export default function NovoSessaoForm({
  clienteId,
  tratamentoId,
  proximoNumero,
}: {
  clienteId: string;
  tratamentoId: string;
  proximoNumero: number;
}) {
  const router = useRouter();
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const hoje = new Date().toISOString().split("T")[0];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (enviando) return;
    setErro("");
    setEnviando(true);

    const formData = new FormData(e.currentTarget);
    const dados = Object.fromEntries(formData.entries());

    const res = await fetch("/api/sessoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...dados, tratamentoId }),
    });

    if (!res.ok) {
      setEnviando(false);
      const data = await res.json().catch(() => ({}));
      setErro(data.error || "Não foi possível salvar. Tente novamente.");
      return;
    }

    const sessao = await res.json();
    router.push(
      `/portal/clientes/${clienteId}/tratamentos/${tratamentoId}/sessoes/${sessao.id}`
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Campo label="Número da sessão">
          <input
            name="numero"
            type="number"
            min={1}
            required
            defaultValue={proximoNumero}
            className={inputClass}
          />
        </Campo>
        <Campo label="Data">
          <input
            name="data"
            type="date"
            max={hoje}
            defaultValue={hoje}
            className={inputClass}
          />
        </Campo>
      </div>

      <Campo label="Tema principal">
        <input
          name="temaPrincipal"
          type="text"
          required
          className={inputClass}
          placeholder="Ex: Profissional, emocional e familiar"
        />
      </Campo>

      <Campo label="Questões trazidas pela cliente (opcional)">
        <textarea name="questoesTrazidas" rows={3} className={inputClass} />
      </Campo>

      {erro && <p className="text-sm text-red-700">{erro}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={enviando}
          className="rounded-xl2 bg-terracota-500 text-white text-sm px-6 py-2.5 hover:bg-terracota-600 transition-colors shadow-soft disabled:opacity-60"
        >
          {enviando ? "Salvando..." : "Criar sessão"}
        </button>
      </div>
    </form>
  );
}
