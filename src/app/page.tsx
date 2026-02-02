import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CodingProfiles from "@/components/CodingProfiles";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import LeadershipSection from "@/components/LeadershipSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Layout>
        <div id="home">
          <HeroSection />
        </div>
        <div id="profiles">
          <CodingProfiles />
        </div>
        <div id="skills">
          <SkillsSection />
        </div>
        <div id="projects">
          <ProjectsSection />
        </div>
        <div id="leadership">
          <LeadershipSection />
        </div>
        <div id="achievements">
          <AchievementsSection />
        </div>
        <div id="contact">
          <ContactSection />
        </div>
        <Footer />
      </Layout>
    </>
  );
}
