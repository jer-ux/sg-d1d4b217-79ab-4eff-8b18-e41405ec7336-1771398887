import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "sonner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Nav />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: { 
            background: "rgba(10,10,12,0.9)", 
            border: "1px solid rgba(255,255,255,0.12)", 
            color: "white" 
          },
        }}
      />
    </>
  );
}