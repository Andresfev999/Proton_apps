'use client';

import React, { useState } from 'react';
import { Gauge, Zap, Activity, Wifi, Play, RotateCcw } from 'lucide-react';

export function SpeedNovaInteractiveView() {
  const [testing, setTesting] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [ping, setPing] = useState(12);
  const [jitter, setJitter] = useState(2);
  const [stage, setStage] = useState<'idle' | 'ping' | 'download' | 'upload' | 'complete'>('idle');

  const startTest = () => {
    if (testing) return;
    setTesting(true);
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setStage('ping');

    setTimeout(() => {
      setPing(11);
      setJitter(1.8);
      setStage('download');

      let currentDl = 0;
      const dlInterval = setInterval(() => {
        currentDl += Math.floor(Math.random() * 45) + 30;
        if (currentDl >= 485) {
          currentDl = 485.4;
          clearInterval(dlInterval);
          setDownloadSpeed(currentDl);
          setStage('upload');

          let currentUl = 0;
          const ulInterval = setInterval(() => {
            currentUl += Math.floor(Math.random() * 25) + 15;
            if (currentUl >= 195) {
              currentUl = 194.8;
              clearInterval(ulInterval);
              setUploadSpeed(currentUl);
              setStage('complete');
              setTesting(false);
            } else {
              setUploadSpeed(currentUl);
            }
          }, 80);
        } else {
          setDownloadSpeed(currentDl);
        }
      }, 70);
    }, 700);
  };

  const needleAngle = Math.min(180, (downloadSpeed / 600) * 180) - 90;

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/25 via-[#060e14] to-black p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black text-lg">
            🚀
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              SpeedNova Live: Tacómetro Cyberpunk de Conexión
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold">
                Interactivo
              </span>
            </h3>
            <p className="text-xs text-slate-400">Simulador de prueba reactiva de descarga, subida y latencia</p>
          </div>
        </div>

        <button
          onClick={startTest}
          disabled={testing}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            testing
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse'
              : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg shadow-cyan-500/25 font-black uppercase'
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{testing ? 'Midiendo...' : 'Iniciar Test'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Tachometer Visual Display */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-black/60 rounded-2xl border border-cyan-500/20 relative">
          <div className="relative w-64 h-36 flex items-end justify-center overflow-hidden">
            {/* Speed Gauge Arc */}
            <div className="w-56 h-56 rounded-full border-[10px] border-slate-800 border-t-cyan-400 border-r-cyan-500 absolute -bottom-20 shadow-[0_0_30px_rgba(6,182,212,0.2)]" />

            {/* Speed Value in center */}
            <div className="text-center z-10 pb-2">
              <span className="text-4xl sm:text-5xl font-black font-mono text-cyan-300 tracking-tight block">
                {stage === 'upload' ? uploadSpeed.toFixed(1) : downloadSpeed.toFixed(1)}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400/80 font-bold">
                Mbps {stage === 'upload' ? '(Subida)' : '(Descarga)'}
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1 text-slate-300">
              <Wifi className="w-3.5 h-3.5 text-cyan-400" /> Servidor: Miami Ultra-Low Ping
            </span>
          </div>
        </div>

        {/* Telemetry Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Descarga</div>
              <div className="text-xl font-bold font-mono text-cyan-300 mt-1">
                {downloadSpeed > 0 ? `${downloadSpeed.toFixed(1)} Mbps` : '--'}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Subida</div>
              <div className="text-xl font-bold font-mono text-indigo-300 mt-1">
                {uploadSpeed > 0 ? `${uploadSpeed.toFixed(1)} Mbps` : '--'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Ping (Latencia)</div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                {testing || downloadSpeed > 0 ? `${ping} ms` : '--'}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Jitter</div>
              <div className="text-xl font-bold font-mono text-amber-400 mt-1">
                {testing || downloadSpeed > 0 ? `${jitter} ms` : '--'}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[11px] text-cyan-200/90 flex items-start gap-2">
            <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              <strong>SpeedNova en Android:</strong> Diagnóstico de streaming 4K, análisis de estabilidad para juegos online y registro histórico de pruebas sin publicidad invasiva.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
