"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIAS } from "@/lib/categorias";
import { CategoriaRegistro } from "@/lib/types";

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

type DadosCategoria = {
  tituloPersonalizado: string;
  notaInterna: string;
  versaoCliente: string;
  visibilidade: "interno" | "cliente";
  incluirNoPdf: boolean;
  destacar: boolean;
};

function dadosVazios(): DadosCategoria {
  return {
    tituloPersonalizado: "",
    notaInterna: "",
    versaoCliente: "",
    visibilidade: "interno",
    incluirNoPdf: false,
    destacar: false,
  };
}

export default function NovoRegistroForm({
  clienteId,
  tratamentoId,
  sessaoId,
}: {
  clienteId: string;
  tratamentoId: string;
  sessaoId: string;
}) {
  const router = useRouter();
  const [selecionadas, setSelecionadas] = useState<CategoriaRegistro[]>([]);
  const [etapa, setEtapa] = useState<"escolher" | "preencher">("escolher");
  const [dados, setDados] = useState<Record<string, DadosCategoria>>({});
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  function alternarCategoria(valor: CategoriaRegistro) {
    setSelecionadas((atual) =>
      atual.includes(valor) ? atual.filter((c) => c !== valor) : [...atual, valor]
    );
  }

  function irParaFormulario() {
    if (selecionadas.length === 0) return;
    setDados((atual) => {
      const novo = { ...atual };
      selecionadas.forEach((c) => {
        if (!novo[c]) novo[c] = dadosVazios();
      });
      return novo;
    });
    setEtapa("preencher");
  }

  function atualizarCampo(
    categoria: string,
    campo: keyof DadosCategoria,
    valor: string | boolean
  ) {
    setDados((atual) => ({
      ...atual,
      [categoria]: { ...atual[categoria], [campo]: valor },
    }));
  }

  async function handleConcluir() {
    if (enviando) return;
    setErro("");
    setEnviando(true);

    try {
      for (const categoria of selecionadas) {
        const d = dados[categoria] ?? dadosVazios();
        const res = await fetch("/api/registros", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessaoId,
            categoria,
            tituloPersonalizado: d.tituloPersonalizado || undefined,
            notaInterna: d.notaInterna || undefined,
            versaoCliente: d.versaoCliente || undefined,
            visibilidade: d.visibilidade,
            incluirNoPdf: d.incluirNoPdf,
            destacar: d.destacar,
          }),
        });
        if (!res.ok) {
          throw new Error("Não foi possível salvar uma das informações. Tente novamente.");
        }
      }

      router.push(
        `/portal/clientes/${clienteId}/tratamentos/${tratamentoId}/sessoes/${sessaoId}`
      );
    } catch (e) {
      setEnviando(false);
      setErro(e instanceof Error ? e.message : "Não foi possível salvar. Tente novamente.");
    }
  }

  if (etapa === "escolher") {
    return (
      <div>
        <p className="text-sm text-tinta-muted mb-4">
          Escolha uma ou mais categorias para organizar essa sessão. Você pode marcar quantas
          quiser e preencher todas de uma vez.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {CATEGORIAS.map((c) => {
            const marcada = selecionadas.includes(c.valor);
            return (
              <button
                key={c.valor}
                type="button"
                onClick={() => alternarCategoria(c.valor)}
                className={`rounded-xl2 border px-4 py-3 text-sm text-left transition-colors ${
                  marcada
                    ? "border-salvia-400 bg-salvia-50/80 text-salvia-700"
                    : "border-bege-300 bg-white/70 text-tinta-soft hover:border-salvia-400/50 hover:bg-salvia-50/60"
                }`}
              >
                {marcada ? "✓ " : ""}
                {c.label}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={irParaFormulario}
          disabled={selecionadas.length === 0}
          className="rounded-xl2 bg-terracota-500 text-white text-sm px-6 py-2.5 hover:bg-terracota-600 transition-colors shadow-soft disabled:opacity-40"
        >
          Continuar {selecionadas.length > 0 ? `(${selecionadas.length})` : ""}
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setEtapa("escolher")}
        className="text-sm text-salvia-600 hover:text-salvia-700 mb-6"
      >
        ← Trocar categorias
      </button>

      <div className="space-y-8">
        {selecionadas.map((categoria) => {
          const label = CATEGORIAS.find((c) => c.valor === categoria)?.label;
          const d = dados[categoria] ?? dadosVazios();
          return (
            <div key={categoria} className="rounded-xl3 border border-bege-300 bg-white/60 p-5">
              <span className="inline-block text-xs px-2.5 py-1 rounded-full bg-salvia-50 text-salvia-700 mb-4">
                {label}
              </span>

              <div className="space-y-4">
                {categoria === "personalizado" && (
                  <Campo label="Título do campo personalizado">
                    <input
                      type="text"
                      value={d.tituloPersonalizado}
                      onChange={(e) =>
                        atualizarCampo(categoria, "tituloPersonalizado", e.target.value)
                      }
                      className={inputClass}
                      placeholder="Ex: Sonhos relatados"
                    />
                  </Campo>
                )}

                <Campo label="Nota interna">
                  <textarea
                    rows={3}
                    value={d.notaInterna}
                    onChange={(e) => atualizarCampo(categoria, "notaInterna", e.target.value)}
                    className={inputClass}
                    placeholder="Seu raciocínio, interpretação ou lembrete privado — a cliente nunca vê isso."
                  />
                </Campo>

                <Campo label="Versão para a cliente (opcional por enquanto)">
                  <textarea
                    rows={3}
                    value={d.versaoCliente}
                    onChange={(e) => atualizarCampo(categoria, "versaoCliente", e.target.value)}
                    className={inputClass}
                    placeholder="O texto final que a cliente vai ler, se você decidir compartilhar."
                  />
                </Campo>

                <Campo label="Visibilidade">
                  <select
                    value={d.visibilidade}
                    onChange={(e) =>
                      atualizarCampo(categoria, "visibilidade", e.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="interno">🔒 Somente terapeuta</option>
                    <option value="cliente">👤 Visível para cliente</option>
                  </select>
                </Campo>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-sm text-tinta-soft">
                    <input
                      type="checkbox"
                      checked={d.incluirNoPdf}
                      onChange={(e) =>
                        atualizarCampo(categoria, "incluirNoPdf", e.target.checked)
                      }
                      className="rounded"
                    />
                    📄 Incluir no PDF
                  </label>
                  <label className="flex items-center gap-2 text-sm text-tinta-soft">
                    <input
                      type="checkbox"
                      checked={d.destacar}
                      onChange={(e) => atualizarCampo(categoria, "destacar", e.target.checked)}
                      className="rounded"
                    />
                    ⭐ Destacar
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {erro && <p className="text-sm text-red-700 mt-4">{erro}</p>}

      <div className="flex items-center gap-3 pt-6">
        <button
          type="button"
          onClick={handleConcluir}
          disabled={enviando}
          className="rounded-xl2 bg-terracota-500 text-white text-sm px-6 py-2.5 hover:bg-terracota-600 transition-colors shadow-soft disabled:opacity-60"
        >
          {enviando ? "Salvando..." : "Concluído"}
        </button>
      </div>
    </div>
  );
}
