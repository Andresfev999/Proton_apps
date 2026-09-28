'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Compass, 
  ArrowLeft, 
  Home, 
  Terminal, 
  Smartphone, 
  BookOpen, 
  Wallet, 
  Sparkles, 
  Radio, 
  ArrowRight,
  SearchAlert
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#05070D] text-slate-100 relative overflow-hidden selection:bg-indigo-500/30 selection:text-cyan-200">
      {/* Dynamic Background Mesh Gradients */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-indigo-600/15 via-cyan-500/10 to-violet-600/10 rounded-full blur-[120px] pointer-events-none -z-10" 
      />
      <div 
        className="absolute bottom-1/4 left-1/3 w-[500px] h-[400px] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none -z-10" 
      />

      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 flex flex-col items-center justify-center text-center relative z-10 w-full">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-8 shadow-lg shadow-indigo-950/40 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="tracking-widest uppercase font-semibold text-[11px]">
            ERR_404 // COORDENADAS_FUERA_DE_ÓRBITA
          </span>
        </motion.div>

        {/* Big Holographic 404 Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="relative mb-6 select-none"
        >
          {/* Subtle Radar Ring pulse behind 404 */}
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <motion.div
              animate={{ 
                scale: [1, 1.25, 1],
                opacity: [0.15, 0.3, 0.15]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-cyan-500/20"
            />
            <motion.div
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-56 h-56 sm:w-80 sm:h-80 rounded-full border border-indigo-500/20 border-dashed"
            />
          </div>

          <h1 className="text-8xl sm:text-9xl md:text-[11rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-indigo-950/60 leading-none drop-shadow-[0_20px_35px_rgba(99,102,241,0.25)]">
            404
          </h1>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            <div className="px-3 py-1 rounded-md bg-[#05070D]/90 border border-cyan-500/40 text-cyan-300 font-mono text-xs tracking-wider backdrop-blur-md shadow-xl flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>SEÑAL PERDIDA</span>
            </div>
          </div>
        </motion.div>

        {/* Title and Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mx-auto space-y-3 mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Página o Recurso No Encontrado
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
            La aplicación, versión o endpoint solicitado ha sido reubicado, actualizado a una nueva versión o sus coordenadas no existen en el hub de distribución.
          </p>
        </motion.div>

        {/* Telemetry Diagnostics Terminal Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="w-full max-w-lg mb-10 text-left double-bezel-outer"
        >
          <div className="double-bezel-inner p-4 sm:p-5 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-[11px] text-slate-400 ml-1 font-semibold">DIAGNÓSTICO DEL SISTEMA</span>
              </div>
              <span className="text-[10px] text-slate-500">EDGE // NODE-01</span>
            </div>

            <div className="space-y-1.5 text-slate-400 text-[11px] leading-relaxed">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold">&gt;</span>
                <span className="text-slate-500">ESTADO:</span>
                <span className="text-rose-400 font-semibold">404 NOT_FOUND</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold">&gt;</span>
                <span className="text-slate-500">GATEWAY:</span>
                <span className="text-indigo-300">protondev.space/apps</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold">&gt;</span>
                <span className="text-slate-500">ACCIÓN:</span>
                <span className="text-emerald-400">Restablecer enlace o explorar catálogo</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3.5 mb-14"
        >
          <Link
            href="/"
            className="group px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 active:scale-[0.98] flex items-center gap-2.5"
          >
            <Home className="w-4 h-4" />
            <span>Volver al Catálogo Principal</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/#api-docs"
            className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-200 hover:text-white font-medium text-xs sm:text-sm transition-all duration-200 active:scale-[0.98] flex items-center gap-2 backdrop-blur-md"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Consola OTA / API</span>
          </Link>
        </motion.div>

        {/* Quick Access to Main Apps */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl"
        >
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Aplicaciones Destacadas Disponibles
            </span>
            <Link
              href="/"
              className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
            >
              Ver todas <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
            {/* FlowPDF Card */}
            <Link
              href="/apps/flowpdf"
              className="group p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-indigo-500/40 transition-all duration-200 flex items-center gap-3.5 shadow-md active:scale-[0.99]"
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-200">
                <BookOpen className="w-5 h-5 text-indigo-400 group-hover:text-cyan-300 transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-white group-hover:text-indigo-200 transition-colors truncate">
                    FlowPDF
                  </h4>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    v1.0.0
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate mt-0.5">
                  Lector de PDFs adaptativo con 6 temas y portadas
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all" />
            </Link>

            {/* FinUp Card */}
            <Link
              href="/apps/finup"
              className="group p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-emerald-500/40 transition-all duration-200 flex items-center gap-3.5 shadow-md active:scale-[0.99]"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-200">
                <Wallet className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-white group-hover:text-emerald-200 transition-colors truncate">
                    FinUp
                  </h4>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    v1.0.0
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate mt-0.5">
                  Finanzas personales inteligentes con IA Gemini
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-300 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
