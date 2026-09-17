# Plataforma da Terapeuta — Módulo 1 (Clientes)

Este é o primeiro módulo do "Portal da Terapeuta", construído seguindo a
arquitetura que definimos: Terapeuta → Cliente → Tratamento → Sessão → Registro.

## O que já funciona

- Dashboard com visão geral (clientes ativos, tratamentos em andamento)
- Lista de clientes
- Cadastro de novo cliente (formulário completo, salva de verdade)
- Perfil individual do cliente:
  - dados pessoais
  - notas internas (visual diferenciado, deixando claro que é só da terapeuta)
  - tratamentos ativos, com o indicador visual de progresso "arco de abertura"
    (elemento de assinatura da identidade visual, em vez de uma barra de
    progresso genérica)

## O que ainda é simulado (mock)

Os dados vivem em memória (`lib/data.ts`), não em um banco de dados de
verdade — por isso, se você reiniciar o servidor, os dados voltam ao estado
inicial (dois clientes de exemplo). Isso é proposital nesta fase: permite
testar toda a experiência sem precisar configurar um banco de dados ainda.
Quando avançarmos, trocamos essas funções por consultas reais ao Postgres,
mas a "forma" delas (o que cada função recebe e devolve) já foi pensada para
não precisar mudar a interface quando isso acontecer.

## Como rodar no seu computador

Você vai precisar ter o **Node.js** instalado (versão 18 ou mais recente).
Baixe em nodejs.org se ainda não tiver.

1. Extraia esta pasta em algum lugar do seu computador
2. Abra o terminal dentro da pasta
3. Rode:
   ```
   npm install
   ```
4. Depois:
   ```
   npm run dev
   ```
5. Abra `http://localhost:3000` no navegador

## Estrutura do projeto (para você ir se orientando)

```
app/
  portal/
    page.tsx              → Dashboard
    clientes/
      page.tsx             → Lista de clientes
      novo/page.tsx         → Formulário de novo cliente
      [id]/page.tsx         → Perfil do cliente
lib/
  types.ts                 → Modelo de dados (o "dicionário" da plataforma)
  data.ts                  → Onde os dados ficam guardados (mock por enquanto)
components/
  Sidebar.tsx               → Menu lateral do portal
  ProgressArc.tsx            → O indicador visual de progresso (arco)
```

## Próximo módulo

Seguindo a ordem que definimos: **Tratamentos** (criar/editar tratamento de
um cliente) e depois **Sessões** (a estrutura modular de registros, a parte
mais importante da plataforma).
