import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "../../lib/dataStore";

export async function GET() {
  const hero = await readJSON("hero.json", { slides: [] });
  return NextResponse.json(hero);
}

export async function PUT(request) {
  try {
    const body = await request.json();
    await writeJSON("hero.json", body);
    return NextResponse.json(body);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
