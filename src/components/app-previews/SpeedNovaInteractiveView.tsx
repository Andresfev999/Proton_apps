'use client';

import React, { useState } from 'react';
import { Gauge, Zap, Activity, Wifi, Play, RotateCcw, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function SpeedNovaInteractiveView() {
  const [testing, setTesting] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [ping, setPing] = useState(11);
  const [jitter, setJitter] = useState(1.6);
  const [stage, setStage] = useState<'idle' | 'ping' | 'download' | 'upload' | 'complete'>('idle');
  const [wavePoints, setWavePoints] = useState<number[]>([15, 35, 78, 140, 220, 310, 420, 485]);

  const startTest = () => {
    if (testing) return;
    setTesting(true);
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setStage('ping');
    setWavePoints([0]);

    setTimeout(() => {
      setPing(9);
      setJitter(1.2);
      setStage('download');

      let currentDl = 0;
      const points: number[] = [];
      const dlInterval = setInterval(() => {
        currentDl += Math.floor(Math.random() * 45) + 32;
        points.push(currentDl);
        setWavePoints([...points]);

        if (currentDl >= 492) {
          currentDl = 492.6;
          clearInterval(dlInterval);
          setDownloadSpeed(currentDl);
          setStage('upload');

          let currentUl = 0;
          const ulPoints: number[] = [];
          const ulInterval = setInterval(() => {
            currentUl += Math.floor(Math.random() * 25) + 18;
            ulPoints.push(currentUl);
            setWavePoints([...ulPoints]);

            if (currentUl >= 210) {
              currentUl = 210.4;
              clearInterval(ulInterval);
              setUploadSpeed(currentUl);
              setStage('complete');
              setTesting(false);
            } else {
              setUploadSpeed(currentUl);
            }
          }, 70);
        } else {
          setDownloadSpeed(currentDl);
        }
      }, 65);
    }, 600);
  };

  const activeSpeed = stage === 'upload' ? uploadSpeed : downloadSpeed;
  const progressPercent = Math.min(100, Math.round((activeSpeed / 500) * 100));

  return (
    <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/30 via-[#070b14] to-black p-6 sm:p-9 backdrop-blur-2xl relative overflow-hidden shadow-2xl">
      {/* Background Cyber Glowing Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-7 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-black text-xl shadow-[0_0_20px_rgba(6,182,212,0.25)]">
            ⚡
          </div>
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2.5">
              SpeedNova Live: Tacómetro Cyberpunk & Curva en Tiempo Real
              <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold">
                Interactivo
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Simulador de prueba con decodificación de latencia y curva de estabilidad</p>
          </div>
        </div>

        <button
          onClick={startTest}
          disabled={testing}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
            testing
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse'
              : 'bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-black shadow-lg shadow-cyan-500/30 font-black uppercase tracking-wider'
          }`}
        >
          <Play className="w-4 h-4 fill-current" />
          <span>{testing ? 'Midiendo Conexión...' : 'Iniciar Test de Velocidad'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center relative z-10">
        {/* Tachometer Visual Display */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-7 bg-black/70 rounded-3xl border border-cyan-500/25 relative shadow-inner overflow-hidden">
          {/* Subtle Cyber Grid in gauge */}
          <div className="absolute inset-0 bg-[radial-gradient(#15203b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          <div className="relative w-72 h-40 flex items-end justify-center overflow-hidden">
            {/* Speed Gauge Outer Arc */}
            <div className="w-64 h-64 rounded-full border-[12px] border-slate-900 border-t-cyan-400 border-r-cyan-500 absolute -bottom-24 shadow-[0_0_35px_rgba(6,182,212,0.25)]" />
            
            {/* Glow sweep arc */}
            <div
              className="w-64 h-64 rounded-full border-[12px] border-transparent border-t-purple-500 absolute -bottom-24 transition-all duration-300 pointer-events-none"
              style={{ opacity: progressPercent > 50 ? 0.7 : 0 }}
            />

            {/* Speed Value in center */}
            <div className="text-center z-10 pb-3">
              <span className="text-5xl sm:text-6xl font-black font-mono text-white tracking-tight block drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                {activeSpeed.toFixed(1)}
              </span>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 font-black">
                Mbps {stage === 'upload' ? '(Subida)' : stage === 'ping' ? '(Latencia)' : '(Descarga)'}
              </span>
            </div>
          </div>

          {/* Mini Waveform preview inside gauge container */}
          <div className="w-full mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-300 text-[11px]">
              <Wifi className="w-3.5 h-3.5 text-cyan-400" /> Servidor: Cloudflare Anycast Edge (<span className="text-cyan-400">9ms</span>)
            </span>
            <span className="text-emerald-400 font-bold text-[11px]">
              {progressPercent}% Potencia
            </span>
          </div>
        </div>

        {/* Telemetry Cards & Diagnostics */}
        <div className="lg:col-span-5 space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 transition-colors">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Descarga Max</div>
              <div className="text-2xl font-black font-mono text-cyan-300 mt-1">
                {downloadSpeed > 0 ? `${downloadSpeed.toFixed(1)}` : '--'} <span className="text-xs text-slate-400 font-normal">Mbps</span>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-colors">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Subida Max</div>
              <div className="text-2xl font-black font-mono text-purple-300 mt-1">
                {uploadSpeed > 0 ? `${uploadSpeed.toFixed(1)}` : '--'} <span className="text-xs text-slate-400 font-normal">Mbps</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-colors">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Ping Latencia</div>
              <div className="text-2xl font-black font-mono text-emerald-400 mt-1">
                {testing || downloadSpeed > 0 ? `${ping}` : '--'} <span className="text-xs text-slate-400 font-normal">ms</span>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-500/30 transition-colors">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Jitter Estabilidad</div>
              <div className="text-2xl font-black font-mono text-amber-400 mt-1">
                {testing || downloadSpeed > 0 ? `${jitter}` : '--'} <span className="text-xs text-slate-400 font-normal">ms</span>
              </div>
            </div>
          </div>

          {/* Quality breakdown banner */}
          <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200/90 leading-relaxed space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-white text-[13px]">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Diagnóstico de Calidad QoS: Grado A+ Gigabit</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Streaming 4K Ultra HD sin buffering (0s), Gaming Competitivo óptimo (latencia &lt; 20ms) y llamadas HD cristalinas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
