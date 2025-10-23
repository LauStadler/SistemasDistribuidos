// app/page.tsx
"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery } from "@tanstack/react-query";

type BasicPokemon = { name: string; sprite: string | null };

async function fetchPokemonPage(limit: number, offset: number): Promise<BasicPokemon[]> {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const results = res.data.results as { name: string; url: string }[];

  const details = await Promise.all(
    results.map(async (r) => {
      const det = await axios.get(r.url);
      const sprite = det.data.sprites.front_default || null;
      return { name: r.name, sprite } as BasicPokemon;
    })
  );

  return details;
}

export default function PokemonListPage() {
  const [limit, setLimit] = useState(12);
  const offset = 0;

 const { data: pokemons, isLoading, isFetching, refetch, error } = useQuery({
    queryKey: ["pokemons", limit, offset],
    queryFn: () => fetchPokemonPage(limit, offset),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 1,
  });


  return (
    <div
    style={{
      maxWidth: 700,
      margin: "0 auto",
      padding: 20,
      backgroundColor: "#0f172a", 
      color: "#e2e8f0", 
      borderRadius: 12,
    }}
  >
    <h1
      style={{
        textAlign: "center",
        fontSize: 28,
        marginBottom: 24,
        color: "#f8fafc", 
      }}
    >
      Lista de Pokémons
    </h1>

    {isLoading ? (
      <div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              backgroundColor: "#1e293b", 
              padding: 12,
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <Skeleton circle={true} height={60} width={60} />
            <div style={{ flex: 1 }}>
              <Skeleton height={18} width={`40%`} />
            </div>
          </div>
        ))}
      </div>
    ) : error ? (
      <p style={{ color: "#f87171" }}>Error al cargar pokemons.</p>
    ) : (
      <div>
        {pokemons?.map((p) => (
          <Link
            key={p.name}
            href={`/pokemon/${p.name}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              backgroundColor: "#1e293b", // gris azulado oscuro
              color: "#f1f5f9",
              padding: 12,
              borderRadius: 10,
              marginBottom: 10,
              textDecoration: "none",
            }}
          >
            <img
              src={p.sprite ?? "/placeholder.png"}
              alt={p.name}
              width={60}
              height={60}
              style={{ imageRendering: "pixelated" }}
            />
            <div style={{ textTransform: "capitalize", fontSize: 18 }}>
              {p.name}
            </div>
          </Link>
        ))}
      </div>
    )}

    <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
      <button
        onClick={() => setLimit((prev) => prev + 12)}
        style={{
          background: "#2563eb", // azul vibrante
          color: "#f8fafc",
          padding: "10px 16px",
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        {isFetching ? "Cargando..." : "Cargar más"}
      </button>
    </div>
  </div>
  );
}
