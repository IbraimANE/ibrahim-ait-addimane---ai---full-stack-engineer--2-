import React, { useEffect, useState } from 'react';
import { ArrowUp, Clock, Heart } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const isAr = lang === 'ar';
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Casablanca',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTimeStr(now.toLocaleTimeString('en-GB', options) + ' GMT+1 (Casablanca)');
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#03060c] py-10 text-xs text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
        
        {/* Left branding */}
        <div className="text-center sm:text-left">
          <div className="font-display text-sm font-black text-white">
            IBRAHIM AIT ADDIMANE
          </div>
          <p className="mt-1 text-slate-500">
            © {new Date().getFullYear()} Ibrahim Ait Addimane • Powered by YouTechD Technologies.
          </p>
        </div>

        {/* Center Clock */}
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono-code text-cyan-300">
          <Clock className="h-3 w-3 text-cyan-400" />
          <span>{timeStr}</span>
        </div>

        {/* Right Scroll to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 transition-colors hover:border-cyan-400 hover:text-cyan-300"
          title="Back to top"
        >
          <span>{lang === 'ar' ? 'إلى الأعلى' : lang === 'fr' ? 'Haut de page' : 'Back to Top'}</span>
          <ArrowUp className="h-3.5 w-3.5" />
        </button>

      </div>
    </footer>
  );
}
