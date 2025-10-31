// app/services/favorites.service.ts
import { Pokemon } from "@/app/lib/database";

export const favoritesService = {
  // Obtener todos los pokémon favoritos
  getAll: async (): Promise<Pokemon[]> => {
    const res = await fetch("/api/favorites");

    if (!res.ok) throw new Error("Error al obtener los favoritos");

    return res.json();
  },

  // Agregar un pokémon a favoritos
  create: async (pokemon: Pokemon): Promise<Pokemon> => {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokemon),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.error || "Error al agregar a favoritos");
    }

    return res.json();
  },

  // Eliminar un pokémon de favoritos por id
  delete: async (id: number): Promise<void> => {
    const res = await fetch(`/api/favorites/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.error || "Error al eliminar de favoritos");
    }
  },
};
