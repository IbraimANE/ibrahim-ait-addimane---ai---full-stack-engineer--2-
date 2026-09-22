import React, { useState, useEffect } from 'react';
import { Language, Project } from './types';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AiVisionLab from './components/AiVisionLab';
import FeaturedProjects from './components/FeaturedProjects';
import TechnicalArsenal from './components/TechnicalArsenal';
import CertificationsSection from './components/CertificationsSection';
import CareerTimeline from './components/CareerTimeline';
import TerminalCli from './components/TerminalCli';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CvModal from './components/CvModal';
import VCardModal from './components/VCardModal';
import CompanionBot from './components/CompanionBot';

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [selectedProjectForContact, setSelectedProjectForContact] = useState<Project | null>(null);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [isVCardOpen, setIsVCardOpen] = useState(false);

  useEffect(() => {
    if (lang === 'ar') {
      document.body.classList.add('lang-ar');
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.body.classList.remove('lang-ar');
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', lang);
    }
  }, [lang]);

  // Cursor spotlight tracker
  useEffect(() => {
    const spotlight = document.getElementById('cursor-spotlight-div');
    if (!spotlight) return;

    const handleMouseMove = (e: MouseEvent) => {
      spotlight.style.left = `${e.clientX}px`;
      spotlight.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSelectProject = (project: Project) => {
    setSelectedProjectForContact(project);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05070c] text-slate-100 selection:bg-[#00f0ff] selection:text-black overflow-x-hidden">
      {/* Dynamic Cursor Spotlight */}
      <div
        id="cursor-spotlight-div"
        className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[100px] transition-transform duration-75 z-10"
      />

      {/* Interactive Neural Canvas Background */}
      <ParticleBackground />

      {/* Navigation Header */}
      <Navbar
        lang={lang}
        onSelectLang={setLang}
        onOpenCv={() => setIsCvOpen(true)}
        onOpenVCard={() => setIsVCardOpen(true)}
      />

      {/* Content Sections */}
      <main className="relative z-20">
        <Hero
          lang={lang}
          onOpenCv={() => setIsCvOpen(true)}
          onOpenVCard={() => setIsVCardOpen(true)}
        />
        <AiVisionLab lang={lang} />
        <FeaturedProjects lang={lang} onSelectProjectForContact={handleSelectProject} />
        <TechnicalArsenal lang={lang} />
        <CertificationsSection lang={lang} />
        <CareerTimeline lang={lang} />
        <TerminalCli lang={lang} />
        <ContactSection
          lang={lang}
          selectedProject={selectedProjectForContact}
          onOpenVCard={() => setIsVCardOpen(true)}
          onOpenCv={() => setIsCvOpen(true)}
        />
      </main>

      {/* Interactive Companion Bot */}
      <CompanionBot lang={lang} />

      {/* Global Footer */}
      <Footer lang={lang} />

      {/* Interactive Floating Modals */}
      <CvModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
        lang={lang}
      />

      <VCardModal
        isOpen={isVCardOpen}
        onClose={() => setIsVCardOpen(false)}
        lang={lang}
      />
    </div>
  );
}
