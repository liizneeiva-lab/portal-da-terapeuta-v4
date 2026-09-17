import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Off-white / areia — base do fundo
        areia: {
          DEFAULT: "#FAF6EF",
          50: "#FEFDFB",
          100: "#FAF6EF",
          200: "#F3ECDD",
        },
        // Bege / sand — superfícies, cards
        bege: {
          DEFAULT: "#EFE6D6",
          100: "#F5EFE3",
          200: "#EFE6D6",
          300: "#E2D5BE",
        },
        // Verde sálvia — cor de identidade / navegação / estados positivos
        salvia: {
          DEFAULT: "#7C8B70",
          50: "#EEF1EA",
          100: "#DCE2D3",
          400: "#8FA080",
          500: "#7C8B70",
          600: "#647058",
          700: "#4E5745",
        },
        // Terracota suave — acento, destaques, ação principal
        terracota: {
          DEFAULT: "#BF7E5C",
          100: "#F1DFD1",
          400: "#CB9576",
          500: "#BF7E5C",
          600: "#A5673F",
        },
        // Tinta — texto principal, quente, nunca preto puro
        tinta: {
          DEFAULT: "#39352C",
          soft: "#5B564A",
          muted: "#8C8577",
        },
      },
      fontFamily: {
        // Serifada, para títulos e a voz "acolhedora" da marca
        display: [
          "ui-serif",
          "Palatino Linotype",
          "Palatino",
          "Iowan Old Style",
          "Georgia",
          "serif",
        ],
        // Sem serifa, para texto de interface, legível e neutro
        body: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Inter",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      boxShadow: {
        soft: "0 2px 16px -4px rgba(57, 53, 44, 0.08)",
        card: "0 1px 2px rgba(57, 53, 44, 0.04), 0 8px 24px -8px rgba(57, 53, 44, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
