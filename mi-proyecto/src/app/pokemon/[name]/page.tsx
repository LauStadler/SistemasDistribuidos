import Link from "next/link";

export default async function PokemonPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await res.json();

  const sprite =
    data.sprites.other["official-artwork"].front_default || data.sprites.front_default;

  return (
    <div
      style={{
        backgroundColor: "#1e272e",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#ecf0f1",
        padding: "20px",
      }}
    >
      <img
        src={sprite}
        alt={data.name}
        width={200}
        height={200}
        style={{
          imageRendering: "pixelated",
          marginBottom: "20px",
        }}
      />
      <h1 style={{ fontSize: "2rem", textTransform: "capitalize", marginBottom: "10px" }}>
        {data.name}
      </h1>

      {/* Aquí solo texto, sin cuadro */}
      <p style={{ fontSize: "18px", margin: "4px 0" }}>Altura: {data.height / 10} m</p>
      <p style={{ fontSize: "18px", margin: "4px 0" }}>Peso: {data.weight / 10} kg</p>

      <Link
        href="/"
        style={{
          marginTop: "30px",
          color: "#00a8ff",
          textDecoration: "none",
          fontWeight: "bold",
          transition: "color 0.3s",
        }}
      >
        ← Volver a la lista
      </Link>
    </div>
  );
}
