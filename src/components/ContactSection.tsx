import React, { useState } from 'react';
import { Phone, Mail, MapPin, Linkedin, MessageCircle, Send, Sparkles, CheckCircle2, QrCode, FileText } from 'lucide-react';
import { Language, Project } from '../types';

interface ContactSectionProps {
  lang: Language;
  selectedProject?: Project | null;
  onOpenVCard?: () => void;
  onOpenCv?: () => void;
}

export default function ContactSection({ lang, selectedProject, onOpenVCard, onOpenCv }: ContactSectionProps) {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  // Default to empty/blank as requested by user
  const [projectType, setProjectType] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // If user selected a project from the projects list, prefill
  React.useEffect(() => {
    if (selectedProject) {
      setProjectType(
        lang === 'ar'
          ? selectedProject.titleAr
          : lang === 'fr'
            ? selectedProject.titleFr
            : selectedProject.title
      );
      if (lang === 'ar') {
        setMessage(`أهلاً إبراهيم، أود مناقشة تفاصيل مشروع ${selectedProject.titleAr} وإمكانية تنفيذه لدينا.`);
      } else if (lang === 'fr') {
        setMessage(`Bonjour Ibrahim, je souhaite échanger avec vous concernant le projet ${selectedProject.titleFr} et explorer une collaboration.`);
      } else {
        setMessage(`Hello Ibrahim, I would like to inquire about ${selectedProject.title} and explore working together.`);
      }
    }
  }, [selectedProject, lang]);

  const handleEmailSend = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanType = projectType.trim();
    const subjectPrefix = cleanType ? `[${cleanType}]` : '[Direct Inquiry]';
    const subject = encodeURIComponent(`${subjectPrefix} from ${senderName}`);
    const categoryLine = cleanType ? `\nCategory / Purpose: ${cleanType}` : '';
    const body = encodeURIComponent(
      `Hello Ibrahim,\n\nName / Organization: ${senderName}\nEmail: ${senderEmail}${categoryLine}\n\nProject Brief / Message:\n${message}\n\nSent from your portfolio website.`
    );
    window.location.href = `mailto:ibrahimaitaddimane@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleWhatsAppSend = () => {
    const cleanType = projectType.trim();
    const categoryLine = cleanType ? `\nPurpose: ${cleanType}` : '';
    const text = encodeURIComponent(
      `Hello Ibrahim! My name is ${senderName || 'a visitor'}.${categoryLine}\n\nMessage: ${
        message || 'Looking forward to discussing a new project, job offer, or collaboration.'
      }`
    );
    window.open(`https://wa.me/212664478416?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Main Grid */}
        <div className="grid gap-12 lg:grid-cols-12">
          
          {/* Left: Direct Reach Channels (Col 1-5) */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-3.5 py-1 text-xs font-mono-code text-lime-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>// DIRECT ACTION HUB</span>
            </div>

            <h2 className="font-display mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
              {lang === 'ar'
                ? 'لنصنع المستقبل معاً'
                : lang === 'fr'
                  ? 'Bâtissons Ensemble'
                  : "Let's Shape The Future"}
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
              {lang === 'ar'
                ? 'هل لديك مشروع في الرؤية الحاسوبية، تطبيق عالي الأداء، أو تحدٍ في الأتمتة الصناعية؟ تواصل معي مباشرة عبر القنوات المتاحة أدناه.'
                : lang === 'fr'
                  ? 'Un besoin en vision par ordinateur industrielle, application mobile Flutter haute performance ou automatisation d’usine ? Contactez-moi directement.'
                  : 'Have an AI vision challenge, high-performance mobile application, or factory automation initiative? Reach out directly via WhatsApp, phone, or email.'}
            </p>

            {/* Methods list */}
            <div className="mt-8 space-y-3">
              {/* WhatsApp */}
              <a
                href="https://wa.me/212664478416"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#080d19] p-4 transition-all hover:border-[#ccff00] hover:bg-[#0c1324] hover:shadow-[0_0_20px_rgba(204,255,0,0.2)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-transform group-hover:scale-110">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[11px] font-mono-code uppercase text-slate-400">
                    {lang === 'ar' ? 'واتساب مباشر' : lang === 'fr' ? 'WhatsApp Direct' : 'WhatsApp Direct'}
                  </div>
                  <div className="font-mono-code text-sm font-bold text-white group-hover:text-[#ccff00]">
                    +212 664-478-416
                  </div>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+212664478416"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#080d19] p-4 transition-all hover:border-cyan-400 hover:bg-[#0c1324] hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 transition-transform group-hover:scale-110">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[11px] font-mono-code uppercase text-slate-400">
                    {lang === 'ar' ? 'الهاتف المباشر' : lang === 'fr' ? 'Téléphone Direct' : 'Direct Call'}
                  </div>
                  <div className="font-mono-code text-sm font-bold text-white group-hover:text-cyan-300">
                    +212 664-478-416
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:ibrahimaitaddimane@gmail.com"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#080d19] p-4 transition-all hover:border-cyan-400 hover:bg-[#0c1324] hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 transition-transform group-hover:scale-110">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[11px] font-mono-code uppercase text-slate-400">
                    {lang === 'ar' ? 'البريد الإلكتروني' : lang === 'fr' ? 'Email Direct' : 'Direct Email'}
                  </div>
                  <div className="font-mono-code text-xs font-bold text-white group-hover:text-cyan-300 sm:text-sm">
                    ibrahimaitaddimane@gmail.com
                  </div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/ibrahim-ait-addimane-009776232/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#080d19] p-4 transition-all hover:border-blue-400 hover:bg-[#0c1324]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-transform group-hover:scale-110">
                  <Linkedin className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[11px] font-mono-code uppercase text-slate-400">
                    LinkedIn Network
                  </div>
                  <div className="font-mono-code text-xs font-bold text-white group-hover:text-blue-300 sm:text-sm">
                    linkedin.com/in/ibrahim-ait-addimane
                  </div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-[#080d19]/50 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[11px] font-mono-code uppercase text-slate-400">
                    {lang === 'ar' ? 'المقر والإقامة' : lang === 'fr' ? 'Localisation' : 'Operating Base'}
                  </div>
                  <div className="text-xs font-semibold text-slate-300 sm:text-sm">
                    Daroua / Berrechid, Casablanca-Settat, Maroc
                  </div>
                </div>
              </div>

              {/* Digital vCard & QR Code Card */}
              {onOpenVCard && (
                <button
                  type="button"
                  onClick={onOpenVCard}
                  className="group flex w-full items-center gap-4 rounded-2xl border border-lime-400/30 bg-lime-400/5 p-4 text-left transition-all hover:border-lime-400 hover:bg-lime-400/10 hover:shadow-[0_0_20px_rgba(204,255,0,0.2)]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-lime-400/20 text-[#ccff00] transition-transform group-hover:scale-110">
                    <QrCode className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-mono-code uppercase text-lime-400 font-bold">
                      {lang === 'ar' ? 'بطاقة الاتصال الرقمية (vCard QR)' : 'Carte de Visite Digitale (vCard)'}
                    </div>
                    <div className="text-xs text-slate-300">
                      {lang === 'ar'
                        ? 'امسح الرمز ضوئياً بهاتفك لحفظ جهة الاتصال مباشرة'
                        : 'Scanner le QR code pour enregistrer directement le contact dans le smartphone'}
                    </div>
                  </div>
                </button>
              )}

              {/* Official CV Download & View Card */}
              {onOpenCv && (
                <button
                  type="button"
                  onClick={onOpenCv}
                  className="group flex w-full items-center gap-4 rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-4 text-left transition-all hover:border-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/20 text-cyan-300 transition-transform group-hover:scale-110">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-mono-code uppercase text-cyan-300 font-bold">
                      {lang === 'ar' ? 'السيرة الذاتية الرسمية (CV PDF)' : 'Curriculum Vitae Officiel (Format PDF)'}
                    </div>
                    <div className="text-xs text-slate-300">
                      {lang === 'ar'
                        ? 'عرض السيرة الذاتية وطباعتها أو تنزيلها بصيغة PDF الرسمية'
                        : 'Consulter, imprimer ou télécharger le CV certifié au format PDF'}
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Right: Interactive Project Brief Form (Col 6-12) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-[#080d19]/90 p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <h3 className="font-display text-2xl font-bold text-white">
                {lang === 'ar'
                  ? 'إرسال تفاصيل المشروع والمقترح'
                  : lang === 'fr'
                    ? 'Transmettre votre Projet / Cahier des Charges'
                    : 'Send a Direct Project Brief'}
              </h3>
              <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                {lang === 'ar'
                  ? 'املأ النموذج أدناه لتنسيق رسالة فورية عبر البريد الإلكتروني أو مباشرة على WhatsApp.'
                  : lang === 'fr'
                    ? 'Remplissez les détails pour formater un message direct par Email officiel ou WhatsApp instantané.'
                    : 'Fill in your project details to format a direct inquiry via official email or instantaneous WhatsApp message.'}
              </p>

              {submitted && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400 font-mono-code">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>
                    {lang === 'ar'
                      ? 'تم تحضير الرسالة بنجاح وفتح قناة التواصل!'
                      : lang === 'fr'
                        ? 'Message préparé et transmis avec succès !'
                        : 'Project brief prepared and dispatched to your client!'}
                  </span>
                </div>
              )}

              <form onSubmit={handleEmailSend} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-mono-code uppercase text-slate-400 mb-1.5">
                      {lang === 'ar'
                        ? 'الاسم / الشركة'
                        : lang === 'fr'
                          ? 'Votre Nom / Entreprise'
                          : 'Your Name / Company'}
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder={lang === 'fr' ? 'ex. Direction Industrielle - Usine 4.0' : 'e.g. Karim Bennani - Smart Factory'}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs sm:text-sm text-white outline-none transition-all focus:border-cyan-400 focus:bg-white/10"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono-code uppercase text-slate-400 mb-1.5">
                      {lang === 'ar'
                        ? 'البريد الإلكتروني'
                        : lang === 'fr'
                          ? 'Adresse Email'
                          : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="nom@entreprise.com"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs sm:text-sm text-white outline-none transition-all focus:border-cyan-400 focus:bg-white/10"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-mono-code uppercase text-slate-400">
                      {lang === 'ar'
                        ? 'تصنيف المشروع أو الغرض'
                        : lang === 'fr'
                          ? 'Objet / Domaine de la demande'
                          : 'Subject / Project Category'}
                    </label>
                    <span className="text-[11px] font-mono-code text-slate-500">
                      {lang === 'ar' ? '(اختياري - يمكن تركه فارغاً)' : lang === 'fr' ? '(Optionnel - peut rester vide)' : '(Optional - can be blank)'}
                    </span>
                  </div>

                  {/* Quick selection tags */}
                  <div className="mb-2 flex flex-wrap items-center gap-1.5">
                    {[
                      { ar: 'عرض عمل', fr: "Offre d'emploi", en: 'Job Offer' },
                      { ar: 'طلب مشروع', fr: 'Demande de projet', en: 'Project Request' },
                      { ar: 'استشارة وتدقيق فني', fr: 'Conseil & Audit', en: 'Consulting' },
                      { ar: 'رؤية حاسوبية وذكاء اصطناعي', fr: 'Vision IA & Qualité', en: 'AI Vision' },
                    ].map((item) => {
                      const label = lang === 'ar' ? item.ar : lang === 'fr' ? item.fr : item.en;
                      const isSelected = projectType === label;
                      return (
                        <button
                          key={item.en}
                          type="button"
                          onClick={() => setProjectType(isSelected ? '' : label)}
                          className={`rounded-lg px-2.5 py-1 text-xs font-mono-code transition-all ${
                            isSelected
                              ? 'border border-cyan-400 bg-cyan-400/20 text-cyan-300 font-bold'
                              : 'border border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}

                    {projectType && (
                      <button
                        type="button"
                        onClick={() => setProjectType('')}
                        className="rounded-lg border border-red-500/30 bg-red-500/10 px-2 py-1 text-xs font-mono-code text-red-400 hover:bg-red-500/20 transition-all"
                        title={lang === 'ar' ? 'ترك الحقل فارغاً' : lang === 'fr' ? 'Laisser vide' : 'Clear field'}
                      >
                        {lang === 'ar' ? 'إفراغ الحقل ✕' : lang === 'fr' ? 'Vider ✕' : 'Clear ✕'}
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    placeholder={
                      lang === 'ar'
                        ? 'عرض عمل، طلب مشروع، أو اتركه فارغاً...'
                        : lang === 'fr'
                          ? "Offre d'emploi, Demande de projet, ou laisser vide..."
                          : 'Job offer, Project request, or leave blank...'
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs sm:text-sm text-white outline-none transition-all focus:border-cyan-400 focus:bg-white/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code uppercase text-slate-400 mb-1.5">
                    {lang === 'ar'
                      ? 'تفاصيل الفكرة أو المتطلبات'
                      : lang === 'fr'
                        ? 'Description du Projet / Besoins'
                        : 'Project Brief / Message'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      lang === 'ar'
                        ? 'صف متطلبات مشروعك، التحديات الفنية، أو خطوط الإنتاج التي ترغب في أتمتتها وتزويدها بالرؤية الحاسوبية...'
                        : lang === 'fr'
                          ? 'Décrivez vos besoins, spécifications techniques, cadences de production ou défis d’inspection optique...'
                          : 'Describe your application goals, manufacturing challenges, or computer vision specifications...'
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs sm:text-sm text-white outline-none transition-all focus:border-cyan-400 focus:bg-white/10 leading-relaxed"
                  />
                </div>

                {/* Dual Dispatch Buttons */}
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <button
                    type="submit"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-xs font-black text-black shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all hover:bg-cyan-300"
                  >
                    <Send className="h-4 w-4" />
                    <span>
                      {lang === 'ar'
                        ? 'إرسال عبر البريد الرسمي'
                        : lang === 'fr'
                          ? 'Envoyer par Email'
                          : 'Dispatch via Email'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppSend}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#ccff00] px-5 py-3 text-xs font-black text-black shadow-[0_0_15px_rgba(204,255,0,0.3)] transition-all hover:bg-[#d8ff33]"
                  >
                    <MessageCircle className="h-4 w-4 fill-black" />
                    <span>
                      {lang === 'ar'
                        ? 'إرسال مباشر عبر واتساب'
                        : lang === 'fr'
                          ? 'Échanger sur WhatsApp'
                          : 'Direct on WhatsApp'}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
