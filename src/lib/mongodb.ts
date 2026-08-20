/**
 * Direct MongoDB access for the public website (no Prisma here).
 *
 * The connection is cached on globalThis so the dev server's hot reload
 * does not open a new pool on every request.
 */
import { MongoClient, type Db } from "mongodb";

const uri = process.env.DATABASE_URL || process.env.MONGODB_URI || "";
const dbName = process.env.MONGODB_DB || "test";

if (!uri) {
  // Not throwing: cms.ts falls back to the static content in site.ts.
  console.warn("[mongodb] DATABASE_URL is not set — falling back to static content.");
}

type GlobalWithMongo = typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

const globalWithMongo = globalThis as GlobalWithMongo;

function clientPromise(): Promise<MongoClient> {
  if (!globalWithMongo._mongoClientPromise) {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
      maxPoolSize: 10,
    });
    globalWithMongo._mongoClientPromise = client.connect();
  }
  return globalWithMongo._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  if (!uri) throw new Error("DATABASE_URL is not configured");
  const client = await clientPromise();
  return client.db(dbName);
}

/** Collection names created by the dashboard's Prisma schema. */
export const Collections = {
  banner: "Banner",
  offerText: "OfferText",
  concern: "Concern",
  clinic: "Clinic",
  blogPost: "BlogPost",
  about: "About",
  treatment: "Treatment",
  review: "Review",
} as const;

type WithId = Record<string, unknown> & { _id?: { toString(): string } };

/** Turns Mongo documents into plain JSON (`_id` -> `id`, dates -> ISO strings). */
export function serialize<T extends WithId>(doc: T | null) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  const out: Record<string, unknown> = { id: _id ? _id.toString() : "" };
  for (const [key, value] of Object.entries(rest)) {
    out[key] = value instanceof Date ? value.toISOString() : value;
  }
  return out;
}

export function serializeMany<T extends WithId>(docs: T[]) {
  return docs.map((doc) => serialize(doc)!);
}

/** Reads a whole collection sorted by `order`, tolerating a missing DB. */
export async function findAll(
  collection: string,
  filter: Record<string, unknown> = {},
) {
  const db = await getDb();
  const docs = await db
    .collection(collection)
    .find(filter)
    .sort({ order: 1, createdAt: 1 })
    .toArray();
  return serializeMany(docs as WithId[]);
}
