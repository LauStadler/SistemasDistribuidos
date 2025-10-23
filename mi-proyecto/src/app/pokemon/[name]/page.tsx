// app/pokemon/[name]/page.tsx
import Link from "next/link";

type Props = { params: Promise<{ name: string }> };

export default async function PokemonDetail({ params }: Props) {
  const { name } = await params; 
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) {
    return (
      <div style={{ color: "#ecf0f1", textAlign: "center", padding: 40 }}>
        <p>No se encontró el Pokémon {name}</p>
        <Link href="/">← Volver</Link>
      </div>
    );
  }
  const data = await res.json();

  const sprite = data.sprites.other?.["official-artwork"]?.front_default || data.sprites.front_default;

  return (
    <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <img src={sprite} alt={data.name} width={220} height={220} style={{ imageRendering: "pixelated", marginBottom: 20 }} />
      <h1 style={{ textTransform: "capitalize", fontSize: 28, marginBottom: 12, color: "#ecf0f1" }}>{data.name}</h1>

      <p style={{ margin: "6px 0", color: "#d1d5db" }}>Altura: {data.height / 10} m</p>
      <p style={{ margin: "6px 0", color: "#d1d5db" }}>Peso: {data.weight / 10} kg</p>

      <Link href="/" style={{ marginTop: 24, color: "#60a5fa", fontWeight: 600 }}>
        ← Volver a la lista
      </Link>
    </div>
  );
}
