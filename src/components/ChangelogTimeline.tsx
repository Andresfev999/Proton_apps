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
      <div className="text-center py-10 rounded-2xl bg-slate-50 border border-slate-200">
        <p className="text-xs font-mono text-slate-500">No se encontraron versiones publicadas para esta aplicación.</p>
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
    <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:inset-y-0 before:left-3 sm:before:left-4 before:w-0.5 before:bg-gradient-to-b before:from-[#01875f] before:via-slate-200 before:to-transparent">
      {releases.map((release, index) => {
        const isLatest = index === 0;

        return (
          <div key={release.id} className="relative group">
            {/* Timeline Node Icon */}
            <div
              className={`absolute -left-6 sm:-left-8 top-3 w-6 sm:w-8 h-6 sm:h-8 rounded-full border flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs ${
                release.is_critical
                  ? 'bg-rose-50 border-rose-300 text-rose-600'
                  : isLatest
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-white border-slate-300 text-slate-400'
              }`}
            >
              {release.is_critical ? (
                <AlertTriangle className="w-3.5 h-3.5" />
              ) : isLatest ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-slate-400" />
              )}
            </div>

            {/* Card Content */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    v{release.version_name}
                  </h4>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-mono">
                    Build: {release.version_code}
                  </span>
                  {isLatest && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Última Versión
                    </span>
                  )}
                  {release.is_critical && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Actualización Crítica
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>
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
                <div className="mt-3.5 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold block mb-0.5">Parche Crítico de Seguridad o Estabilidad</strong>
                    Esta versión contiene correcciones indispensables.
                  </div>
                </div>
              )}

              {/* Changelog Content */}
              <div className="mt-4 text-xs sm:text-sm text-slate-700 space-y-1.5 whitespace-pre-line leading-relaxed font-sans">
                {release.changelog}
              </div>

              {/* Footer */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-3 text-slate-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5 text-slate-400" />
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
                  className="px-4 py-2 rounded-full bg-[#01875f] hover:bg-[#017250] text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar v{release.version_name}</span>
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
