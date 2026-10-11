'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Download,
  QrCode,
  Smartphone,
  Sparkles,
  Check,
  Info,
  Code2,
  Image as ImageIcon,
  Star,
  ShieldCheck
} from 'lucide-react';
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
  const date = release
    ? new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeZone: 'America/Bogota' }).format(new Date(release.published_at))
    : undefined;

  const rating = app.slug === 'finup' ? '4.9' : app.slug === 'speednova' ? '4.9' : '4.8';

  const downloadButton = (className = '') =>
    download && !isIOS ? (
      <a
        href={download}
        onClick={() => setGuide(true)}
        className={`py-3 px-6 rounded-full bg-[#01875f] hover:bg-[#017250] text-white text-sm font-semibold shadow-xs hover:shadow-sm transition-all inline-flex items-center gap-2 ${className}`}
      >
        <Download size={17} aria-hidden="true" />
        <span>{isAndroid ? 'Instalar en Android' : 'Descargar APK'}</span>
        {release && <span className="text-xs opacity-80">· {formatBytes(release.apk_size_bytes)}</span>}
      </a>
    ) : app.app_store_url && isIOS ? (
      <a
        href={app.app_store_url}
        className={`py-3 px-6 rounded-full bg-[#01875f] hover:bg-[#017250] text-white text-sm font-semibold shadow-xs transition-all inline-flex items-center gap-2 ${className}`}
      >
        <span>Ver en App Store</span>
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    ) : null;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col">
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Header Hero in Play Store Style */}
        <section className="bg-white border-b border-slate-200/80">
          <div className="site-container py-8 sm:py-12">
            <Link
              href="/#catalogo"
              className="inline-flex gap-2 items-center text-xs font-semibold text-slate-500 hover:text-slate-800 mb-6 transition-colors"
            >
              <ArrowLeft size={15} aria-hidden="true" /> Volver a todas las aplicaciones
            </Link>

            <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] items-center">
              <div>
                <div className="flex items-center gap-4">
                  <img
                    src={app.icon_url}
                    width={72}
                    height={72}
                    alt=""
                    className="h-18 w-18 rounded-3xl object-cover border border-slate-200 shadow-sm"
                  />
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {app.name}
                    </h1>
                    <p className="mt-0.5 text-xs font-semibold text-[#01875f]">
                      Proton Dev Space · {app.category}
                      {app.status === 'beta' ? ' · Acceso Anticipado' : ''}
                    </p>

                    {/* Play Store Badges */}
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-600">
                      <span className="flex items-center gap-1 font-bold text-slate-900">
                        <Star size={13} className="fill-amber-400 text-amber-400" />
                        <span>{rating}</span>
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="font-medium text-slate-700">
                        {release ? formatBytes(release.apk_size_bytes) : 'APK Oficial'}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
                        <ShieldCheck size={13} />
                        Verificada Play Protect
                      </span>
                    </div>
                  </div>
                </div>

                <h2 className="mt-6 text-xl sm:text-2xl font-bold tracking-tight text-slate-800">
                  {hasProfile ? profile.heroTitle : app.tagline}
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
                  {hasProfile
                    ? profile.heroSubtitle
                    : `Descubre ${app.name}, explora sus pantallas y consulta los detalles técnicos antes de instalarla en tu dispositivo Android.`}
                </p>

                {hasProfile && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {profile.trustPills.map((pill) => (
                      <span
                        key={pill}
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 font-medium"
                      >
                        <Check size={12} className="text-emerald-600" aria-hidden="true" /> {pill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Primary Download & QR CTA */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {downloadButton()}
                  <button
                    type="button"
                    onClick={() => setQr(true)}
                    className="py-3 px-5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors inline-flex items-center gap-2"
                  >
                    <QrCode size={17} aria-hidden="true" /> Abrir en mi teléfono
                  </button>
                </div>

                {isIOS && (
                  <p className="mt-3 text-xs text-amber-700 font-medium">
                    El archivo APK necesita un teléfono Android. Usa el código QR para abrir esta app en un dispositivo compatible.
                  </p>
                )}

                {!release && (
                  <p className="mt-3 text-xs text-slate-500">
                    La descarga todavía no está disponible en este momento. Puedes explorar sus funciones y capturas.
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 font-mono">
                  {release && (
                    <>
                      <span>v{release.version_name}</span>
                      <span>·</span>
                      <span>{formatBytes(release.apk_size_bytes)}</span>
                      <span>·</span>
                      <span>{release.min_os_version}</span>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => setGuide(true)}
                    className="font-sans text-[#01875f] hover:underline font-semibold inline-flex items-center gap-1"
                  >
                    <Info size={13} /> Ayuda de instalación
                  </button>
                </div>

                <nav
                  aria-label="Secciones de la aplicación"
                  className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-medium text-slate-500"
                >
                  {screenshots.length > 0 && (
                    <a href="#capturas" className="hover:text-slate-900 transition-colors">
                      Capturas de pantalla
                    </a>
                  )}
                  {hasProfile && (
                    <a href="#funciones" className="hover:text-slate-900 transition-colors">
                      Funcionalidades
                    </a>
                  )}
                  {app.video_url && (
                    <a href="#video-showcase" className="hover:text-slate-900 transition-colors">
                      Video Demo
                    </a>
                  )}
                  <a href="#versiones" className="hover:text-slate-900 transition-colors">
                    Novedades
                  </a>
                  <a href="#preguntas-app" className="hover:text-slate-900 transition-colors">
                    Preguntas frecuentes
                  </a>
                </nav>
              </div>

              {/* Right Device Visual */}
              <div className="relative rounded-3xl bg-slate-50 border border-slate-200/80 p-6 sm:p-8 flex items-center justify-center">
                <DeviceMockup appName={app.name} screenshots={screenshots} />
              </div>
            </div>
          </div>
        </section>

        {/* Content sections */}
        <div className="site-container py-12 space-y-14">
          {/* Screenshots Gallery */}
          {screenshots.length > 0 && (
            <section id="capturas">
              <div className="flex flex-wrap justify-between items-end gap-3 mb-5">
                <div>
                  <p className="eyebrow">Capturas de pantalla</p>
                  <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                    Así se ve {app.name} en tu Android
                  </h2>
                </div>
                <p className="text-xs text-slate-500">Selecciona cualquier imagen para ampliarla</p>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                {screenshots.map((screen, index) => (
                  <button
                    type="button"
                    key={screen.id}
                    onClick={() => setImage(screen)}
                    aria-label={`Ampliar captura ${index + 1}: ${screen.caption || app.name}`}
                    className="group w-40 sm:w-48 shrink-0 snap-start text-left cursor-pointer"
                  >
                    <div className="aspect-[9/19] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 group-hover:border-[#01875f] group-hover:shadow-md transition-all">
                      <img
                        src={screen.image_url}
                        alt={screen.caption || `Captura ${index + 1} de ${app.name}`}
                        width={384}
                        height={810}
                        loading="lazy"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                      {screen.caption || `Pantalla ${index + 1}`}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Benefits */}
          {hasProfile && (
            <section id="funciones">
              <p className="eyebrow">Funciones Principales</p>
              <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Todo lo que puedes lograr con {app.name}
              </h2>
              <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {profile.keyBenefits.map((benefit, index) => (
                  <article key={benefit.title} className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 text-xs font-mono font-bold">
                      0{index + 1}
                    </span>
                    <h3 className="mt-3 text-base font-bold text-slate-900">{benefit.title}</h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">{benefit.description}</p>
                    <p className="mt-3 text-xs text-emerald-700 font-medium">{benefit.result}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Video Showcase if available */}
          {app.video_url && (
            <section id="video-showcase">
              <p className="eyebrow">En Movimiento</p>
              <h2 className="mt-1 mb-6 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Mira {app.name} en acción
              </h2>
              <VideoPreview url={app.video_url} name={app.name} poster={app.cover_image_url} />
            </section>
          )}

          {/* Interactive Web Preview if available */}
          {hasAppPreview(app.slug) && (
            <details
              className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs"
              onToggle={(event) => setDemo(event.currentTarget.open)}
            >
              <summary className="text-base font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                <span>Explorar demostración interactiva web</span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  Probar ahora
                </span>
              </summary>
              <p className="text-xs text-slate-500 mt-2 mb-6">
                Esta vista ilustra algunas funciones clave en tu navegador. La experiencia nativa completa está en la versión Android APK.
              </p>
              {demo && <AppPreviewShowcase slug={app.slug} />}
            </details>
          )}

          {/* Changelog Timeline */}
          <section id="versiones">
            <div className="flex flex-wrap justify-between gap-4 items-end mb-6">
              <div>
                <p className="eyebrow">Historial de Actualizaciones</p>
                <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  Novedades de la última versión
                </h2>
              </div>
              {date && <p className="text-xs text-slate-500">Publicado el {date}</p>}
            </div>
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
              <ChangelogTimeline releases={app.releases || (release ? [release] : [])} appName={app.name} />
            </div>
          </section>

          {/* FAQ section */}
          <section id="preguntas-app" className="grid lg:grid-cols-[1fr_1.5fr] gap-8">
            <div>
              <p className="eyebrow">Dudas Frecuentes</p>
              <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Preguntas antes de instalar
              </h2>
              <button
                type="button"
                onClick={() => setGuide(true)}
                className="mt-5 px-4 py-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors inline-flex items-center gap-1.5"
              >
                <Smartphone size={15} /> Ver guía de instalación APK
              </button>
            </div>

            <div className="space-y-3">
              {profile.faqs.map((faq) => (
                <details key={faq.question} className="rounded-2xl border border-slate-200/90 bg-white p-5 group">
                  <summary className="text-sm font-semibold text-slate-900 flex items-center justify-between gap-4 cursor-pointer list-none">
                    <span>{faq.question}</span>
                    <span className="text-slate-400 group-open:rotate-45 transition-transform text-lg">+</span>
                  </summary>
                  <p className="mt-3 text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Technical Info */}
          <details className="text-xs text-slate-500">
            <summary className="flex gap-2 items-center cursor-pointer font-semibold text-slate-700">
              <Code2 size={16} /> Ver detalles técnicos y SHA-256
            </summary>
            <div className="bg-white rounded-2xl border border-slate-200 p-5 mt-3 grid sm:grid-cols-2 gap-4">
              <div>
                <span className="text-slate-400 font-medium">Nombre de paquete Android</span>
                <p className="mt-1 font-mono text-slate-800">{app.package_name}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Plataformas compatibles</span>
                <p className="mt-1 text-slate-800">{app.platforms.join(', ')}</p>
              </div>
              {release?.sha256_hash && (
                <div className="sm:col-span-2">
                  <span className="text-slate-400 font-medium">Firma Criptográfica SHA-256</span>
                  <p className="mt-1 font-mono text-slate-800 break-all select-all text-[11px] bg-slate-50 p-2 rounded-lg border border-slate-200">
                    {release.sha256_hash}
                  </p>
                </div>
              )}
            </div>
          </details>
        </div>
      </main>

      <Footer />

      <QrCodeModal isOpen={qr} onClose={() => setQr(false)} app={app} release={release} />
      <InstallGuideModal
        isOpen={guide}
        onClose={() => setGuide(false)}
        appName={app.name}
        apkSize={release ? formatBytes(release.apk_size_bytes) : undefined}
        sha256Hash={release?.sha256_hash}
        downloadUrl={download}
      />
      {image && (
        <Modal title={image.caption || `Captura de ${app.name}`} onClose={() => setImage(null)}>
          <img
            src={image.image_url}
            alt={image.caption || `Captura de ${app.name}`}
            width={480}
            height={1013}
            className="max-h-[65dvh] w-full object-contain rounded-xl"
          />
          <p className="mt-4 text-xs text-slate-500 flex items-center gap-2">
            <ImageIcon size={14} aria-hidden="true" /> Captura original de la aplicación
          </p>
        </Modal>
      )}
    </div>
  );
}
