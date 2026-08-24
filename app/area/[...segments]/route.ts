import { NextRequest, NextResponse } from "next/server";
import redirects from "../legacy-area-redirects.json";

type Context = { params: Promise<{ segments: string[] }> };

async function redirectLegacyArea(request: NextRequest, context: Context) {
  const { segments } = await context.params;
  const code = [...segments].reverse().find((segment) => /^\d{2,10}$/.test(segment));
  const target = code ? (redirects as Record<string, string>)[code] : undefined;

  if (!target) {
    return new NextResponse("Not Found", {
      status: 404,
      headers: { "X-Robots-Tag": "noindex" },
    });
  }

  return NextResponse.redirect(new URL(target, request.url), 301);
}

export const GET = redirectLegacyArea;
export const HEAD = redirectLegacyArea;

