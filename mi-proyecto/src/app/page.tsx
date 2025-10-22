"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");
      const results = await Promise.all(
        res.data.results.map(async (p: any) => {
          const detail = await axios.get(p.url);
          return {
            name: p.name,
            sprite: detail.data.sprites.front_default,
          };
        })
      );
      setPokemons(results);
    }
    fetchData();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#1e272e",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#ecf0f1",
          fontSize: "2rem",
          marginBottom: "20px",
        }}
      >
        Lista de Pokemons
      </h1>

      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        {pokemons.map((p) => (
          <Link
            key={p.name}
            href={`/pokemon/${p.name}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              backgroundColor: "#2f3640",
              color: "#f5f6fa",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "10px",
              textDecoration: "none",
              transition: "background 0.3s, transform 0.2s",
            }}
          >
            <img
              src={p.sprite}
              alt={p.name}
              width={60}
              height={60}
              style={{ imageRendering: "pixelated" }}
            />
            <p style={{ margin: 0, fontSize: "18px", textTransform: "capitalize" }}>
              {p.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
