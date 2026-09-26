'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { AppScreenshot } from '@/types/database';

interface DeviceMockupProps {
  appName: string;
  screenshots: AppScreenshot[];
}

export function DeviceMockup({ appName, screenshots }: DeviceMockupProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasScreenshots = screenshots && screenshots.length > 0;
  const currentScreenshot = hasScreenshots ? screenshots[currentIndex] : null;

  const nextSlide = () => {
    if (!hasScreenshots) return;
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = () => {
    if (!hasScreenshots) return;
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div className="flex flex-col items-center select-none">
      {/* Outer Machined Enclosure */}
      <div className="p-1 rounded-[52px] bg-gradient-to-b from-white/15 via-white/5 to-white/10 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)]">
        
        {/* Smartphone Chassis Frame */}
        <div className="relative w-[280px] sm:w-[320px] h-[580px] sm:h-[650px] bg-[#05070D] rounded-[48px] p-2.5 shadow-2xl border-2 border-white/10 group">
          
          {/* Hardware side buttons */}
          <div className="absolute -left-[6px] top-28 w-[3px] h-10 bg-slate-600 rounded-l" />
          <div className="absolute -left-[6px] top-42 w-[3px] h-12 bg-slate-600 rounded-l" />
          <div className="absolute -left-[6px] top-58 w-[3px] h-12 bg-slate-600 rounded-l" />
          <div className="absolute -right-[6px] top-36 w-[3px] h-16 bg-slate-600 rounded-r" />

          {/* Inner Display Core */}
          <div className="relative w-full h-full bg-[#0a0e17] rounded-[38px] overflow-hidden flex flex-col border border-white/5">
            
            {/* Top Dynamic Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 w-24 h-5 bg-black rounded-full flex items-center justify-between px-2.5 shadow-md">
              <div className="w-2 h-2 rounded-full bg-indigo-950 border border-indigo-400/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Status Bar */}
            <div className="w-full h-8 px-6 pt-2 flex items-center justify-between text-[11px] font-mono text-slate-300 z-20 pointer-events-none">
              <span>09:41</span>
              <div className="flex items-center gap-1.5">
                <span>5G</span>
                <div className="w-4 h-2 border border-slate-300 rounded-sm p-0.5">
                  <div className="w-full h-full bg-slate-300 rounded-[1px]" />
                </div>
              </div>
            </div>

            {/* Screenshot Display Area with Motion */}
            <div className="relative flex-1 w-full overflow-hidden bg-black">
              {hasScreenshots && currentScreenshot ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentScreenshot.id || currentIndex}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                    className="w-full h-full relative"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={currentScreenshot.image_url}
                      alt={currentScreenshot.caption || `${appName} captura ${currentIndex + 1}`}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-500">
                  <ImageIcon className="w-10 h-10 mb-2 opacity-30 text-indigo-400" />
                  <p className="text-xs font-mono">Capturas de pantalla próximamente</p>
                </div>
              )}

              {/* Navigation Overlay Arrows */}
              {hasScreenshots && screenshots.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/20 active:scale-90 cursor-pointer shadow-lg shadow-black/80"
                    aria-label="Captura anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/20 active:scale-90 cursor-pointer shadow-lg shadow-black/80"
                    aria-label="Siguiente captura"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="w-full h-5 flex items-center justify-center bg-black/60 z-20">
              <div className="w-28 h-1 bg-white/40 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Caption & Screen Counter */}
      {hasScreenshots && (
        <div className="mt-4 flex flex-col items-center gap-2 max-w-sm text-center">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 px-2.5 py-0.5 rounded-full font-bold">
              Pantalla {currentIndex + 1} de {screenshots.length}
            </span>
          </div>

          {currentScreenshot?.caption && (
            <p className="text-xs text-slate-200 font-medium leading-relaxed px-3 min-h-[36px]">
              {currentScreenshot.caption}
            </p>
          )}

          {screenshots.length > 1 && (
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10 max-w-full overflow-x-auto">
              {screenshots.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                    idx === currentIndex
                      ? 'w-6 bg-cyan-400'
                      : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Ver captura ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
