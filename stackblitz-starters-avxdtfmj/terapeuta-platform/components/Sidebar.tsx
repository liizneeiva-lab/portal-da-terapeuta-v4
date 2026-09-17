import Link from "next/link";

const itens = [
  { href: "/portal", label: "Dashboard", ativo: true },
  { href: "/portal/clientes", label: "Clientes", ativo: true },
  { href: "/portal/tratamentos", label: "Tratamentos", ativo: false },
  { href: "/portal/sessoes", label: "Sessões", ativo: false },
  { href: "/portal/documentos", label: "Documentos", ativo: false },
  { href: "/portal/biblioteca", label: "Biblioteca", ativo: false },
  { href: "/portal/mensagens", label: "Mensagens", ativo: false },
  { href: "/portal/configuracoes", label: "Configurações", ativo: false },
];

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 border-r border-bege-300/60 bg-areia-50 px-6 py-8 hidden md:flex md:flex-col md:justify-between min-h-screen">
      <div>
        <div className="mb-10">
          <p className="font-display text-lg text-tinta">Thainara Falcão</p>
          <p className="text-xs text-tinta-muted mt-0.5">Terapias energéticas</p>
        </div>
        <nav className="space-y-1">
          {itens.map((item) =>
            item.ativo ? (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl2 px-4 py-2.5 text-sm text-tinta-soft hover:bg-salvia-50 hover:text-salvia-700 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                key={item.href}
                className="flex items-center justify-between rounded-xl2 px-4 py-2.5 text-sm text-tinta-muted/60 cursor-default"
                title="Em breve"
              >
                {item.label}
                <span className="text-[10px] uppercase tracking-wide text-tinta-muted/50">
                  em breve
                </span>
              </span>
            )
          )}
        </nav>
      </div>
      <p className="text-xs text-tinta-muted/60">Portal da terapeuta</p>
    </aside>
  );
}
