'use client';

import React, { useState, useEffect } from 'react';
import { Dumbbell, Play, Pause, RotateCcw, Flame, CheckCircle2, ChevronRight } from 'lucide-react';

export function FitPulseInteractiveView() {
  const [activeTab, setActiveTab] = useState<'routine' | 'timer'>('timer');
  const [restSeconds, setRestSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeSet, setActiveSet] = useState(2);

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (isTimerRunning && restSeconds > 0) {
      t = setInterval(() => setRestSeconds((s) => s - 1), 1000);
    } else if (restSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(t);
  }, [isTimerRunning, restSeconds]);

  const exercises = [
    { name: 'Press Banca Plano con Barra', sets: '4 series x 8-10 reps', target: 'Pecho / Tríceps', done: true },
    { name: 'Aperturas Inclinadas con Mancuerna', sets: '3 series x 12 reps', target: 'Haz Clavicular', done: true },
    { name: 'Fondos en Paralelas Lastrados', sets: '3 series al fallo', target: 'Pecho Inferior', done: false },
  ];

  return (
    <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-950/25 via-[#10080a] to-black p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 font-black text-lg">
            💪
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              FitPulse Live: Tracker de Series & Temporizador Rest
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold">
                Interactivo
              </span>
            </h3>
            <p className="text-xs text-slate-400">Controla intervalos de descanso entre series con aviso háptico</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
          <button
            onClick={() => setActiveTab('timer')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'timer' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Descanso Timer
          </button>
          <button
            onClick={() => setActiveTab('routine')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'routine' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Rutina Activa
          </button>
        </div>
      </div>

      {activeTab === 'timer' ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-6 flex flex-col items-center justify-center p-6 bg-black/60 rounded-2xl border border-rose-500/20">
            <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-bold mb-1">
              Serie {activeSet} Completada · Descanso
            </span>
            <div className="text-6xl font-black font-mono text-rose-300 my-2">
              {restSeconds}s
            </div>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                  isTimerRunning
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-rose-500 text-white hover:bg-rose-400 shadow-lg shadow-rose-500/25'
                }`}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isTimerRunning ? 'Pausar' : 'Iniciar Conteo'}</span>
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setRestSeconds(60);
                }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400"
                title="Reiniciar a 60s"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="md:col-span-6 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold">
              Selección Rápida de Intervalo
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[45, 60, 90, 120].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setRestSeconds(s);
                    setIsTimerRunning(false);
                  }}
                  className={`p-2.5 rounded-xl border text-center font-mono font-bold text-xs cursor-pointer transition-colors ${
                    restSeconds === s
                      ? 'bg-rose-500/20 border-rose-400 text-rose-300'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  {s} seg
                </button>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-200/90 leading-relaxed">
              💡 <strong>FitPulse en Android:</strong> Al terminar el tiempo de descanso, la app emite una vibración háptica dual incluso con la pantalla bloqueada para que nunca pierdas el ritmo de hipertrofia.
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2.5">
          {exercises.map((ex, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${ex.done ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-slate-400'}`}>
                  {ex.done ? '✓' : i + 1}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{ex.name}</div>
                  <div className="text-[11px] font-mono text-slate-400">{ex.sets} · <span className="text-rose-400">{ex.target}</span></div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
