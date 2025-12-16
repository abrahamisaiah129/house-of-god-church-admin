import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "../../lib/dataStore";

export async function GET() {
  const list = await readJSON("events.json", []);
  return NextResponse.json(list);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const list = await readJSON("events.json", []);
    const id = Date.now().toString();
    const item = { id, ...body };
    list.unshift(item);
    await writeJSON("events.json", list);
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
