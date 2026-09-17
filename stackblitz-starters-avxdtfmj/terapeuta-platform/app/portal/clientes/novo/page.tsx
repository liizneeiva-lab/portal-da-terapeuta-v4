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

export default function NovoClientePage() {
  const router = useRouter();
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setEnviando(true);

    const formData = new FormData(e.currentTarget);
    const dados = Object.fromEntries(formData.entries());

    const res = await fetch("/api/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    setEnviando(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setErro(data.error || "Não foi possível salvar. Tente novamente.");
      return;
    }

    const cliente = await res.json();
    router.push(`/portal/clientes/${cliente.id}`);
  }

  return (
    <div className="max-w-2xl">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-wide text-salvia-600 mb-2">
          Clientes
        </p>
        <h1 className="font-display text-3xl text-tinta">Novo cliente</h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Campo label="Nome completo">
          <input
            name="nomeCompleto"
            type="text"
            required
            className={inputClass}
            placeholder="Nome da cliente"
          />
        </Campo>

        <div className="grid grid-cols-2 gap-4">
          <Campo label="Data de nascimento">
            <input name="dataNascimento" type="date" className={inputClass} />
          </Campo>
          <Campo label="Telefone">
            <input
              name="telefone"
              type="tel"
              className={inputClass}
              placeholder="(11) 90000-0000"
            />
          </Campo>
        </div>

        <Campo label="E-mail">
          <input
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="nome@email.com"
          />
        </Campo>

        <Campo label="Endereço">
          <input
            name="endereco"
            type="text"
            className={inputClass}
            placeholder="Cidade, estado"
          />
        </Campo>

        <Campo label="Observações internas">
          <textarea
            name="observacoesInternas"
            rows={4}
            className={inputClass}
            placeholder="Notas visíveis apenas para você — nunca aparecem para a cliente."
          />
        </Campo>

        {erro && <p className="text-sm text-red-700">{erro}</p>}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={enviando}
            className="rounded-xl2 bg-terracota-500 text-white text-sm px-6 py-2.5 hover:bg-terracota-600 transition-colors shadow-soft disabled:opacity-60"
          >
            {enviando ? "Salvando..." : "Salvar cliente"}
          </button>
        </div>
      </form>
    </div>
  );
}
