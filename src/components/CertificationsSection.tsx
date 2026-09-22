import React, { useState } from 'react';
import { officialCertifications } from '../data/portfolioData';
import { Certification, Language } from '../types';
import {
  Award,
  ShieldCheck,
  Brain,
  Terminal,
  Globe,
  Languages,
  CheckCircle2,
  Calendar,
  FileText,
  ExternalLink,
  X,
  Sparkles,
  Lock,
  Cpu,
  Layers,
  Search,
} from 'lucide-react';

interface CertificationsSectionProps {
  lang: Language;
}

export default function CertificationsSection({ lang }: CertificationsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'ai' | 'security' | 'cloud' | 'web' | 'lang'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const isAr = lang === 'ar';

  const categories = [
    {
      id: 'all' as const,
      labelFr: 'Toutes les certifications (10)',
      labelAr: 'جميع الشهادات (10)',
      labelEn: 'All Certifications (10)',
      count: officialCertifications.length,
    },
    {
      id: 'ai' as const,
      labelFr: 'IA & Deep Learning (4)',
      labelAr: 'الذكاء الاصطناعي والتعلم العميق (4)',
      labelEn: 'AI & Deep Learning (4)',
      count: officialCertifications.filter((c) => c.category === 'ai').length,
    },
    {
      id: 'security' as const,
      labelFr: 'Cybersécurité (2)',
      labelAr: 'الأمن السبراني (2)',
      labelEn: 'Cybersecurity (2)',
      count: officialCertifications.filter((c) => c.category === 'security').length,
    },
    {
      id: 'cloud' as const,
      labelFr: 'Linux & IBM LinuxONE (1)',
      labelAr: 'أنظمة Linux وLinuxONE (1)',
      labelEn: 'Linux & LinuxONE (1)',
      count: officialCertifications.filter((c) => c.category === 'cloud').length,
    },
    {
      id: 'web' as const,
      labelFr: 'Développement Web & Agile (2)',
      labelAr: 'تطوير الويب ومنهجيات Agile (2)',
      labelEn: 'Web Dev & Agile (2)',
      count: officialCertifications.filter((c) => c.category === 'web').length,
    },
    {
      id: 'lang' as const,
      labelFr: 'Langues & Anglais B2 (1)',
      labelAr: 'اللغات والإنجليزية B2 (1)',
      labelEn: 'Languages & English B2 (1)',
      count: officialCertifications.filter((c) => c.category === 'lang').length,
    },
  ];

  const filteredCerts = officialCertifications.filter((cert) => {
    const matchesCategory =
      selectedCategory === 'all' || cert.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.titleFr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: Certification['category']) => {
    switch (category) {
      case 'ai':
        return <Brain className="h-4 w-4 text-cyan-400" />;
      case 'security':
        return <ShieldCheck className="h-4 w-4 text-red-400" />;
      case 'cloud':
        return <Terminal className="h-4 w-4 text-emerald-400" />;
      case 'web':
        return <Globe className="h-4 w-4 text-blue-400" />;
      case 'lang':
        return <Languages className="h-4 w-4 text-purple-400" />;
    }
  };

  const getIssuerBadgeStyles = (issuerBadge: string) => {
    if (issuerBadge.includes('IBM Official')) {
      return 'border-[#0f62fe]/40 bg-[#0f62fe]/10 text-[#78a9ff]';
    }
    if (issuerBadge.includes('IBM')) {
      return 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300';
    }
    if (issuerBadge.includes('Coursera')) {
      return 'border-blue-500/40 bg-blue-500/10 text-blue-300';
    }
    if (issuerBadge.includes('EF SET')) {
      return 'border-purple-500/40 bg-purple-500/10 text-purple-300';
    }
    return 'border-lime-400/40 bg-lime-400/10 text-lime-300';
  };

  return (
    <section id="certifications" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-3.5 py-1 text-xs font-mono-code text-lime-400">
            <Award className="h-3.5 w-3.5" />
            <span>// VERIFIED CREDENTIALS & ACCREDITATIONS</span>
          </div>
          <h2 className="font-display mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
            {lang === 'ar'
              ? 'الشهادات والاعتمادات الرسمية'
              : lang === 'fr'
                ? 'Certifications Officielles & Badges'
                : 'Official Certifications & Badges'}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            {lang === 'ar'
              ? 'اعتمادات رسمية صادرة عن مؤسسات تكنولوجية عالمية رائدة (IBM SkillsBuild, IBM, Coursera, EF SET) في الذكاء الاصطناعي، الأمن السبراني، أنظمة لينكس المتقدمة، وهندسة الويب.'
              : lang === 'fr'
                ? 'Parcours de formation certifié par des leaders technologiques mondiaux (IBM SkillsBuild, IBM, Coursera, EF SET) validant l’expertise en IA générative, Deep Learning, Cybersécurité et Architectures Systèmes.'
                : 'Official industry certifications issued by global leaders (IBM SkillsBuild, IBM, Coursera, EF SET) validating proficiency in AI, Deep Learning, Cybersecurity, LinuxONE, and Web Engineering.'}
          </p>

          {/* Key Metrics Banner */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-cyan-500/20 bg-[#070d1a] p-4 text-center">
              <span className="font-display text-2xl font-black text-cyan-400 sm:text-3xl">10</span>
              <span className="mt-1 block text-xs font-mono-code text-slate-400">
                {lang === 'ar' ? 'شهادات موثقة' : 'Certificats Obtenus'}
              </span>
            </div>
            <div className="rounded-2xl border border-blue-500/20 bg-[#070d1a] p-4 text-center">
              <span className="font-display text-2xl font-black text-blue-400 sm:text-3xl">8</span>
              <span className="mt-1 block text-xs font-mono-code text-slate-400">
                {lang === 'ar' ? 'اعتمادات IBM' : 'Badges & Diplômes IBM'}
              </span>
            </div>
            <div className="rounded-2xl border border-purple-500/20 bg-[#070d1a] p-4 text-center">
              <span className="font-display text-2xl font-black text-purple-400 sm:text-3xl">B2</span>
              <span className="mt-1 block text-xs font-mono-code text-slate-400">
                {lang === 'ar' ? 'EF SET English (54/100)' : 'Niveau Anglais EF SET'}
              </span>
            </div>
            <div className="rounded-2xl border border-lime-400/20 bg-[#070d1a] p-4 text-center">
              <span className="font-display text-2xl font-black text-[#ccff00] sm:text-3xl">2024-2025</span>
              <span className="mt-1 block text-xs font-mono-code text-slate-400">
                {lang === 'ar' ? 'تحديث مستمر' : 'Veille & Spécialisation'}
              </span>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              const label =
                lang === 'ar' ? cat.labelAr : lang === 'fr' ? cat.labelFr : cat.labelEn;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-mono-code transition-all ${
                    active
                      ? 'bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                      : 'border border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'ar'
                  ? 'بحث في الشهادات...'
                  : lang === 'fr'
                    ? 'Rechercher une certification...'
                    : 'Search credentials...'
              }
              className="w-full rounded-full border border-white/10 bg-white/5 py-1.5 pl-9 pr-4 text-xs font-mono-code text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCerts.map((cert) => {
            const title =
              lang === 'ar' ? cert.titleAr : lang === 'fr' ? cert.titleFr : cert.title;
            const summary =
              lang === 'ar' ? cert.summaryAr : lang === 'fr' ? cert.summaryFr : cert.summary;
            const date =
              lang === 'ar' ? cert.dateAr : lang === 'fr' ? cert.dateFr : cert.date;

            return (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="group relative flex cursor-pointer flex-col justify-between rounded-2xl border border-white/10 bg-[#070b14] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]"
              >
                <div>
                  {/* Top Bar: Issuer Badge + Category Icon + Date */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-mono-code font-bold ${getIssuerBadgeStyles(
                          cert.issuerBadge
                        )}`}
                      >
                        {getCategoryIcon(cert.category)}
                        <span>{cert.issuerBadge}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-mono-code text-slate-400">
                      <Calendar className="h-3 w-3 text-slate-500" />
                      <span>{date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-3.5 font-display text-base font-bold leading-snug text-white transition-colors group-hover:text-cyan-300">
                    {title}
                  </h3>

                  {/* Organization Issuer */}
                  <div className="mt-1 text-xs font-mono-code text-cyan-400/90">
                    {cert.issuer}
                  </div>

                  {/* Description / Course extract */}
                  <p className="mt-2.5 text-xs leading-relaxed text-slate-400 line-clamp-3">
                    {summary}
                  </p>
                </div>

                {/* Bottom: Skills tags & Verification badge */}
                <div className="mt-4 border-t border-white/5 pt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.slice(0, 3).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono-code text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="rounded-md px-1.5 py-0.5 text-[10px] font-mono-code text-slate-500">
                        +{cert.skills.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] font-mono-code">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>{cert.verificationStatus}</span>
                    </span>
                    <span className="text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100">
                      {lang === 'ar' ? 'عرض التفاصيل ←' : 'Détails →'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search Fallback */}
        {filteredCerts.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-[#070b14] p-10 text-center">
            <Award className="mx-auto h-8 w-8 text-slate-500" />
            <p className="mt-2 text-sm text-slate-300">
              {lang === 'ar'
                ? 'لم يتم العثور على شهادات مطابقة لبحثك.'
                : 'Aucune certification trouvée pour cette recherche.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1.5 text-xs font-mono-code text-cyan-300 hover:bg-cyan-400/20"
            >
              {lang === 'ar' ? 'إعادة ضبط الفلتر' : 'Réinitialiser les filtres'}
            </button>
          </div>
        )}

        {/* Callout: Verified Credentials Notice */}
        <div className="mt-12 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/20 via-[#070d1a] to-blue-950/20 p-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-white sm:text-base">
                  {lang === 'ar'
                    ? 'شهادات رسمية بصيغة PDF قابلة للتحقق المباشر'
                    : lang === 'fr'
                      ? 'Dossier de Certifications Officielles en PDF'
                      : 'Authentic Verification Dossier & Diplomas'}
                </h4>
                <p className="text-xs text-slate-300">
                  {lang === 'ar'
                    ? 'جميع الشهادات الصادرة عن IBM SkillsBuild وCoursera وEF SET متوفرة وموثقة برقم الاعتماد، ويمكن تقديم ملفات الـ PDF الأصلية عند الطلب.'
                    : lang === 'fr'
                      ? 'L’ensemble des attestations et badges numériques IBM SkillsBuild, Coursera et EF SET sont disponibles en format PDF officiel pour tout processus de recrutement ou d’audit.'
                      : 'All credentials and digital badges from IBM SkillsBuild, Coursera, and EF SET are available upon request.'}
                </p>
              </div>
            </div>

            <a
              href="#contact"
              className="shrink-0 rounded-full border border-lime-400/40 bg-lime-400/10 px-4 py-2 text-xs font-mono-code font-bold text-lime-300 transition-all hover:bg-lime-400/20 hover:text-white"
            >
              {lang === 'ar' ? 'طلب ملف الشهادات الرسمي' : 'Demander le Dossier Complet'}
            </a>
          </div>
        </div>

      </div>

      {/* Modal: Full Certificate Detail Inspector */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedCert(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl rounded-3xl border border-cyan-500/40 bg-[#080d19] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.9)] sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 p-2 text-slate-400 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 text-xs font-mono-code text-cyan-400 mb-2">
              <Award className="h-4 w-4" />
              <span>{selectedCert.verificationStatus}</span>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-black text-white leading-snug">
              {lang === 'ar'
                ? selectedCert.titleAr
                : lang === 'fr'
                  ? selectedCert.titleFr
                  : selectedCert.title}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-mono-code text-slate-300">
              <span className="text-lime-400 font-bold">{selectedCert.issuer}</span>
              <span>•</span>
              <span className="text-slate-400">{selectedCert.date}</span>
            </div>

            {/* Description / Content Syllabus */}
            <div className="mt-5 rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-xs text-slate-300 leading-relaxed">
              <span className="text-slate-400 font-mono-code text-[11px] block uppercase tracking-wider mb-1.5">
                {lang === 'ar' ? 'البرنامج والمحتوى التدريبي المجتاز :' : 'Contenu de la formation validé :'}
              </span>
              <p>
                {lang === 'ar'
                  ? selectedCert.summaryAr
                  : lang === 'fr'
                    ? selectedCert.summaryFr
                    : selectedCert.summary}
              </p>
            </div>

            {/* Document PDF Attachment Info */}
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-3 text-xs font-mono-code">
              <FileText className="h-5 w-5 shrink-0 text-cyan-400" />
              <div className="flex-1 truncate">
                <span className="text-[10px] text-slate-400 block uppercase">
                  {lang === 'ar' ? 'الملف التوثيقي الأصلي :' : 'Document officiel associé :'}
                </span>
                <span className="text-cyan-300 font-semibold truncate block">
                  {selectedCert.pdfName}
                </span>
              </div>
              <span className="shrink-0 rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                PDF VÉRIFIÉ
              </span>
            </div>

            {/* Skills Badges */}
            <div className="mt-4">
              <span className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400 block mb-2">
                {lang === 'ar' ? 'المهارات المكتسبة والمعتمدة :' : 'Compétences validées :'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedCert.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono-code text-slate-200"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-end gap-3 border-t border-white/10 pt-4">
              <button
                onClick={() => setSelectedCert(null)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono-code text-slate-300 hover:bg-white/10"
              >
                {lang === 'ar' ? 'إغلاق' : 'Fermer'}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
