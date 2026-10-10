'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, MapPin, Zap, Flame, Activity } from 'lucide-react';

export function PacePulseInteractiveView() {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(142); // 2:22
  const [distance, setDistance] = useState(0.52); // km

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
        setDistance((prev) => +(prev + 0.0035).toFixed(3));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Pace in min/km
  const currentPace = distance > 0 ? (seconds / 60 / distance).toFixed(2) : '4.45';
  const calories = Math.floor(distance * 68);

  const splits = [
    { km: 'KM 1', time: '4:32', pace: '4:32 min/km', elevation: '+12m' },
    { km: 'KM 2', time: '4:28', pace: '4:28 min/km', elevation: '+4m' },
    { km: 'KM 3', time: '4:15', pace: '4:15 min/km', elevation: '-8m' },
  ];

  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/25 via-[#080f0c] to-black p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-lg">
            ⚡
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              PacePulse Live: HUD Táctico de Carrera & GPS
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold">
                Interactivo
              </span>
            </h3>
            <p className="text-xs text-slate-400">Simulación en vivo de telemetría de zancada, ritmo y mapa táctico</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              isRunning
                ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isRunning ? 'Pausar' : 'Iniciar Carrera'}</span>
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setSeconds(0);
              setDistance(0);
            }}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
            title="Reiniciar carrera"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Tactical Metrics HUD */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Giant Metric */}
          <div className="p-6 rounded-2xl bg-black/60 border border-emerald-500/20 text-center relative overflow-hidden">
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
              Ritmo Promedio (Pace)
            </span>
            <div className="text-5xl sm:text-6xl font-black font-mono text-emerald-300 tracking-tight">
              {currentPace} <span className="text-xl sm:text-2xl text-emerald-500/80 font-normal">/km</span>
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400">
              <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
              <span className="font-mono">{isRunning ? 'GPS Conectado (Precisión 3m)' : 'En pausa'}</span>
            </div>
          </div>

          {/* Secondary Metric Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Distancia</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                {distance.toFixed(2)} <span className="text-xs text-slate-400 font-normal">km</span>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Tiempo</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                {formatTime(seconds)}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Calorías</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-rose-400 mt-1 flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{calories}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Tactical Splits Breakdown */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-black/60 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                Desglose de Splits
              </span>
              <span className="text-[10px] font-mono text-slate-400">Intervalo 1.0 km</span>
            </div>

            <div className="space-y-2 text-xs">
              {splits.map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5 font-mono"
                >
                  <span className="font-bold text-white">{s.km}</span>
                  <span className="text-emerald-400 font-bold">{s.pace}</span>
                  <span className="text-slate-500 text-[11px]">{s.elevation}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-400 leading-relaxed">
            💡 <strong className="text-emerald-300">PacePulse en Android:</strong> Rastreo en segundo plano con pantalla apagada, audio feedback en auriculares y modo oscuro AMOLED de consumo ultra bajo.
          </div>
        </div>
      </div>
    </div>
  );
}
