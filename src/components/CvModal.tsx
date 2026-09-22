import React, { useState } from 'react';
import {
  X,
  Printer,
  Download,
  FileText,
  Check,
  Award,
  Briefcase,
  GraduationCap,
  MapPin,
  Mail,
  Phone,
  Globe,
  ExternalLink,
  Code2,
  Database,
  Cpu,
  Workflow,
  Sparkles,
} from 'lucide-react';
import { Language } from '../types';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export default function CvModal({ isOpen, onClose, lang }: CvModalProps) {
  const [cvLang, setCvLang] = useState<'fr' | 'en'>(lang === 'en' ? 'en' : 'fr');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + '#about');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFr = cvLang === 'fr';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-2 sm:p-4 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:fixed print:inset-0 print:overflow-visible print:z-50"
      onClick={onClose}
    >
      <div
        className="relative my-6 w-full max-w-4xl rounded-3xl border border-cyan-500/30 bg-[#080d19] p-6 text-slate-100 shadow-[0_0_60px_rgba(0,240,255,0.25)] sm:p-8 print:my-0 print:w-full print:max-w-none print:rounded-none print:border-none print:bg-white print:text-black print:p-6 print:shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Action Bar (Hidden in print) */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 border border-cyan-400/30">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg">
                {lang === 'ar' ? 'السيرة الذاتية الرسمية' : isFr ? 'Curriculum Vitae Officiel' : 'Official Curriculum Vitae'}
              </h3>
              <p className="text-[11px] font-mono-code text-slate-400">
                Ibrahim Ait Addimane • Développeur Logiciel & Intégrateur
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* CV Language Switcher */}
            <div className="flex items-center rounded-xl border border-white/10 bg-white/5 p-1 text-xs font-mono-code">
              <button
                onClick={() => setCvLang('fr')}
                className={`rounded-lg px-2.5 py-1 font-bold transition-all ${
                  cvLang === 'fr'
                    ? 'bg-cyan-400 text-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Français (Original)
              </button>
              <button
                onClick={() => setCvLang('en')}
                className={`rounded-lg px-2.5 py-1 font-bold transition-all ${
                  cvLang === 'en'
                    ? 'bg-cyan-400 text-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
            </div>

            {/* Print / Save PDF Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-xl bg-[#ccff00] px-4 py-2 text-xs font-mono-code font-bold text-black shadow-[0_0_15px_rgba(204,255,0,0.3)] transition-all hover:bg-[#d8ff33] hover:scale-102"
              title="Télécharger ou imprimer en PDF"
            >
              <Download className="h-4 w-4" />
              <span>{isFr ? 'Télécharger PDF' : 'Download PDF'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 p-2 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            ACTUAL CV SHEET - EXACT MIRROR OF THE OFFICIAL USER CV DOCUMENT
           ========================================================================= */}
        <div id="printable-cv-sheet" className="mt-6 space-y-5 font-sans print:mt-0 print:space-y-4 print:text-black">
          
          {/* Header */}
          <div className="border-b border-white/10 pb-4 text-center print:border-black print:pb-3">
            <h1 className="font-display text-2xl sm:text-3xl font-black tracking-wide text-white print:text-black uppercase">
              IBRAHIM AIT ADDIMANE
            </h1>

            {/* Coordinates */}
            <div className="mt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-mono-code text-slate-300 print:text-black">
              <span>Berrechid, Maroc</span>
              <span className="text-slate-600 print:text-black">|</span>
              <a href="tel:+212664478416" className="hover:text-cyan-400 hover:underline">
                +212 664-478-416
              </a>
              <span className="text-slate-600 print:text-black">|</span>
              <a href="mailto:ibrahimaitaddimane@gmail.com" className="hover:text-cyan-400 hover:underline">
                ibrahimaitaddimane@gmail.com
              </a>
            </div>

            {/* Subtitle / Job Title */}
            <p className="mt-2 text-sm sm:text-base font-semibold text-cyan-300 print:text-neutral-800">
              {isFr
                ? "Développeur Logiciel et Intégrateur de Solutions d'Automatisation"
                : 'Software Developer and Automation Solutions Integrator'}
            </p>
          </div>

          {/* Section: Profil */}
          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-cyan-400 print:text-black border-b border-white/10 pb-1 print:border-neutral-400">
              {isFr ? 'Profil' : 'Profile'}
            </h2>
            <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-200 print:text-neutral-900 text-justify">
              {isFr
                ? "Technicien spécialisé en développement informatique avec expertise en création d'applications web/mobiles et en automatisation. Capacité à concevoir des architectures backend/frontend et à intégrer des solutions d'intelligence artificielle locale ou de vision par ordinateur pour l'industrie et les services."
                : 'Specialized technician in software development with expertise in web/mobile application creation and automation. Proficient in architecting backend/frontend systems and integrating on-premise artificial intelligence or computer vision solutions for industry and enterprise services.'}
            </p>
          </div>

          {/* Section: Compétences Techniques */}
          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-cyan-400 print:text-black border-b border-white/10 pb-1 print:border-neutral-400">
              {isFr ? 'Compétences Techniques' : 'Technical Skills'}
            </h2>

            <ul className="mt-2 space-y-1.5 text-xs sm:text-[12.5px] text-slate-200 print:text-neutral-900">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 print:text-black font-bold">•</span>
                <div>
                  <strong className="text-white print:text-black">
                    {isFr ? 'Langages et Frameworks' : 'Languages & Frameworks'} :
                  </strong>{' '}
                  Flutter, Python, JavaScript, HTML/CSS, Tailwind CSS, Express.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 print:text-black font-bold">•</span>
                <div>
                  <strong className="text-white print:text-black">
                    {isFr ? 'Bases de données' : 'Databases'} :
                  </strong>{' '}
                  PocketBase, SQL, MySQL.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 print:text-black font-bold">•</span>
                <div>
                  <strong className="text-white print:text-black">
                    {isFr ? 'Automatisation et Outils' : 'Automation & Tooling'} :
                  </strong>{' '}
                  n8n (déploiement Docker), Git/GitHub, Linux.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 print:text-black font-bold">•</span>
                <div>
                  <strong className="text-white print:text-black">
                    {isFr ? 'Intelligence Artificielle et Vision' : 'Artificial Intelligence & Vision'} :
                  </strong>{' '}
                  OpenCV (contrôle qualité), UI-TARS, Ollama, Whisper Turbo.
                </div>
              </li>
            </ul>
          </div>

          {/* Section: Expériences et Projets Récents */}
          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-cyan-400 print:text-black border-b border-white/10 pb-1 print:border-neutral-400">
              {isFr ? 'Expériences et Projets Récents' : 'Experience & Recent Projects'}
            </h2>

            <div className="mt-3 space-y-3.5">
              
              {/* 1. Deroua Service */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 print:border-none print:p-0">
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <h3 className="font-display text-xs sm:text-sm font-bold text-white print:text-black">
                    Deroua Service
                  </h3>
                  <span className="font-mono-code text-xs text-lime-400 print:text-black font-semibold">
                    {isFr ? 'Août 2026' : 'August 2026'}
                  </span>
                </div>
                <div className="text-xs font-semibold text-cyan-300 print:text-neutral-800">
                  {isFr ? 'Développeur Full-Stack' : 'Full-Stack Developer'}
                </div>
                <ul className="mt-1.5 space-y-1 text-xs text-slate-300 print:text-neutral-800">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 print:text-black">•</span>
                    <span>
                      {isFr
                        ? "Développement complet d'une plateforme web et mobile de mise en relation de services locaux."
                        : 'Full-stack development of a web and mobile marketplace connecting local service providers.'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 print:text-black">•</span>
                    <span>
                      {isFr
                        ? "Programmation des interfaces multilingues avec Flutter et conception de l'architecture base de données sous PocketBase."
                        : 'Engineered multilingual interfaces with Flutter and designed real-time database architecture under PocketBase.'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* 2. Projet Taskoff / DevOrbit */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 print:border-none print:p-0">
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <h3 className="font-display text-xs sm:text-sm font-bold text-white print:text-black">
                    Projet Taskoff / DevOrbit
                  </h3>
                  <span className="font-mono-code text-xs text-lime-400 print:text-black font-semibold">
                    {isFr ? 'Août 2026' : 'August 2026'}
                  </span>
                </div>
                <div className="text-xs font-semibold text-cyan-300 print:text-neutral-800">
                  {isFr ? 'Développeur Contributeur' : 'Contributing Developer'}
                </div>
                <ul className="mt-1.5 space-y-1 text-xs text-slate-300 print:text-neutral-800">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 print:text-black">•</span>
                    <span>
                      {isFr
                        ? 'Configuration des environnements serveur et intégration des outils de linting (ESLint, Prettier).'
                        : 'Configured server environments and integrated automated linting workflows (ESLint, Prettier).'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 print:text-black">•</span>
                    <span>
                      {isFr
                        ? "Mise en place des variables d'environnement et gestion des données de test (seed data)."
                        : 'Managed environment variable security configurations and automated database seed data pipelines.'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* 3. YouTechD */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 print:border-none print:p-0">
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <h3 className="font-display text-xs sm:text-sm font-bold text-white print:text-black">
                    YouTechD
                  </h3>
                  <span className="font-mono-code text-xs text-lime-400 print:text-black font-semibold">
                    {isFr ? 'Juin 2026' : 'June 2026'}
                  </span>
                </div>
                <div className="text-xs font-semibold text-cyan-300 print:text-neutral-800">
                  {isFr ? 'Fondateur et Développeur' : 'Founder & Developer'}
                </div>
                <ul className="mt-1.5 space-y-1 text-xs text-slate-300 print:text-neutral-800">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 print:text-black">•</span>
                    <span>
                      {isFr
                        ? 'Conception de tableaux de bord logiciels pour la gestion de production industrielle.'
                        : 'Designed executive software dashboards for automated manufacturing production monitoring.'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 print:text-black">•</span>
                    <span>
                      {isFr
                        ? 'Développement de systèmes de contrôle qualité automatisés par vision par ordinateur utilisant Python et OpenCV.'
                        : 'Developed automated quality inspection vision systems utilizing Python and OpenCV.'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* 4. Association Initiatives Sans Frontières */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 print:border-none print:p-0">
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <h3 className="font-display text-xs sm:text-sm font-bold text-white print:text-black">
                    Association Initiatives Sans Frontières
                  </h3>
                  <span className="font-mono-code text-xs text-lime-400 print:text-black font-semibold">
                    {isFr ? 'Mai 2025 - Présent' : 'May 2025 - Present'}
                  </span>
                </div>
                <div className="text-xs font-semibold text-cyan-300 print:text-neutral-800">
                  {isFr ? 'Responsable IT' : 'IT Lead / System Administrator'}
                </div>
                <ul className="mt-1.5 space-y-1 text-xs text-slate-300 print:text-neutral-800">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 print:text-black">•</span>
                    <span>
                      {isFr
                        ? "Gestion de l'infrastructure numérique de l'association."
                        : "Directed and maintained the association's complete digital and network infrastructure."}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 print:text-black">•</span>
                    <span>
                      {isFr
                        ? 'Conception des plateformes digitales et rédaction technique des dossiers de présentation de projets.'
                        : 'Engineered web platforms and authored technical project presentation documentation.'}
                    </span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* Section: Formation */}
          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-cyan-400 print:text-black border-b border-white/10 pb-1 print:border-neutral-400">
              {isFr ? 'Formation' : 'Education'}
            </h2>

            <ul className="mt-2.5 space-y-2 text-xs sm:text-[12.5px] text-slate-200 print:text-neutral-900">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 print:text-black font-bold">•</span>
                <div>
                  <strong className="text-white print:text-black">2020-2021 :</strong>{' '}
                  {isFr
                    ? "Diplôme de technicien spécialisé, Option développement informatique (Institut Hermès d'informatique de gestion, Tanger)"
                    : "Specialized Technician Diploma, Software Development Option (Institut Hermès d'informatique de gestion, Tangier)"}
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 print:text-black font-bold">•</span>
                <div>
                  <strong className="text-white print:text-black">2020-2021 :</strong>{' '}
                  {isFr
                    ? 'Attestation en bureautique informatique (NEO centre de formation et consulting, Biougra)'
                    : 'Certificate in Office Automation & Computing (NEO Training and Consulting Center, Biougra)'}
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Actions (Hidden in print) */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 print:hidden">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 text-xs font-mono-code text-cyan-400 hover:text-cyan-300"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <ExternalLink className="h-3.5 w-3.5" />}
            <span>
              {copied
                ? lang === 'ar'
                  ? 'تم نسخ الرابط!'
                  : 'Lien copié !'
                : lang === 'ar'
                  ? 'مشاركة الرابط'
                  : 'Copier le lien'}
            </span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-xl bg-[#ccff00] px-5 py-2.5 text-xs font-mono-code font-bold text-black shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all hover:bg-[#d8ff33] hover:scale-102"
            >
              <Download className="h-4 w-4" />
              <span>{isFr ? 'Télécharger / Imprimer en PDF' : 'Download / Print as PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-mono-code text-slate-400 hover:bg-white/5"
            >
              {lang === 'ar' ? 'إغلاق' : isFr ? 'Fermer' : 'Close'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
