'use client';

// Design Read: Customer-First Product Landing Page for mobile applications.
// Eliminates technical developer jargon from the main buyer journey; focuses 100% on
// everyday benefits, problem resolution, lifestyle upgrade, and frictionless APK installation.

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DeviceMockup } from '@/components/DeviceMockup';
import { QrCodeModal } from '@/components/QrCodeModal';
import { InstallGuideModal } from '@/components/InstallGuideModal';
import { ChangelogTimeline } from '@/components/ChangelogTimeline';
import { App } from '@/types/database';
import { formatBytes } from '@/lib/data';
import { getAppBenefits, AppBenefitItem } from '@/lib/app-benefits-data';
import { useDeviceType } from '@/lib/use-device';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Download,
  QrCode,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
  Clock,
  DollarSign,
  Lock,
  EyeOff,
  KeyRound,
  HeartHandshake,
  Flame,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Smartphone,
  HelpCircle,
  Users,
  Check,
  Terminal,
  Code2,
  X,
  Maximize2,
  Copy,
  Info
} from 'lucide-react';

export default function AppDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { isAndroid, isDesktop, isIOS } = useDeviceType();

  const [app, setApp] = useState<App | null>(null);
  const [loading, setLoading] = useState(true);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isInstallGuideOpen, setIsInstallGuideOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showTechDetails, setShowTechDetails] = useState(false);
  const [selectedImageModal, setSelectedImageModal] = useState<{ url: string; caption?: string } | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);

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

  // Beneficios orientados al cliente
  const benefitsProfile = useMemo(() => {
    return getAppBenefits(slug, app);
  }, [slug, app]);

  const latestRelease = app?.latest_release;
  const sha256 = latestRelease?.sha256_hash || '46f6d55f1fb65538693386238aef017e894a3d39f2995ae8aea1c7c19d4ed224';

  const handleDownload = () => {
    try {
      confetti({
        particleCount: 55,
        spread: 75,
        origin: { y: 0.8 },
        colors: ['#6366f1', '#06b6d4', '#10b981', '#38bdf8']
      });
    } catch {
      // safe fallback
    }

    // Abre la guía de instalación para acompañar al usuario con la advertencia de Android
    setTimeout(() => {
      setIsInstallGuideOpen(true);
    }, 700);
  };

  const copySha256 = () => {
    navigator.clipboard.writeText(sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const renderBenefitIcon = (iconName: AppBenefitItem['icon']) => {
    switch (iconName) {
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-cyan-400" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-indigo-400" />;
      case 'DollarSign':
        return <DollarSign className="w-5 h-5 text-emerald-400" />;
      case 'Lock':
        return <Lock className="w-5 h-5 text-indigo-400" />;
      case 'EyeOff':
        return <EyeOff className="w-5 h-5 text-cyan-400" />;
      case 'KeyRound':
        return <KeyRound className="w-5 h-5 text-amber-400" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-rose-400" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-orange-400" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-5 h-5 text-cyan-300" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#04060a] text-slate-100 flex flex-col">
        <Navbar />
        <div className="flex-1 max-w-7xl mx-auto px-4 py-32 w-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
            <p className="text-xs font-mono text-slate-400">Preparando presentación de la app...</p>
          </div>
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
          <p className="text-sm text-slate-400">No encontramos la aplicación solicitada en nuestro catálogo.</p>
          <Link
            href="/#catalogo"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Catálogo de Apps</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#04060a] text-slate-100 selection:bg-indigo-500 selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 w-full space-y-20 sm:space-y-28">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/#catalogo"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Volver al Catálogo de Apps</span>
          </Link>
        </div>

        {/* 1. MASTER HERO: Emotional Value Promise & Quick Action */}
        <section className="relative">
          {/* Ambient Radiant Backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-indigo-600/15 via-cyan-500/10 to-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Col: Customer Value Copy */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge & Category */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-[10px] font-mono uppercase tracking-[0.2em] font-bold">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>{benefitsProfile.heroBadge}</span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-white/5 text-slate-400 border border-white/10">
                  {app.category}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Versión Oficial Verificada
                </span>
              </div>

              {/* Master Benefit Headline */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl p-0.5 bg-white/5 border border-white/10 shadow-lg shadow-black/50 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={app.icon_url}
                      alt={app.name}
                      className="w-full h-full rounded-[14px] object-cover"
                    />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-200">
                    {app.name}
                  </h2>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
                  {benefitsProfile.heroTitle}
                </h1>
              </div>

              {/* Human-Centered Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
                {benefitsProfile.heroSubtitle}
              </p>

              {/* Trust Pills Bar */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {benefitsProfile.trustPills.map((pill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-slate-300 font-mono"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{pill}</span>
                  </span>
                ))}
              </div>

              {/* Direct Download CTAs with Smart Device Adaptation */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                {latestRelease && (
                  <a
                    href={`/api/v1/download/${latestRelease.id}`}
                    onClick={handleDownload}
                    className="pl-6 pr-2 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold text-xs sm:text-sm flex items-center justify-between gap-4 shadow-xl shadow-indigo-600/35 hover:shadow-cyan-500/50 transition-all duration-200 active:scale-[0.98] group/btn cursor-pointer"
                  >
                    <span>
                      {isAndroid ? 'Instalar APK en este Android' : 'Descargar Gratis APK'} ({formatBytes(latestRelease.apk_size_bytes)})
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center btn-nested-icon group-hover/btn:translate-y-0.5 transition-transform">
                      {isAndroid ? <Smartphone className="w-4 h-4 text-white" /> : <Download className="w-4 h-4 text-white" />}
                    </div>
                  </a>
                )}

                <button
                  onClick={() => setIsQrOpen(true)}
                  className={`px-5 py-3 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer active:scale-95 ${
                    isDesktop
                      ? 'bg-cyan-950/50 hover:bg-cyan-900/60 text-cyan-200 border border-cyan-500/40 shadow-lg shadow-cyan-950/40'
                      : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-cyan-400" />
                  <span>Escanear QR con tu Celular</span>
                </button>
              </div>

              {/* Security Sello & Antivirus Verification Bar */}
              <div className="pt-1 flex flex-wrap items-center gap-3 text-xs font-mono">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>✓ 0 Amenazas (70+ Antivirus)</span>
                </span>

                <button
                  onClick={copySha256}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-300 transition-colors cursor-pointer"
                  title="Copiar hash SHA-256 completo"
                >
                  <Lock className="w-3 h-3 text-indigo-400" />
                  <span className="text-[11px] text-slate-400">SHA-256: {sha256.slice(0, 10)}...</span>
                  {copiedHash ? (
                    <span className="text-emerald-400 text-[10px] font-bold">¡Copiado!</span>
                  ) : (
                    <Copy className="w-3 h-3 text-slate-500" />
                  )}
                </button>

                <button
                  onClick={() => setIsInstallGuideOpen(true)}
                  className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors cursor-pointer text-xs"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Guía de instalación Android</span>
                </button>
              </div>

              {/* Official Stores (Optional) */}
              {(app.play_store_url || app.app_store_url) && (
                <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
                  <span className="text-[11px] font-mono text-slate-500">También disponible en:</span>
                  {app.play_store_url && (
                    <a
                      href={app.play_store_url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white underline underline-offset-4 flex items-center gap-1 transition-colors"
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
                      className="hover:text-white underline underline-offset-4 flex items-center gap-1 transition-colors"
                    >
                      <span>App Store</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Right Col: Live Interactive Hardware Mockup */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="text-center mb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 font-bold">
                  Experiencia Real en Mano
                </span>
                <p className="text-xs text-slate-400 mt-0.5">Capturas de pantalla nativas de {app.name}</p>
              </div>

              <DeviceMockup
                appName={app.name}
                screenshots={app.screenshots || []}
              />
            </div>
          </div>
        </section>

        {/* 2. THE PROBLEM & THE TRANSFORMATION (Antes vs Después) */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {benefitsProfile.problemTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              {benefitsProfile.problemDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before Card */}
            <div className="double-bezel-outer">
              <div className="double-bezel-inner p-7 sm:p-9 space-y-5 bg-rose-950/[0.04]">
                <div className="flex items-center gap-2.5 text-rose-400">
                  <XCircle className="w-5 h-5 shrink-0" />
                  <h3 className="font-bold text-base sm:text-lg text-white">
                    {benefitsProfile.beforeVsAfter.beforeTitle}
                  </h3>
                </div>
                <ul className="space-y-3.5 text-sm text-slate-300">
                  {benefitsProfile.beforeVsAfter.beforeItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-rose-500 text-base leading-none font-bold select-none">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* After Card */}
            <div className="double-bezel-outer">
              <div className="double-bezel-inner p-7 sm:p-9 space-y-5 bg-emerald-950/[0.07] border-emerald-500/20">
                <div className="flex items-center gap-2.5 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <h3 className="font-bold text-base sm:text-lg text-white">
                    {benefitsProfile.beforeVsAfter.afterTitle}
                  </h3>
                </div>
                <ul className="space-y-3.5 text-sm text-slate-200">
                  {benefitsProfile.beforeVsAfter.afterItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3. BENTO DE BENEFICIOS CLAVE */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-400 font-bold">
                Resultados Tangibles
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                ¿Qué ganas instalando {app.name}?
              </h2>
            </div>
            <p className="text-xs font-mono text-slate-400">
              Diseñado sin trucos ni letras pequeñas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefitsProfile.keyBenefits.map((benefit, idx) => (
              <div key={idx} className="double-bezel-outer group">
                <div className="double-bezel-inner p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {renderBenefitIcon(benefit.icon)}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/20 text-emerald-300 text-[11px] font-mono font-medium">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span>{benefit.result}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. GALERÍA VISUAL: PANTALLAS REALES DE LA APLICACIÓN */}
        {app.screenshots && app.screenshots.length > 0 && (
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 font-bold bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full inline-block mb-2">
                  Capturas Nativas Oficiales ({app.screenshots.length} Pantallas)
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Explora la Interfaz Real de {app.name}
                </h2>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Toca cualquier captura para ampliarla en alta definición
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {app.screenshots.map((screen, idx) => (
                <div
                  key={screen.id || idx}
                  onClick={() => setSelectedImageModal({ url: screen.image_url, caption: screen.caption })}
                  className="double-bezel-outer group cursor-pointer hover:border-cyan-500/40 transition-all duration-300"
                >
                  <div className="double-bezel-inner p-3 sm:p-4 flex flex-col justify-between h-full space-y-3">
                    <div className="relative aspect-[9/19] w-full rounded-2xl overflow-hidden bg-black border border-white/10 group-hover:border-cyan-400/40 transition-all shadow-lg shadow-black/80">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={screen.image_url}
                        alt={screen.caption || `${app.name} captura ${idx + 1}`}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-cyan-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <div className="w-10 h-10 rounded-full bg-black/80 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-xl">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-mono text-slate-200 border border-white/10">
                        #{idx + 1}
                      </div>
                    </div>

                    {screen.caption && (
                      <p className="text-[11px] text-slate-300 font-medium line-clamp-2 leading-tight">
                        {screen.caption}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. ¿CÓMO TE AYUDA EN TU DÍA A DÍA? (3 Pasos Fáciles) */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 font-bold">
              Fácil & Sin Fricción
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              ¿Cómo es usar {app.name} en tu vida real?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Cero configuraciones complicadas. Todo pensado para que lo resuelvas en minutos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefitsProfile.dailyWorkflow.map((item, idx) => (
              <div key={idx} className="double-bezel-outer relative">
                <div className="double-bezel-inner p-7 sm:p-8 space-y-4 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="text-3xl font-extrabold font-mono text-indigo-400/40">
                      {item.stepNumber}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-cyan-300">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Tiempo estimado: {item.timeCommitment}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. ¿PARA QUIÉN ES IDEAL? */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-400 font-bold">
              Pensado para Personas Reales
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              ¿Es {app.name} adecuada para ti?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefitsProfile.targetAudience.map((audience, idx) => (
              <div key={idx} className="double-bezel-outer">
                <div className="double-bezel-inner p-7 space-y-3 h-full flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-300 font-bold bg-indigo-950/50 px-2.5 py-1 rounded-full border border-indigo-500/20">
                      <Users className="w-3.5 h-3.5" />
                      <span>{audience.highlight}</span>
                    </div>
                    <h3 className="text-base font-bold text-white">
                      {audience.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {audience.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. PREGUNTAS FRECUENTES ORIENTADAS AL CLIENTE */}
        <section className="max-w-3xl mx-auto space-y-8 w-full">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-slate-300 text-[10px] font-mono uppercase tracking-[0.2em]">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Respuestas Claras</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Preguntas Frecuentes
            </h2>
            <p className="text-xs text-slate-400">
              Todo lo que necesitas saber antes de instalarla en tu dispositivo.
            </p>
          </div>

          <div className="space-y-3">
            {benefitsProfile.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="double-bezel-outer">
                  <div className="double-bezel-inner overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-semibold text-white hover:text-indigo-300 transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. BOTTOM CTA BANNER: Final Push */}
        <section className="double-bezel-outer">
          <div className="double-bezel-inner p-8 sm:p-14 relative overflow-hidden text-center space-y-6">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full inline-block">
                Descarga Segura & Gratuita
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {benefitsProfile.ctaHeadline}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {benefitsProfile.ctaSubtext}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                {latestRelease && (
                  <a
                    href={`/api/v1/download/${latestRelease.id}`}
                    onClick={handleDownload}
                    className="w-full sm:w-auto pl-7 pr-2 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-between sm:justify-center gap-4 shadow-xl shadow-indigo-600/40 transition-all cursor-pointer active:scale-95"
                  >
                    <span>{isAndroid ? 'Instalar APK en este Android' : 'Descargar APK Ahora'}</span>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      {isAndroid ? <Smartphone className="w-4 h-4 text-white" /> : <Download className="w-4 h-4 text-white" />}
                    </div>
                  </a>
                )}

                <button
                  onClick={() => setIsQrOpen(true)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <QrCode className="w-4 h-4 text-cyan-400" />
                  <span>Escanear QR con tu Teléfono</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 8. DISCREET TECHNICAL DRAWER (Preserved for advanced users / devs) */}
        <section className="pt-6 border-t border-white/5">
          <div className="flex flex-col items-center">
            <button
              onClick={() => setShowTechDetails(!showTechDetails)}
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors py-2 px-4 rounded-full bg-white/[0.02] border border-white/5 cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>
                {showTechDetails ? 'Ocultar detalles técnicos' : '¿Eres desarrollador o curioso? Ver detalles técnicos y versiones'}
              </span>
              {showTechDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showTechDetails && (
            <div className="mt-8 space-y-6 max-w-4xl mx-auto">
              <div className="double-bezel-outer">
                <div className="double-bezel-inner p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-indigo-400" />
                      <span>Ficha Técnica y Compilación</span>
                    </h3>
                    <span className="text-xs font-mono text-slate-400">
                      ID: {app.package_name}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-slate-500 block mb-1">Versión</span>
                      <span className="text-slate-200">v{latestRelease?.version_name || '1.0.0'}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-slate-500 block mb-1">Build Code</span>
                      <span className="text-slate-200">{latestRelease?.version_code || 1}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-slate-500 block mb-1">SO Mínimo</span>
                      <span className="text-slate-200">{latestRelease?.min_os_version || 'Android 8.0+'}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-slate-500 block mb-1">Descargas</span>
                      <span className="text-slate-200">{app.total_downloads?.toLocaleString() || '1,200+'}</span>
                    </div>
                  </div>

                  {/* Changelog Timeline */}
                  <div className="pt-4 border-t border-white/5">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 font-bold">
                      Historial de Versiones
                    </h4>
                    <ChangelogTimeline
                      releases={app.releases || (latestRelease ? [latestRelease] : [])}
                      appName={app.name}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
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

      {/* Android APK Installation Guide Modal */}
      <InstallGuideModal
        isOpen={isInstallGuideOpen}
        onClose={() => setIsInstallGuideOpen(false)}
        appName={app.name}
        apkSize={latestRelease ? formatBytes(latestRelease.apk_size_bytes) : undefined}
        sha256Hash={sha256}
        downloadUrl={latestRelease ? `/api/v1/download/${latestRelease.id}` : undefined}
      />

      {/* Screenshot Lightbox Modal */}
      {selectedImageModal && (
        <div
          onClick={() => setSelectedImageModal(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm sm:max-w-md w-full flex flex-col items-center gap-4"
          >
            <button
              onClick={() => setSelectedImageModal(null)}
              className="absolute -top-12 right-0 sm:-right-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
              aria-label="Cerrar vista"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full max-h-[75vh] aspect-[9/19] rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImageModal.url}
                alt={selectedImageModal.caption || 'Captura de pantalla'}
                className="w-full h-full object-contain"
              />
            </div>

            {selectedImageModal.caption && (
              <div className="p-3 rounded-2xl bg-[#0a0e17] border border-white/10 text-center max-w-md shadow-xl">
                <p className="text-xs text-slate-200 font-medium">
                  {selectedImageModal.caption}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
