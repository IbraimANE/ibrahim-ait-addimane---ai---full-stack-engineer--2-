import React, { useState } from 'react';
import { portfolioProjects } from '../data/portfolioData';
import { ProjectCategory, Language, Project } from '../types';
import { Bot, Factory, Smartphone, Server, Globe, Cog, ArrowUpRight, CheckCircle, Sparkles } from 'lucide-react';

interface FeaturedProjectsProps {
  lang: Language;
  onSelectProjectForContact?: (project: Project) => void;
}

export default function FeaturedProjects({ lang, onSelectProjectForContact }: FeaturedProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const filteredProjects = portfolioProjects.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category.includes(activeCategory);
  });

  const getIcon = (type: Project['iconType']) => {
    switch (type) {
      case 'robot':
        return <Bot className="h-8 w-8 text-cyan-400" />;
      case 'factory':
        return <Factory className="h-8 w-8 text-lime-400" />;
      case 'mobile':
        return <Smartphone className="h-8 w-8 text-blue-400" />;
      case 'server':
        return <Server className="h-8 w-8 text-purple-400" />;
      case 'globe':
        return <Globe className="h-8 w-8 text-emerald-400" />;
      case 'gears':
        return <Cog className="h-8 w-8 text-amber-400" />;
    }
  };

  const categories = [
    { key: 'all', labelEn: 'All Works', labelFr: 'Tous les Projets', labelAr: 'جميع النظم' },
    { key: 'ai', labelEn: 'AI & Vision', labelFr: 'IA & Vision', labelAr: 'الذكاء الاصطناعي والرؤية' },
    { key: 'mobile', labelEn: 'Mobile (Flutter)', labelFr: 'Mobile (Flutter)', labelAr: 'تطبيقات الموبايل' },
    { key: 'industry', labelEn: 'Industry 4.0 & CNC', labelFr: 'Industrie 4.0 & CN', labelAr: 'الصناعة 4.0 وCNC' },
  ];

  const getCatLabel = (cat: (typeof categories)[0]) => {
    if (lang === 'ar') return cat.labelAr;
    if (lang === 'fr') return cat.labelFr;
    return cat.labelEn;
  };

  const getProjectTitle = (p: Project) => {
    if (lang === 'ar') return p.titleAr;
    if (lang === 'fr') return p.titleFr;
    return p.title;
  };

  const getProjectDesc = (p: Project) => {
    if (lang === 'ar') return p.descriptionAr;
    if (lang === 'fr') return p.descriptionFr;
    return p.description;
  };

  const getProjectBadge = (p: Project) => {
    if (lang === 'ar') return p.badgeAr;
    if (lang === 'fr') return p.badgeFr;
    return p.badge;
  };

  const getProjectMetrics = (p: Project) => {
    if (lang === 'ar') return p.metricsAr;
    if (lang === 'fr') return p.metricsFr;
    return p.metrics;
  };

  return (
    <section id="projects" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-3.5 py-1 text-xs font-mono-code text-lime-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>// PRODUCTION SOFTWARE</span>
          </div>
          <h2 className="font-display mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
            {lang === 'ar'
              ? 'المشاريع والنظم المطوَّرة'
              : lang === 'fr'
                ? 'Réalisations & Projets Déployés'
                : 'Featured Engineering Works'}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            {lang === 'ar'
              ? 'مجموعة مختارة من البرمجيات الصناعية، تطبيقات الهواتف المحمولة ذات الكفاءة العالية، وحلول الأتمتة التي تربط بين المعدات البرمجية والواقع الميداني.'
              : lang === 'fr'
                ? 'Une sélection de solutions logicielles industrielles, applications mobiles Flutter haute performance, et systèmes d’automatisation reliant les équipements terrain aux plateformes numériques.'
                : 'Software architectures spanning industrial computer vision, smart factory oversight dashboards, cross-platform Flutter ecosystems, and automated quality infrastructure.'}
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key as ProjectCategory)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                  activeCategory === cat.key
                    ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'border border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400/40 hover:text-white'
                }`}
              >
                {getCatLabel(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0a0f1d]/70 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-400/40 hover:bg-[#0c1426] hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(0,240,255,0.1)]"
            >
              <div>
                {/* Banner Icon & Badge */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="rounded-xl border border-white/10 bg-black/50 p-2.5">
                    {getIcon(project.iconType)}
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono-code font-semibold text-[#ccff00]">
                    {getProjectBadge(project)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display mt-4 text-xl font-black text-white transition-colors group-hover:text-cyan-300">
                  {getProjectTitle(project)}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
                  {getProjectDesc(project)}
                </p>

                {/* Metric */}
                <div className="mt-3 flex items-center gap-1.5 font-mono-code text-[11px] text-cyan-300">
                  <CheckCircle className="h-3 w-3 text-cyan-400" />
                  <span>{getProjectMetrics(project)}</span>
                </div>
              </div>

              <div>
                {/* Tech Tags */}
                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-mono-code text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer Action */}
                <div className="mt-4 flex items-center justify-between pt-2">
                  <a
                    href="#contact"
                    onClick={() => onSelectProjectForContact && onSelectProjectForContact(project)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 transition-all hover:text-lime-300 hover:gap-1.5"
                  >
                    <span>
                      {lang === 'ar'
                        ? 'طلب استشارة أو نموذج'
                        : lang === 'fr'
                          ? 'Demander une Démo / Échange'
                          : 'Inquire / Request Demo'}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <span className="text-[10px] font-mono-code text-slate-500">
                    {lang === 'ar' ? 'نظام حي' : lang === 'fr' ? 'Prêt en Production' : 'Production-Ready'}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
