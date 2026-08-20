import { NextResponse } from "next/server";
import { Collections, findAll } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await findAll(Collections.concern));
  } catch (error) {
    console.error("[api/concern]", error);
    return NextResponse.json([], { status: 200 });
  }
}
