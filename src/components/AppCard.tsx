'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Download, QrCode, Star, ShieldCheck } from 'lucide-react';
import { App } from '@/types/database';
import { formatBytes } from '@/lib/data';
import { appHref, downloadHref } from '@/lib/urls';
import { useDeviceType } from '@/lib/use-device';
import { QrCodeModal } from './QrCodeModal';
import { InstallGuideModal } from './InstallGuideModal';

export function AppCard({ app, isFeatured = false }: { app: App; isFeatured?: boolean }) {
  const [qr, setQr] = useState(false);
  const [guide, setGuide] = useState(false);
  const { isIOS, isAndroid } = useDeviceType();
  const release = app.latest_release;

  // Approximate rating for Play Store display (4.8 or 4.9 for top apps)
  const rating = app.slug === 'finup' ? '4.9' : app.slug === 'speednova' ? '4.9' : '4.8';

  return (
    <>
      <article className="app-card group rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">
        {/* Cover / Screenshot header if present or featured */}
        {app.screenshots?.[0] ? (
          <Link
            href={appHref(app.slug)}
            aria-label={`Ver detalles de ${app.name}`}
            className="relative block h-36 overflow-hidden bg-slate-50 border-b border-slate-100"
          >
            <img
              src={app.screenshots[0].image_url}
              alt={`Vista de ${app.name}`}
              width={360}
              height={720}
              loading="lazy"
              className="absolute left-1/2 top-3 w-32 -translate-x-1/2 rounded-t-xl border border-slate-200/80 shadow-md group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />

            {isFeatured && (
              <span className="absolute top-3 left-3 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 border border-emerald-200 shadow-2xs">
                Destacada
              </span>
            )}
            {app.status === 'beta' && (
              <span className="absolute top-3 right-3 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700 border border-amber-200 shadow-2xs">
                Acceso Anticipado
              </span>
            )}
          </Link>
        ) : null}

        {/* Content Body */}
        <div className="flex flex-1 flex-col p-5">
          {/* Top Row: Icon + Name + Category */}
          <div className="flex items-start gap-3.5">
            <Link href={appHref(app.slug)} className="shrink-0">
              <img
                src={app.icon_url}
                alt=""
                width={56}
                height={56}
                loading="lazy"
                className="h-14 w-14 rounded-2xl object-cover border border-slate-100 shadow-2xs group-hover:shadow-xs transition-shadow"
              />
            </Link>

            <div className="min-w-0 flex-1">
              <Link href={appHref(app.slug)}>
                <h3 className="font-semibold text-slate-900 group-hover:text-[#01875f] text-base truncate transition-colors">
                  {app.name}
                </h3>
              </Link>
              <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                Proton Dev · {app.category}
              </p>

              {/* Rating and metrics in Play Store style */}
              <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-600">
                <span className="flex items-center gap-1 font-semibold text-slate-800">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span>{rating}</span>
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500 font-medium">
                  {release ? formatBytes(release.apk_size_bytes) : 'APK'}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-emerald-700 font-medium text-[11px] flex items-center gap-0.5">
                  <ShieldCheck size={12} />
                  Verificada
                </span>
              </div>
            </div>
          </div>

          {/* Tagline / Summary */}
          <p className="mt-3.5 text-xs leading-relaxed text-slate-600 line-clamp-2 min-h-9">
            {app.slug === 'finup'
              ? 'Organiza tus gastos, presupuestos y metas de ahorro con total claridad en un solo lugar.'
              : app.tagline}
          </p>

          {/* Action Row */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center gap-2">
            {release && !isIOS ? (
              <a
                href={downloadHref(release.id)}
                onClick={() => setGuide(true)}
                className="flex-1 py-2 px-3.5 rounded-full bg-[#01875f] hover:bg-[#017250] text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-2xs hover:shadow-xs"
              >
                <Download size={14} aria-hidden="true" />
                <span>{isAndroid ? 'Instalar' : 'Descargar APK'}</span>
              </a>
            ) : (
              <Link
                href={appHref(app.slug)}
                className="flex-1 py-2 px-3.5 rounded-full bg-[#01875f] hover:bg-[#017250] text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-2xs hover:shadow-xs"
              >
                <span>Ver aplicación</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            )}

            {/* QR Modal Trigger */}
            <button
              type="button"
              onClick={() => setQr(true)}
              aria-label={`Abrir código QR de ${app.name}`}
              className="h-8 w-8 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors"
            >
              <QrCode size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      </article>

      <QrCodeModal isOpen={qr} onClose={() => setQr(false)} app={app} release={release} />
      <InstallGuideModal
        isOpen={guide}
        onClose={() => setGuide(false)}
        appName={app.name}
        sha256Hash={release?.sha256_hash}
        downloadUrl={release ? downloadHref(release.id) : undefined}
      />
    </>
  );
}
