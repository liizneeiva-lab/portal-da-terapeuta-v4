import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portal da Terapeuta",
  description: "Plataforma de acompanhamento terapêutico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="font-body">{children}</body>
    </html>
  );
}
