import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CodingProfiles from "@/components/CodingProfiles";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Layout>
        <div id="home">
          <HeroSection />
        </div>
        <div id="about">
          <AboutSection />
        </div>
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
        <div id="resume">
          <Footer />
        </div>
      </Layout>
    </>
  );
}
