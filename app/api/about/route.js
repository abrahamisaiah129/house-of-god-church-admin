import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "../../lib/dataStore";

export async function GET() {
  const about = await readJSON("about.json", {
    church: { title: "", content: "" },
    pastor: { name: "", bio: "" },
  });
  return NextResponse.json(about);
}

export async function PUT(request) {
  try {
    const body = await request.json();
    await writeJSON("about.json", body);
    return NextResponse.json(body);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
