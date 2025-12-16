import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "../../lib/dataStore";

export async function GET() {
  const list = await readJSON("media.json", []);
  return NextResponse.json(list);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const list = await readJSON("media.json", []);
    const id = Date.now().toString();
    const item = { id, uploadedAt: new Date().toISOString(), ...body };
    list.unshift(item);
    await writeJSON("media.json", list);
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
