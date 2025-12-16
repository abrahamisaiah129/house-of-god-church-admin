import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "../../lib/dataStore";

export async function GET() {
  const info = await readJSON("information.json", {
    about: "",
    contact: { email: "", phone: "" },
  });
  return NextResponse.json(info);
}

export async function PUT(request) {
  try {
    const body = await request.json();
    await writeJSON("information.json", body);
    return NextResponse.json(body);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
