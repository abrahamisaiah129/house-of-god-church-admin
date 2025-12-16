import fs from "fs/promises";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

async function ensureDataDir() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (e) {
    // ignore
  }
}

export async function readJSON(filename, fallback = null) {
  await ensureDataDir();
  const p = path.join(dataDir, filename);
  try {
    const s = await fs.readFile(p, "utf8");
    return JSON.parse(s);
  } catch (err) {
    if (fallback !== null) {
      await writeJSON(filename, fallback);
      return fallback;
    }
    return null;
  }
}

export async function writeJSON(filename, data) {
  await ensureDataDir();
  const p = path.join(dataDir, filename);
  await fs.writeFile(p, JSON.stringify(data, null, 2), "utf8");
  return data;
}

export default { readJSON, writeJSON };
