'use client';

import React from 'react';
import { Release } from '@/types/database';
import { formatBytes } from '@/lib/data';
import { Download, AlertTriangle, Calendar, Smartphone, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChangelogTimelineProps {
  releases: Release[];
  appName: string;
}

export function ChangelogTimeline({ releases, appName }: ChangelogTimelineProps) {
  if (!releases || releases.length === 0) {
    return (
      <div className="double-bezel-outer text-center py-12">
        <div className="double-bezel-inner p-8">
          <p className="text-xs font-mono text-slate-400">No se encontraron versiones publicadas para esta aplicación.</p>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    try {
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.8 }
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:inset-y-0 before:left-3 sm:before:left-4 before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-slate-800 before:to-transparent">
      {releases.map((release, index) => {
        const isLatest = index === 0;

        return (
          <div key={release.id} className="relative group">
            {/* Timeline Node Icon */}
            <div
              className={`absolute -left-6 sm:-left-8 top-3 w-6 sm:w-8 h-6 sm:h-8 rounded-full border flex items-center justify-center transition-transform group-hover:scale-110 ${
                release.is_critical
                  ? 'bg-rose-950 border-rose-500/60 text-rose-400 shadow-lg shadow-rose-500/30'
                  : isLatest
                  ? 'bg-indigo-950 border-indigo-500/60 text-indigo-400 shadow-lg shadow-indigo-500/30'
                  : 'bg-[#0a0e17] border-white/10 text-slate-500'
              }`}
            >
              {release.is_critical ? (
                <AlertTriangle className="w-3.5 h-3.5" />
              ) : isLatest ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-slate-500" />
              )}
            </div>

            {/* Double-Bezel Card */}
            <div className="double-bezel-outer">
              <div className="double-bezel-inner p-6 sm:p-8">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/5 font-mono">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <h4 className="text-lg font-bold text-white tracking-tight">
                      v{release.version_name}
                    </h4>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                      Build Code: {release.version_code}
                    </span>
                    {isLatest && (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                        Última Versión
                      </span>
                    )}
                    {release.is_critical && (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Actualización Obligatoria
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {new Date(release.published_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {/* Critical Alert Notice if applicable */}
                {release.is_critical && (
                  <div className="mt-4 p-4 rounded-2xl bg-rose-950/50 border border-rose-500/30 flex items-start gap-3 text-xs text-rose-200">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold block mb-0.5">Parche Crítico de Seguridad o Estabilidad</strong>
                      Esta versión contiene correcciones indispensables. Las versiones cliente con código inferior a {release.version_code} recibirán una señal de bloqueo modal en la app.
                    </div>
                  </div>
                )}

                {/* Changelog Content */}
                <div className="mt-5 text-sm text-slate-300 space-y-2 whitespace-pre-line leading-relaxed font-sans prose prose-invert prose-sm max-w-none">
                  {release.changelog}
                </div>

                {/* Footer with Button-in-Button */}
                <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 font-mono">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
                      {release.min_os_version || 'Android 8.0+'}
                    </span>
                    <span>•</span>
                    <span>{formatBytes(release.apk_size_bytes)}</span>
                    <span>•</span>
                    <span>{release.download_count?.toLocaleString()} descargas</span>
                  </div>

                  <a
                    href={`/apps/api/v1/download/${release.id}`}
                    onClick={handleDownload}
                    className="pl-4 pr-1.5 py-1.5 rounded-full bg-indigo-600/30 hover:bg-indigo-600/60 text-indigo-200 hover:text-white border border-indigo-500/30 text-xs font-semibold flex items-center gap-2.5 transition-all group/btn cursor-pointer"
                  >
                    <span>Descargar v{release.version_name}</span>
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center btn-nested-icon">
                      <Download className="w-3 h-3 text-indigo-300" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
