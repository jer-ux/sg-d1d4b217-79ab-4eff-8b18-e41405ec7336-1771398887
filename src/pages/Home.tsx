import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Hero3D } from "../components/Hero3D";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero3D />
      </main>
      <Footer />
    </div>
  );
}