import { ImageResponse } from "next/og";

export const alt = "Ovora Labs | Research Peptides";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#f3f8fc",
          color: "#122033",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22, marginBottom: 28 }}>
          <svg width="72" height="72" viewBox="0 0 64 64" fill="none">
            <ellipse
              cx="32"
              cy="32"
              rx="21"
              ry="9"
              stroke="#122033"
              strokeWidth="3.4"
              transform="rotate(-32 32 32)"
            />
            <ellipse
              cx="32"
              cy="32"
              rx="21"
              ry="9"
              stroke="#122033"
              strokeWidth="3.4"
              transform="rotate(32 32 32)"
            />
            <circle cx="32" cy="32" r="4" fill="#0e6794" />
          </svg>
          <div style={{ fontSize: 22, letterSpacing: 3, color: "#0c6a96" }}>RESEARCH USE ONLY</div>
        </div>
        <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: -2, lineHeight: 1 }}>Ovora Labs</div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            lineHeight: 1.35,
            color: "#3a5168",
            maxWidth: 860,
          }}
        >
          Premium research-grade peptides for laboratory use. Not for human or veterinary use.
        </div>
      </div>
    ),
    { ...size },
  );
}
