import "../styles/main.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ToasterMenu } from "@/components/ToasterMenu";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Nav />
      <ToasterMenu />
      <Component {...pageProps} />
      <Footer />
      <Toaster />
    </ThemeProvider>
  );
}