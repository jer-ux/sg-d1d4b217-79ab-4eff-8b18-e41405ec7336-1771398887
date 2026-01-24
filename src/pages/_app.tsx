import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Nav />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </>
  );
}