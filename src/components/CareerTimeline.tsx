import React from 'react';
import { timelineItems } from '../data/portfolioData';
import { Language, TimelineItem } from '../types';
import { Briefcase, GraduationCap, Award, Calendar, Building } from 'lucide-react';

interface CareerTimelineProps {
  lang: Language;
}

export default function CareerTimeline({ lang }: CareerTimelineProps) {
  const isAr = lang === 'ar';

  const getTypeIcon = (type: TimelineItem['type']) => {
    switch (type) {
      case 'work':
        return <Briefcase className="h-4 w-4 text-cyan-400" />;
      case 'education':
        return <GraduationCap className="h-4 w-4 text-lime-400" />;
      case 'cert':
        return <Award className="h-4 w-4 text-purple-400" />;
    }
  };

  const getItemPeriod = (item: TimelineItem) => {
    if (lang === 'ar') return item.periodAr;
    if (lang === 'fr') return item.periodFr;
    return item.period;
  };

  const getItemRole = (item: TimelineItem) => {
    if (lang === 'ar') return item.roleAr;
    if (lang === 'fr') return item.roleFr;
    return item.role;
  };

  const getItemCompany = (item: TimelineItem) => {
    if (lang === 'ar') return item.companyAr;
    if (lang === 'fr') return item.companyFr;
    return item.company;
  };

  const getItemDesc = (item: TimelineItem) => {
    if (lang === 'ar') return item.descriptionAr;
    if (lang === 'fr') return item.descriptionFr;
    return item.description;
  };

  return (
    <section id="timeline" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-3.5 py-1 text-xs font-mono-code text-lime-400">
            <span>// PROFESSIONAL TRAJECTORY</span>
          </div>
          <h2 className="font-display mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
            {lang === 'ar'
              ? 'المسار المهني والأكاديمي'
              : lang === 'fr'
                ? 'Parcours Professionnel & Formations'
                : 'Experience & Trajectory'}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            {lang === 'ar'
              ? 'تتبّع مسار التقاء الدراسة الأكاديمية المتخصصة في البرمجيات بالخبرة الصناعية الواقعية، وتتويجها بريادة الأعمال الرقمية وتأسيس YouTechD.'
              : lang === 'fr'
                ? 'Convergence entre formation logicielle pointue, expérience industrielle rigoureuse (SOPLAMI Maroc, plastiques aéronautiques) et création de solutions digitales (YouTechD).'
                : 'Trace the convergence of formal computer science training, real-world manufacturing line operations, and cutting-edge software entrepreneurship.'}
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-cyan-500/30 ml-4 pl-6 space-y-10 sm:ml-8 sm:pl-10">
          {timelineItems.map((item) => (
            <div key={item.id} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[31px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-cyan-400 bg-[#05070c] shadow-[0_0_12px_#00f0ff] sm:-left-[47px] transition-transform group-hover:scale-125">
                <span className="h-2 w-2 rounded-full bg-[#ccff00]" />
              </div>

              {/* Card Body */}
              <div className="rounded-2xl border border-white/10 bg-[#080d1a]/80 p-6 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:bg-[#0c1426] hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
                {/* Meta header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2 font-mono-code text-xs font-bold text-[#ccff00]">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{getItemPeriod(item)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-mono-code text-slate-300">
                    {getTypeIcon(item.type)}
                    <span className="uppercase">
                      {lang === 'fr'
                        ? item.type === 'work'
                          ? 'Expérience'
                          : item.type === 'education'
                            ? 'Diplôme'
                            : 'Certification'
                        : item.type}
                    </span>
                  </div>
                </div>

                {/* Role & Company */}
                <h3 className="font-display mt-3 text-xl font-bold text-white transition-colors group-hover:text-cyan-300">
                  {getItemRole(item)}
                </h3>
                <div className="mt-1 flex items-center gap-1.5 font-mono-code text-xs text-cyan-400">
                  <Building className="h-3.5 w-3.5 shrink-0" />
                  <span>{getItemCompany(item)}</span>
                </div>

                {/* Description */}
                <p className="mt-3 text-xs leading-relaxed text-slate-300 sm:text-sm">
                  {getItemDesc(item)}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
