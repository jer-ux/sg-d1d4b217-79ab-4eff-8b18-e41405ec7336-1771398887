import type { AppProps } from "next/app";
import "../styles/globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="console-bg">
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}