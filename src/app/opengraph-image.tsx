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
          background: "#070c18",
          color: "#eef3ff",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 88,
                height: 36,
                border: "4px solid #d5e2ff",
                borderRadius: 999,
                transform: "rotate(-32deg)",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 88,
                height: 36,
                border: "4px solid #d5e2ff",
                borderRadius: 999,
                transform: "rotate(32deg)",
              }}
            />
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                background: "#7ee0ea",
              }}
            />
          </div>
          <div style={{ fontSize: 22, letterSpacing: 3, color: "#8eabff" }}>
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
            color: "#c9d4ec",
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
