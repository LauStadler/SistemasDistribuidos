import { NextResponse } from "next/server";
import { db } from "@/app/lib/database";

// DELETE /api/favorites/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const deleted = await db.delete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Pokémon no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Pokémon eliminado correctamente" }, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar favorito:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
