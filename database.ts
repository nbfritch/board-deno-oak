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

async function dropAndCreateBoardsTable(db: Client) {
  await db.queryObject`
        Drop Table If Exists Boards;
    `;

  await db.queryObject`
        Create Table Boards (
            Id Int Primary Key,
            Name Varchar(30) Not Null Unique,
            Url Varchar(20) Null
        );
    `;
}

async function dropAndCreatePostsTable(db: Client) {
  await db.queryObject`
        Drop Table If Exists Posts;
    `;

  await db.queryObject`
        Create Table Posts (
            Id Int Primary Key,
            Title Varchar(144) Not Null,
            BoardId Int Not Null,
            Foreign Key(BoardId) References Boards(Id)
        );
    `;
}

async function getEmptyDb(): Promise<Client> {
  const db = await getDbClient();
  // await dropAndCreateBoardsTable(db);
  // await dropAndCreatePostsTable(db);
  return db;
}

const database = await getEmptyDb();
export function getDb(): Client {
  return database;
}
