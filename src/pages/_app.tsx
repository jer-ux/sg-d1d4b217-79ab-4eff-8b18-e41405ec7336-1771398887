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
          const res = await fetch("/api/receipts/calendly-booked", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              calendlyEvent: data,
              client: {
                userAgent: navigator.userAgent,
                ts: new Date().toISOString(),
              },
            }),
          });

          if (!res.ok) return;

          const receipt = await res.json();
          
          // saveDemoReceipt() now dispatches the custom event internally
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