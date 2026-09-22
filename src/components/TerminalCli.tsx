import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Sparkles, Trash2 } from 'lucide-react';
import { Language } from '../types';

interface TerminalCliProps {
  lang: Language;
}

interface CommandLog {
  id: string;
  command: string;
  response: React.ReactNode;
}

export default function TerminalCli({ lang }: TerminalCliProps) {
  const isAr = lang === 'ar';
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: 'init-1',
      command: 'sys.welcome',
      response: (
        <div className="text-slate-300">
          <span className="text-[#ccff00] font-bold">
            Welcome to Ibrahim Ait Addimane's Interactive System Shell v5.2.
          </span>
          <br />
          Type <span className="text-cyan-400 font-bold">'help'</span> for available commands, or try{' '}
          <span className="text-cyan-400 font-bold">'skills'</span>,{' '}
          <span className="text-cyan-400 font-bold">'projects'</span>, or{' '}
          <span className="text-cyan-400 font-bold">'contact'</span>.
        </div>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (cmdText: string) => {
    const clean = cmdText.trim().toLowerCase();
    if (!clean) return;

    if (clean === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let resContent: React.ReactNode = null;

    switch (clean) {
      case 'help':
        resContent = (
          <div className="space-y-1 text-slate-300">
            <div className="text-[#ccff00] font-bold">Available System Commands:</div>
            <div>
              <span className="text-cyan-400 font-bold">skills</span> - Core engineering, vision AI & frameworks
            </div>
            <div>
              <span className="text-cyan-400 font-bold">certifications</span> - Verified IBM SkillsBuild, Coursera & EF SET credentials
            </div>
            <div>
              <span className="text-cyan-400 font-bold">projects</span> - Production software & industrial architectures
            </div>
            <div>
              <span className="text-cyan-400 font-bold">contact</span> - Direct phone, email, WhatsApp, and location
            </div>
            <div>
              <span className="text-cyan-400 font-bold">about</span> - Background, SOPLAMI industrial roots & YouTechD
            </div>
            <div>
              <span className="text-cyan-400 font-bold">vision</span> - Current AI metrology inspection parameters
            </div>
            <div>
              <span className="text-cyan-400 font-bold">hire</span> - Instant project communication channel
            </div>
            <div>
              <span className="text-cyan-400 font-bold">date</span> - Real-time Casablanca GMT+1 system timestamp
            </div>
            <div>
              <span className="text-cyan-400 font-bold">clear</span> - Wipe terminal viewport
            </div>
          </div>
        );
        break;

      case 'certifications':
      case 'certs':
        resContent = (
          <div className="space-y-1.5 text-slate-300">
            <div className="text-[#ccff00] font-bold">=== OFFICIAL ACCREDITATIONS & BADGES (10) ===</div>
            <div>• <span className="text-cyan-400 font-semibold">IBM Watson Studio</span> - Exécution de modèles d'IA (Avr. 2025)</div>
            <div>• <span className="text-cyan-400 font-semibold">IBM Cybersecurity</span> - Cybersecurity Fundamentals (Avr. 2025)</div>
            <div>• <span className="text-cyan-400 font-semibold">IBM SkillsBuild</span> - Introduction à la cybersécurité & Triade CIA (Avr. 2025)</div>
            <div>• <span className="text-cyan-400 font-semibold">IBM LinuxONE</span> - Administration Systèmes & Architecture Mainframe (Avr. 2025)</div>
            <div>• <span className="text-cyan-400 font-semibold">IBM SkillsBuild</span> - ML & Deep Learning (Réseaux de neurones, Perceptron) (Avr. 2025)</div>
            <div>• <span className="text-cyan-400 font-semibold">IBM SkillsBuild</span> - NLP & Computer Vision (Traitement visuel & Agents) (Mars 2025)</div>
            <div>• <span className="text-cyan-400 font-semibold">IBM SkillsBuild</span> - Introduction à l'intelligence artificielle (Mars 2025)</div>
            <div>• <span className="text-cyan-400 font-semibold">IBM SkillsBuild</span> - Développement de sites pour le Web & Agile (Mars 2025)</div>
            <div>• <span className="text-blue-400 font-semibold">Coursera</span> - Build a free website with WordPress (Déc. 2024)</div>
            <div>• <span className="text-purple-400 font-semibold">EF SET</span> - English Certificate 54/100 (B2 Upper Intermediate) (Août 2024)</div>
            <div className="text-xs text-slate-400 pt-1">All certificates verified with official PDF credentials available on request.</div>
          </div>
        );
        break;

      case 'skills':
        resContent = (
          <div className="space-y-1 text-slate-300">
            <div className="text-[#ccff00] font-bold">=== CORE ARSENAL ===</div>
            <div>• <span className="text-cyan-400">AI & Vision:</span> OpenCV (Python/C++), YOLOv8, Ollama LLMs, Whisper Turbo, UI-TARS</div>
            <div>• <span className="text-cyan-400">Mobile & Web:</span> Flutter & Dart (Cross-Platform), TypeScript, Tailwind CSS</div>
            <div>• <span className="text-cyan-400">Backend & Cloud:</span> Python (FastAPI/Flask), PocketBase, MySQL, SQLite, n8n</div>
            <div>• <span className="text-cyan-400">Industry & DevOps:</span> CNC Machining, Thermoforming, Docker, LinuxONE, Git CI/CD</div>
          </div>
        );
        break;

      case 'projects':
        resContent = (
          <div className="space-y-1 text-slate-300">
            <div className="text-[#ccff00] font-bold">=== ACTIVE PRODUCTION DEPLOYMENTS ===</div>
            <div>1. <span className="text-cyan-400">YouTechD Core & Vision AI</span> (OpenCV + Python edge defect inspection)</div>
            <div>2. <span className="text-cyan-400">Superviseur IA (SmartProd)</span> (Real-time shop-floor cameras & sensors oversight)</div>
            <div>3. <span className="text-cyan-400">Deroua Service Platform</span> (Flutter + PocketBase multi-service local marketplace)</div>
            <div>4. <span className="text-cyan-400">DevOrbit & Taskoff Automation</span> (DevOps, ESLint pipelines, n8n workflows)</div>
          </div>
        );
        break;

      case 'contact':
        resContent = (
          <div className="space-y-1 text-slate-300">
            <div className="text-[#ccff00] font-bold">=== DIRECT REACH CHANNELS ===</div>
            <div>• Phone: <a href="tel:+212664478416" className="text-cyan-400 hover:underline">+212 664-478-416</a></div>
            <div>• WhatsApp: <a href="https://wa.me/212664478416" target="_blank" rel="noreferrer" className="text-lime-400 hover:underline">+212 664-478-416</a></div>
            <div>• Email: <a href="mailto:ibrahimaitaddimane@gmail.com" className="text-cyan-400 hover:underline">ibrahimaitaddimane@gmail.com</a></div>
            <div>• Base: Deroua / Berrechid / Casablanca-Settat, Morocco</div>
            <div>• LinkedIn: <a href="https://www.linkedin.com/in/ibrahim-ait-addimane-009776232/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">linkedin.com/in/ibrahim-ait-addimane</a></div>
          </div>
        );
        break;

      case 'about':
        resContent = (
          <div className="text-slate-300 leading-relaxed">
            Ibrahim Ait Addimane is a specialized Software & AI Engineer who merges direct hands-on industrial mechanical experience (machining & thermoforming at SOPLAMI) with modern computer vision algorithms (OpenCV/YOLO) and multi-platform mobile architectures (Flutter). Founder of YouTechD.
          </div>
        );
        break;

      case 'vision':
        resContent = (
          <div className="text-slate-300 space-y-1">
            <div className="text-[#ccff00] font-bold">=== VISION ENGINE TELEMETRY ===</div>
            <div>• Inspection FPS: 60 FPS Continuous</div>
            <div>• Latency: ~12.4 ms per frame</div>
            <div>• Tolerance Threshold: ±0.02 mm</div>
            <div>• Core Model: YOLOv8-Inspection-Quantized</div>
          </div>
        );
        break;

      case 'hire':
        resContent = (
          <div className="text-emerald-400">
            Initiating priority communication channel... Click{' '}
            <a href="https://wa.me/212664478416" target="_blank" rel="noreferrer" className="font-bold underline text-[#ccff00]">
              here to message Ibrahim directly on WhatsApp (+212 664-478-416)
            </a>{' '}
            or write to ibrahimaitaddimane@gmail.com!
          </div>
        );
        break;

      case 'date':
        resContent = (
          <div className="text-cyan-400 font-mono-code">
            {new Date().toUTCString()} (Casablanca GMT+1)
          </div>
        );
        break;

      case 'whoami':
        resContent = (
          <div className="text-slate-300">
            guest@youtechd-edge-node [Authorized for Public Telemetry]
          </div>
        );
        break;

      default:
        resContent = (
          <div className="text-rose-400">
            Command not recognized: '{clean}'. Type <span className="text-cyan-300 font-bold">'help'</span> to see available commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: cmdText,
        response: resContent,
      },
    ]);
    setInputVal('');
  };

  return (
    <section id="terminal" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono-code text-cyan-400">
            <Terminal className="h-3.5 w-3.5" />
            <span>// INTERACTIVE SHELL</span>
          </div>
          <h2 className="font-display mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
            {lang === 'ar'
              ? 'موجه الأوامر التفاعلي'
              : lang === 'fr'
                ? 'Terminal Interactif (CLI)'
                : 'Command Line Interface'}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
            {lang === 'ar'
              ? 'للمهندسين والمطورين: استكشف كفاءات ومشاريع إبراهيم مباشرة عبر أوامر الطرفية الذكية.'
              : lang === 'fr'
                ? 'Pour les recruteurs et ingénieurs : interrogez directement le système d’Ibrahim via ce terminal Unix émulé.'
                : 'For developers & technical leads: query Ibrahim’s core systems directly through the simulated Unix shell below.'}
          </p>
        </div>

        {/* Terminal Box */}
        <div className="overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#06090e] shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_20px_rgba(0,240,255,0.15)] font-mono-code">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-[#0c121d] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs text-slate-400">ibrahim@core-system: ~ (bash 5.2)</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setHistory([])}
                className="flex items-center gap-1 rounded px-2 py-0.5 text-[11px] text-slate-400 hover:bg-white/5 hover:text-white"
                title="Clear screen"
              >
                <Trash2 className="h-3 w-3" />
                <span className="hidden sm:inline">Clear</span>
              </button>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                LIVE
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="max-h-[360px] min-h-[260px] overflow-y-auto p-5 text-xs sm:text-sm leading-relaxed space-y-3">
            {history.map((item) => (
              <div key={item.id} className="space-y-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-[#ccff00] font-bold">guest@ibrahim-core:~$</span>
                  <span className="text-white font-bold">{item.command}</span>
                </div>
                <div className="pl-4">{item.response}</div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Input Row */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(inputVal);
            }}
            className="flex items-center gap-2 border-t border-white/10 bg-[#080d16] px-4 py-3"
          >
            <span className="text-[#ccff00] font-bold text-xs sm:text-sm">guest@ibrahim-core:~$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type 'help', 'skills', 'projects', 'contact'..."
              className="flex-1 bg-transparent text-xs sm:text-sm text-white outline-none placeholder:text-slate-600 font-mono-code"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              type="submit"
              className="rounded bg-white/5 p-1.5 text-slate-400 hover:bg-cyan-400/20 hover:text-cyan-300"
              title="Execute command"
            >
              <CornerDownLeft className="h-4 w-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
