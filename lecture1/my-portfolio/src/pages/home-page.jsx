import * as React from 'react';
import HeroSection from '../components/landing/hero-section';
import AboutMeSection from '../components/landing/about-me-section';
import SkillTreeSection from '../components/landing/skill-tree-section';
import ProjectsSection from '../components/landing/projects-section';
import ContactSection from '../components/landing/contact-section';

/**
 * HomePage 컴포넌트
 *
 * Props:
 * 없음 - 메인 홈 페이지 컴포넌트
 *
 * Example usage:
 * <HomePage />
 */
function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <AboutMeSection />
      <SkillTreeSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}

export default HomePage;
