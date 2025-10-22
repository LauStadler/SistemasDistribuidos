// app/layout.tsx
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          fontFamily: "sans-serif",
          backgroundColor: "#f3f4f6",
        }}
      >
        <nav
          style={{
            background: "#1e293b",
            color: "#fff",
            padding: "1rem 2rem",
          }}
        >
          <Link href="/" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
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
          © 2025  Laura Stadler
        </footer>
      </body>
    </html>
  );
}
