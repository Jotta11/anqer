import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Ecosystem from "@/components/sections/Ecosystem";
import CorePlatform from "@/components/sections/CorePlatform";
import Features from "@/components/sections/Features";
import Lab from "@/components/sections/Lab";
import Workflow from "@/components/sections/Workflow";
import Pricing from "@/components/sections/Pricing";
import Integration from "@/components/sections/Integration";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="site-main">
        <Hero />
        <Ecosystem />
        <CorePlatform />
        <Features />
        <Lab />
        <Workflow />
        <Pricing />
        <Integration />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
