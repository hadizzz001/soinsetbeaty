import { NextResponse } from "next/server";
import { Collections, findAll } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await findAll(Collections.blogPost));
  } catch (error) {
    console.error("[api/blog]", error);
    return NextResponse.json([], { status: 200 });
  }
}
