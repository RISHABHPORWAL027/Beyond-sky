"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import RunwayLoader from "@/components/RunwayLoader";
import AirlockHero from "@/components/AirlockHero";
import SterlingGateKineticNav from "@/components/SterlingGateKineticNav";
import WorkPortfolio from "@/components/WorkPortfolio";
import SpotifySection from "@/components/SpotifySection";
import Contact from "@/components/Contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disable automatic browser scroll restoration on reload
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Clear hash if any, and scroll straight to top of hero
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const handleBeforeUnload = () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <RunwayLoader
            onComplete={() => {
              setIsLoading(false);
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
            }}
          />
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
