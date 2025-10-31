"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoritesService } from "@/app/services/favorites.service";
import { Pokemon } from "@/app/lib/database";

export function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pokemon: Pokemon) => favoritesService.create(pokemon),
    onSuccess: () => {
      // 🔥 Versión actual de TanStack Query (v5)
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (error) => {
      console.error("Error al agregar favorito:", error);
    },
  });
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => favoritesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (error) => {
      console.error("Error al eliminar favorito:", error);
    },
  });
}
