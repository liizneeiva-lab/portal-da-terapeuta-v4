"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StatusSessao } from "@/lib/types";

const LABELS: Record<StatusSessao, string> = {
  rascunho: "Rascunho",
  em_revisao: "Em revisão",
  publicada: "Publicada",
};

export default function SessaoStatusControl({
  sessaoId,
  statusAtual,
}: {
  sessaoId: string;
  statusAtual: StatusSessao;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<StatusSessao>(statusAtual);
  const [salvando, setSalvando] = useState(false);

  async function mudarStatus(novo: StatusSessao) {
    setSalvando(true);
    const res = await fetch(`/api/sessoes/${sessaoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: novo }),
    });
    setSalvando(false);
    if (res.ok) {
      setStatus(novo);
      router.refresh();
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs px-2.5 py-1 rounded-full bg-salvia-50 text-salvia-700">
        {LABELS[status]}
      </span>
      {status !== "publicada" && (
        <button
          onClick={() =>
            mudarStatus(status === "rascunho" ? "em_revisao" : "publicada")
          }
          disabled={salvando}
          className="text-sm text-salvia-600 hover:text-salvia-700 disabled:opacity-60"
        >
          {status === "rascunho"
            ? "Enviar para revisão"
            : "Publicar para a cliente"}
        </button>
      )}
    </div>
  );
}
