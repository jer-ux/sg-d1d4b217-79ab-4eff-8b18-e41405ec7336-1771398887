import "@/styles/main.css";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { ToasterMenu } from "@/components/ToasterMenu";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="dark">
        <Component {...pageProps} />
        <ToasterMenu />
      </div>
    </ThemeProvider>
  );
}