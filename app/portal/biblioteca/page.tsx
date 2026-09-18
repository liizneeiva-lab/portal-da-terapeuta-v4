import { listarItensBiblioteca } from '@/lib/data';
import BibliotecaClient from '@/components/BibliotecaClient';

export default function BibliotecaPage() {
  const itens = listarItensBiblioteca();
  return <BibliotecaClient itensIniciais={itens} />;
}
