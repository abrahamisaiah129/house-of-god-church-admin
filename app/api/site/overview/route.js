import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "../../../lib/dataStore";

export async function GET() {
  const site = await readJSON("site.json", {
    converts: 0,
    mediaCount: 0,
    welcomeText: "",
    todaysAnnouncement: "",
    infoOverview: { address: "", phone: "", members: 0 },
  });
  return NextResponse.json(site);
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const site = { ...(await readJSON("site.json", {})), ...body };
    await writeJSON("site.json", site);
    return NextResponse.json(site);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
