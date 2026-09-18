'use client';

import { useState } from 'react';
import type { Documento } from '@/lib/types';

function formatarTamanho(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR');
}

export default function DocumentosCliente({
  clienteId,
  documentosIniciais,
}: {
  clienteId: string;
  documentosIniciais: Documento[];
}) {
  const [documentos, setDocumentos] = useState(documentosIniciais);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;

    setErro(null);

    if (arquivo.size > 5 * 1024 * 1024) {
      setErro('Arquivo muito grande (máximo 5 MB).');
      e.target.value = '';
      return;
    }

    setEnviando(true);
    try {
      const dados = await new Promise<string>((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => resolve(leitor.result as string);
        leitor.onerror = reject;
        leitor.readAsDataURL(arquivo);
      });

      const resposta = await fetch('/api/documentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clienteId,
          nome: arquivo.name,
          tipoArquivo: arquivo.type || 'application/octet-stream',
          tamanho: arquivo.size,
          dados,
          origem: 'upload',
        }),
      });

      if (!resposta.ok) throw new Error('Falha ao enviar');
      const novo: Documento = await resposta.json();
      setDocumentos((atual) => [novo, ...atual]);
    } catch {
      setErro('Não foi possível enviar o arquivo. Tenta de novo?');
    } finally {
      setEnviando(false);
      e.target.value = '';
    }
  }

  async function handleExcluir(id: string) {
    const confirmar = window.confirm('Excluir este documento?');
    if (!confirmar) return;

    const anterior = documentos;
    setDocumentos((atual) => atual.filter((d) => d.id !== id));

    const resposta = await fetch(`/api/documentos/${id}`, { method: 'DELETE' });
    if (!resposta.ok) {
      setErro('Não foi possível excluir. Tenta de novo?');
      setDocumentos(anterior);
    }
  }

  return (
    <div className="rounded-xl3 bg-white/70 border border-bege-300/50 shadow-soft p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-base text-tinta">Documentos</h3>
        <label className="text-sm text-salvia-600 hover:text-salvia-700 cursor-pointer">
          {enviando ? 'Enviando...' : '+ Adicionar arquivo'}
          <input
            type="file"
            className="hidden"
            onChange={handleUpload}
            disabled={enviando}
          />
        </label>
      </div>

      {erro && <p className="text-sm text-red-600 mb-3">{erro}</p>}

      {documentos.length === 0 ? (
        <p className="text-sm text-tinta-muted">
          Nenhum documento enviado ainda.
        </p>
      ) : (
        <ul className="space-y-2">
          {documentos.map((doc) => (
            <li
              key={doc.id}
              className="flex items-center justify-between text-sm py-2 border-b border-bege-200/60 last:border-0"
            >
              <a
                href={doc.dados}
                download={doc.nome}
                className="text-tinta hover:text-salvia-700 truncate max-w-[60%]"
              >
                {doc.nome}
              </a>
              <div className="flex items-center gap-3 text-tinta-muted">
                <span className="text-xs">{formatarTamanho(doc.tamanho)}</span>
                <span className="text-xs">{formatarData(doc.criadoEm)}</span>
                <button
                  onClick={() => handleExcluir(doc.id)}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
