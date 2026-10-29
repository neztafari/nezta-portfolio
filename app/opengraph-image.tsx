import { ImageResponse } from "next/og";

// Social preview (Open Graph + Twitter). Rendered once at build time. The site fonts are .woff2,
// which next/og cannot read, so the default font is used instead of downloading one.
export const alt = "Nezta Misgi Febyandanu · Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        position: "relative",
        background: "#07090f",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
          background:
            "radial-gradient(circle at 12% 15%, rgba(0, 77, 152, 0.55) 0%, rgba(0, 77, 152, 0) 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
          background:
            "radial-gradient(circle at 95% 105%, rgba(165, 0, 68, 0.5) 0%, rgba(165, 0, 68, 0) 55%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          color: "#edf1f8",
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            borderRadius: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 76,
            fontWeight: 700,
            color: "#fff",
            background: "linear-gradient(135deg, #004d98 50%, #a50044 50%)",
          }}
        >
          N
        </div>
        <div
          style={{
            marginTop: 52,
            fontSize: 82,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          Nezta Misgi Febyandanu
        </div>
        <div style={{ marginTop: 22, fontSize: 38, color: "#bfc7d5" }}>
          {"Software Engineer · Mobile, Web & 3D"}
        </div>
        <div
          style={{
            position: "absolute",
            left: 96,
            bottom: 56,
            fontSize: 28,
            color: "#6fa8ec",
          }}
        >
          neztanez.netlify.app
        </div>
      </div>
    </div>,
    size,
  );
}
