import React, { useState, useEffect, useRef } from 'react';
import { Play, AlertTriangle, CheckCircle2, Sliders, Cpu, Eye, RefreshCw, Zap, Camera, Upload, Layers, Calculator, TrendingUp, DollarSign, MessageCircle, ArrowRight } from 'lucide-react';
import { Language, InspectionTelemetry } from '../types';

interface AiVisionLabProps {
  lang: Language;
}

export default function AiVisionLab({ lang }: AiVisionLabProps) {
  const isAr = lang === 'ar';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [hasDefect, setHasDefect] = useState(false);
  const [telemetry, setTelemetry] = useState<InspectionTelemetry>({
    status: 'PASS',
    latency: 12.4,
    confidence: 99.4,
    defectsCount: 0,
    batchNumber: 'YTD-2026-X4',
    lastScannedObject: 'IC_PROCESSOR_SOC',
  });

  const [activeTab, setActiveTab] = useState<'simulator' | 'edge-filter' | 'roi'>('simulator');
  const [filterType, setFilterType] = useState<'edges' | 'threshold' | 'grayscale'>('edges');
  const [thresholdVal, setThresholdVal] = useState(128);

  // ROI Calculator Parameters
  const [dailyVolume, setDailyVolume] = useState<number>(5000);
  const [defectRate, setDefectRate] = useState<number>(3.5);
  const [costPerPiece, setCostPerPiece] = useState<number>(75);
  const [manualInspectSeconds, setManualInspectSeconds] = useState<number>(4.5);
  const [currency, setCurrency] = useState<'MAD' | 'EUR' | 'USD'>('MAD');

  const edgeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [sampleLoaded, setSampleLoaded] = useState(false);

  // PCB / Industrial Simulator Canvas Engine
  useEffect(() => {
    if (activeTab !== 'simulator') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 400;
    };
    window.addEventListener('resize', handleResize);

    let scanY = height / 2;
    const scanSpeed = 2.4;
    let scanDirection = 1;
    let animId: number;

    const drawCornerBrackets = (x: number, y: number, w: number, h: number, color: string) => {
      const len = 12;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;

      // Top-left
      ctx.beginPath();
      ctx.moveTo(x, y + len);
      ctx.lineTo(x, y);
      ctx.lineTo(x + len, y);
      ctx.stroke();

      // Top-right
      ctx.beginPath();
      ctx.moveTo(x + w - len, y);
      ctx.lineTo(x + w, y);
      ctx.lineTo(x + w, y + len);
      ctx.stroke();

      // Bottom-left
      ctx.beginPath();
      ctx.moveTo(x, y + h - len);
      ctx.lineTo(x, y + h);
      ctx.lineTo(x + len, y + h);
      ctx.stroke();

      // Bottom-right
      ctx.beginPath();
      ctx.moveTo(x + w - len, y + h);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x + w, y + h - len);
      ctx.stroke();
    };

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Grid Background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 36) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 36) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const cx = width / 2;
      const cy = height / 2;

      // 2. Industrial Metallic Base Plate
      ctx.fillStyle = '#0b1320';
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(cx - 150, cy - 100, 300, 200, 16);
      ctx.fill();
      ctx.stroke();

      // Copper tracks
      ctx.strokeStyle = '#16233a';
      ctx.lineWidth = 3;
      for (let i = -110; i <= 110; i += 38) {
        ctx.beginPath();
        ctx.moveTo(cx + i, cy - 80);
        ctx.lineTo(cx + i, cy + 80);
        ctx.stroke();
      }

      // Microchip Center Package
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(cx - 55, cy - 55, 110, 110, 8);
      ctx.fill();
      ctx.stroke();

      // Golden Connector Pins
      ctx.fillStyle = '#f59e0b';
      for (let i = -45; i <= 45; i += 18) {
        ctx.fillRect(cx + i - 3, cy - 65, 6, 10);
        ctx.fillRect(cx + i - 3, cy + 55, 6, 10);
      }

      // Chip Typography
      ctx.fillStyle = '#64748b';
      ctx.font = '10px JetBrains Mono';
      ctx.textAlign = 'center';
      ctx.fillText('YTD-INSPECTION-CORE', cx, cy - 6);
      ctx.fillText('REV 4.2 // OPENCV', cx, cy + 12);

      // Defect Graphic (Crack simulation)
      if (hasDefect) {
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(cx + 35, cy - 25);
        ctx.lineTo(cx + 48, cy - 10);
        ctx.lineTo(cx + 42, cy + 5);
        ctx.lineTo(cx + 56, cy + 20);
        ctx.stroke();

        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(cx + 45, cy - 2, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Laser Scanner Line
      ctx.strokeStyle = hasDefect ? 'rgba(239, 68, 68, 0.85)' : 'rgba(0, 240, 255, 0.85)';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 16;
      ctx.shadowColor = hasDefect ? '#ef4444' : '#00f0ff';
      ctx.beginPath();
      ctx.moveTo(cx - 170, scanY);
      ctx.lineTo(cx + 170, scanY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Laser Gradient Trail
      const grad = ctx.createLinearGradient(0, scanY - scanDirection * 28, 0, scanY);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(1, hasDefect ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0, 240, 255, 0.15)');
      ctx.fillStyle = grad;
      ctx.fillRect(cx - 170, scanY - scanDirection * 28, 340, 28 * scanDirection);

      scanY += scanSpeed * scanDirection;
      if (scanY > cy + 105) scanDirection = -1;
      if (scanY < cy - 105) scanDirection = 1;

      // 4. AI Overlays & Bounding Boxes
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(cx - 60, cy - 60, 120, 120);
      drawCornerBrackets(cx - 60, cy - 60, 120, 120, '#00f0ff');

      ctx.fillStyle = '#00f0ff';
      ctx.font = '11px JetBrains Mono';
      ctx.textAlign = 'left';
      ctx.fillText('OBJ: IC_PROCESSOR [99.8%]', cx - 60, cy - 68);

      if (hasDefect) {
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.strokeRect(cx + 20, cy - 40, 50, 70);
        drawCornerBrackets(cx + 20, cy - 40, 50, 70, '#ef4444');

        ctx.fillStyle = '#ef4444';
        ctx.fillText('CRACK_DEFECT [97.9%]', cx + 15, cy - 46);
      } else {
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(cx - 145, cy - 95, 290, 190);
        drawCornerBrackets(cx - 145, cy - 95, 290, 190, '#10b981');

        ctx.fillStyle = '#10b981';
        ctx.fillText('INSPECTION: TOLERANCE OK', cx - 145, cy - 102);
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [hasDefect, activeTab]);

  // Update telemetry when defect mode toggles
  const handleToggleDefect = () => {
    const nextDefect = !hasDefect;
    setHasDefect(nextDefect);
    const newLatency = Number((Math.random() * 3 + 10.5).toFixed(1));
    setTelemetry({
      status: nextDefect ? 'REJECT' : 'PASS',
      latency: newLatency,
      confidence: nextDefect ? 97.9 : 99.4,
      defectsCount: nextDefect ? 1 : 0,
      batchNumber: 'YTD-2026-X4',
      lastScannedObject: nextDefect ? 'DEFECT: SURFACE_CRACK' : 'IC_PROCESSOR_SOC',
    });
  };

  const handleTriggerScan = () => {
    const newLatency = Number((Math.random() * 2 + 10.2).toFixed(1));
    setTelemetry((prev) => ({
      ...prev,
      latency: newLatency,
    }));
  };

  // Edge detection / Filter experiment runner
  useEffect(() => {
    if (activeTab !== 'edge-filter') return;
    const canvas = edgeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw an industrial mechanical gear or circuit sample on canvas
    const w = (canvas.width = 460);
    const h = (canvas.height = 300);

    // Create offscreen image
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    // Draw gear shapes
    ctx.save();
    ctx.translate(w / 2, h / 2);

    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.arc(0, 0, 80, 0, Math.PI * 2);
    ctx.fill();

    // Teeth
    for (let i = 0; i < 12; i++) {
      ctx.rotate((Math.PI * 2) / 12);
      ctx.fillRect(-12, -95, 24, 25);
    }

    // Inner hole
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(0, 0, 35, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Apply pixel transformation (Sobel edge / threshold / grayscale)
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    if (filterType === 'grayscale') {
      for (let i = 0; i < data.length; i += 4) {
        const avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
      }
      ctx.putImageData(imgData, 0, 0);
    } else if (filterType === 'threshold') {
      for (let i = 0; i < data.length; i += 4) {
        const avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        const val = avg >= thresholdVal ? 255 : 0;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
      }
      ctx.putImageData(imgData, 0, 0);
    } else if (filterType === 'edges') {
      // Simple Sobel edge filter implementation
      const copy = new Uint8ClampedArray(data);
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const idx = (y * w + x) * 4;
          // horizontal gradient
          const gx =
            -1 * copy[((y - 1) * w + (x - 1)) * 4] +
            1 * copy[((y - 1) * w + (x + 1)) * 4] +
            -2 * copy[(y * w + (x - 1)) * 4] +
            2 * copy[(y * w + (x + 1)) * 4] +
            -1 * copy[((y + 1) * w + (x - 1)) * 4] +
            1 * copy[((y + 1) * w + (x + 1)) * 4];

          // vertical gradient
          const gy =
            -1 * copy[((y - 1) * w + (x - 1)) * 4] -
            2 * copy[((y - 1) * w + x) * 4] -
            1 * copy[((y - 1) * w + (x + 1)) * 4] +
            1 * copy[((y + 1) * w + (x - 1)) * 4] +
            2 * copy[((y + 1) * w + x) * 4] +
            1 * copy[((y + 1) * w + (x + 1)) * 4];

          const mag = Math.min(255, Math.sqrt(gx * gx + gy * gy));
          data[idx] = mag > 40 ? 0 : 5; // Cyber dark
          data[idx + 1] = mag > 40 ? 240 : 15; // Cyan highlight
          data[idx + 2] = mag > 40 ? 255 : 25;
        }
      }
      ctx.putImageData(imgData, 0, 0);
    }
  }, [activeTab, filterType, thresholdVal]);

  return (
    <section id="vision-lab" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono-code text-cyan-400">
            <Zap className="h-3.5 w-3.5" />
            <span>// LIVE COMPUTER VISION DEMO</span>
          </div>
          <h2 className="font-display mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
            {lang === 'ar'
              ? 'مختبر الرؤية الحاسوبية الصناعية'
              : lang === 'fr'
                ? 'Laboratoire de Vision Industrielle par IA'
                : 'Industrial AI Vision Lab'}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            {lang === 'ar'
              ? 'جرّب بنفسك المحاكاة التفاعلية الحية لنظام فحص الجودة البصري، المستوحى من خبرة إبراهيم الميدانية في المصانع وبرمجيات OpenCV وYOLOv8 لكشف العيوب الميكروية في أجزاء من الثانية.'
              : lang === 'fr'
                ? 'Simulation interactive temps réel de contrôle qualité optique inspirée de l’expertise terrain d’Ibrahim (plastiques aéronautiques, GEISS CNC) et des pipelines OpenCV / YOLO pour la détection instantanée de micro-fissures.'
                : 'Interactive real-time simulation of automated optical defect inspection engineered for smart manufacturing, surface crack recognition, and sub-millimeter quality compliance.'}
          </p>

          {/* Mode Switcher */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              id="lab-tab-sim"
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                activeTab === 'simulator'
                  ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Cpu className="h-3.5 w-3.5" />
              <span>
                {lang === 'ar'
                  ? 'محاكي فحص الـ PCB المباشر'
                  : lang === 'fr'
                    ? 'Inspecteur de PCB en Direct'
                    : 'Live PCB Quality Inspector'}
              </span>
            </button>
            <button
              id="lab-tab-filter"
              onClick={() => setActiveTab('edge-filter')}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                activeTab === 'edge-filter'
                  ? 'bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.4)]'
                  : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>
                {lang === 'ar'
                  ? 'مرشح استخراج الحواف (Edge Detection)'
                  : lang === 'fr'
                    ? 'Filtres de Contours OpenCV'
                    : 'OpenCV Filter Playground'}
              </span>
            </button>
            <button
              id="lab-tab-roi"
              onClick={() => setActiveTab('roi')}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                activeTab === 'roi'
                  ? 'bg-gradient-to-r from-cyan-400 to-lime-400 text-black shadow-[0_0_20px_rgba(0,240,255,0.5)]'
                  : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>
                {lang === 'ar'
                  ? 'حاسبة العائد الاستثماري (ROI 4.0)'
                  : lang === 'fr'
                    ? 'Calculateur ROI Industrie 4.0'
                    : 'Industry 4.0 ROI Calculator'}
              </span>
            </button>
          </div>
        </div>

        {/* Tab 1: Live Hardware PCB Inspection Simulator */}
        {activeTab === 'simulator' && (
          <div className="grid overflow-hidden rounded-3xl border border-cyan-500/20 bg-[#070b13] shadow-[0_25px_60px_rgba(0,0,0,0.8)] lg:grid-cols-12">
            
            {/* Viewport Canvas (Col 1-8) */}
            <div className="relative min-h-[380px] bg-[#02050b] p-2 sm:min-h-[440px] lg:col-span-8">
              {/* HUD Header overlay */}
              <div className="pointer-events-none absolute top-4 inset-x-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[11px] font-mono-code text-cyan-300 backdrop-blur-md">
                  <Camera className="h-3 w-3 text-cyan-400" />
                  <span>CAMERA_01 [60 FPS - 4K SENSOR]</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[11px] font-mono-code text-lime-400 backdrop-blur-md">
                  <span>MODEL: YOUTECHD-YOLOv8 + OPENCV</span>
                </div>
              </div>

              {/* The Live Canvas */}
              <canvas ref={canvasRef} className="h-full w-full block cursor-crosshair" />

              {/* Technical Bottom overlay */}
              <div className="pointer-events-none absolute bottom-4 inset-x-4 flex items-center justify-between text-[10px] font-mono-code text-slate-500">
                <span>COORD: X=128.4mm Y=84.2mm</span>
                <span>METROLOGY TOLERANCE: ±0.02mm</span>
              </div>
            </div>

            {/* Telemetry & Control Panel (Col 9-12) */}
            <div className="flex flex-col justify-between border-t border-white/10 bg-[#0a0f1d] p-6 lg:col-span-4 lg:border-t-0 lg:border-l lg:border-white/10">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="font-display flex items-center gap-2 text-base font-bold text-white">
                    <Sliders className="h-4 w-4 text-cyan-400" />
                    <span>
                      {lang === 'ar'
                        ? 'بيانات القياس اللحظية'
                        : lang === 'fr'
                          ? 'Télémétrie Temps Réel'
                          : 'Real-Time Telemetry'}
                    </span>
                  </h3>
                  <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                </div>

                {/* Metrics Table */}
                <div className="mt-4 space-y-3 font-mono-code text-xs">
                  {/* Status */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">
                      {lang === 'ar'
                        ? 'حالة الفحص:'
                        : lang === 'fr'
                          ? 'Statut du Contrôle :'
                          : 'Inspection Status:'}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded px-2 py-0.5 font-bold ${
                        telemetry.status === 'PASS'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      }`}
                    >
                      {telemetry.status === 'PASS' ? (
                        <>
                          <CheckCircle2 className="h-3 w-3" />
                          <span>PASS (CONFORME)</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-3 w-3" />
                          <span>REJECT (DÉFAUT)</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Latency */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">
                      {lang === 'ar'
                        ? 'زمن الاستجابة:'
                        : lang === 'fr'
                          ? 'Latence d’Inférence :'
                          : 'Inference Latency:'}
                    </span>
                    <span className="font-bold text-[#ccff00]">{telemetry.latency} ms</span>
                  </div>

                  {/* Confidence */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">
                      {lang === 'ar'
                        ? 'نسبة اليقين:'
                        : lang === 'fr'
                          ? 'Score de Confiance :'
                          : 'Confidence Score:'}
                    </span>
                    <span className="font-bold text-cyan-300">{telemetry.confidence}%</span>
                  </div>

                  {/* Anomalies */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">
                      {lang === 'ar'
                        ? 'العيوب المكتشفة:'
                        : lang === 'fr'
                          ? 'Anomalies Détectées :'
                          : 'Anomalies Detected:'}
                    </span>
                    <span
                      className={`font-bold ${
                        telemetry.defectsCount > 0 ? 'text-rose-400' : 'text-slate-300'
                      }`}
                    >
                      {telemetry.defectsCount > 0
                        ? lang === 'fr'
                          ? '1 (Micro-fissure)'
                          : '1 (Surface Crack)'
                        : '0 (Clean)'}
                    </span>
                  </div>

                  {/* Production Batch */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">
                      {lang === 'ar'
                        ? 'دفعة الإنتاج:'
                        : lang === 'fr'
                          ? 'Lot de Production :'
                          : 'Batch Serial:'}
                    </span>
                    <span className="text-slate-300">{telemetry.batchNumber}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <button
                  id="sim-toggle-defect-btn"
                  onClick={handleToggleDefect}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition-all ${
                    hasDefect
                      ? 'border-rose-500 bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
                      : 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20'
                  }`}
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span>
                    {hasDefect
                      ? lang === 'ar'
                        ? 'إلغاء وضع العيب (العودة للمطابقة)'
                        : lang === 'fr'
                          ? 'Défaut Actif (Cliquez pour réinitialiser)'
                          : 'Mode: Defect Active (Click to reset)'
                      : lang === 'ar'
                        ? 'محاكاة وجود عيب وشروخ'
                        : lang === 'fr'
                          ? 'Simuler un Défaut / Fissure'
                          : 'Simulate Defect / Crack'}
                  </span>
                </button>

                <button
                  id="sim-trigger-scan-btn"
                  onClick={handleTriggerScan}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ccff00] p-3 text-xs font-black text-black shadow-[0_0_15px_rgba(204,255,0,0.3)] transition-all hover:scale-[1.02] hover:bg-[#d8ff33]"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>
                    {lang === 'ar'
                      ? 'تشغيل دورة مسح ليزر جديدة'
                      : lang === 'fr'
                        ? 'Déclencher un Nouveau Scan Laser'
                        : 'Trigger Live Re-Scan'}
                  </span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: Interactive OpenCV Edge & Filter Playground */}
        {activeTab === 'edge-filter' && (
          <div className="rounded-3xl border border-lime-400/20 bg-[#070b13] p-6 shadow-2xl">
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              
              <div className="flex flex-col items-center justify-center lg:col-span-7">
                <div className="overflow-hidden rounded-2xl border border-white/15 bg-black p-2 shadow-inner">
                  <canvas ref={edgeCanvasRef} className="max-w-full rounded-xl" />
                </div>
                <div className="mt-3 text-xs font-mono-code text-cyan-400">
                  // Client-Side Canvas 2D Sobel Kernel Matrix [3x3 Convolution]
                </div>
              </div>

              <div className="space-y-5 lg:col-span-5">
                <div>
                  <h4 className="font-display text-lg font-bold text-white">
                    {lang === 'ar'
                      ? 'مرشحات الرؤية الحاسوبية المباشرة'
                      : lang === 'fr'
                        ? 'Filtres de Convolution Directs'
                        : 'Direct Convolution Filters'}
                  </h4>
                  <p className="mt-1 text-xs text-slate-400">
                    {lang === 'ar'
                      ? 'اختر خوارزمية معالجة الصور الرقمية لمعاينة كيفية استخلاص معالم الأجسام الميكانيكية بدقة.'
                      : lang === 'fr'
                        ? 'Testez en direct dans le navigateur les convolutions d’image servant à extraire les contours géométriques et tolérances.'
                        : 'Test real-time image kernels directly rendered in the browser to extract object contours and dimensions.'}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilterType('edges')}
                    className={`rounded-xl px-3 py-2 text-xs font-mono-code font-bold transition-all ${
                      filterType === 'edges'
                        ? 'bg-cyan-400 text-black shadow-[0_0_10px_rgba(0,240,255,0.5)]'
                        : 'border border-white/10 bg-white/5 text-slate-300'
                    }`}
                  >
                    Sobel Edge Detection
                  </button>
                  <button
                    onClick={() => setFilterType('threshold')}
                    className={`rounded-xl px-3 py-2 text-xs font-mono-code font-bold transition-all ${
                      filterType === 'threshold'
                        ? 'bg-lime-400 text-black shadow-[0_0_10px_rgba(204,255,0,0.5)]'
                        : 'border border-white/10 bg-white/5 text-slate-300'
                    }`}
                  >
                    Binary Threshold
                  </button>
                  <button
                    onClick={() => setFilterType('grayscale')}
                    className={`rounded-xl px-3 py-2 text-xs font-mono-code font-bold transition-all ${
                      filterType === 'grayscale'
                        ? 'bg-white text-black'
                        : 'border border-white/10 bg-white/5 text-slate-300'
                    }`}
                  >
                    Grayscale Luma
                  </button>
                </div>

                {filterType === 'threshold' && (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex justify-between text-xs font-mono-code text-slate-300">
                      <span>Threshold Cutoff</span>
                      <span className="text-lime-400">{thresholdVal} / 255</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="245"
                      value={thresholdVal}
                      onChange={(e) => setThresholdVal(Number(e.target.value))}
                      className="mt-2 w-full accent-[#ccff00]"
                    />
                  </div>
                )}

                <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3.5 text-xs text-slate-300">
                  <span className="font-bold text-cyan-300">
                    {lang === 'fr' ? 'Application industrielle : ' : 'Why this matters: '}
                  </span>
                  {lang === 'ar'
                    ? 'في خطوط التشكيل والتشغيل الصناعي، تتيح هذه الفلاتر التمييز الفوري بين حدود القطعة السليمة وأي نتوء أو انحراف في الأبعاد.'
                    : lang === 'fr'
                      ? 'Sur les lignes de thermoformage et d’usinage, ces filtres détectent instantanément les bavures ou déviations géométriques de pièces.'
                      : 'In automated tooling lines, contour algorithms allow instantaneous detection of geometric deviation and flash defects.'}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 3: Industry 4.0 ROI Calculator */}
        {activeTab === 'roi' && (() => {
          const monthlyPieces = dailyVolume * 26;
          const currentMonthlyDefects = monthlyPieces * (defectRate / 100);
          const projectedDefectRate = 0.2;
          const projectedMonthlyDefects = monthlyPieces * (projectedDefectRate / 100);
          const defectsSavedMonthly = Math.max(0, currentMonthlyDefects - projectedMonthlyDefects);
          const monthlyFinancialSavings = Math.round(defectsSavedMonthly * costPerPiece);
          const annualFinancialSavings = monthlyFinancialSavings * 12;
          const manualHoursSaved = Math.round((monthlyPieces * Math.max(0, manualInspectSeconds - 0.04)) / 3600);
          const speedupFactor = Math.round((manualInspectSeconds * 1000) / 40);

          const whatsappMessage = encodeURIComponent(
            `Bonjour Ibrahim,\nJ'ai testé votre calculateur ROI Vision IA :\n- Volume journalier : ${dailyVolume.toLocaleString()} pièces/jour\n- Taux de rebut actuel : ${defectRate}%\n- Économies annuelles estimées : ${annualFinancialSavings.toLocaleString()} ${currency}\n- Gain de temps : ${manualHoursSaved}h / mois\n\nJ'aimerais discuter de l'intégration d'un système similaire sur nos lignes.`
          );

          return (
            <div className="rounded-3xl border border-cyan-500/30 bg-[#070b14] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.8)] sm:p-8">
              <div className="grid gap-8 lg:grid-cols-12">
                
                {/* Inputs Column (5 cols) */}
                <div className="space-y-5 lg:col-span-5 border-b border-white/10 pb-6 lg:border-b-0 lg:border-r lg:border-white/10 lg:pr-6 lg:pb-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                      <Sliders className="h-4 w-4 text-cyan-400" />
                      <span>{lang === 'ar' ? 'معايير خط الإنتاج' : lang === 'fr' ? 'Paramètres de Production' : 'Production Parameters'}</span>
                    </h3>
                    
                    {/* Currency selector */}
                    <div className="flex rounded-lg border border-white/10 bg-white/5 p-0.5 text-[10px] font-mono-code">
                      {(['MAD', 'EUR', 'USD'] as const).map((curr) => (
                        <button
                          key={curr}
                          onClick={() => setCurrency(curr)}
                          className={`rounded px-1.5 py-0.5 font-bold transition-all ${
                            currency === curr ? 'bg-cyan-400 text-black' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {curr}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Slider 1: Volume */}
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                    <div className="flex items-center justify-between text-xs font-mono-code">
                      <span className="text-slate-300">{lang === 'ar' ? 'حجم الإنتاج اليومي' : lang === 'fr' ? 'Production journalière' : 'Daily Production Volume'}</span>
                      <span className="font-bold text-cyan-400">{dailyVolume.toLocaleString()} {lang === 'ar' ? 'قطعة/يوم' : 'pcs/jour'}</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="30000"
                      step="250"
                      value={dailyVolume}
                      onChange={(e) => setDailyVolume(Number(e.target.value))}
                      className="mt-3 w-full accent-cyan-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono-code text-slate-500 mt-1">
                      <span>500</span>
                      <span>15,000</span>
                      <span>30,000</span>
                    </div>
                  </div>

                  {/* Slider 2: Defect rate */}
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                    <div className="flex items-center justify-between text-xs font-mono-code">
                      <span className="text-slate-300">{lang === 'ar' ? 'نسبة الهدر / العيوب الحالية' : lang === 'fr' ? 'Taux de rebut manuel actuel' : 'Current Defect Rate'}</span>
                      <span className="font-bold text-red-400">{defectRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="12.0"
                      step="0.1"
                      value={defectRate}
                      onChange={(e) => setDefectRate(Number(e.target.value))}
                      className="mt-3 w-full accent-red-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono-code text-slate-500 mt-1">
                      <span>0.5%</span>
                      <span>6.0%</span>
                      <span>12.0%</span>
                    </div>
                  </div>

                  {/* Slider 3: Cost per piece */}
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                    <div className="flex items-center justify-between text-xs font-mono-code">
                      <span className="text-slate-300">{lang === 'ar' ? 'متوسط تكلفة تصنيع القطعة' : lang === 'fr' ? 'Coût unitaire de la pièce' : 'Unit Cost Per Part'}</span>
                      <span className="font-bold text-lime-400">{costPerPiece} {currency}</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="400"
                      step="5"
                      value={costPerPiece}
                      onChange={(e) => setCostPerPiece(Number(e.target.value))}
                      className="mt-3 w-full accent-[#ccff00] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono-code text-slate-500 mt-1">
                      <span>5 {currency}</span>
                      <span>200 {currency}</span>
                      <span>400 {currency}</span>
                    </div>
                  </div>

                  {/* Slider 4: Manual inspect time */}
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                    <div className="flex items-center justify-between text-xs font-mono-code">
                      <span className="text-slate-300">{lang === 'ar' ? 'زمن الفحص اليدوي للقطعة' : lang === 'fr' ? 'Temps d’inspection humaine' : 'Human Inspection Time'}</span>
                      <span className="font-bold text-cyan-300">{manualInspectSeconds}s / pc</span>
                    </div>
                    <input
                      type="range"
                      min="1.0"
                      max="15.0"
                      step="0.5"
                      value={manualInspectSeconds}
                      onChange={(e) => setManualInspectSeconds(Number(e.target.value))}
                      className="mt-3 w-full accent-cyan-300 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono-code text-slate-500 mt-1">
                      <span>1.0s</span>
                      <span>7.5s</span>
                      <span>15.0s</span>
                    </div>
                  </div>
                </div>

                {/* Outputs & Projected ROI Column (7 cols) */}
                <div className="flex flex-col justify-between space-y-6 lg:col-span-7">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-3 py-0.5 text-[11px] font-mono-code text-lime-400 mb-3">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>{lang === 'ar' ? 'النتائج المتوقعة مع نظام الرؤية الحاسوبية YouTechD' : 'Résultats Estimés avec Vision IA YouTechD'}</span>
                    </div>

                    <h4 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-white">
                      {lang === 'ar' ? 'العائد السنوي المباشر المتوقع' : lang === 'fr' ? 'Économies Annuelles Projetées' : 'Projected Annual Savings'}
                    </h4>

                    {/* Big Metric Box */}
                    <div className="mt-4 rounded-3xl border border-lime-400/40 bg-gradient-to-br from-lime-400/15 via-[#08111e] to-slate-950 p-6 shadow-[0_0_40px_rgba(204,255,0,0.15)]">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                        <div>
                          <div className="text-xs font-mono-code uppercase tracking-wider text-slate-400">
                            {lang === 'ar' ? 'التوفير المالي السنوي المقدر' : lang === 'fr' ? 'Gains nets annuels estimés' : 'Estimated Net Annual Savings'}
                          </div>
                          <div className="font-display text-3xl sm:text-5xl font-black text-[#ccff00] tracking-tight mt-1">
                            +{annualFinancialSavings.toLocaleString()} <span className="text-xl sm:text-2xl font-mono-code text-white">{currency}</span>
                          </div>
                        </div>
                        <div className="text-right font-mono-code text-xs text-slate-300">
                          <span className="text-cyan-400 font-bold">~{monthlyFinancialSavings.toLocaleString()} {currency}</span> / {lang === 'ar' ? 'شهر' : 'mois'}
                        </div>
                      </div>

                      {/* 3 Metric Cards */}
                      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/10 pt-4 text-xs font-mono-code">
                        <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                          <span className="text-slate-400 text-[11px] block">{lang === 'ar' ? 'انخفاض نسبة الهدر' : 'Réduction Rebut'}</span>
                          <span className="font-bold text-emerald-400 text-sm mt-0.5 block">
                            {defectRate}% → 0.2%
                          </span>
                          <span className="text-[10px] text-slate-500">(-94% de rebut)</span>
                        </div>

                        <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                          <span className="text-slate-400 text-[11px] block">{lang === 'ar' ? 'ساعات عمل موفرة' : 'Heures libérées'}</span>
                          <span className="font-bold text-cyan-400 text-sm mt-0.5 block">
                            {manualHoursSaved.toLocaleString()}h / {lang === 'ar' ? 'شهر' : 'mois'}
                          </span>
                          <span className="text-[10px] text-slate-500">{lang === 'ar' ? 'إعادة توجيه العمالة' : 'Optimisation équipe'}</span>
                        </div>

                        <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                          <span className="text-slate-400 text-[11px] block">{lang === 'ar' ? 'تسريع سرعة الفحص' : 'Vitesse de contrôle'}</span>
                          <span className="font-bold text-lime-400 text-sm mt-0.5 block">
                            {speedupFactor}x {lang === 'ar' ? 'أسرع' : 'plus rapide'}
                          </span>
                          <span className="text-[10px] text-slate-500">40ms vs {manualInspectSeconds}s</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary Callout & CTA */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {lang === 'ar'
                          ? 'هل تريد دراسة جدوى مخصصة لخطوط الإنتاج الخاصة بمصنعك (بلاستيك، صلب، أو إلكترونيات)؟'
                          : lang === 'fr'
                            ? 'Vous souhaitez une étude de faisabilité concrète adaptée à vos lignes de production (plasturgie, métal ou assemblage) ?'
                            : 'Want a tailored feasibility audit for your industrial lines?'}
                      </p>
                      <p className="text-[11px] font-mono-code text-cyan-400 mt-1">
                        SOPLAMI / YouTechD Benchmark • +212 664-478-416
                      </p>
                    </div>

                    <a
                      href={`https://wa.me/212664478416?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 flex items-center gap-2 rounded-xl bg-[#ccff00] px-4 py-2.5 text-xs font-mono-code font-black text-black shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all hover:bg-[#d8ff33] hover:scale-105"
                    >
                      <MessageCircle className="h-4 w-4 fill-black" />
                      <span>{lang === 'ar' ? 'إرسال التقدير لإبراهيم' : 'Discuter de cette estimation'}</span>
                    </a>
                  </div>

                </div>

              </div>
            </div>
          );
        })()}

      </div>
    </section>
  );
}
