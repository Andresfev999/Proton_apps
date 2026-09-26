'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download, QrCode, ArrowUpRight, ShieldCheck, HardDrive, Sparkles } from 'lucide-react';
import { App } from '@/types/database';
import { formatBytes } from '@/lib/data';
import { QrCodeModal } from './QrCodeModal';
import confetti from 'canvas-confetti';

interface AppCardProps {
  app: App;
  isFeatured?: boolean;
}

export function AppCard({ app, isFeatured = false }: AppCardProps) {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const release = app.latest_release;

  const triggerDownloadConfetti = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#6366f1', '#06b6d4', '#10b981']
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <>
      <div className="double-bezel-outer group relative">
        <div className="double-bezel-inner p-6 sm:p-7 flex flex-col justify-between h-full relative overflow-hidden">
          
          {/* Subtle Ambient Light Orb inside Card */}
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-gradient-to-br from-indigo-500/15 via-cyan-500/5 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

          {/* Top Section */}
          <div className="relative z-10">
            {/* Header: Icon & Category Eyebrow */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="relative">
                <div className="w-16 h-16 rounded-[1.25rem] p-1 bg-white/5 border border-white/10 shadow-lg shadow-black/40 group-hover:border-indigo-400/30 transition-all duration-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={app.icon_url}
                    alt={app.name}
                    className="w-full h-full rounded-[1rem] object-cover"
                  />
                </div>
                {app.status === 'published' && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0a0e17] border border-white/10 flex items-center justify-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end gap-1.5">
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] font-semibold px-2.5 py-1 rounded-full bg-white/5 text-indigo-300 border border-white/10">
                  {app.category}
                </span>

                {isFeatured && (
                  <span className="text-[9px] font-mono uppercase tracking-[0.15em] font-bold px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                    Destacada
                  </span>
                )}

                {release?.is_critical && (
                  <span className="text-[9px] font-mono uppercase tracking-[0.15em] font-bold px-2 py-0.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-500/30">
                    Parche Crítico
                  </span>
                )}
              </div>
            </div>

            {/* App Title & Tagline */}
            <Link href={`/apps/${app.slug}`} className="group/title">
              <h3 className="text-xl font-bold text-white group-hover/title:text-indigo-300 transition-colors tracking-tight line-clamp-1">
                {app.name}
              </h3>
            </Link>
            <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed min-h-[34px]">
              {app.tagline}
            </p>

            {/* Micro Specs Bar */}
            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-slate-200 bg-white/5 px-2 py-0.5 rounded-md text-[11px] border border-white/5 font-semibold">
                  v{release?.version_name || '1.0.0'}
                </span>
                {release?.apk_size_bytes && (
                  <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                    <HardDrive className="w-3 h-3 text-slate-500" />
                    {formatBytes(release.apk_size_bytes)}
                  </span>
                )}
              </div>

              <span className="text-[11px] text-slate-500">
                {app.total_downloads?.toLocaleString() || '1,200+'} DL
              </span>
            </div>
          </div>

          {/* Action Row: Nested Button-in-Button Architecture */}
          <div className="mt-6 pt-2 flex items-center gap-2 relative z-10">
            {release ? (
              <a
                href={`/api/v1/download/${release.id}`}
                onClick={triggerDownloadConfetti}
                className="flex-1 pl-4 pr-1.5 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-between shadow-lg shadow-indigo-600/25 transition-all duration-200 active:scale-[0.98] group/btn cursor-pointer"
              >
                <span className="font-medium tracking-tight">Descargar APK</span>
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center btn-nested-icon">
                  <Download className="w-3.5 h-3.5" />
                </div>
              </a>
            ) : (
              <Link
                href={`/apps/${app.slug}`}
                className="flex-1 px-4 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold text-center transition-all"
              >
                <span>Ver Detalles</span>
              </Link>
            )}

            {/* QR Code Action Button */}
            <button
              onClick={() => setIsQrOpen(true)}
              title="Escanear en celular"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer"
              aria-label="Abrir código QR móvil"
            >
              <QrCode className="w-4 h-4 text-cyan-400" />
            </button>

            {/* Details Arrow */}
            <Link
              href={`/apps/${app.slug}`}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center justify-center transition-all duration-150 active:scale-95"
              aria-label="Ver ficha completa"
            >
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white" />
            </Link>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      <QrCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        app={app}
        release={release}
      />
    </>
  );
}
