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
          background: "#eef2f9",
          color: "#182033",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              background: "#1b2c56",
              color: "#7d92cf",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            O
          </div>
          <div style={{ fontSize: 22, letterSpacing: 3, color: "#2d468c" }}>
            RESEARCH USE ONLY
          </div>
        </div>
        <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: -2, lineHeight: 1 }}>
          Ovora Labs
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            lineHeight: 1.35,
            color: "#3c445c",
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
