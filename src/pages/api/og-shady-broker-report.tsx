import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#FAF8F5",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontFamily: "monospace",
            color: "#8C1515",
            marginBottom: 32,
            letterSpacing: "0.1em",
          }}
        >
          KINCAID IQ / FORENSIC SERIES
        </div>
        
        <div
          style={{
            fontSize: 96,
            fontWeight: 600,
            color: "#0B1220",
            marginBottom: 40,
            lineHeight: 1.1,
            maxWidth: "90%",
          }}
        >
          The Shady Broker Report
        </div>
        
        <div
          style={{
            fontSize: 36,
            color: "#5B6472",
            lineHeight: 1.5,
            maxWidth: "85%",
          }}
        >
          A 24-page forensic dossier on what your broker is not telling you. Anchored to a 757,294-row benchmark index.
        </div>
        
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 80,
            fontSize: 28,
            fontFamily: "monospace",
            color: "#0B1220",
          }}
        >
          $4,500 USD / one-time / board-ready
        </div>
        
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
            fontSize: 20,
            fontFamily: "monospace",
            color: "#5B6472",
          }}
        >
          kincaidrmc.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}