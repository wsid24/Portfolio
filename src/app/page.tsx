import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CodingProfiles from "@/components/CodingProfiles";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import TechMarquee from "@/components/TechMarquee";
import BrandStrip from "@/components/BrandStrip";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />

      {/* Hero is full-bleed so blobs can spread */}
      <div id="home">
        <HeroSection />
      </div>

      {/* Brand strip is full-bleed too */}
      <BrandStrip />

      <Layout>
        <div id="about">
          <AboutSection />
        </div>
      </Layout>

      <TechMarquee />

      <Layout>
        <div id="profiles">
          <CodingProfiles />
        </div>
        <div id="education">
          <EducationSection />
        </div>
        <div id="skills">
          <SkillsSection />
        </div>
        <div id="projects">
          <ProjectsSection />
        </div>
        <div id="achievements">
          <AchievementsSection />
        </div>
        <div id="resume">
          <Footer />
        </div>
      </Layout>
    </>
  );
}
