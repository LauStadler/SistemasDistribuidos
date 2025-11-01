// src/app/services/favorites.service.ts
import { Pokemon } from "@/app/lib/database";

const API_BASE = "/api/favorites";

export const favoritesService = {
  
  getAll: async (): Promise<Pokemon[]> => {
    const res = await fetch(API_BASE, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
     });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      let message = "Error al obtener favoritos";
      throw new Error(message);
    }
    return res.json();
  },

  // 🔹 Agregar un favorito
  create: async (pokemon: Pokemon): Promise<Pokemon> => {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokemon),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      let message = "Error al agregar a favoritos";
      throw new Error(message);
    }

    return res.json();
  },

  // 🔹 Eliminar un favorito por ID
  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      let message = "Error al eliminar favorito";

      throw new Error(message);
    }
  },
};
