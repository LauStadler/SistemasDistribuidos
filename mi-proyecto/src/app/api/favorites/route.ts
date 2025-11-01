import { NextResponse } from "next/server";
import { db } from "@/app/lib/database";

export async function GET() {
  try {
    const favorites = await db.getAll();
    return NextResponse.json(favorites, { status: 200 });
  } catch (error) {
    console.error("Error al obtener favoritos:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, id, height, weight } = body;
    console.error({ name, id, height, weight });

    if (!name || !height || !weight) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    // Evitar duplicados por nombre (opcional)
    const all = await db.getAll();
    if (all.some(p => p.name.toLowerCase() === name.toLowerCase())) {
      return NextResponse.json({ error: "El Pokémon ya está en favoritos" }, { status: 409 });
    }

    const newPokemon = await db.create({ name, id, height, weight });
    return NextResponse.json(newPokemon, { status: 201 });
  } catch (error) {
    console.error("Error al agregar favorito:", error);
    console.log("dio error la rta de la base de datos");
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
