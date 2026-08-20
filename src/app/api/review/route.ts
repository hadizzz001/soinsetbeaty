import { NextResponse } from "next/server";
import { Collections, findAll } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await findAll(Collections.review));
  } catch (error) {
    console.error("[api/review]", error);
    return NextResponse.json([], { status: 200 });
  }
}
