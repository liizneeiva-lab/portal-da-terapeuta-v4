"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Registro } from "@/lib/types";
import { labelCategoria } from "@/lib/categorias";

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

export default function EditarRegistroForm({
  clienteId,
  tratamentoId,
  sessaoId,
  registro,
}: {
  clienteId: string;
  tratamentoId: string;
  sessaoId: string;
  registro: Registro;
}) {
  const router = useRouter();
  const [tituloPersonalizado, setTituloPersonalizado] = useState(
    registro.tituloPersonalizado ?? ""
  );
  const [notaInterna, setNotaInterna] = useState(registro.notaInterna ?? "");
  const [versaoCliente, setVersaoCliente] = useState(registro.versaoCliente ?? "");
  const [visibilidade, setVisibilidade] = useState(registro.visibilidade);
  const [incluirNoPdf, setIncluirNoPdf] = useState(registro.incluirNoPdf);
  const [destacar, setDestacar] = useState(registro.destacar);
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  async function handleConcluir() {
    if (enviando) return;
    setErro("");
    setEnviando(true);

    const res = await fetch(`/api/registros/${registro.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tituloPersonalizado: tituloPersonalizado || undefined,
        notaInterna: notaInterna || undefined,
        versaoCliente: versaoCliente || undefined,
        visibilidade,
        incluirNoPdf,
        destacar,
      }),
    });

    setEnviando(false);

    if (!res.ok) {
      setErro("Não foi possível salvar. Tente novamente.");
      return;
    }

    router.push(
      `/portal/clientes/${clienteId}/tratamentos/${tratamentoId}/sessoes/${sessaoId}`
    );
  }

  async function handleExcluir() {
    const confirmar = window.confirm(
      "Tem certeza que quer excluir essa informação? Essa ação não pode ser desfeita."
    );
    if (!confirmar) return;

    setExcluindo(true);
    const res = await fetch(`/api/registros/${registro.id}`, { method: "DELETE" });
    setExcluindo(false);

    if (!res.ok) {
      setErro("Não foi possível excluir. Tente novamente.");
      return;
    }

    router.push(
      `/portal/clientes/${clienteId}/tratamentos/${tratamentoId}/sessoes/${sessaoId}`
    );
  }

  return (
    <div>
      <span className="inline-block text-xs px-2.5 py-1 rounded-full bg-salvia-50 text-salvia-700 mb-6">
        {labelCategoria(registro.categoria)}
      </span>

      <div className="space-y-4">
        {registro.categoria === "personalizado" && (
          <Campo label="Título do campo personalizado">
            <input
              type="text"
              value={tituloPersonalizado}
              onChange={(e) => setTituloPersonalizado(e.target.value)}
              className={inputClass}
              placeholder="Ex: Sonhos relatados"
            />
          </Campo>
        )}

        <Campo label="Nota interna">
          <textarea
            rows={4}
            value={notaInterna}
            onChange={(e) => setNotaInterna(e.target.value)}
            className={inputClass}
          />
        </Campo>

        <Campo label="Versão para a cliente (opcional por enquanto)"��(�����������ѕ�хɕ�(������������ɽ������(������������م�Ք��ٕ�ͅ�����ѕ�(��������������������졔�����͕�Y��ͅ�����є���хɝ�йم�Ք��(�����������������9���������������(������������(��������������((��������������������Y�ͥ����������(�����������͕����(������������م�Ք��٥ͥ���������(��������������������졔�����͕�Y�ͥ�����������хɝ�йم�Ք��́�������٥ͥ����������(�����������������9���������������(�����������(��������������ѥ���م�Ք􉥹ѕɹ����~RH�M����є�ѕɅ���ф��ѥ���(��������������ѥ���م�Ք􉍱���є���~F��Y���ٕ����Ʉ������є��ѥ���(�����������͕�����(��������������((���������؁�����9���􉙱����ѕ�̵���ѕȁ����؈�(����������񱅉��������9���􉙱����ѕ�̵���ѕȁ����ȁѕ�еʹ�ѕ�еѥ�ф�ͽ�Ј�(����������������(������������������􉍡�������(���������������������������ե�9�A���(����������������������졔�����͕�%���ե�9�A�����хɝ�й���������(�������������������9����ɽչ����(��������������(�������������~N�%���եȁ���A(����������𽱅����(����������񱅉��������9���􉙱����ѕ�̵���ѕȁ����ȁѕ�еʹ�ѕ�еѥ�ф�ͽ�Ј�(����������������(������������������􉍡�������(����������������������푕�х����(����������������������졔�����͕���х��ȡ��хɝ�й���������(�������������������9����ɽչ����(��������������(��������������@���х���(����������𽱅����(��������𽑥��(������𽑥��((��������ɼ������������9����ѕ�еʹ�ѕ�еɕ�������дЈ���ɽ�����((�������؁�����9���􉙱����ѕ�̵���ѕȁ���ѥ�䵉��ݕ�������́�д؈�(�����������ѽ�(�����������������ѽ��(����������������������������ե��(������������ͅ�����핹٥�����(���������������9����ɽչ�����ȁ���ѕ�Ʌ��ф�����ѕ�еݡ�є�ѕ�еʹ���؁��ȸԁ��ٕ�鉜�ѕ�Ʌ��ф������Ʌ�ͥѥ��������́͡���ܵͽ�Ё��ͅ��������������(���������(����������핹٥��������M��م��������耉����������(�����������ѽ��(�����������ѽ�(�����������������ѽ��(������������������������፱ե��(������������ͅ������፱ե����(���������������9����ѕ�еʹ�ѕ�еɕ��������ٕ��ѕ�еɕ��������ͅ��������������(���������(�����������፱ե�������፱ե��������耉፱եȁ����ɵ������(�����������ѽ��(������𽑥��(����𽑥��(����)�(