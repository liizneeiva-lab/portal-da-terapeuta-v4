"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sessao } from "@/lib/types";

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

export default function EditarSessaoForm({
  clienteId,
  tratamentoId,
  sessao,
}: {
  clienteId: string;
  tratamentoId: string;
  sessao: Sessao;
}) {
  const router = useRouter();
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);
  const hoje = new Date().toISOString().split("T")[0];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (enviando) return;
    setErro("");
    setEnviando(true);

    const formData = new FormData(e.currentTarget);
    const dados = Object.fromEntries(formData.entries());

    const res = await fetch(`/api/sessoes/${sessao.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    setEnviando(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setErro(data.error || "Não foi possível salvar. Tente novamente.");
      return;
    }

    router.refresh();
  }

  async function handleExcluir() {
    const confirmar = window.confirm(
      `Tem certeza que quer excluir a Sessão ${sessao.numero}? As informações registradas nela também serão apagadas. Essa ação não pode ser desfeita.`
    );
    if (!confirmar) return;

    setExcluindo(true);
    const res = await fetch(`/api/sessoes/${sessao.id}`, { method: "DELETE" });
    setExcluindo(false);

    if (!res.ok) {
      setErro("Não foi possível excluir. Tente novamente.");
      return;
    }

    router.push(`/portal/clientes/${clienteId}/tratamentos/${tratamentoId}`);
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
            defaultValue={sessao.numero}
            className={inputClass}
          />
        </Campo>
        <Campo label="Data">
          <input
            name="data"
            type="date"
            max={hoje}
            defaultValue={sessao.data}
            className={inputClass}
          />
        </Campo>
      </div>

      <Campo label="Tema principal">
        <input
          name="temaPrincipal"
          type="text"
          required
          defaultValue={sessao.temaPrincipal}
          className={inputClass}
        />
      </Campo>

      <Campo label="Questões trazidas pela cliente (opcional)">
        <textarea
          name="questoesTrazidas"
          rows={3}
          defaultValue={sessao.questoesTrazidas}
          className={inputClass}
        />
      </Campo>

      {erro && <p className="text-sm text-red-700">{erro}</p>}

      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          type="submit"
          disabled={enviando}
          className="rounded-xl2 bg-terracota-500 text-white text-sm px-6 py-2.5 hover:bg-terracota-600 transition-colors shadow-soft disabled:opacity-60"
        >
          {enviando ? "Salvando..." : "Salvar alterações"}
        </button>
        <button
          type="button"
          onClick={handleExcluir}
          disabled={excluindo}
          className="text-sm text-red-700 hover:text-red-800 disabled:opacity-60"
        >
          {excluindo ? "Excluindo..." : "Excluir sessão"}
        </button>
      </div>
    </form>
  );
}
