"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import RunwayLoader from "@/components/RunwayLoader";
import AirlockHero from "@/components/AirlockHero";
import SterlingGateKineticNav from "@/components/SterlingGateKineticNav";
import WorkPortfolio from "@/components/WorkPortfolio";
import SpotifySection from "@/components/SpotifySection";
import Contact from "@/components/Contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <RunwayLoader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <SterlingGateKineticNav />
      <main id="main-content">
        <AirlockHero
          title="Beyond Sky"
          tagline="Stories From the Skies"
          theme="aviation"
        />
        <WorkPortfolio />
        <SpotifySection />
        <Contact />
      </main>
    </>
  );
}
