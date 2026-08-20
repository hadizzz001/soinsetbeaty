import { NextResponse } from "next/server";
import { Collections, getDb, serialize } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDb();
    const doc = await db.collection(Collections.about).findOne({});
    return NextResponse.json(serialize(doc));
  } catch (error) {
    console.error("[api/about]", error);
    return NextResponse.json(null, { status: 200 });
  }
}
