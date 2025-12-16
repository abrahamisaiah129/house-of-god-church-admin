import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "../../lib/dataStore";

export async function GET() {
  const banner = await readJSON("banner.json", {
    imageUrl: "/assets/images/default-banner.jpg",
    title: "Household Of God",
    subtitle: "Serving with love and faith",
  });
  return NextResponse.json(banner);
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const banner = { ...body };
    await writeJSON("banner.json", banner);
    return NextResponse.json(banner);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
