'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Download, QrCode } from 'lucide-react';
import { App } from '@/types/database';
import { formatBytes } from '@/lib/data';
import { appHref, downloadHref } from '@/lib/urls';
import { useDeviceType } from '@/lib/use-device';
import { QrCodeModal } from './QrCodeModal';
import { InstallGuideModal } from './InstallGuideModal';

export function AppCard({ app, isFeatured = false }: { app: App; isFeatured?: boolean }) {
  const [qr, setQr] = useState(false);
  const [guide, setGuide] = useState(false);
  const { isIOS } = useDeviceType();
  const release = app.latest_release;
  return <>
    <article className="panel app-card flex flex-col overflow-hidden">
      <Link href={appHref(app.slug)} aria-label={`Descubrir ${app.name}`} className="relative block h-40 overflow-hidden border-b border-white/[.06] bg-gradient-to-br from-indigo-500/10 to-cyan-500/5">
        {app.screenshots?.[0] ? <img src={app.screenshots[0].image_url} alt={`Vista de ${app.name}`} width={400} height={800} loading="lazy" className="absolute left-1/2 top-5 w-36 -translate-x-1/2 rounded-t-2xl border border-white/10 shadow-xl" /> : <img src={app.icon_url} alt="" width={80} height={80} loading="lazy" className="absolute left-1/2 top-8 h-20 w-20 -translate-x-1/2 rounded-2xl" />}
        <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-[#101522] to-transparent" />
        {isFeatured && <span className="absolute top-4 left-4 rounded-full bg-indigo-500/20 px-3 py-1 text-[11px] font-medium text-indigo-200 border border-indigo-500/25">Destacada</span>}
        {app.status === 'beta' && <span className="absolute top-4 right-4 rounded-full bg-amber-500/10 px-3 py-1 text-[11px] text-amber-200 border border-amber-500/25">Beta</span>}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3"><img src={app.icon_url} alt="" width={40} height={40} loading="lazy" className="rounded-xl h-10 w-10 object-cover" /><div className="min-w-0"><Link href={appHref(app.slug)} className="text-lg font-semibold text-white hover:text-indigo-300"><h3 className="truncate">{app.name}</h3></Link><p className="mt-0.5 text-xs text-slate-400">{app.category}</p></div></div>
        <p className="mt-4 text-sm leading-relaxed text-slate-400 line-clamp-2 min-h-10">{app.slug === 'finup' ? 'Organiza tus gastos, presupuestos y metas de ahorro en un solo lugar.' : app.tagline}</p>
        <div className="my-5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">{release ? <><span>v{release.version_name}</span><span>{formatBytes(release.apk_size_bytes)}</span><span>{release.min_os_version}</span></> : <span>Consulta su disponibilidad</span>}</div>
        <div className="mt-auto flex gap-2">
          {release && !isIOS ? <a href={downloadHref(release.id)} onClick={() => setGuide(true)} className="primary-button flex-1"><Download size={16} aria-hidden="true" /> Descargar</a> : <Link href={appHref(app.slug)} className="primary-button flex-1">Ver app <ArrowUpRight size={16} aria-hidden="true" /></Link>}
          <button type="button" onClick={() => setQr(true)} aria-label={`Abrir QR de ${app.name}`} className="icon-button"><QrCode size={19} aria-hidden="true" /></button>
        </div>
        <Link href={appHref(app.slug)} className="mt-4 inline-flex items-center justify-center gap-1 text-xs text-slate-400 hover:text-white">Conoce {app.name} <ArrowUpRight size={13} aria-hidden="true" /></Link>
      </div>
    </article>
    <QrCodeModal isOpen={qr} onClose={() => setQr(false)} app={app} release={release} />
    <InstallGuideModal isOpen={guide} onClose={() => setGuide(false)} appName={app.name} sha256Hash={release?.sha256_hash} downloadUrl={release ? downloadHref(release.id) : undefined} />
  </>;
}
