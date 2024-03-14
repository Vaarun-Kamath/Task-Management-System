import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getSession({
    req: {
      headers: {
        cookie: req.headers.get("cookie") || "",
      },
    },
  });
  return NextResponse.json(session);
}
