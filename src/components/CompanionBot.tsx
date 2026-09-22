import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, MessageSquareCode, X, Eye, Zap, ArrowDownRight } from 'lucide-react';
import { Language } from '../types';

interface CompanionBotProps {
  lang: Language;
}

export default function CompanionBot({ lang }: CompanionBotProps) {
  // Desktop follower coordinates
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 80, y: 150 });
  const [targetPos, setTargetPos] = useState<{ x: number; y: number }>({ x: 80, y: 150 });
  const [isHovered, setIsHovered] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const [eyeOffset, setEyeOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [reactionMsg, setReactionMsg] = useState<string | null>(null);

  const lastMouseMoveTime = useRef<number>(Date.now());
  const requestRef = useRef<number | null>(null);

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Listen for mouse movements on desktop
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      lastMouseMoveTime.current = Date.now();
      if (isSleeping) setIsSleeping(false);

      // We want the bot to trail behind the cursor smoothly with an offset
      const offsetX = e.clientX > window.innerWidth - 220 ? -120 : 45;
      const offsetY = e.clientY > window.innerHeight - 150 ? -80 : 35;

      setTargetPos({
        x: Math.max(30, Math.min(window.innerWidth - 100, e.clientX + offsetX)),
        y: Math.max(80, Math.min(window.innerHeight - 100, e.clientY + offsetY)),
      });

      // Calculate eyeball tracking angle
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 0) {
        setEyeOffset({
          x: (dx / dist) * 4,
          y: (dy / dist) * 4,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Idle sleep check
    const sleepInterval = setInterval(() => {
      if (Date.now() - lastMouseMoveTime.current > 7000 && !isSleeping) {
        setIsSleeping(true);
      }
    }, 2000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(sleepInterval);
    };
  }, [isMobile, isSleeping, pos.x, pos.y]);

  // Smooth lerp movement animation
  useEffect(() => {
    if (isMobile) return;

    const animate = () => {
      setPos((prev) => {
        const lerpFactor = 0.08; // smooth trailing
        const nextX = prev.x + (targetPos.x - prev.x) * lerpFactor;
        const nextY = prev.y + (targetPos.y - prev.y) * lerpFactor;
        return { x: nextX, y: nextY };
      });
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [targetPos, isMobile]);

  // Auto show speech bubble periodically or on section hover
  useEffect(() => {
    const timer = setTimeout(() => {
      setBubbleVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const getPrimaryMessage = () => {
    if (reactionMsg) return reactionMsg;
    if (lang === 'ar') {
      return 'هل لديك فكرة أو حلم؟ سنحوّله إلى كود! 🚀';
    }
    if (lang === 'fr') {
      return 'Vous avez une idée ou un rêve ? On le transforme en code ! ⚡';
    }
    return 'Have an idea or a dream? Let us turn it into code! 💻';
  };

  const handleBotClick = () => {
    // Navigate smoothly to contact section
    const contactSec = document.getElementById('contact');
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth' });
    }

    // Friendly speech trigger
    const trigger =
      lang === 'ar'
        ? 'أنا مستعد! لنتحدث الآن ✨'
        : lang === 'fr'
          ? 'Je suis prêt ! Parlons-en ✨'
          : "I'm ready! Let's talk ✨";
    setReactionMsg(trigger);
    setBubbleVisible(true);
    setTimeout(() => setReactionMsg(null), 4000);
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full border border-cyan-400/40 bg-[#070d1a]/90 px-3.5 py-2 text-xs font-mono-code text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] backdrop-blur-md transition-transform hover:scale-105"
        title="Réactiver le robot compagnon"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
        </span>
        <span>AI Bot 🤖</span>
      </button>
    );
  }

  return (
    <div
      style={
        isMobile
          ? { bottom: '24px', left: '16px' }
          : {
              transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
              transition: 'transform 0.05s linear',
            }
      }
      className={`fixed z-40 select-none ${
        isMobile ? 'bottom-5 left-5' : 'top-0 left-0 pointer-events-none'
      }`}
    >
      <div className="relative flex flex-col items-center">

        {/* Speech Bubble */}
        {bubbleVisible && (
          <div
            onClick={handleBotClick}
            className={`pointer-events-auto mb-2 cursor-pointer transition-all duration-300 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          >
            <div className="relative max-w-[220px] sm:max-w-[260px] rounded-2xl border border-cyan-400/50 bg-[#080e1d]/95 p-3 text-xs shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(0,240,255,0.25)] backdrop-blur-md">
              {/* Close mini bubble */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setBubbleVisible(false);
                }}
                className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-slate-900 text-[10px] text-slate-400 hover:text-white"
                title="Masquer le message"
              >
                <X className="h-3 w-3" />
              </button>

              <div className="flex items-start gap-2">
                <span className="text-base shrink-0">💡</span>
                <p className="font-sans font-medium text-white leading-snug">
                  {getPrimaryMessage()}
                </p>
              </div>

              {/* Call to action arrow */}
              <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-1.5 text-[10px] font-mono-code text-cyan-300">
                <span className="flex items-center gap-1 font-bold text-[#ccff00]">
                  <Zap className="h-3 w-3" />
                  {lang === 'ar' ? 'ابدأ مشروعك' : lang === 'fr' ? 'Démarrer un projet' : 'Start project'}
                </span>
                <span className="text-slate-400 hover:text-white">
                  {lang === 'ar' ? 'اضغط هنا ←' : 'Cliquez ici →'}
                </span>
              </div>

              {/* Speech bubble pointer triangle */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-cyan-400/50" />
            </div>
          </div>
        )}

        {/* Robot Body / Drone Structure */}
        <div
          onClick={handleBotClick}
          onMouseEnter={() => {
            setIsHovered(true);
            setBubbleVisible(true);
          }}
          onMouseLeave={() => setIsHovered(false)}
          className="pointer-events-auto group relative cursor-pointer"
        >
          {/* Futuristic Hover Drone */}
          <div className="relative flex h-14 w-14 items-center justify-center">

            {/* Glowing Ring Thruster / Halo */}
            <div
              className={`absolute inset-0 rounded-full border border-cyan-400/40 bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-transparent blur-xs transition-all duration-500 ${
                isHovered
                  ? 'scale-125 border-cyan-300 bg-cyan-400/30'
                  : 'animate-pulse'
              }`}
            />

            {/* Mini Orbiting Thrusters / Satellites */}
            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full border border-lime-400/60 bg-[#ccff00] shadow-[0_0_8px_#ccff00] animate-bounce" />
            <div className="absolute -bottom-1 -left-1 h-2.5 w-2.5 rounded-full border border-cyan-400/60 bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />

            {/* Main Cyber Bot Head Sphere */}
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-cyan-400 bg-gradient-to-b from-[#0e172a] to-[#050914] shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-transform duration-300 group-hover:scale-110">
              
              {/* Antenna */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-lime-400 shadow-[0_0_6px_#ccff00]" />
                <div className="h-1.5 w-0.5 bg-cyan-400/70" />
              </div>

              {/* Visor / Eye Display */}
              <div className="relative flex h-6 w-9 items-center justify-center rounded-lg border border-cyan-500/40 bg-black/80 px-1 shadow-inner">
                {isSleeping ? (
                  // Closed sleeping line
                  <div className="h-0.5 w-5 rounded bg-cyan-400/50" />
                ) : (
                  // Animated Cyber Eyes
                  <div className="flex items-center gap-1.5">
                    {/* Left Eye */}
                    <div
                      style={{
                        transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                        transition: 'transform 0.1s ease-out',
                      }}
                      className="flex h-3 w-3 items-center justify-center rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]"
                    >
                      <div className="h-1 w-1 rounded-full bg-white" />
                    </div>

                    {/* Right Eye */}
                    <div
                      style={{
                        transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                        transition: 'transform 0.1s ease-out',
                      }}
                      className="flex h-3 w-3 items-center justify-center rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]"
                    >
                      <div className="h-1 w-1 rounded-full bg-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Subtle smile/status led */}
              <div className="absolute bottom-1.5 flex gap-1">
                <span className="h-1 w-1 rounded-full bg-lime-400 opacity-80" />
                <span className="h-1 w-1 rounded-full bg-cyan-400 opacity-80" />
              </div>
            </div>

            {/* Jet propulsion particles below */}
            <div className="absolute -bottom-2 flex gap-1">
              <span className="h-2 w-1 rounded-full bg-cyan-400/60 blur-[1px] animate-pulse" />
              <span className="h-3 w-1 rounded-full bg-lime-400/80 blur-[1px] animate-ping" />
              <span className="h-2 w-1 rounded-full bg-cyan-400/60 blur-[1px] animate-pulse" />
            </div>

          </div>

          {/* Quick minimize control on hover */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(true);
              }}
              className="rounded-full border border-white/10 bg-slate-900/90 px-2 py-0.5 text-[9px] font-mono-code text-slate-400 hover:text-white"
            >
              {lang === 'ar' ? 'إخفاء' : 'Minimiser'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
