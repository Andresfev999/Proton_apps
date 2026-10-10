'use client';

import React, { useState } from 'react';
import { BookOpen, Sliders, Sun, Moon, Type, Sparkles } from 'lucide-react';

export function FlowPdfInteractiveView() {
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState<'paper' | 'dark' | 'light'>('paper');
  const [mode, setMode] = useState<'flow' | 'standard'>('flow');

  const sampleText = `La arquitectura de software moderna exige interfaces reactivas, resiliencia ante fallos y una experiencia de usuario fluida. En la era digital, la lectura de documentos técnicos y literatura no debe verse obstaculizada por zooms incómodos ni desplazamientos horizontales interminables.`;

  const themes = {
    paper: 'bg-[#f4ecd8] text-[#3c3226] border-[#d8cbb5]',
    dark: 'bg-[#181a1b] text-[#e8e6e3] border-[#2c3032]',
    light: 'bg-white text-slate-800 border-slate-200',
  };

  return (
    <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/25 via-[#090b14] to-black p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-black text-lg">
            📖
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              FlowPDF Live: Simulador del Motor de Lectura "FLOW"
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-bold">
                Interactivo
              </span>
            </h3>
            <p className="text-xs text-slate-400">Compara el modo PDF estándar vs lectura fluida reflowable con temas</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
          <button
            onClick={() => setMode('standard')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mode === 'standard' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            PDF Estándar
          </button>
          <button
            onClick={() => setMode('flow')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mode === 'flow' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            ⭐ Modo FLOW
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* eReader Simulated Canvas */}
        <div className="lg:col-span-7">
          <div
            className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 shadow-2xl min-h-[220px] flex flex-col justify-between ${themes[theme]}`}
          >
            <div>
              <div className="flex items-center justify-between border-b pb-2 mb-4 border-current opacity-30 text-xs font-serif">
                <span>Capítulo 1: Fundamentos de Arquitectura</span>
                <span>Pág 14 de 320</span>
              </div>

              <div
                style={{ fontSize: `${fontSize}px`, lineHeight: 1.65 }}
                className={`font-serif transition-all ${mode === 'standard' ? 'opacity-50 blur-[0.3px] select-none' : ''}`}
              >
                {sampleText}
              </div>

              {mode === 'standard' && (
                <div className="mt-3 p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-700 text-xs font-sans font-bold text-center">
                  ⚠️ PDF Estándar: Requiere pellizcar y zoom horizontal incómodo para leer columnas fijas.
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-current opacity-30 text-[10px] flex justify-between font-mono">
              <span>FlowEngine™ v2.4</span>
              <span>Progreso: 12%</span>
            </div>
          </div>
        </div>

        {/* Aa Controls Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-black/60 border border-indigo-500/20 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold block">
              Panel "Aa" de Tipografía & Tema
            </span>

            {/* Font size slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Tamaño de Letra:</span>
                <span className="font-mono text-indigo-300 font-bold">{fontSize}px</span>
              </div>
              <input
                type="range"
                min={13}
                max={22}
                value={fontSize}
                onChange={(e) => setFontSize(+e.target.value)}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* Themes switcher */}
            <div>
              <span className="text-xs text-slate-300 block mb-2">Tema de Lectura:</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'paper', name: 'Papel Sepia', bg: 'bg-[#f4ecd8]', text: 'text-black' },
                  { id: 'dark', name: 'Oscuro', bg: 'bg-[#181a1b]', text: 'text-white' },
                  { id: 'light', name: 'Día Claro', bg: 'bg-white', text: 'text-black' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id as any)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${t.bg} ${t.text} ${
                      theme === t.id ? 'ring-2 ring-indigo-400 font-black' : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-200/90 leading-relaxed">
            💡 <strong>FlowPDF en Android:</strong> Extracción de texto inteligente para reformatear cualquier PDF complejo en un libro digital ergonómico con controles de avance táctil inferior.
          </div>
        </div>
      </div>
    </div>
  );
}
