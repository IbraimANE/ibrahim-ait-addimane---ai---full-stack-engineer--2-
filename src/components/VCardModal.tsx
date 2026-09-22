import React, { useState } from 'react';
import { X, QrCode, Download, Phone, Mail, MapPin, Globe, Check, Smartphone, UserCheck } from 'lucide-react';
import { Language } from '../types';

interface VCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export default function VCardModal({ isOpen, onClose, lang }: VCardModalProps) {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const downloadVcf = () => {
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN;CHARSET=UTF-8:Ibrahim Ait Addimane',
      'N;CHARSET=UTF-8:Ait Addimane;Ibrahim;;;',
      'TITLE;CHARSET=UTF-8:Full-Stack & AI Vision Industrial Engineer',
      'ORG;CHARSET=UTF-8:YouTechD Technologies',
      'TEL;TYPE=CELL,VOICE:+212664478416',
      'EMAIL;TYPE=PREF,INTERNET:ibrahimaitaddimane@gmail.com',
      'URL:https://youtechd.ma',
      'ADR;TYPE=WORK;CHARSET=UTF-8:;;Casablanca / Berrechid;Casablanca-Settat;;26100;Morocco',
      'NOTE;CHARSET=UTF-8:Industrial Software Development, Flutter, Computer Vision (OpenCV/YOLO), GEISS 5-Axis CNC & Siemens S7 PLC.',
      'END:VCARD',
    ].join('\r\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Ibrahim_Ait_Addimane.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  // QR Code URL encoding the VCARD data directly
  const vCardContentForQR = encodeURIComponent(
    'BEGIN:VCARD\nVERSION:3.0\nN:Ait Addimane;Ibrahim\nFN:Ibrahim Ait Addimane\nORG:YouTechD Technologies\nTITLE:AI Vision & Industrial Software Engineer\nTEL;TYPE=CELL:+212664478416\nEMAIL:ibrahimaitaddimane@gmail.com\nADR:;;Casablanca;Morocco\nEND:VCARD'
  );

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${vCardContentForQR}&bgcolor=060a12&color=00f0ff&margin=1`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl border border-cyan-500/40 bg-[#070b14] p-6 text-slate-100 shadow-[0_0_60px_rgba(0,240,255,0.25)] text-center"
        dir={isAr ? 'rtl' : 'ltr'}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/40 bg-cyan-400/10 text-cyan-400 mb-3 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
            <QrCode className="h-6 w-6" />
          </div>

          <h3 className="font-display font-bold text-white text-lg">
            {lang === 'ar' ? 'بطاقة الاتصال الرقمية (vCard)' : 'Digital Contact Card'}
          </h3>
          <p className="text-xs font-mono-code text-slate-400 mt-1">
            {lang === 'ar'
              ? 'امسح الرمز بكاميرا هاتفك لحفظ جهة الاتصال فوراً'
              : 'Scan with your smartphone camera to save contact instantly'}
          </p>
        </div>

        {/* QR Code Container */}
        <div className="my-5 flex flex-col items-center justify-center">
          <div className="relative rounded-2xl border-2 border-cyan-500/40 bg-[#060a12] p-3.5 shadow-[0_0_30px_rgba(0,240,255,0.15)]">
            <img
              src={qrImageUrl}
              alt="Ibrahim Ait Addimane vCard QR Code"
              className="h-48 w-48 rounded-xl object-contain"
              onError={(e) => {
                // Fallback if offline
                (e.target as HTMLImageElement).src =
                  'https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=https://wa.me/212664478416';
              }}
            />
            {/* Center badge */}
            <div className="absolute inset-0 m-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#070b14] border-2 border-cyan-400 shadow-[0_0_15px_#00f0ff]">
              <span className="font-display font-black text-xs text-cyan-300">IA</span>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono-code text-lime-400">
            <Smartphone className="h-3 w-3 animate-pulse" />
            <span>{lang === 'ar' ? 'متوافق مع iPhone و Android' : 'Compatible with iOS & Android'}</span>
          </div>
        </div>

        {/* Quick Contact Summary */}
        <div className="space-y-1.5 rounded-2xl border border-white/10 bg-white/[0.02] p-3.5 text-xs font-mono-code text-slate-300 mb-5">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">{lang === 'ar' ? 'الاسم:' : 'Name:'}</span>
            <span className="font-bold text-white">Ibrahim Ait Addimane</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">{lang === 'ar' ? 'الهاتف:' : 'Phone:'}</span>
            <a href="tel:+212664478416" className="text-cyan-400 font-bold hover:underline">
              +212 664-478-416
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">{lang === 'ar' ? 'البريد:' : 'Email:'}</span>
            <a href="mailto:ibrahimaitaddimane@gmail.com" className="text-cyan-400 hover:underline">
              ibrahimaitaddimane@gmail.com
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">{lang === 'ar' ? 'المدينة:' : 'City:'}</span>
            <span>Casablanca / Berrechid</span>
          </div>
        </div>

        {/* 1-Click Download Button */}
        <button
          type="button"
          onClick={downloadVcf}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-lime-400 py-3 text-xs font-mono-code font-black text-black shadow-[0_0_25px_rgba(0,240,255,0.3)] transition-all hover:scale-102 hover:brightness-110"
        >
          {downloaded ? (
            <>
              <Check className="h-4 w-4" />
              <span>{lang === 'ar' ? 'تم تنزيل ملف vCard بنجاح!' : 'vCard File Downloaded!'}</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              <span>{lang === 'ar' ? 'تحميل بطاقة جهة الاتصال (.vcf)' : 'Download Contact File (.vcf)'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
