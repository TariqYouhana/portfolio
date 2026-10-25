import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tariq Youhana Leon · Data & Software Engineering Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0F0E0C",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grain texture simulation via gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 30% 60%, rgba(251,28,6,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(200,175,110,0.05) 0%, transparent 50%)",
          }}
        />

        {/* Top: label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#FB1C06",
            }}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "13px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#FB1C06",
              fontWeight: 600,
            }}
          >
            PORTFOLIO // OPEN FOR COLLABORATION
          </span>
        </div>

        {/* Center: name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "80px",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              color: "#EDE6D3",
              lineHeight: 0.9,
            }}
          >
            TARIQ YOUHANA
            <br />
            LEON
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "rgba(237,230,211,0.55)",
              maxWidth: "640px",
              lineHeight: 1.5,
            }}
          >
            Data systems, distributed architectures, and visual storytelling.
          </div>
        </div>

        {/* Bottom: chips */}
        <div style={{ display: "flex", gap: "12px" }}>
          {["Data Engineering", "Distributed Systems", "Tenstral Technologies"].map(
            (label) => (
              <div
                key={label}
                style={{
                  padding: "8px 16px",
                  border: "1px solid rgba(237,230,211,0.15)",
                  borderRadius: "4px",
                  fontFamily: "monospace",
                  fontSize: "12px",
                  color: "rgba(237,230,211,0.6)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
