"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import RunwayLoader from "@/components/RunwayLoader";
import AirlockHero from "@/components/AirlockHero";
import SterlingGateKineticNav from "@/components/SterlingGateKineticNav";
import WorkPortfolio from "@/components/WorkPortfolio";
import About from "@/components/About";
import Channels, { episodesData } from "@/components/Channels";
import Team from "@/components/Team";
import Collaborate from "@/components/Collaborate";
import Contact from "@/components/Contact";
import EpisodeModal from "@/components/EpisodeModal";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeEpisodeKey, setActiveEpisodeKey] = useState(null);

  const selectedEpisode = activeEpisodeKey ? episodesData[activeEpisodeKey] : null;

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
        <About />
        <Channels onSelectEpisode={(key) => setActiveEpisodeKey(key)} />
        <Team />
        <Collaborate />
        <Contact />
      </main>
      <Footer />
      <EpisodeModal
        episode={selectedEpisode}
        onClose={() => setActiveEpisodeKey(null)}
      />
    </>
  );
}
