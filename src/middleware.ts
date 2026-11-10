import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { legacyProductRedirect } from "@/data/products";
import { getSiteUrl } from "@/lib/site";

function requestHost(request: NextRequest) {
  const raw = request.headers.get("host") ?? "";
  return raw.split(",")[0]?.trim().split(":")[0]?.toLowerCase() ?? "";
}

function productionHosts() {
  const hosts = new Set<string>();
  try {
    const hostname = new URL(getSiteUrl()).hostname.toLowerCase();
    if (hostname) hosts.add(hostname);
  } catch {
    /* fall through */
  }
  if (hosts.size === 0) hosts.add("ovoralabs.com");
  return hosts;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const productMatch = pathname.match(/^\/products\/([^/]+)\/?$/);

  if (productMatch) {
    const slug = decodeURIComponent(productMatch[1] ?? "");
    const target = legacyProductRedirect(slug);
    if (target) {
      const url = request.nextUrl.clone();
      url.pathname = `/products/${target}`;
      return NextResponse.redirect(url, 301);
    }
  }

  const response = NextResponse.next();
  const host = requestHost(request);

  if (host && !productionHosts().has(host)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  if (pathname === "/store" || pathname.startsWith("/store/")) {
    const query = request.nextUrl.searchParams.get("q")?.trim();
    if (query) {
      response.headers.set("X-Robots-Tag", "noindex, follow");
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|images/).*)"],
};
