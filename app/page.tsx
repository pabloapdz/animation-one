import VideoHeroSection from "./components/VideoHeroSection";
import PinnedParallax from "./components/PinnedParallax";
import ProcessSection from "./components/ProcessSection";
import MissionLeadershipSection from "./components/MissionLeadershipSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <VideoHeroSection />
      <MissionLeadershipSection />
      <PinnedParallax />
      <ProcessSection />
      <Footer />
    </div>
  );
}
