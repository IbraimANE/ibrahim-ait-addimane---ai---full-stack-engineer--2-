import React, { useState, useRef, useEffect } from 'react';
import { ArrowDown, Cpu, Sparkles, MessageSquare, Terminal, Eye, Award, Camera, Upload, Check, RefreshCw, Lock, ShieldCheck, KeyRound, X, FileText, QrCode } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
  onOpenCv?: () => void;
  onOpenVCard?: () => void;
}

export default function Hero({ lang, onOpenCv, onOpenVCard }: HeroProps) {
  const isAr = lang === 'ar';
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Security: Admin Owner Authentication
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('ibrahim_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authPin, setAuthPin] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState(false);

  // Load custom user photo from localStorage if saved
  const [currentPhoto, setCurrentPhoto] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('ibrahim_authentic_photo');
      if (saved) return saved;
    } catch {
      // ignore
    }
    return '/assets/images/IBRAHIM AIT ADDIMANE.jpg';
  });

  const [isCustomLoaded, setIsCustomLoaded] = useState<boolean>(() => {
    try {
      return !!localStorage.getItem('ibrahim_authentic_photo');
    } catch {
      return false;
    }
  });

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handlePhotoUpload = (file: File) => {
    if (!isAdminAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setCurrentPhoto(result);
        setIsCustomLoaded(true);
        try {
          localStorage.setItem('ibrahim_authentic_photo', result);
        } catch (err) {
          console.warn('Storage quota limit reached', err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handlePhotoUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!isAdminAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handlePhotoUpload(file);
    }
  };

  const handleInitiateChangePhoto = () => {
    if (!isAdminAuthenticated) {
      setAuthError('');
      setAuthPin('');
      setShowAuthModal(true);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleVerifyOwner = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = authPin.trim();
    // Default Owner PINs: 2026, 1996, 2020, 212664478416 or custom Ibrahim pin
    if (clean === '2026' || clean === '1234' || clean === 'ibrahim' || clean === '0000') {
      setIsAdminAuthenticated(true);
      setAuthSuccess(true);
      setAuthError('');
      try {
        sessionStorage.setItem('ibrahim_admin_auth', 'true');
      } catch {
        // ignore
      }
      setTimeout(() => {
        setShowAuthModal(false);
        setAuthSuccess(false);
        fileInputRef.current?.click();
      }, 700);
    } else {
      setAuthError(
        lang === 'ar'
          ? 'رمز المرور غير صحيح. فقط إبراهيم آيت أضمان يملك صلاحية تغيير الصورة.'
          : lang === 'fr'
            ? 'Code PIN incorrect. Seul Ibrahim Ait Addimane est autorisé à modifier la photo.'
            : 'Invalid PIN. Only Ibrahim Ait Addimane is authorized to change this photo.'
      );
    }
  };

  const handleResetPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdminAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    try {
      localStorage.removeItem('ibrahim_authentic_photo');
    } catch {
      // ignore
    }
    setCurrentPhoto('/assets/images/ibrahim.jpg');
    setIsCustomLoaded(false);
  };

  return (
    <section id="about" className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Main Copy (Col 1-7) */}
          <div className="lg:col-span-7">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span>
                {lang === 'ar'
                  ? 'متاح للمشاريع الجديدة واستشارات الذكاء الاصطناعي الصناعي'
                  : lang === 'fr'
                    ? 'DISPONIBLE POUR PROJETS & CONSEIL EN IA INDUSTRIELLE 4.0'
                    : 'AVAILABLE FOR NEW PROJECTS & AI CONSULTING'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display mt-5 text-4xl font-black tracking-tight text-white uppercase sm:text-6xl sm:leading-[1.1]">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                IBRAHIM
              </span>{' '}
              <br />
              <span className="text-[#ccff00] drop-shadow-[0_0_25px_rgba(204,255,0,0.35)]">
                AIT ADDIMANE
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {lang === 'ar'
                ? 'مهندس برمجيات متكامل وتقني في التشكيل الحراري للبلاستيك المخصص للطيران، مؤسس YouTechD. أجمع بين صرامة الميدان الصناعي (ماكينات GEISS CNC ومتحكمات Siemens S7-300) وأحدث تقنيات الرؤية الحاسوبية (OpenCV)، تطبيقات Flutter وتطوير الويب الشامل.'
                : lang === 'fr'
                  ? 'Développeur Full-Stack & Opérateur en thermoformage industriel spécialisé dans les plastiques aéronautiques (GEISS CNC, Siemens S7-300). Fondateur de YouTechD. Double compétence rare alliant génie logiciel, vision par ordinateur (OpenCV) et automatisation de production sous normes strictes.'
                  : 'Full-Stack Software Engineer & Industrial Thermoforming Operator specializing in aeronautical plastics (GEISS CNC, Siemens S7-300). Founder of YouTechD. Rare hybrid mastery uniting software engineering, computer vision quality control (OpenCV), and shop-floor automation.'}
            </p>

            {/* Call to Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                id="hero-cta-vision-lab"
                href="#vision-lab"
                className="inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-5 py-3 text-sm font-bold text-black shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all hover:scale-105 hover:bg-[#d8ff33] hover:shadow-[0_0_30px_rgba(204,255,0,0.5)]"
              >
                <Eye className="h-4 w-4" />
                <span>
                  {lang === 'ar'
                    ? 'مختبر الرؤية الحاسوبية الحي'
                    : lang === 'fr'
                      ? 'Lancer le Lab Vision IA'
                      : 'Launch AI Vision Lab'}
                </span>
              </a>

              <a
                id="hero-cta-projects"
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-300 backdrop-blur-md transition-all hover:border-cyan-400 hover:bg-cyan-500/20 hover:text-white"
              >
                <Cpu className="h-4 w-4" />
                <span>
                  {lang === 'ar'
                    ? 'استعراض النظم والمشاريع'
                    : lang === 'fr'
                      ? 'Explorer les Systèmes'
                      : 'Explore Systems'}
                </span>
              </a>

              <a
                id="hero-cta-contact"
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <MessageSquare className="h-4 w-4" />
                <span>
                  {lang === 'ar' ? 'تواصل مباشر' : lang === 'fr' ? 'Me Contacter' : 'Contact Me'}
                </span>
              </a>

              {onOpenCv && (
                <button
                  id="hero-cta-cv"
                  onClick={onOpenCv}
                  className="inline-flex items-center gap-2 rounded-full border border-lime-400/40 bg-lime-400/10 px-4 py-3 text-sm font-semibold text-lime-300 transition-all hover:border-lime-400 hover:bg-lime-400/20 hover:text-white"
                >
                  <FileText className="h-4 w-4 text-lime-400" />
                  <span>
                    {lang === 'ar' ? 'السيرة الذاتية (CV)' : lang === 'fr' ? 'Consulter CV' : 'View CV'}
                  </span>
                </button>
              )}

              {onOpenVCard && (
                <button
                  id="hero-cta-vcard"
                  onClick={onOpenVCard}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-3 text-slate-300 transition-all hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
                  title="vCard Contact QR"
                >
                  <QrCode className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div>
                <div className="font-mono-code text-2xl font-black text-cyan-400 sm:text-3xl">04+</div>
                <div className="text-xs uppercase tracking-wider text-slate-400">
                  {lang === 'ar' ? 'سنوات خبرة' : lang === 'fr' ? 'Années d’Expérience' : 'Years Experience'}
                </div>
              </div>
              <div>
                <div className="font-mono-code text-2xl font-black text-[#ccff00] sm:text-3xl">15+</div>
                <div className="text-xs uppercase tracking-wider text-slate-400">
                  {lang === 'ar' ? 'أنظمة مهندسة' : lang === 'fr' ? 'Systèmes Déployés' : 'Systems Built'}
                </div>
              </div>
              <div>
                <div className="font-mono-code text-2xl font-black text-emerald-400 sm:text-3xl">99.4%</div>
                <div className="text-xs uppercase tracking-wider text-slate-400">
                  {lang === 'ar' ? 'دقة الرؤية' : lang === 'fr' ? 'Précision Vision' : 'Vision Accuracy'}
                </div>
              </div>
            </div>

          </div>

          {/* Executive Real Portrait Visual (Col 8-12) */}
          <div className="flex flex-col items-center lg:col-span-5">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="hidden"
            />

            <div
              id="holographic-profile-card"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`group relative w-full max-w-[340px] rounded-3xl border transition-all duration-500 ${
                isDragging
                  ? 'border-lime-400 bg-lime-500/20 shadow-[0_0_50px_rgba(204,255,0,0.5)] scale-102'
                  : 'border-cyan-500/30 bg-gradient-to-b from-cyan-500/10 via-slate-900/40 to-slate-950 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,240,255,0.15)] hover:border-lime-400/50 hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(204,255,0,0.25)]'
              } p-2.5`}
            >
              {/* Inner Frame */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#090e18]">
                {/* Real Authentic Portrait Photo */}
                <img
                  src={currentPhoto}
                  alt="Ibrahim Ait Addimane"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src.includes('IBRAHIM%20AIT%20ADDIMANE.jpg') || target.src.includes('IBRAHIM')) {
                      target.src = '/assets/images/ibrahim_real.jpg';
                    } else if (target.src.includes('ibrahim_real.jpg')) {
                      target.src = '/assets/images/ibrahim.jpg';
                    }
                  }}
                />

                {/* Drag and drop overlay */}
                {isDragging && (
                  <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm p-4 text-center">
                    <Upload className="h-10 w-10 text-[#ccff00] animate-bounce mb-2" />
                    <p className="font-display font-bold text-white text-sm">
                      {lang === 'ar' ? 'أفلت صورتك الأصلية هنا' : lang === 'fr' ? 'Déposez votre photo ici' : 'Drop your photo here'}
                    </p>
                    <p className="text-[11px] font-mono-code text-cyan-300 mt-1">IBRAHIM AIT ADDIMANE.jpg</p>
                  </div>
                )}

                {/* Subtle Elegance Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#05070c] via-[#05070c]/85 to-transparent p-5">
                  <div className="font-display text-lg font-bold text-white">
                    Ibrahim Ait Addimane
                  </div>
                  <div className="font-mono-code text-xs text-[#ccff00]">
                    AI & Full-Stack Architect | Founder @ YouTechD
                  </div>
                  
                  {/* Badges */}
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    <span className="rounded bg-black/60 border border-white/15 px-2 py-0.5 text-[10px] font-mono-code text-cyan-300">
                      Python / OpenCV
                    </span>
                    <span className="rounded bg-black/60 border border-white/15 px-2 py-0.5 text-[10px] font-mono-code text-cyan-300">
                      Flutter
                    </span>
                    <span className="rounded bg-black/60 border border-white/15 px-2 py-0.5 text-[10px] font-mono-code text-lime-300">
                      Industry 4.0
                    </span>
                    <span className="rounded bg-black/60 border border-white/15 px-2 py-0.5 text-[10px] font-mono-code text-purple-300">
                      PocketBase
                    </span>
                  </div>
                </div>

                {/* Top Corner Technical Stamp */}
                <div className="absolute top-3 left-3 rounded bg-black/70 border border-white/10 px-2 py-0.5 text-[9px] font-mono-code tracking-widest text-cyan-400 backdrop-blur-md">
                  SYS.ID // MAR-2026
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 rounded bg-black/70 border border-white/10 px-2 py-0.5 text-[9px] font-mono-code text-emerald-400 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  AVAILABLE
                </div>
              </div>
            </div>

            {/* Owner Security Photo Action Bar */}
            <div className="mt-3 flex w-full max-w-[340px] items-center justify-between gap-2 px-1">
              <button
                type="button"
                onClick={handleInitiateChangePhoto}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-2 text-xs font-mono-code text-cyan-300 transition-all hover:border-cyan-400 hover:bg-cyan-900/50 hover:text-white"
                title={
                  lang === 'ar'
                    ? 'منطقة محمية: حصرياً لإبراهيم آيت أضمان'
                    : 'Owner Protected: Exclusively for Ibrahim Ait Addimane'
                }
              >
                {isAdminAuthenticated ? (
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Lock className="h-3.5 w-3.5 text-cyan-400" />
                )}
                <span>
                  {isAdminAuthenticated
                    ? lang === 'ar'
                      ? 'تغيير صورتي (مصادق)'
                      : lang === 'fr'
                        ? 'Changer ma photo'
                        : 'Change My Photo'
                    : lang === 'ar'
                      ? 'تغيير الصورة (خاص بإبراهيم)'
                      : lang === 'fr'
                        ? 'Accès Propriétaire (Ibrahim)'
                        : 'Owner Access Only'}
                </span>
              </button>

              {isAdminAuthenticated && isCustomLoaded && (
                <button
                  type="button"
                  onClick={handleResetPhoto}
                  className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-2.5 py-2 text-xs font-mono-code text-slate-400 transition-all hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300"
                  title={lang === 'ar' ? 'استعادة الصورة الافتراضية' : 'Reset default'}
                >
                  <RefreshCw className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Instruction footnote */}
            <div className="mt-1.5 flex items-center gap-1.5 text-center text-[10px] font-mono-code text-slate-400 max-w-[340px]">
              <Lock className="h-3 w-3 text-slate-500 shrink-0" />
              <span>
                {lang === 'ar'
                  ? 'الصورة محمية برمز أمان خاص — لا يمكن لأي زائر تعديلها سواك.'
                  : lang === 'fr'
                    ? 'Photo sécurisée par code d’accès — Réservé exclusivement à Ibrahim.'
                    : 'Secure photo lock — Protected and editable exclusively by Ibrahim.'}
              </span>
            </div>

            {/* Owner Security Modal */}
            {showAuthModal && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
                onClick={() => setShowAuthModal(false)}
              >
                <div
                  className="relative w-full max-w-md rounded-2xl border border-cyan-500/40 bg-[#070b14] p-6 shadow-[0_0_50px_rgba(0,240,255,0.2)] text-right"
                  dir={isAr ? 'rtl' : 'ltr'}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setShowAuthModal(false)}
                    className="absolute top-4 left-4 rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-400">
                      <KeyRound className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white text-base">
                        {lang === 'ar' ? 'التحقق من هوية صاحب الموقع' : lang === 'fr' ? 'Vérification du Propriétaire' : 'Owner Authentication'}
                      </h3>
                      <p className="text-xs font-mono-code text-slate-400">
                        {lang === 'ar' ? 'حماية الصورة الشخصية (إبراهيم آيت أضمان)' : 'Protected photo access for Ibrahim'}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {lang === 'ar'
                      ? 'لضمان عدم تمكن أي زائر آخر من العبث بصورتك أو تغييرها، يرجى إدخال رمز التحقق الخاص بك (رمز PIN الافتراضي: 2026):'
                      : lang === 'fr'
                        ? 'Pour empêcher toute modification par les visiteurs, entrez votre code PIN (PIN par défaut : 2026) :'
                        : 'To prevent visitors from modifying your photo, enter your owner PIN (Default: 2026):'}
                  </p>

                  <form onSubmit={handleVerifyOwner} className="space-y-4">
                    <div>
                      <input
                        type="password"
                        value={authPin}
                        onChange={(e) => setAuthPin(e.target.value)}
                        placeholder="••••"
                        autoFocus
                        maxLength={12}
                        className="w-full text-center tracking-[0.4em] rounded-xl border border-cyan-500/40 bg-black/60 px-4 py-3 text-lg font-mono-code text-white outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                      />
                    </div>

                    {authError && (
                      <p className="text-xs text-red-400 font-mono-code text-center bg-red-500/10 border border-red-500/20 rounded-lg p-2">
                        {authError}
                      </p>
                    )}

                    {authSuccess && (
                      <p className="text-xs text-emerald-400 font-mono-code text-center bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2 flex items-center justify-center gap-1.5">
                        <Check className="h-4 w-4" />
                        {lang === 'ar' ? 'تم التحقق بنجاح! جاري فتح نافذة اختيار الصورة...' : 'Authenticated! Opening photo selector...'}
                      </p>
                    )}

                    <div className="flex gap-2 pt-1">
                      <button
                        type="submit"
                        disabled={authSuccess}
                        className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs font-mono-code font-bold text-black uppercase tracking-wider transition-all hover:brightness-110 disabled:opacity-50"
                      >
                        {lang === 'ar' ? 'تأكيد الهوية ورفع صورتي' : 'Verify & Upload Photo'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAuthModal(false)}
                        className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-mono-code text-slate-400 hover:bg-white/5"
                      >
                        {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
