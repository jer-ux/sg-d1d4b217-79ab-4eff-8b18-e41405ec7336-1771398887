import type { AppProps } from "next/app";
import { useEffect } from "react";
import "@/styles/globals.css";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { saveDemoReceipt } from "@/lib/demoReceipts";

function isCalendlyEvent(e: MessageEvent) {
  return Boolean((e as any)?.data?.event && String((e as any).data.event).indexOf("calendly") === 0);
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    async function handler(e: MessageEvent) {
      if (!isCalendlyEvent(e)) return;

      if (typeof e.origin === "string" && !e.origin.includes("calendly.com")) return;

      const data = e.data as { event?: string; payload?: any };

      if (data.event === "calendly.event_scheduled") {
        try {
          const res = await fetch("/api/receipts/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "calendly_booking",
              metadata: {
                event: "calendly.event_scheduled",
                ts: new Date().toISOString(),
                userAgent: navigator.userAgent,
              },
            }),
          });

          if (!res.ok) return;

          const receipt = await res.json();
          saveDemoReceipt(receipt);
        } catch {
          // Swallow errors — never break UX on booking
        }
      }
    }

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <div className="console-bg">
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}