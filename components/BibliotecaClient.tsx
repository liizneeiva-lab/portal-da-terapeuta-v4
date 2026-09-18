'use client';

import { useState } from 'react';
import type { ItemBiblioteca, TipoItemBiblioteca } from '@/lib/types';

function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR');
}

const rotulosTipo: Record<TipoItemBiblioteca, string> = {
  modelo: 'Modelo interno',
  conteudo_educativo: 'Conteúdo educativo',
};

export default function BibliotecaClient({
  itensIniciais,
}: {
  itensIniciais: ItemBiblioteca[];
}) {
  const [itens, setItens] = useState(itensIniciais);
  const [filtro, setFiltro] = useState<TipoItemBiblioteca | 'todos'>('todos');
  const [editando, setEditando] = useState<ItemBiblioteca | null>(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [tipo, setTipo] = useState<TipoItemBiblioteca>('modelo');
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const itensFiltrados =
    filtro === 'todos' ? itens : itens.filter((i) => i.tipo === filtro);

  function abrirNovo() {
    setEditando(null);
    setTitulo('');
    setTexto('');
    setTipo('modelo');
    setMostrarForm(true);
  }

  function abrirEdicao(item: ItemBiblioteca) {
    setEditando(item);
    setTitulo(item.titulo);
    setTexto(item.texto);
    setTipo(item.tipo);
    setMostrarForm(true);
  }

  async function handleSalvar() {
    if (!titulo.trim() || !texto.trim()) {
      setErro('Preenche título e texto.');
      return;
    }
    setErro(null);
    setSalvando(true);
    try {
      if (editando) {
        const resposta = await fetch(`/api/biblioteca/${editando.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ titulo, texto, tipo }),
        });
        if (!resposta.ok) throw new Error();
        const atualizado: ItemBiblioteca = await resposta.json();
        setItens((atual) =>
          atual.map((i) => (i.id === atualizado.id ? atualizado : i))
        );
      } else {
        const resposta = await fetch('/api/biblioteca', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ titulo, texto, tipo }),
        });
        if (!resposta.ok) throw new Error();
        const novo: ItemBiblioteca = await resposta.json();
        setItens((atual) => [novo, ...atual]);
      }
      setMostrarForm(false);
    } catch {
      setErro('Não foi possível salvar. Tenta de novo?');
    } finally {
      setSalvando(false);
    }
  }

  async function handleExcluir(id: string) {
    const confirmar = window.confirm('Excluir este item da biblioteca?');
    if (!confirmar) return;
    const anterior = itens;
    setItens((atual) => atual.filter((i) => i.id !== id));
    const resposta = await fetch(`/api/biblioteca/${id}`, { method: 'DELETE' });
    if (!resposta.ok) {
      setErro('Não foi possível excluir. Tenta de novo?');
      setItens(anterior);
    }
  }

  return (
    <div>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-salvia-600 mb-2">
            Biblioteca
          </p>
          <h1 className="font-display text-3xl text-tinta">
            Modelos e conteúdo educativo
          </h1>
        </div>
        <button
          onClick={abrirNovo}
          className="text-sm px-4 py-2 rounded-xl2 bg-salvia-600 text-white hover:bg-salvia-700"
        >
          + Novo item
        </button>
      </header>

      <div className="flex gap-2 mb-6">
        {(['todos', 'modelo', 'conteudo_educativo'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`text-sm px-3 py-1.5 rounded-full transition-colors ${
              filtro === f
                ? 'bg-salvia-600 text-white'
                : 'bg-bege-200 text-tinta-soft hover:bg-bege-300'
            }`}
          >
            {f === 'todos' ? 'Todos' : rotulosTipo[f]}
          </button>
        ))}
      </div>

      {itensFiltrados.length === 0 ? (
        <p className="text-sm text-tinta-muted">Nenhum item encontrado.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {itensFiltrados.map((item) => (
            <div
              key={item.id}
              className="rounded-xl3 bg-white/70 border border-bege-300/50 shadow-soft p-5"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs px-2.5 py-1 rounded-full bg-salvia-50 text-salvia-700">
                  {rotulosTipo[item.tipo]}
                </span>
                <span className="text-xs text-tinta-muted">
                  {formatarData(item.criadoEm)}
                </span>
              </div>
              <h3 className="font-display text-base text-tinta mb-2">
                {item.titulo}
              </h3>
              <p className="text-sm text-tinta-soft whitespace-pre-wrap line-clamp-4">
                {item.texto}
              </p>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => abrirEdicao(item)}
                  className="text-xs text-salvia-600 hover:text-salvia-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleExcluir(item.id)}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {mostrarForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl3 p-6 max-w-lg w-full shadow-card">
            <h3 className="font-display text-lg text-tinta mb-4">
              {editando ? 'Editar item' : 'Novo item'}
            </h3>

            {erro && <p className="text-sm text-red-600 mb-3">{erro}</p>}

            <label className="block text-sm text-tinta-muted mb-1">Tipo</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as TipoItemBiblioteca)}
              className="w-full mb-4 rounded-xl2 border border-bege-300 px-3 py-2 text-sm"
            >
              <option value="modelo">Modelo interno</option>
              <option value="conteudo_educativo">Conteúdo educativo</option>
            </select>

            <label className="block text-sm text-tinta-muted mb-1">Título</label>
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full mb-4 rounded-xl2 border border-bege-300 px-3 py-2 text-sm"
            />

            <label className="block text-sm text-tinta-muted mb-1">Texto</label>
            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              rows={6}
              className="w-full mb-4 rounded-xl2 border border-bege-300 px-3 py-2 text-sm"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setMostrarForm(false)}
                className="text-sm text-tinta-muted hover:text-tinta"
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvar}
                disabled={salvando}
                className="text-sm px-4 py-2 rounded-xl2 bg-salvia-600 text-white hover:bg-salvia-700 disabled:opacity-50"
              >
                {salvando ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
