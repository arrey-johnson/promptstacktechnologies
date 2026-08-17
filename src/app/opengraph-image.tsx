import { ImageResponse } from "next/og";

export const alt = "Promptstack Technologies";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Production-safe default Open Graph image (brand typography composition).
 * CMS pages may override with real featured imagery when configured.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          padding: "72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#A800E6",
            fontWeight: 600,
          }}
        >
          Promptstack Technologies
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              lineHeight: 1.1,
              color: "#1B263B",
              fontWeight: 700,
              maxWidth: 900,
            }}
          >
            Technology should solve a real business problem.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.4,
              color: "rgba(27,38,59,0.72)",
              maxWidth: 820,
            }}
          >
            Software · AI & Automation · Digital Marketing · Academy
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: 6,
            width: 180,
            background: "#A800E6",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
