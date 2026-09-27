'use client';

// Design Read: Mobile Engineering and Distribution Hub for developers and power users,
// with a high-end Linear/OLED Dark-Tech aesthetic, leaning toward Asymmetrical Bento +
// Double-Bezel nested architecture + kinetic spring physics.

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AppCard } from '@/components/AppCard';
import { ApiTester } from '@/components/ApiTester';
import { QrCodeModal } from '@/components/QrCodeModal';
import { InstallGuideModal } from '@/components/InstallGuideModal';
import { App, AppCategory } from '@/types/database';
import { formatBytes } from '@/lib/data';
import { useDeviceType } from '@/lib/use-device';
import confetti from 'canvas-confetti';
import {
  Search,
  Sparkles,
  Smartphone,
  Download,
  ShieldCheck,
  Zap,
  Layers,
  QrCode,
  ArrowUpRight,
  HardDrive,
  Cpu,
  Activity,
  Terminal,
  CheckCircle2
} from 'lucide-react';

const CATEGORIES: ('Todas' | AppCategory)[] = [
  'Todas',
  'Finanzas',
  'Productividad',
  'Seguridad',
  'Comunicación',
  'Utilidades'
];

export default function HomePage() {
  const { isAndroid } = useDeviceType();
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Todas' | AppCategory>('Todas');
  const [selectedQrApp, setSelectedQrApp] = useState<App | null>(null);
  const [installGuideApp, setInstallGuideApp] = useState<App | null>(null);

  const fetchApps = async () => {
    try {
      setLoading(true);
      const res = await fetch('/apps/api/v1/apps');
      if (res.ok) {
        const data = await res.json();
        setApps(data.apps || []);
      }
    } catch (err) {
      console.error('Error fetching apps:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  // Filtrado instantáneo
  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesCategory =
        selectedCategory === 'Todas' || app.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        app.name.toLowerCase().includes(q) ||
        app.tagline.toLowerCase().includes(q) ||
        app.category.toLowerCase().includes(q) ||
        app.package_name.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [apps, selectedCategory, searchQuery]);

  // Flagship app (FinUp)
  const flagshipApp = useMemo(() => {
    return apps.find((a) => a.slug === 'finup') || apps[0];
  }, [apps]);

  // Secondary apps for bento
  const otherApps = useMemo(() => {
    if (!flagshipApp) return filteredApps;
    return filteredApps.filter((a) => a.id !== flagshipApp.id);
  }, [filteredApps, flagshipApp]);

  // Descargas globales
  const totalDownloads = useMemo(() => {
    return apps.reduce((acc, app) => acc + (app.total_downloads || 0), 0);
  }, [apps]);

  const triggerDownloadConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.75 },
        colors: ['#6366f1', '#06b6d4', '#10b981']
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#04060a] text-slate-100 selection:bg-indigo-500 selection:text-white relative">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full space-y-24 sm:space-y-32 relative z-10">
        
        {/* 1. HERO SECTION: Editorial Spatial Rhythm */}
        <section className="relative pt-6 pb-4 sm:pb-8 text-center space-y-8">
          {/* Eyebrow Micro-Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-indigo-300 text-[10px] font-mono uppercase tracking-[0.22em] shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Distribución Móvil Oficial & Over-The-Air Hub</span>
          </div>

          {/* Master Headline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-7xl font-extrabold tracking-[-0.03em] text-white leading-[1.08]">
              Tus Aplicaciones Móviles.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300">
                Centralizadas & al Día.
              </span>
            </h1>

            <p className="text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
              Descarga binarios APK firmados directamente o escanea el código QR desde tu PC a tu celular. Monitoreo semántico de versiones y actualizaciones OTA obligatorias.
            </p>
          </div>

          {/* Quick Stats Ticker */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-center">
            <div className="double-bezel-outer py-1 px-1">
              <div className="double-bezel-inner px-5 py-2.5 flex items-center gap-3">
                <Smartphone className="w-4 h-4 text-indigo-400" />
                <div className="text-left font-mono">
                  <span className="block text-base font-bold text-white leading-none">{apps.length}</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">Apps Activas</span>
                </div>
              </div>
            </div>

            <div className="double-bezel-outer py-1 px-1">
              <div className="double-bezel-inner px-5 py-2.5 flex items-center gap-3">
                <HardDrive className="w-4 h-4 text-cyan-400" />
                <div className="text-left font-mono">
                  <span className="block text-base font-bold text-cyan-300 leading-none">{totalDownloads.toLocaleString()}+</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">Descargas</span>
                </div>
              </div>
            </div>

            <div className="double-bezel-outer py-1 px-1">
              <div className="double-bezel-inner px-5 py-2.5 flex items-center gap-3">
                <Zap className="w-4 h-4 text-emerald-400" />
                <div className="text-left font-mono">
                  <span className="block text-base font-bold text-emerald-300 leading-none">OTA Core</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">SemVer v1.0</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. THE ASYMMETRICAL BENTO SHOWCASE: Flagship App Highlight */}
        {flagshipApp && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-slate-400">
                  Lanzamiento Destacado
                </h2>
              </div>
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                Salud Financiera • Asesor con IA • Cero Deudas
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Flagship Hero Card (8 Cols) */}
              <div className="lg:col-span-8 double-bezel-outer">
                <div className="double-bezel-inner p-8 sm:p-10 flex flex-col justify-between h-full relative overflow-hidden">
                  {/* Decorative Radiant Orb */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-cyan-500/20 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

                  <div className="space-y-6 relative z-10">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-[1.5rem] p-1 bg-white/5 border border-white/10 shadow-xl shadow-cyan-950/40">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={flagshipApp.icon_url}
                            alt={flagshipApp.name}
                            className="w-full h-full rounded-[1.2rem] object-cover"
                          />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                              {flagshipApp.name}
                            </h3>
                            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/30">
                              NUEVA
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 font-mono mt-1">
                            Control de gastos y metas personales
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white/5 text-indigo-300 border border-white/10">
                        {flagshipApp.category}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                      {flagshipApp.tagline}
                    </p>

                    {/* Features list pills */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-300 font-mono">
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-cyan-300">
                        ✨ Asesor Financiero Personal con IA
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-emerald-300">
                        💰 Plan Anti-Deudas Paso a Paso
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-indigo-300">
                        🔒 100% Privado en tu Teléfono
                      </span>
                    </div>
                  </div>

                  {/* Flagship CTA Row with Button-in-Button */}
                  <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 relative z-10">
                    <div className="flex items-center gap-3">
                      {flagshipApp.latest_release && (
                        <a
                          href={`/api/v1/download/${flagshipApp.latest_release.id}`}
                          onClick={() => {
                            triggerDownloadConfetti();
                            setTimeout(() => setInstallGuideApp(flagshipApp), 700);
                          }}
                          className="pl-5 pr-2 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-semibold flex items-center gap-3 shadow-xl shadow-indigo-600/30 hover:shadow-cyan-600/40 transition-all duration-200 active:scale-[0.98] group/btn cursor-pointer"
                        >
                          <span>
                            {isAndroid ? 'Instalar APK en este Android' : 'Descargar APK'} ({formatBytes(flagshipApp.latest_release.apk_size_bytes)})
                          </span>
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center btn-nested-icon">
                            {isAndroid ? <Smartphone className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                          </div>
                        </a>
                      )}

                      <button
                        onClick={() => setSelectedQrApp(flagshipApp)}
                        className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 flex items-center justify-center transition-all cursor-pointer"
                        title="Escanear QR con tu teléfono"
                      >
                        <QrCode className="w-4 h-4 text-cyan-400" />
                      </button>
                    </div>

                    <Link
                      href={`/apps/${flagshipApp.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                    >
                      <span>Ver cómo te ayuda y todos sus beneficios</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Telemetry & Architecture Spec Card (4 Cols) */}
              <div className="lg:col-span-4 double-bezel-outer">
                <div className="double-bezel-inner p-8 flex flex-col justify-between h-full space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">
                        Telemetría OTA
                      </span>
                      <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                    </div>

                    <h4 className="text-lg font-bold text-white tracking-tight">
                      Protocolo de Distribución
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Resolución en el Edge con verificación semántica de binarios y conmutación de criticidad obligatoria.
                    </p>
                  </div>

                  {/* Micro Specs Block */}
                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <span className="text-slate-500">Latencia Endpoint</span>
                      <span className="text-emerald-400 font-bold">&lt; 18ms</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <span className="text-slate-500">Integridad APK</span>
                      <span className="text-cyan-300 font-bold">SHA-256 Validado</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <span className="text-slate-500">Formato Servido</span>
                      <span className="text-slate-200">Android APK (.apk)</span>
                    </div>
                  </div>

                  <Link
                    href="/#api-docs"
                    className="w-full py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-all"
                  >
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Probar en Sandbox OTA</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. CATALOG SECTION: Filters + Asymmetric Cards Grid */}
        <section id="catalogo" className="space-y-8 scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-slate-400 font-semibold">
                  Explorador de Versiones
                </span>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Catálogo de Aplicaciones
              </h2>
            </div>

            {/* Instant Filter Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por app, categoría..."
                className="w-full bg-[#0a0e17] border border-white/10 rounded-full pl-11 pr-8 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/60 transition-all font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills with Smooth Styling */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-xs px-4 py-2 rounded-full font-mono transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-bold border border-indigo-400/40'
                    : 'bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="double-bezel-outer h-64 animate-pulse" />
              ))}
            </div>
          ) : filteredApps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApps.map((app) => (
                <AppCard
                  key={app.id}
                  app={app}
                  isFeatured={app.slug === 'finup'}
                />
              ))}
            </div>
          ) : (
            <div className="double-bezel-outer text-center py-16">
              <div className="double-bezel-inner p-10 space-y-3">
                <Smartphone className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-base font-semibold text-slate-300">No se encontraron resultados</h3>
                <p className="text-xs text-slate-500">Prueba ajustando el término de búsqueda o categoría.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('Todas');
                  }}
                  className="mt-2 text-xs font-mono font-semibold text-indigo-400 hover:underline"
                >
                  Restablecer filtros
                </button>
              </div>
            </div>
          )}
        </section>

        {/* 4. OTA SANDBOX & API SPECIFICATION */}
        <section id="api-docs" className="space-y-6 scroll-mt-28">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono uppercase tracking-[0.2em]">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Consola OTA Interactiva</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              API de Actualizaciones Over-The-Air
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Tus aplicaciones cliente consultan este endpoint cada vez que inician o en segundo plano. Si <code className="text-indigo-300 font-mono">has_update</code> es verdadero, el cliente puede ofrecer la descarga directa o forzar la actualización si <code className="text-rose-400 font-mono">is_critical</code> está activo.
            </p>
          </div>

          <div className="double-bezel-outer">
            <div className="double-bezel-inner p-4 sm:p-8">
              <ApiTester initialSlug={flagshipApp?.slug || 'finup'} />
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating QR Modal if triggered */}
      {selectedQrApp && (
        <QrCodeModal
          isOpen={Boolean(selectedQrApp)}
          onClose={() => setSelectedQrApp(null)}
          app={selectedQrApp}
          release={selectedQrApp.latest_release}
        />
      )}

      {/* Floating Install Guide Modal if triggered */}
      {installGuideApp && (
        <InstallGuideModal
          isOpen={Boolean(installGuideApp)}
          onClose={() => setInstallGuideApp(null)}
          appName={installGuideApp.name}
          apkSize={installGuideApp.latest_release ? formatBytes(installGuideApp.latest_release.apk_size_bytes) : undefined}
          sha256Hash={installGuideApp.latest_release?.sha256_hash}
          downloadUrl={installGuideApp.latest_release ? `/api/v1/download/${installGuideApp.latest_release.id}` : undefined}
        />
      )}
    </div>
  );
}
