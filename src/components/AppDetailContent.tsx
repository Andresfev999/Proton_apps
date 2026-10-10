'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Download, QrCode, Smartphone, Sparkles, Check, Info, Code2, Image as ImageIcon } from 'lucide-react';
import { App, AppScreenshot } from '@/types/database';
import { downloadHref } from '@/lib/urls';
import { formatBytes } from '@/lib/data';
import { getAppBenefits, APP_BENEFITS_CATALOG } from '@/lib/app-benefits-data';
import { useDeviceType } from '@/lib/use-device';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { DeviceMockup } from './DeviceMockup';
import { Modal } from './Modal';
import { QrCodeModal } from './QrCodeModal';
import { InstallGuideModal } from './InstallGuideModal';
import { ChangelogTimeline } from './ChangelogTimeline';
import { AppPreviewShowcase, hasAppPreview } from './app-previews/AppPreviewShowcase';
import { VideoPreview } from './VideoPreview';

export default function AppDetailContent({ initialApp: app }: { initialApp: App }) {
  const [qr, setQr] = useState(false);
  const [guide, setGuide] = useState(false);
  const [image, setImage] = useState<AppScreenshot | null>(null);
  const [demo, setDemo] = useState(false);
  const { isIOS, isAndroid } = useDeviceType();
  const profile = getAppBenefits(app.slug, app);
  const hasProfile = Boolean(APP_BENEFITS_CATALOG[app.slug]);
  const release = app.latest_release;
  const download = release ? downloadHref(release.id) : undefined;
  const screenshots = app.screenshots || [];
  const date = release ? new Intl.DateTimeFormat('es-CO', { dateStyle:'medium', timeZone:'America/Bogota' }).format(new Date(release.published_at)) : undefined;
  const downloadButton = (className = '') => download && !isIOS ? <a href={download} onClick={() => setGuide(true)} className={`primary-button ${className}`}><Download size={17} aria-hidden="true" /> {isAndroid ? 'Descargar en Android' : 'Descargar APK'}</a> : app.app_store_url && isIOS ? <a href={app.app_store_url} className={`primary-button ${className}`}>Ver en App Store <ArrowUpRight size={16} aria-hidden="true" /></a> : null;
  return <div className="min-h-screen flex flex-col">
    <Navbar />
    <main id="main-content" className="flex-1">
      <section className="hero-glow border-b border-white/[.06]">
        <div className="site-container py-10 sm:py-14">
          <Link href="/#catalogo" className="inline-flex gap-2 items-center text-sm text-slate-400 hover:text-white"><ArrowLeft size={16} aria-hidden="true" /> Todas las aplicaciones</Link>
          <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] items-center mt-10">
            <div>
              <div className="flex items-center gap-3"><img src={app.icon_url} width={56} height={56} alt="" className="h-14 w-14 rounded-2xl" /><div><p className="text-lg font-semibold text-white">{app.name}</p><p className="mt-1 text-xs text-slate-400">{app.category}{app.status === 'beta' ? ' · Beta' : ''}</p></div></div>
              <h1 className="mt-6 text-3xl sm:text-[2.8rem] lg:text-5xl font-semibold tracking-[-.035em] leading-[1.12] text-white">{hasProfile ? profile.heroTitle : app.tagline}</h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400">{hasProfile ? profile.heroSubtitle : `Descubre ${app.name}, explora sus pantallas y consulta los detalles antes de instalarla en tu Android.`}</p>
              {hasProfile && <div className="mt-5 flex flex-wrap gap-2">{profile.trustPills.map(pill => <span key={pill} className="inline-flex items-center gap-1.5 rounded-lg border border-white/[.07] bg-white/[.02] px-2.5 py-1.5 text-xs text-slate-400"><Check size={12} className="text-indigo-300" aria-hidden="true" /> {pill}</span>)}</div>}
              <div className="mt-7 flex flex-wrap gap-3">{downloadButton()}<button type="button" onClick={() => setQr(true)} className="secondary-button"><QrCode size={18} aria-hidden="true" /> Abrir en mi teléfono</button></div>
              {isIOS && <p className="mt-4 text-sm text-amber-200">El archivo APK necesita un teléfono Android. Usa el QR para abrir esta app en un dispositivo compatible.</p>}
              {!release && <p className="mt-4 text-sm text-slate-400">La descarga todavía no está disponible. Puedes explorar sus funciones y capturas.</p>}
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">{release && <><span>v{release.version_name}</span><span>{formatBytes(release.apk_size_bytes)}</span><span>{release.min_os_version}</span></>}<button type="button" onClick={() => setGuide(true)} className="inline-flex items-center gap-1 text-indigo-300 hover:text-indigo-200 min-h-8"><Info size={14} aria-hidden="true" /> Ayuda para instalar</button></div>
              <nav aria-label="Secciones de la aplicación" className="mt-6 pt-5 border-t border-white/[.07] flex flex-wrap gap-5 text-xs text-slate-400">{screenshots.length > 0 && <a href="#capturas" className="hover:text-white">Capturas</a>}{hasProfile && <a href="#funciones" className="hover:text-white">Funciones</a>}{app.video_url && <a href="#video-showcase" className="hover:text-white">Video</a>}<a href="#versiones" className="hover:text-white">Versiones</a><a href="#preguntas-app" className="hover:text-white">Preguntas</a></nav>
            </div>
            <div className="relative rounded-3xl bg-gradient-to-br from-indigo-500/[.07] to-cyan-500/[.04] border border-white/[.07] p-6 sm:p-8"><p className="eyebrow mb-5 text-center">Así se ve {app.name}</p><DeviceMockup appName={app.name} screenshots={screenshots} /></div>
          </div>
        </div>
      </section>
      <div className="site-container py-14 sm:py-20 space-y-16 sm:space-y-20">
        {screenshots.length > 0 && <section id="capturas"><div className="flex flex-wrap justify-between items-end gap-3"><div><p className="eyebrow">Explora la interfaz</p><h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">Cada detalle, a tu alcance.</h2></div><p className="text-xs text-slate-500">Selecciona una captura para ampliarla</p></div><div className="mt-7 flex gap-4 overflow-x-auto pb-5 snap-x snap-mandatory">{screenshots.map((screen,index) => <button type="button" key={screen.id} onClick={() => setImage(screen)} aria-label={`Ampliar captura ${index + 1}: ${screen.caption || app.name}`} className="group w-40 sm:w-48 shrink-0 snap-start text-left"><div className="aspect-[9/19] rounded-2xl overflow-hidden bg-[#101522] border border-white/10 group-hover:border-indigo-400/50 transition-colors"><img src={screen.image_url} alt={screen.caption || `Captura ${index + 1} de ${app.name}`} width={384} height={810} loading="lazy" className="w-full h-full object-cover object-top" /></div><p className="mt-3 text-xs text-slate-400 leading-relaxed line-clamp-2">{screen.caption || `Pantalla ${index + 1}`}</p></button>)}</div></section>}
        {hasProfile && <section id="funciones"><p className="eyebrow">Lo que puedes hacer</p><h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">Más posibilidades con {app.name}.</h2><div className="mt-7 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{profile.keyBenefits.map((benefit,index) => <article key={benefit.title} className="panel p-6"><span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300 text-xs font-mono">0{index + 1}</span><h3 className="mt-4 text-base font-semibold text-white">{benefit.title}</h3><p className="mt-3 text-sm text-slate-400 leading-relaxed">{benefit.description}</p><p className="mt-4 text-xs text-indigo-300 leading-relaxed">{benefit.result}</p></article>)}</div></section>}
        {app.video_url && <section id="video-showcase"><p className="eyebrow">Un vistazo en movimiento</p><h2 className="mt-3 mb-7 text-2xl sm:text-3xl font-semibold tracking-tight">Mira {app.name} en acción.</h2><VideoPreview url={app.video_url} name={app.name} poster={app.cover_image_url} /></section>}
        {hasAppPreview(app.slug) && <details className="panel p-5 sm:p-7" onToggle={event => setDemo(event.currentTarget.open)}><summary className="text-base font-medium text-slate-200">Explora una demostración interactiva</summary><p className="text-sm text-slate-400 mt-3 mb-6">Esta vista ilustra algunas funciones con datos de ejemplo. La experiencia completa está en la aplicación Android.</p>{demo && <AppPreviewShowcase slug={app.slug} />}</details>}
        {hasProfile && <section><p className="eyebrow">Para empezar</p><h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">Hazla parte de tu día.</h2><div className="mt-7 grid md:grid-cols-3 gap-6">{profile.dailyWorkflow.map(step => <div key={step.stepNumber}><span className="text-indigo-300 text-sm font-mono">{step.stepNumber}</span><h3 className="mt-3 text-lg font-medium">{step.title}</h3><p className="mt-2 text-sm text-slate-400 leading-relaxed">{step.description}</p></div>)}</div></section>}
        <section id="versiones"><div className="flex flex-wrap justify-between gap-4 items-end"><div><p className="eyebrow">Siempre al día</p><h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">Versiones y novedades.</h2></div>{date && <p className="text-xs text-slate-500">Última publicación: {date}</p>}</div><div className="mt-7"><ChangelogTimeline releases={app.releases || (release ? [release] : [])} appName={app.name} /></div></section>
        <section id="preguntas-app" className="grid lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-16"><div><p className="eyebrow">Respuestas claras</p><h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">Antes de instalar.</h2><button type="button" onClick={() => setGuide(true)} className="secondary-button mt-6"><Smartphone size={16} aria-hidden="true" /> Guía de instalación</button></div><div className="space-y-3">{profile.faqs.map(faq => <details key={faq.question} className="panel rounded-2xl group"><summary className="p-5 text-sm font-medium flex items-center justify-between gap-4 list-none">{faq.question}<span aria-hidden="true" className="text-xl text-slate-500 transition-transform group-open:rotate-45">+</span></summary><p className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">{faq.answer}</p></details>)}</div></section>
        <section className="panel bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 p-7 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-7"><div className="max-w-lg"><p className="eyebrow flex gap-2 items-center"><Sparkles size={14} aria-hidden="true" /> Descubre tu próxima app</p><h2 className="mt-3 text-2xl font-semibold">{app.name}, en tu Android.</h2><p className="mt-3 text-sm text-slate-400">Consulta los requisitos y descarga la versión disponible.</p></div><div className="flex flex-wrap gap-2">{downloadButton()}<button type="button" onClick={() => setQr(true)} className="icon-button" aria-label={`Abrir QR de ${app.name}`}><QrCode size={20} aria-hidden="true" /></button></div></section>
        <details className="text-sm text-slate-400"><summary className="flex gap-2 items-center min-h-11"><Code2 size={16} aria-hidden="true" /> Información técnica</summary><dl className="panel p-5 mt-4 grid sm:grid-cols-2 gap-5 text-xs"><div><dt className="text-slate-500">Paquete</dt><dd className="mt-2 text-slate-200 break-all font-mono">{app.package_name}</dd></div><div><dt className="text-slate-500">Plataformas</dt><dd className="mt-2 text-slate-200">{app.platforms.join(', ')}</dd></div>{release?.sha256_hash && <div className="sm:col-span-2"><dt className="text-slate-500">SHA-256 del archivo</dt><dd className="mt-2 text-slate-200 break-all select-all font-mono">{release.sha256_hash}</dd></div>}{app.github_url && <div><dt className="text-slate-500">Código fuente</dt><dd className="mt-2"><a href={app.github_url} target="_blank" rel="noopener noreferrer" className="text-indigo-300 inline-flex gap-1 items-center">Ver en GitHub <ArrowUpRight size={13} aria-hidden="true" /></a></dd></div>}</dl></details>
        <Link href="/#catalogo" className="inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200">Descubre más aplicaciones <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
    </main>
    <Footer />
    <QrCodeModal isOpen={qr} onClose={() => setQr(false)} app={app} release={release} />
    <InstallGuideModal isOpen={guide} onClose={() => setGuide(false)} appName={app.name} apkSize={release ? formatBytes(release.apk_size_bytes) : undefined} sha256Hash={release?.sha256_hash} downloadUrl={download} />
    {image && <Modal title={image.caption || `Captura de ${app.name}`} onClose={() => setImage(null)}><img src={image.image_url} alt={image.caption || `Captura de ${app.name}`} width={480} height={1013} className="max-h-[65dvh] w-full object-contain rounded-xl" /><p className="mt-4 text-xs text-slate-400 flex items-center gap-2"><ImageIcon size={14} aria-hidden="true" /> Captura de la aplicación</p></Modal>}
  </div>;
}
