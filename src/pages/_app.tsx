import "@/styles/main.css";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { ToasterMenu } from "@/components/ToasterMenu";
import { FounderContactButton } from "@/components/FounderContactButton";
import Nav from "@/components/Nav";
import { Analytics } from "@/components/Analytics";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { pageview } from "@/lib/analytics/gtag";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Track page views on route change
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <Analytics />
      <div className="dark">
        <Nav />
        <Component {...pageProps} />
        <ToasterMenu />
        <FounderContactButton />
      </div>
    </ThemeProvider>
  );
}