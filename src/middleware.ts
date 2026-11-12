import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { legacyCategoryRedirect, withheldProductRedirect } from "@/lib/legacy-paths";
import { readSessionToken, SESSION_COOKIE } from "@/lib/auth/token";
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

function isProtectedPath(pathname: string) {
  return (
    pathname === "/store" ||
    pathname.startsWith("/store/") ||
    pathname === "/products" ||
    pathname.startsWith("/products/") ||
    pathname === "/cart" ||
    pathname.startsWith("/cart/") ||
    pathname === "/checkout" ||
    pathname.startsWith("/checkout/") ||
    pathname === "/account" ||
    pathname.startsWith("/account/") ||
    pathname === "/api/quote" ||
    pathname.startsWith("/api/quote/") ||
    pathname === "/api/orders" ||
    pathname.startsWith("/api/orders/") ||
    pathname === "/api/account" ||
    pathname.startsWith("/api/account/")
  );
}

function applyPreviewHeader(response: NextResponse, preview: boolean) {
  if (preview) response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const preview = Boolean(requestHost(request) && !productionHosts().has(requestHost(request)));

  const productMatch = pathname.match(/^\/products\/([^/]+)\/?$/);
  const legacyTarget = productMatch
    ? legacyProductRedirect(decodeURIComponent(productMatch[1] ?? ""))
    : undefined;
  if (legacyTarget) {
    const url = request.nextUrl.clone();
    const splitAt = legacyTarget.indexOf("?");
    url.pathname = splitAt === -1 ? legacyTarget : legacyTarget.slice(0, splitAt);
    url.search = splitAt === -1 ? "" : legacyTarget.slice(splitAt);
    return applyPreviewHeader(NextResponse.redirect(url, 308), preview);
  }

  if (isProtectedPath(pathname)) {
    const session = await readSessionToken(request.cookies.get(SESSION_COOKIE)?.value);
    if (!session) {
      if (pathname.startsWith("/api/")) {
        return applyPreviewHeader(
          NextResponse.json({ error: "Sign in required." }, { status: 401 }),
          preview,
        );
      }
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      const callback = `${pathname}${request.nextUrl.search}`;
      url.search = "";
      url.searchParams.set("callbackUrl", callback);
      return applyPreviewHeader(NextResponse.redirect(url), preview);
    }

    const categoryTarget = legacyCategoryRedirect(pathname);
    const withheldTarget = withheldProductRedirect(pathname);
    const target = categoryTarget ?? withheldTarget ?? null;
    if (target) {
      const url = request.nextUrl.clone();
      const splitAt = target.indexOf("?");
      if (splitAt === -1) {
        url.pathname = target;
        url.search = "";
      } else {
        url.pathname = target.slice(0, splitAt);
        url.search = target.slice(splitAt);
      }
      return applyPreviewHeader(NextResponse.redirect(url, 308), preview);
    }
  }

  const response = NextResponse.next();
  if (preview) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  if (
    pathname === "/store" ||
    pathname.startsWith("/store/") ||
    pathname.startsWith("/products/") ||
    pathname === "/cart" ||
    pathname === "/checkout" ||
    pathname === "/account" ||
    pathname === "/login" ||
    pathname === "/signup"
  ) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|images/).*)"],
};
