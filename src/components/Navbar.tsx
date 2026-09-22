import React, { useState, useEffect } from 'react';
import { Globe, MessageCircle, Menu, X, Clock, Terminal, Cpu, Layers, Briefcase, Mail, FileText, QrCode, Award } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  lang: Language;
  onSelectLang: (lang: Language) => void;
  onOpenCv?: () => void;
  onOpenVCard?: () => void;
}

export default function Navbar({ lang, onSelectLang, onOpenCv, onOpenVCard }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [casablancaTime, setCasablancaTime] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Casablanca',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setCasablancaTime(now.toLocaleTimeString('en-GB', options) + ' GMT+1');
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', labelEn: 'About', labelFr: 'Profil', labelAr: 'نبذة عني', icon: Cpu },
    { href: '#vision-lab', labelEn: 'AI Vision Lab', labelFr: 'Lab Vision IA', labelAr: 'مختبر الرؤية', icon: Cpu },
    { href: '#projects', labelEn: 'Projects', labelFr: 'Projets', labelAr: 'المشاريع', icon: Layers },
    { href: '#skills', labelEn: 'Arsenal', labelFr: 'Compétences', labelAr: 'المهارات', icon: Briefcase },
    { href: '#certifications', labelEn: 'Certs', labelFr: 'Certifs', labelAr: 'الشهادات', icon: Award },
    { href: '#timeline', labelEn: 'Journey', labelFr: 'Parcours', labelAr: 'المسار', icon: Clock },
    { href: '#terminal', labelEn: 'Terminal', labelFr: 'Terminal', labelAr: 'الموجه', icon: Terminal },
    { href: '#contact', labelEn: 'Contact', labelFr: 'Contact', labelAr: 'تواصل', icon: Mail },
  ];

  const getLabel = (item: (typeof navLinks)[0]) => {
    if (lang === 'ar') return item.labelAr;
    if (lang === 'fr') return item.labelFr;
    return item.labelEn;
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full px-4 py-3 transition-all duration-300">
      <div
        id="navbar-container"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 sm:px-6 ${
          scrolled
            ? 'border-cyan-500/30 bg-[#070b13]/90 shadow-lg shadow-black/60 backdrop-blur-xl'
            : 'border-white/10 bg-[#0a0f1c]/70 backdrop-blur-md'
        }`}
      >
        {/* Brand */}
        <a href="#about" className="group flex items-center gap-2.5 text-left">
          <div className="flex flex-col">
            <span className="font-display text-sm font-black tracking-tight text-white transition-colors group-hover:text-cyan-400 sm:text-base">
              IBRAHIM
            </span>
            <span className="text-[9px] font-mono-code tracking-widest text-slate-400 group-hover:text-slate-200">
              AIT ADDIMANE
            </span>
          </div>
          <span className="hidden rounded bg-gradient-to-r from-cyan-400 to-lime-400 px-1.5 py-0.5 text-[10px] font-black uppercase text-black sm:inline-block">
            YouTechD
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-medium text-slate-300 transition-colors hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]"
            >
              {getLabel(item)}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Casablanca Clock ticker */}
          <div className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono-code text-cyan-300 xl:flex">
            <Clock className="h-3 w-3 text-cyan-400 animate-pulse" />
            <span>{casablancaTime}</span>
          </div>

          {/* 3-Way Language Selector: EN | FR | AR */}
          <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-0.5 text-[11px] font-mono-code">
            <button
              onClick={() => onSelectLang('en')}
              className={`rounded-full px-2 py-0.5 transition-all ${
                lang === 'en'
                  ? 'bg-cyan-400 text-black font-bold shadow-[0_0_8px_rgba(0,240,255,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => onSelectLang('fr')}
              className={`rounded-full px-2 py-0.5 transition-all ${
                lang === 'fr'
                  ? 'bg-cyan-400 text-black font-bold shadow-[0_0_8px_rgba(0,240,255,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Français"
            >
              FR
            </button>
            <button
              onClick={() => onSelectLang('ar')}
              className={`rounded-full px-2 py-0.5 transition-all ${
                lang === 'ar'
                  ? 'bg-lime-400 text-black font-bold shadow-[0_0_8px_rgba(204,255,0,0.5)] font-cairo'
                  : 'text-slate-400 hover:text-white font-cairo'
              }`}
              title="العربية"
            >
              عربي
            </button>
          </div>

          {/* CV & vCard Quick Triggers */}
          {onOpenCv && (
            <button
              onClick={onOpenCv}
              className="hidden sm:flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-mono-code text-cyan-300 transition-all hover:border-cyan-400 hover:bg-cyan-500/20 hover:text-white"
              title="Télécharger le CV officiel en PDF"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>CV</span>
            </button>
          )}

          {onOpenVCard && (
            <button
              onClick={onOpenVCard}
              className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-1.5 text-slate-300 transition-colors hover:border-cyan-400 hover:text-cyan-300"
              title="Carte de contact vCard & QR Code"
            >
              <QrCode className="h-4 w-4" />
            </button>
          )}

          {/* WhatsApp Direct CTA */}
          <a
            id="whatsapp-header-cta"
            href="https://wa.me/212664478416"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-[#ccff00] px-3.5 py-1.5 text-xs font-black text-black shadow-[0_0_15px_rgba(204,255,0,0.3)] transition-all hover:scale-105 hover:bg-[#d8ff33] hover:shadow-[0_0_20px_rgba(204,255,0,0.5)]"
          >
            <MessageCircle className="h-3.5 w-3.5 fill-black" />
            <span className="hidden sm:inline">
              {lang === 'ar' ? 'واتساب' : lang === 'fr' ? 'WhatsApp' : "Let's Talk"}
            </span>
          </a>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mt-2 rounded-2xl border border-white/10 bg-[#070b13]/95 p-4 shadow-2xl backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-cyan-300"
                >
                  <Icon className="h-4 w-4 text-cyan-400" />
                  <span>{getLabel(item)}</span>
                </a>
              );
            })}
            {/* Mobile Actions: CV & vCard */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
              {onOpenCv && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCv();
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-3 py-2 text-xs font-mono-code font-bold text-cyan-300"
                >
                  <FileText className="h-4 w-4" />
                  <span>CV (PDF)</span>
                </button>
              )}

              {onOpenVCard && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenVCard();
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-mono-code text-slate-300"
                >
                  <QrCode className="h-4 w-4 text-lime-400" />
                  <span>vCard QR</span>
                </button>
              )}
            </div>

            <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-slate-400">
              <span className="font-mono-code">{casablancaTime}</span>
              <span className="text-lime-400">Casablanca (Maroc)</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

