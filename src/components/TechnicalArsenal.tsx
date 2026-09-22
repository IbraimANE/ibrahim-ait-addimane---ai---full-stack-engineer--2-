import React from 'react';
import { skillCategories } from '../data/portfolioData';
import { Language, SkillCategory } from '../types';
import { Brain, Code, Database, Factory, ChevronRight, Check, GraduationCap, Award, Cpu, ShieldCheck } from 'lucide-react';

interface TechnicalArsenalProps {
  lang: Language;
}

export default function TechnicalArsenal({ lang }: TechnicalArsenalProps) {
  const isAr = lang === 'ar';

  const getCategoryIcon = (iconName: SkillCategory['iconName'], color: string) => {
    switch (iconName) {
      case 'brain':
        return <Brain className="h-6 w-6" style={{ color }} />;
      case 'code':
        return <Code className="h-6 w-6" style={{ color }} />;
      case 'database':
        return <Database className="h-6 w-6" style={{ color }} />;
      case 'factory':
        return <Factory className="h-6 w-6" style={{ color }} />;
    }
  };

  const getCategoryTitle = (cat: SkillCategory) => {
    if (lang === 'ar') return cat.titleAr;
    if (lang === 'fr') return cat.titleFr;
    return cat.title;
  };

  const getSkillDetail = (skill: SkillCategory['skills'][0]) => {
    if (lang === 'ar') return skill.detailAr;
    if (lang === 'fr') return skill.detailFr;
    return skill.detail;
  };

  return (
    <section id="skills" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono-code text-cyan-400">
            <span>// COMPETENCIES & TOOLKIT</span>
          </div>
          <h2 className="font-display mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
            {lang === 'ar'
              ? 'الترسانة التقنية والمهارات'
              : lang === 'fr'
                ? 'Arsenal Technique & Compétences'
                : 'Technical Arsenal'}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            {lang === 'ar'
              ? 'مزيج فريد يجمع بين إتقان هندسة البرمجيات، تطبيق نماذج الذكاء الاصطناعي على أرض الواقع، والخبرة العملية في ماكينات ومعدات التصنيع الميكانيكية.'
              : lang === 'fr'
                ? 'Une double compétence rare unissant rigueur du génie logiciel, intégration concrète de l’IA/Vision par ordinateur et maîtrise physique des machines industrielles (GEISS CN, Siemens S7).'
                : 'A rare synthesis of software engineering rigor, cutting-edge artificial intelligence implementations, and deep physical manufacturing machinery mastery.'}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className="group rounded-3xl border border-white/10 bg-[#080d19]/80 p-6 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:bg-[#0c1324] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] sm:p-8"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 border-b border-white/10 pb-5">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border"
                  style={{
                    borderColor: `${category.color}40`,
                    backgroundColor: `${category.color}15`,
                  }}
                >
                  {getCategoryIcon(category.iconName, category.color)}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {getCategoryTitle(category)}
                  </h3>
                  <span className="font-mono-code text-[11px] text-slate-400">
                    {category.skills.length}{' '}
                    {lang === 'ar'
                      ? 'قدرات متخصصة'
                      : lang === 'fr'
                        ? 'Domaines d’expertise'
                        : 'Core Disciplines'}
                  </span>
                </div>
              </div>

              {/* Skills List */}
              <ul className="mt-5 space-y-3.5">
                {category.skills.map((skill, i) => (
                  <li
                    key={i}
                    className="flex items-start justify-between gap-3 border-b border-white/5 pb-2.5 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-2">
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
                      <span className="font-mono-code text-xs font-semibold text-slate-200 sm:text-sm">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-right text-[11px] text-slate-400 sm:text-xs">
                      {getSkillDetail(skill)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Official Diplomas & Industrial Accreditations Grid */}
        <div className="mt-14">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-400">
                <GraduationCap className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                  {lang === 'ar'
                    ? 'الدبلومات والتكوينات والاعتمادات الميدانية'
                    : lang === 'fr'
                      ? 'Diplômes, Formations & Accréditations Usine'
                      : 'Diplomas, Training & Industrial Accreditations'}
                </h3>
                <p className="text-xs font-mono-code text-slate-400">
                  {lang === 'ar' ? 'مسار أكاديمي موثق وخبرة عملية معتمدة في بيئات التصنيع المتقدمة' : 'Accredited Academic Degree & Shop-Floor Industrial Badges'}
                </p>
              </div>
            </div>
            <span className="hidden rounded-full border border-lime-400/30 bg-lime-400/10 px-3 py-1 text-[11px] font-mono-code font-bold text-lime-400 sm:inline-block">
              {lang === 'ar' ? 'معتمد رسمي' : 'Vérifié'}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Diploma 1: Institut Hermès */}
            <div className="rounded-2xl border border-cyan-500/30 bg-[#070c18] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all hover:border-cyan-400 hover:scale-102">
              <div className="flex items-center justify-between text-xs font-mono-code text-cyan-400 mb-2">
                <span>DIPLÔME D'ÉTAT</span>
                <span className="text-lime-400 font-bold">2020-2021</span>
              </div>
              <h4 className="font-display text-sm font-bold text-white leading-snug">
                {lang === 'ar' ? 'تقني متخصص في تطوير المعلوميات' : 'Technicien Spécialisé en Développement Informatique'}
              </h4>
              <p className="text-xs text-cyan-300 font-mono-code mt-1">
                Institut Hermès • Tanger
              </p>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                {lang === 'ar'
                  ? 'برمجة البرمجيات، قواعد البيانات، الخوارزميات، وهندسة النظم وتطوير الويب والتطبيقات.'
                  : 'Génie logiciel, structures de données, POO, bases de données et conception modulaire.'}
              </p>
            </div>

            {/* Credential 2: GEISS 5-Axis CNC */}
            <div className="rounded-2xl border border-white/10 bg-[#070c18] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all hover:border-lime-400/50 hover:scale-102">
              <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 mb-2">
                <span>USINAGE NUMÉRIQUE</span>
                <span className="text-lime-400 font-bold">GEISS (DE)</span>
              </div>
              <h4 className="font-display text-sm font-bold text-white leading-snug">
                {lang === 'ar' ? 'برمجة وتشغيل مراكز CNC 5 محاور' : 'Programmation & Réglage CNC 5 Axes'}
              </h4>
              <p className="text-xs text-lime-400 font-mono-code mt-1">
                SOPLAMI Maroc • Allemand
              </p>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                {lang === 'ar'
                  ? 'التحكم الدقيق في مسارات القطع، معالجة القطع المعقدة لقطاع الطيران والسكك الحديدية.'
                  : 'Fraisage grande vitesse de polymères techniques pour l’aéronautique et ferroviaire.'}
              </p>
            </div>

            {/* Credential 3: Siemens S7 */}
            <div className="rounded-2xl border border-white/10 bg-[#070c18] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all hover:border-cyan-400 hover:scale-102">
              <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 mb-2">
                <span>AUTOMATISATION</span>
                <span className="text-cyan-400 font-bold">SIEMENS</span>
              </div>
              <h4 className="font-display text-sm font-bold text-white leading-snug">
                {lang === 'ar' ? 'أوتوماتات Siemens S7-300' : 'Automates Industriels Siemens S7-300'}
              </h4>
              <p className="text-xs text-cyan-300 font-mono-code mt-1">
                PLC & Intégration Ligne
              </p>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                {lang === 'ar'
                  ? 'بروتوكولات الاتصال الصناعي، الحساسات الضوئية، التوافق الكهروميكانيكي.'
                  : 'Signaux TOR, synchronisation des outillages et sécurité mécanique des lignes.'}
              </p>
            </div>

            {/* Credential 4: Métrologie & 5S */}
            <div className="rounded-2xl border border-white/10 bg-[#070c18] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all hover:border-purple-400 hover:scale-102">
              <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 mb-2">
                <span>QUALITÉ USINE</span>
                <span className="text-purple-400 font-bold">5S / ISO</span>
              </div>
              <h4 className="font-display text-sm font-bold text-white leading-snug">
                {lang === 'ar' ? 'المترولوجيا الصناعية ومنهجية 5S' : 'Métrologie & Méthodologie 5S'}
              </h4>
              <p className="text-xs text-purple-300 font-mono-code mt-1">
                Contrôle Qualité Zéro Rebut
              </p>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                {lang === 'ar'
                  ? 'قياس التفاوتات الميكانيكية، معايرة الأدوات، وبيئة عمل صناعية مطابقة لمعايير السلامة.'
                  : 'Vérification dimensionnelle précise (tolérances ±0.02mm) et discipline lean.'}
              </p>
            </div>
          </div>
        </div>

        {/* Industrial Highlights Callout */}
        <div className="mt-10 rounded-2xl border border-lime-400/20 bg-lime-400/5 p-6 backdrop-blur-md">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ccff00] text-black font-black">
                4.0
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-white sm:text-base">
                  {lang === 'ar'
                    ? 'الجسور بين العتاد الصناعي والبرمجة'
                    : lang === 'fr'
                      ? 'Symbiose Matériel & Logiciel (Industrie 4.0)'
                      : 'Hardware-Software Symbiosis'}
                </h4>
                <p className="text-xs text-slate-300">
                  {lang === 'ar'
                    ? 'القدرة على استخلاص بيانات الحساسات، قراءة إشارات الـ PLC، وربطها بنماذج Vision AI على الخوادم الطرفية (Edge Computing).'
                    : lang === 'fr'
                      ? 'Capacité éprouvée à acquérir les signaux de capteurs, communiquer avec les automates Siemens S7 et alimenter les pipelines de contrôle qualité par vision en périphérie (Edge).'
                      : 'Proven capability to ingest live sensor signals, read machine telemetry, and link physical shop-floor assets to Edge Vision AI engines.'}
                </p>
              </div>
            </div>
            <a
              href="#vision-lab"
              className="shrink-0 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-white/20"
            >
              {lang === 'ar' ? 'معاينة المحاكي الحي' : lang === 'fr' ? 'Tester le Simulateur' : 'Test Vision Simulator'}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
