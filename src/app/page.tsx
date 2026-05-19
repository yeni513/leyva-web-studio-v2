import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { IndustryMarquee } from "@/components/sections/IndustryMarquee";
import { Services } from "@/components/sections/Services";
import { Transformation } from "@/components/sections/Transformation";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Packages } from "@/components/sections/Packages";
import { Portfolio } from "@/components/sections/Portfolio";
import { Guarantees } from "@/components/sections/Guarantees";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <IndustryMarquee />
        <Services />
        <Transformation />
        <Process />
        <About />
        <Packages />
        <Portfolio />
        <Guarantees />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
