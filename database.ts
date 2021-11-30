import { Client } from "./deps.ts";

interface dbSettings {
  database: string;
  hostname: string;
  password: string;
  port: number;
  user: string;
}

async function getDbClient() {
  const settingsFile = await Deno.readTextFile("./settings.json");
  const settings: dbSettings = JSON.parse(settingsFile);

  const db = new Client(settings);

  await db.connect();

  return db;
}

const database = await getDbClient();
export function getDb(): Client {
  return database;
}
