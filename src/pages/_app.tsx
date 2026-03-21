import "@/styles/main.css";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { ToasterMenu } from "@/components/ToasterMenu";
import { FounderContactButton } from "@/components/FounderContactButton";
import Nav from "@/components/Nav";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="dark">
        <Nav />
        <Component {...pageProps} />
        <ToasterMenu />
        <FounderContactButton />
      </div>
    </ThemeProvider>
  );
}