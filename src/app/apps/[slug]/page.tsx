'use client';

// Design Read: High-end App Detail Dossier with Apple/Linear-grade hardware framing,
// Double-Bezel nested architecture, Button-in-Button CTAs, and responsive kinetic motion.

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DeviceMockup } from '@/components/DeviceMockup';
import { QrCodeModal } from '@/components/QrCodeModal';
import { ChangelogTimeline } from '@/components/ChangelogTimeline';
import { ApiTester } from '@/components/ApiTester';
import { App } from '@/types/database';
import { formatBytes } from '@/lib/data';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Download,
  QrCode,
  ExternalLink,
  ShieldCheck,
  GitBranch,
  HardDrive,
  Calendar,
  Layers,
  FileText,
  History,
  Terminal,
  AlertTriangle,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

export default function AppDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [app, setApp] = useState<App | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'info' | 'history' | 'api'>('info');
  const [isQrOpen, setIsQrOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const loadApp = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/v1/apps`);
        if (res.ok) {
          const data = await res.json();
          const found = (data.apps as App[]).find((a) => a.slug === slug);
          setApp(found || null);
        }
      } catch (err) {
        console.error('Error cargando app:', err);
      } finally {
        setLoading(false);
      }
    };
    loadApp();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#04060a] text-slate-100 flex flex-col">
        <Navbar />
        <div className="flex-1 max-w-7xl mx-auto px-4 py-32 w-full flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!app) {
    return (
      <div className="min-h-screen bg-[#04060a] text-slate-100 flex flex-col">
        <Navbar />
        <div className="flex-1 max-w-7xl mx-auto px-4 py-32 w-full text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Aplicación no encontrada</h2>
          <p className="text-sm text-slate-400">El slug &ldquo;{slug}&rdquo; no existe en nuestro catálogo.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al catálogo</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const latestRelease = app.latest_release;

  const handleDownload = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#6366f1', '#06b6d4', '#10b981']
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="min-h-screen bg-[#04060a] text-slate-100 selection:bg-indigo-500 selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-12">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/#catalogo"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Catálogo</span>
          </Link>
        </div>

        {/* Master Header Card: Double-Bezel Architecture */}
        <section className="double-bezel-outer">
          <div className="double-bezel-inner p-8 sm:p-12 relative overflow-hidden">
            {/* Ambient Radiant Backdrop */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/20 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
              {/* App Identity */}
              <div className="flex items-start sm:items-center gap-6">
                <div className="relative shrink-0">
                  <div className="w-20 sm:w-28 h-20 sm:h-28 rounded-[1.75rem] p-1 bg-white/5 border border-white/10 shadow-2xl shadow-black/60">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={app.icon_url}
                      alt={app.name}
                      className="w-full h-full rounded-[1.4rem] object-cover"
                    />
                  </div>
                  {app.status === 'published' && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0a0e17] border border-white/10 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {app.name}
                    </h1>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white/5 text-indigo-300 border border-white/10">
                      {app.category}
                    </span>
                    {latestRelease?.is_critical && (
                      <span className="text-[10px] font-mono uppercase tracking-[0.15em] font-bold px-2.5 py-1 rounded-full bg-rose-950/80 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Parche Crítico
                      </span>
                    )}
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                    {app.tagline}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                    <span>{app.package_name}</span>
                    <span>•</span>
                    <span className="text-slate-200">
                      Build: {latestRelease ? `v${latestRelease.version_name} (${latestRelease.version_code})` : 'v1.0.0'}
                    </span>
                    <span>•</span>
                    <span>{app.total_downloads?.toLocaleString() || '1,200+'} descargas</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Button-in-Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                {latestRelease && (
                  <a
                    href={`/api/v1/download/${latestRelease.id}`}
                    onClick={handleDownload}
                    className="pl-6 pr-2 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-between gap-3 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all duration-200 active:scale-[0.98] group/btn cursor-pointer"
                  >
                    <span>Descargar APK ({formatBytes(latestRelease.apk_size_bytes)})</span>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center btn-nested-icon">
                      <Download className="w-4 h-4" />
                    </div>
                  </a>
                )}

                <button
                  onClick={() => setIsQrOpen(true)}
                  className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <QrCode className="w-4 h-4 text-cyan-400" />
                  <span>Escanear QR</span>
                </button>
              </div>
            </div>

            {/* External Links Bar */}
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center gap-3 text-xs font-mono">
              {app.play_store_url && (
                <a
                  href={app.play_store_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/5 transition-colors"
                >
                  <span>Google Play</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              )}
              {app.app_store_url && (
                <a
                  href={app.app_store_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/5 transition-colors"
                >
                  <span>Apple App Store</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              )}
              {app.github_url && (
                <a
                  href={app.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/5 transition-colors"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>Repositorio Oficial</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Content Section: 2 Columns */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Dossier Tabs (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Concentric Tabs Header */}
            <div className="double-bezel-outer p-1">
              <div className="double-bezel-inner p-1.5 flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`flex-1 py-2.5 px-4 rounded-full text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'info'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Descripción</span>
                </button>

                <button
                  onClick={() => setActiveTab('history')}
                  className={`flex-1 py-2.5 px-4 rounded-full text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'history'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <History className="w-3.5 h-3.5" />
                  <span>Historial de Versiones</span>
                </button>

                <button
                  onClick={() => setActiveTab('api')}
                  className={`flex-1 py-2.5 px-4 rounded-full text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'api'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Prueba OTA</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Info & Markdown Description */}
            {activeTab === 'info' && (
              <div className="double-bezel-outer">
                <div className="double-bezel-inner p-8 space-y-6">
                  <div className="space-y-4 text-sm text-slate-300 leading-relaxed whitespace-pre-line prose prose-invert prose-indigo max-w-none">
                    {app.description}
                  </div>

                  {/* Technical Specifications */}
                  <div className="pt-6 border-t border-white/5">
                    <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 font-bold mb-4">
                      Especificaciones de Compilación
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                      <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                        <span className="text-slate-500 block mb-1">Package Name</span>
                        <span className="text-slate-200">{app.package_name}</span>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                        <span className="text-slate-500 block mb-1">SO Mínimo</span>
                        <span className="text-slate-200">{latestRelease?.min_os_version || 'Android 8.0+'}</span>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                        <span className="text-slate-500 block mb-1">Estado de Lanzamiento</span>
                        <span className="text-emerald-400 capitalize">{app.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Changelog Timeline */}
            {activeTab === 'history' && (
              <div className="space-y-6">
                <ChangelogTimeline
                  releases={app.releases || (latestRelease ? [latestRelease] : [])}
                  appName={app.name}
                />
              </div>
            )}

            {/* Tab 3: API Tester */}
            {activeTab === 'api' && (
              <div className="double-bezel-outer">
                <div className="double-bezel-inner p-6 sm:p-8">
                  <ApiTester initialSlug={app.slug} />
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Smartphone Mockup (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="sticky top-28 space-y-4">
              <div className="text-center">
                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-slate-400">
                  Capturas de Pantalla
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Explora la experiencia nativa de {app.name}</p>
              </div>

              <DeviceMockup
                appName={app.name}
                screenshots={app.screenshots || []}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* QR Code Modal */}
      <QrCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        app={app}
        release={latestRelease}
      />
    </div>
  );
}
