import Script from "next/script";

/**
 * Loads the Tidio widget (includes Lyro when enabled in the Tidio dashboard).
 * Set NEXT_PUBLIC_TIDIO_PUBLIC_KEY in .env.local to your project public key
 * from Tidio → Settings → Developer → Project data.
 */
export function TidioChat() {
  const key = process.env.NEXT_PUBLIC_TIDIO_PUBLIC_KEY?.trim();

  if (!key) return null;

  return (
    <Script
      src={`https://code.tidio.co/${key}.js`}
      strategy="lazyOnload"
      id="tidio-chat"
    />
  );
}
