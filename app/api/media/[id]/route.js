import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "../../../lib/dataStore";

export async function GET(_request, { params }) {
  const list = await readJSON("media.json", []);
  const item = list.find((i) => i.id === params.id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function DELETE(_request, { params }) {
  const list = await readJSON("media.json", []);
  const idx = list.findIndex((i) => i.id === params.id);
  if (idx === -1)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  const [removed] = list.splice(idx, 1);
  await writeJSON("media.json", list);
  return NextResponse.json({ success: true, removed });
}
