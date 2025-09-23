"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPokemons = async () => {
      try {
        // Fetch lista de 20 pokemons
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");
        const results = response.data.results;

        // Fetch detalles de cada pokemon
        const promises = results.map((p: any) => axios.get(p.url));
        const responses = await Promise.all(promises);
        const fullData = responses.map(res => res.data);

        setPokemons(fullData);
      } catch (error) {
        console.error("Error al obtener pokemons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemons();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", fontSize: "18px" }}>Cargando pokemons...</p>;
  }

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h1 className="text-4xl font-bold mb-4" style={{ textAlign: "center", marginBottom: "20px" }}>Lista de Pokemons</h1>
      {pokemons.map((pokemon) => (
        <PokemonItem key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}

// PokemonItem solo renderiza, nunca hace fetch
function PokemonItem({ pokemon }: { pokemon: any }) {
  const [clicks, setClicks] = useState(0);

  // Placeholder por si no hay sprite
  const sprite = pokemon.sprites?.front_default || "/placeholder.png";

  return (
    <button
      onClick={() => setClicks(clicks + 1)}
      style={{
        display: "block",
        width: "100%",
        margin: "8px 0",
        padding: "12px",
        border: "none",
        borderRadius: "6px",
        background: "#2c3e50",
        color: "#ecf0f1",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img
          src={sprite}
          alt={pokemon.name}
          width={60}
          height={60}
          style={{ imageRendering: "pixelated" }}
        />
        <div>
          <p style={{ margin: 0, fontWeight: "bold", fontSize: "18px" }}>{pokemon.name}</p>
          <p style={{ margin: "2px 0", fontSize: "14px" }}>
            Altura: {pokemon.height} | Peso: {pokemon.weight}
          </p>
          <p style={{ margin: "2px 0", fontSize: "12px", color: "#bdc3c7" }}>
            Usado {clicks} veces
          </p>
        </div>
      </div>
    </button>
  );
}
