"use client";

import Link from "next/link";
import "./globals.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          fontFamily: "sans-serif",
          backgroundColor: "#1e293b",
        }}
      >
        <QueryClientProvider client={queryClient}>
          <nav
            style={{
              background: "#1e293b",
              color: "#fff",
              padding: "1rem 2rem",
            }}
          >
            <Link
              href="/"
              style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
            >
              Lista de Pokemons
            </Link>
          </nav>

          <main style={{ minHeight: "80vh", padding: "2rem" }}>{children}</main>
          <footer
            style={{
              background: "#1e293b",
              color: "white",
              textAlign: "center",
              padding: "1rem",
            }}
          >
            © 2025 Laura Stadler
          </footer>
        </QueryClientProvider>
      </body>
    </html>
  );
}
