"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery } from "@tanstack/react-query";
import { useAddFavorite, useRemoveFavorite } from "@/app/hooks/useFavorites";
import { favoritesService } from "@/app/services/favorites.service";
import { Heart } from "lucide-react"; 
import { Pokemon } from "@/app/lib/database";

type BasicPokemon = { name: string; sprite: string | null; id: number; height: number; weight: number;};

// 🔹 Función para traer pokemons desde la API de PokeAPI
async function fetchPokemonPage(limit: number, offset: number): Promise<BasicPokemon[]> {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const results = res.data.results as { name: string; url: string }[];

  const details = await Promise.all(
    results.map(async (r) => {
      const det = await axios.get(r.url);
      const sprite = det.data.sprites.front_default || null;
      return { name: r.name,
        sprite,
        id: det.data.id,
        height: det.data.height,
        weight: det.data.weight,
      } as BasicPokemon & { height: number; weight: number };
    })
  );

  return details;
}

export default function PokemonListPage() {
  const [limit, setLimit] = useState(12);
  const [showFavorites, setShowFavorites] = useState(false);
  const offset = 0;


  const { data: pokemons, isLoading, isFetching, error } = useQuery<BasicPokemon[]>({
    queryKey: ["pokemons", limit, offset],
    queryFn: () => fetchPokemonPage(limit, offset),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 1,
  });

  const { data: favorites = [] } = useQuery<Pokemon[]>({
    queryKey: ["favorites"],
    queryFn: favoritesService.getAll,
  });

  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const isFavorite = (name: string) => favorites.some((f) => f.name === name);

 const handleToggleFavorite = async (p: BasicPokemon) => {
  try {
    const fav = favorites.find((f: Pokemon) => f.name === p.name);

    if (fav) {
      removeFavorite.mutate(fav.id);
    } else {
      addFavorite.mutate({
        name: p.name,
        id: p.id,
        height: p.height,
        weight: p.weight,
      });
    }
  } catch (error) {
    console.error("Error al modificar favoritos", error);
  }
};

  // 🔹 Filtrar según si se muestran solo favoritos
  const displayList = showFavorites
    ? pokemons?.filter((p) => isFavorite(p.name)) ?? []
    : pokemons ?? [];

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
      {/* Header con botón de favoritos */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, color: "#f8fafc" }}>Lista de Pokémons</h1>
        <button
          onClick={() => setShowFavorites((prev) => !prev)}
          style={{
            backgroundColor: showFavorites ? "#ef4444" : "#2563eb",
            color: "#f8fafc",
            padding: "8px 12px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {showFavorites ? "Mostrar Todos" : "Favoritos ❤️"}
        </button>
      </div>

      {isLoading ? (
        <div>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, backgroundColor: "#1e293b", padding: 12, borderRadius: 10, marginBottom: 10 }}>
              <Skeleton circle height={60} width={60} />
              <div style={{ flex: 1 }}>
                <Skeleton height={18} width={`40%`} />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <p style={{ color: "#f87171" }}>Error al cargar pokemons.</p>
      ) : displayList.length === 0 ? (
        <p style={{ color: "#f87171", textAlign: "center" }}>No hay pokémons para mostrar 😢</p>
      ) : (
        <div>
          {displayList.map((p) => {
            const fav = isFavorite(p.name);
            const isMutating = addFavorite.isPending || removeFavorite.isPending;

            return (
              <div
                key={p.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  backgroundColor: "#1e293b",
                  color: "#f1f5f9",
                  padding: 12,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <Link
                  href={`/pokemon/${p.name}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    textDecoration: "none",
                    color: "inherit",
                    flex: 1,
                  }}
                >
                  <img
                    src={p.sprite ?? "/placeholder.png"}
                    alt={p.name}
                    width={60}
                    height={60}
                    style={{ imageRendering: "pixelated" }}
                  />
                  <div style={{ textTransform: "capitalize", fontSize: 18 }}>{p.name}</div>
                </Link>

                <button
                  onClick={() => handleToggleFavorite(p)}
                  disabled={isMutating}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: isMutating ? "wait" : "pointer",
                    color: fav ? "#ef4444" : "#94a3b8",
                    transition: "color 0.2s",
                  }}
                  title={isMutating ? "Procesando..." : fav ? "Quitar de favoritos" : "Agregar a favoritos"}
                >
                  <Heart fill={fav ? "#ef4444" : "none"} size={24} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {!showFavorites && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
          <button
            onClick={() => setLimit((prev) => prev + 12)}
            style={{
              background: "#2563eb",
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
      )}
    </div>
  );
}
