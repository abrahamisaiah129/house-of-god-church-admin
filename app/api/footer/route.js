import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "../../lib/dataStore";

export async function GET() {
  const footer = await readJSON("footer.json", {
    brand: "",
    copyright: "",
    links: [],
  });
  return NextResponse.json(footer);
}

export async function PUT(request) {
  try {
    const body = await request.json();
    await writeJSON("footer.json", body);
    return NextResponse.json(body);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
