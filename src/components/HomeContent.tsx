'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  X,
  Smartphone,
  Download,
  QrCode,
  Sparkles,
  SlidersHorizontal,
  Check,
  FileDown,
  FolderOpen,
  Settings,
  Star,
  ShieldCheck,
  UploadCloud,
  Flame,
  Zap
} from 'lucide-react';
import { App } from '@/types/database';
import { appHref, downloadHref } from '@/lib/urls';
import { formatBytes } from '@/lib/data';
import { useDeviceType } from '@/lib/use-device';
import { AppCard } from './AppCard';
import { QrCodeModal } from './QrCodeModal';
import { InstallGuideModal } from './InstallGuideModal';

const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

type Filters = { q: string; category: string; sort: string };

const faqs = [
  ['¿Cómo descargo e instalo una aplicación APK?', 'Elige cualquier app del catálogo y haz clic en "Instalar" o "Descargar APK". Si estás navegando desde un computador, pulsa el botón QR para escanearlo con la cámara de tu teléfono Android y descargarlo al instante.'],
  ['¿Es seguro instalar estos archivos APK?', 'Sí, absolutamente. Todas las aplicaciones en Proton Apps están compiladas y firmadas directamente para Android con verificación de hash SHA-256 criptográfico, libres de publicidad invasiva o malware.'],
  ['¿Las aplicaciones funcionan en iPhone?', 'Los archivos APK son el formato nativo para Android. Si una app cuenta con versión web o enlace a la App Store de iOS, encontrarás el enlace correspondiente en su ficha técnica.'],
  ['¿Cómo actualizo una app que ya instalé?', 'La propia app te avisará cuando haya una actualización disponible gracias a la API integrada de Proton Apps. También puedes volver a esta tienda y descargar el APK de la nueva versión; Android actualizará la app sin borrar tus datos.'],
  ['¿Puedo publicar mis propias apps en Proton Apps?', '¡Sí! Contamos con una Consola de Desarrolladores integrada donde puedes registrarte, iniciar sesión y subir tus aplicaciones y versiones APK.'],
];

export function HomeContent({ apps, initialFilters }: { apps: App[]; initialFilters: Filters }) {
  const [filters, setFilters] = useState(initialFilters);
  const [qr, setQr] = useState(false);
  const [guide, setGuide] = useState(false);
  const { isIOS, isAndroid } = useDeviceType();

  // Flagship / App de portada (SpeedNova o FinUp)
  const flagship = apps.find(app => app.slug === 'speednova') || apps.find(app => app.slug === 'finup') || apps[0];

  const categories = useMemo(
    () => [...new Set(apps.map((app) => app.category))].sort((a, b) => a.localeCompare(b, 'es')),
    [apps]
  );

  const counts = useMemo(
    () => new Map<string, number>(categories.map((category) => [category, apps.filter((app) => app.category === category).length])),
    [apps, categories]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (filters.q) params.set('q', filters.q); else params.delete('q');
    if (filters.category !== 'Todas') params.set('category', filters.category); else params.delete('category');
    if (filters.sort !== 'recommended') params.set('sort', filters.sort); else params.delete('sort');
    const query = params.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`);
  }, [filters]);

  useEffect(() => {
    const restore = () => {
      const params = new URLSearchParams(window.location.search);
      setFilters({
        q: params.get('q') || '',
        category: params.get('category') || 'Todas',
        sort: params.get('sort') || 'recommended',
      });
    };
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, []);

  const filtered = useMemo(() => {
    const term = normalize(filters.q.trim());
    return apps
      .filter((app) => (filters.category === 'Todas' || app.category === filters.category) && (!term || normalize(`${app.name} ${app.tagline} ${app.category}`).includes(term)))
      .sort((a, b) => {
        if (filters.sort === 'name') return a.name.localeCompare(b.name, 'es');
        if (filters.sort === 'latest') return new Date(b.latest_release?.published_at || b.updated_at).getTime() - new Date(a.latest_release?.published_at || a.updated_at).getTime();
        return (b.total_downloads || 0) - (a.total_downloads || 0);
      });
  }, [apps, filters]);

  // Ranking Top 4 apps
  const topRankedApps = useMemo(() => {
    return [...apps].sort((a, b) => (b.total_downloads || 0) - (a.total_downloads || 0)).slice(0, 4);
  }, [apps]);

  const reset = () => setFilters({ q: '', category: 'Todas', sort: 'recommended' });

  return (
    <main id="main-content" className="bg-[#f8fafc] text-slate-900">
      {/* 1. Hero Spotlight / Google Play Banner Destacado */}
      <section className="border-b border-slate-200/80 bg-white">
        <div className="site-container py-10 sm:py-14">
          {flagship && (
            <div className="relative rounded-3xl bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 border border-slate-200/90 p-6 sm:p-10 shadow-xs overflow-hidden">
              {/* Decorative subtle ambient lights */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-100/50 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-blue-100/30 blur-3xl pointer-events-none" />

              <div className="relative grid lg:grid-cols-[1.25fr_1fr] items-center gap-8 lg:gap-12">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <Sparkles size={13} className="text-emerald-700" />
                      App Destacada de la Semana
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                      {flagship.category}
                    </span>
                  </div>

                  <div className="flex items-start gap-4">
                    <img
                      src={flagship.icon_url}
                      alt=""
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl object-cover border border-slate-200 shadow-sm shrink-0"
                    />
                    <div>
                      <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        {flagship.name}
                      </h1>
                      <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                        Proton Dev · {flagship.tagline}
                      </p>

                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-600">
                        <span className="flex items-center gap-1 font-semibold text-slate-900">
                          <Star size={14} className="fill-amber-400 text-amber-400" />
                          <span>4.9</span>
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="font-medium text-slate-700">
                          {flagship.latest_release ? formatBytes(flagship.latest_release.apk_size_bytes) : 'APK Oficial'}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <ShieldCheck size={14} />
                          Verificada Play Protect
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-5 text-sm text-slate-600 leading-relaxed max-w-xl">
                    {flagship.description.slice(0, 190)}...
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    {flagship.latest_release && !isIOS ? (
                      <a
                        href={downloadHref(flagship.latest_release.id)}
                        onClick={() => setGuide(true)}
                        className="py-3 px-6 rounded-full bg-[#01875f] hover:bg-[#017250] text-white text-sm font-semibold shadow-xs hover:shadow-sm transition-all flex items-center gap-2"
                      >
                        <Download size={17} />
                        <span>{isAndroid ? 'Instalar ahora' : 'Descargar APK'}</span>
                        <span className="text-xs opacity-80">· {formatBytes(flagship.latest_release.apk_size_bytes)}</span>
                      </a>
                    ) : (
                      <Link
                        href={appHref(flagship.slug)}
                        className="py-3 px-6 rounded-full bg-[#01875f] hover:bg-[#017250] text-white text-sm font-semibold shadow-xs transition-all flex items-center gap-2"
                      >
                        <span>Conocer la aplicación</span>
                        <ArrowRight size={16} />
                      </Link>
                    )}

                    <Link
                      href={appHref(flagship.slug)}
                      className="py-3 px-5 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-sm font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <span>Ver ficha completa</span>
                      <ArrowUpRight size={15} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => setQr(true)}
                      className="h-11 w-11 rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors"
                      aria-label="Abrir QR para descargar en teléfono"
                    >
                      <QrCode size={18} />
                    </button>
                  </div>
                </div>

                {/* Device Visual Mockup in Spotlight */}
                <div className="relative h-[260px] sm:h-[300px] flex items-center justify-center">
                  <div className="relative w-full max-w-[340px] h-full flex items-center justify-center">
                    {flagship.screenshots?.[0] ? (
                      <div className="relative w-44 sm:w-48 h-[270px] sm:h-[300px] rounded-[28px] border-[5px] border-slate-800 bg-slate-900 shadow-xl overflow-hidden -rotate-3 hover:rotate-0 transition-transform duration-300">
                        <img
                          src={flagship.screenshots[0].image_url}
                          alt=""
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    ) : (
                      <div className="w-36 h-36 rounded-3xl bg-white border border-slate-200 shadow-lg flex items-center justify-center p-4">
                        <img src={flagship.icon_url} alt="" className="w-full h-full object-cover rounded-2xl" />
                      </div>
                    )}

                    {flagship.screenshots?.[1] && (
                      <div className="absolute right-0 w-36 sm:w-40 h-[240px] sm:h-[260px] rounded-[24px] border-[4px] border-slate-700 bg-slate-900 shadow-lg overflow-hidden rotate-6 opacity-90 hidden sm:block">
                        <img
                          src={flagship.screenshots[1].image_url}
                          alt=""
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. Top Apps Ranking (Play Store Top Gratis) */}
      <section className="site-container py-10 border-b border-slate-200/70">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <Flame size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Top Aplicaciones Populares</h2>
              <p className="text-xs text-slate-500">Las herramientas más descargadas por la comunidad</p>
            </div>
          </div>
          <Link
            href="/#catalogo"
            className="text-xs font-semibold text-[#01875f] hover:text-[#017250] flex items-center gap-1"
          >
            <span>Ver todas</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topRankedApps.map((app, index) => (
            <Link
              key={app.id}
              href={appHref(app.slug)}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all group"
            >
              <span className="w-6 text-center font-bold text-base text-slate-400 group-hover:text-[#01875f] transition-colors">
                {index + 1}
              </span>

              <img
                src={app.icon_url}
                alt=""
                className="w-13 h-13 rounded-2xl object-cover border border-slate-100 shadow-2xs shrink-0"
              />

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm text-slate-900 truncate group-hover:text-[#01875f] transition-colors">
                  {app.name}
                </h3>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">{app.category}</p>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-600 mt-1">
                  <Star size={11} className="fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-slate-800">4.9</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-500">
                    {app.latest_release ? formatBytes(app.latest_release.apk_size_bytes) : 'APK'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Catálogo Principal con Filtros y Búsqueda */}
      <section id="catalogo" className="site-container py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Explorar Todas las Aplicaciones
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Descarga directa de archivos APK verificados para tu dispositivo Android
            </p>
          </div>
          <div className="text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
            {filtered.length} {filtered.length === 1 ? 'aplicación disponible' : 'aplicaciones disponibles'}
          </div>
        </div>

        {/* Search Bar & Order Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={18} aria-hidden="true" className="absolute left-4 top-3 text-slate-400" />
            <input
              type="search"
              name="q"
              autoComplete="off"
              value={filters.q}
              onChange={(e) => setFilters({ ...filters, q: e.target.value })}
              placeholder="Buscar apps, utilidades o funciones..."
              className="w-full h-11 pl-11 pr-10 rounded-full border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#01875f] focus:ring-2 focus:ring-[#01875f]/20 transition-all shadow-2xs"
            />
            {filters.q && (
              <button
                type="button"
                onClick={() => setFilters({ ...filters, q: '' })}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Limpiar búsqueda"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="relative sm:w-56">
            <SlidersHorizontal size={16} className="absolute left-4 top-3 text-slate-400" />
            <select
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              className="w-full h-11 pl-11 pr-4 rounded-full border border-slate-300 bg-white text-xs font-medium text-slate-700 focus:outline-none focus:border-[#01875f] focus:ring-2 focus:ring-[#01875f]/20 cursor-pointer shadow-2xs"
            >
              <option value="recommended">Recomendadas</option>
              <option value="latest">Últimas actualizaciones</option>
              <option value="name">Nombre: A–Z</option>
            </select>
          </div>
        </div>

        {/* Category Pills (Google Play style) */}
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          {['Todas', ...categories].map((category) => {
            const isActive = filters.category === category;
            const count = category === 'Todas' ? apps.length : counts.get(category) || 0;
            return (
              <button
                type="button"
                key={category}
                onClick={() => setFilters({ ...filters, category })}
                className={isActive ? 'category-pill category-pill-active' : 'category-pill'}
              >
                <span>{category}</span>
                <span className="ml-1.5 opacity-70 text-[11px] font-mono">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Warning banner for iOS */}
        {isIOS && (
          <div className="mt-5 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2.5">
            <Smartphone size={16} className="text-amber-600 shrink-0" />
            <span>Estás navegando desde un dispositivo iOS. Los archivos APK se instalan en Android. Usa el código QR para abrir y descargar la app en tu teléfono Android compatible.</span>
          </div>
        )}

        {/* Grid of Apps */}
        {filtered.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((app) => (
              <AppCard key={app.id} app={app} isFeatured={app.slug === flagship?.slug} />
            ))}
          </div>
        ) : (
          <div className="mt-8 p-12 text-center bg-white rounded-3xl border border-slate-200">
            <Search size={36} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-base font-bold text-slate-800">No encontramos aplicaciones con ese criterio</h3>
            <p className="text-xs text-slate-500 mt-1">Intenta con otro término o selecciona otra categoría.</p>
            <button
              type="button"
              onClick={reset}
              className="mt-4 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              Ver todas las apps
            </button>
          </div>
        )}
      </section>

      {/* 4. Banner para Desarrolladores (FinUp Login & Submission CTA) */}
      <section className="site-container py-6">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 p-7 sm:p-10 text-white shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/20 text-white backdrop-blur-xs">
              <UploadCloud size={14} />
              Proton Developer Studio
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              ¿Construyes aplicaciones para Android?
            </h2>
            <p className="text-sm text-emerald-100 max-w-xl">
              Publica tus archivos APK directamente en la tienda, obtén métricas de descargas, y gestiona actualizaciones automáticas in-app con nuestro SDK.
            </p>
          </div>

          <Link
            href="/developer"
            className="py-3 px-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-sm shadow-md transition-all shrink-0 flex items-center gap-2"
          >
            <span>Entrar a la Consola</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 5. Guía de Instalación Rápida */}
      <section id="instalacion" className="border-t border-slate-200/80 bg-white py-14 sm:py-18">
        <div className="site-container">
          <div className="max-w-xl">
            <p className="eyebrow">Instalación Directa</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-2">
              Instala cualquier app en 3 sencillos pasos
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              La distribución APK te brinda independencia, total privacidad y actualizaciones instantáneas sin intermediarios.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: FileDown,
                num: '01',
                title: 'Descarga el APK',
                text: 'Pulsa Instalar en tu teléfono o escanea el código QR desde tu computador para descargar el archivo de instalación.',
              },
              {
                icon: FolderOpen,
                num: '02',
                title: 'Abre el archivo',
                text: 'Toca la notificación de descarga completa o accede a tu carpeta Descargas en el gestor de archivos de Android.',
              },
              {
                icon: Settings,
                num: '03',
                title: 'Confirma la instalación',
                text: 'Autoriza la instalación desde el navegador si Android lo solicita y pulsa Instalar para disfrutar de tu app al instante.',
              },
            ].map((step) => (
              <div key={step.title} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <step.icon size={22} />
                  </div>
                  <span className="font-mono text-sm font-bold text-slate-400">{step.num}</span>
                </div>
                <h3 className="font-bold text-base text-slate-900">{step.title}</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:text-left">
            <button
              type="button"
              onClick={() => setGuide(true)}
              className="px-5 py-2.5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors inline-flex items-center gap-2"
            >
              <span>Ver tutorial paso a paso con capturas</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Preguntas Frecuentes */}
      <section id="preguntas" className="site-container py-14 sm:py-18">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-8 lg:gap-14">
          <div>
            <p className="eyebrow">Preguntas Frecuentes</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-2">
              Todo lo que necesitas saber
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Resolvemos tus inquietudes sobre seguridad, compatibilidad y actualizaciones de las aplicaciones.
            </p>
            <div className="mt-6">
              <Link
                href="/privacy"
                className="text-xs font-semibold text-[#01875f] hover:text-[#017250] inline-flex items-center gap-1"
              >
                <span>Leer política de privacidad y seguridad</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map(([question, answer]) => (
              <details
                key={question}
                className="rounded-2xl border border-slate-200/90 bg-white p-5 group transition-all"
              >
                <summary className="flex items-center justify-between gap-4 text-sm font-semibold text-slate-900 cursor-pointer list-none">
                  <span>{question}</span>
                  <span className="text-slate-400 group-open:rotate-45 transition-transform text-lg">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {flagship && (
        <QrCodeModal isOpen={qr} onClose={() => setQr(false)} app={flagship} release={flagship.latest_release} />
      )}
      <InstallGuideModal
        isOpen={guide}
        onClose={() => setGuide(false)}
        appName={flagship?.name}
        sha256Hash={flagship?.latest_release?.sha256_hash}
      />
    </main>
  );
}
