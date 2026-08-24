import { NextRequest, NextResponse } from "next/server";
import redirects from "../legacy-area-redirects.json";

type Context = { params: Promise<{ segments: string[] }> };
const canonicalOrigin = "https://service.drain119.co.kr";

async function redirectLegacyArea(_request: NextRequest, context: Context) {
  const { segments } = await context.params;
  const redirectMap = redirects as Record<string, string>;
  const target = [...segments]
    .reverse()
    .filter((segment) => /^\d{2,10}$/.test(segment))
    .map((code) => redirectMap[code])
    .find(Boolean);

  if (!target) {
    return new NextResponse("Not Found", {
      status: 404,
      headers: { "X-Robots-Tag": "noindex" },
    });
  }

  return NextResponse.redirect(new URL(target, canonicalOrigin), 301);
}

export const GET = redirectLegacyArea;
export const HEAD = redirectLegacyArea;
