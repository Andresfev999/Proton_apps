'use client';

// Design Read: Vanguard Admin Operating Dashboard with Double-Bezel containment,
// concentric tab bar, Button-in-Button actions, and tactile feedback.

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AdminAppForm } from '@/components/AdminAppForm';
import { AdminReleaseForm } from '@/components/AdminReleaseForm';
import { App } from '@/types/database';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { formatBytes } from '@/lib/data';
import {
  Shield,
  Layers,
  UploadCloud,
  PlusCircle,
  Database,
  Lock,
  LogOut,
  ExternalLink,
  Smartphone,
  HardDrive,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  ArrowUpRight,
  TrendingUp,
  BarChart3,
  Activity
} from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<'overview' | 'new-release' | 'new-app' | 'sql'>('overview');
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedSql, setCopiedSql] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/v1/apps');
      if (res.ok) {
        const data = await res.json();
        setApps(data.apps || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: adminEmail,
          password: adminPassword
        });
        if (error) {
          setAuthError(error.message);
          setAuthLoading(false);
          return;
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Error al autenticar';
        setAuthError(msg);
        setAuthLoading(false);
        return;
      }
    }

    // Demo / Dev Admin Login
    if (adminEmail === 'admin@proton.local' && adminPassword === 'admin123') {
      setIsAuthenticated(true);
      setAuthLoading(false);
      return;
    }

    if (!isSupabaseConfigured) {
      setIsAuthenticated(true);
      setAuthLoading(false);
      return;
    }

    setAuthError('Credenciales inválidas. Usa admin@proton.local / admin123 para el modo demo.');
    setAuthLoading(false);
  };

  const handleQuickDemoAccess = () => {
    setIsAuthenticated(true);
  };

  const totalDownloads = apps.reduce((acc, a) => acc + (a.total_downloads || 0), 0);
  const criticalUpdatesCount = apps.filter((a) => a.latest_release?.is_critical).length;
  const totalBandwidthBytes = apps.reduce((acc, a) => {
    const size = a.latest_release?.apk_size_bytes || 26000000;
    return acc + (a.total_downloads || 0) * size;
  }, 0);

  return (
    <div className="min-h-screen bg-[#04060a] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-10">
        {/* If NOT authenticated: Login Screen */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto my-12 double-bezel-outer">
            <div className="double-bezel-inner p-8 sm:p-10 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-6">
                <Lock className="w-6 h-6 text-indigo-400" />
              </div>

              <h2 className="text-2xl font-bold text-white tracking-tight">Acceso Administrativo</h2>
              <p className="text-xs text-slate-400 mt-1 mb-6">
                Panel de control para subida de binarios APK, notas Markdown y gestión OTA.
              </p>

              {authError && (
                <div className="mb-4 p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-1.5 font-bold">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="admin@proton.local"
                    className="w-full bg-[#04060a] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-1.5 font-bold">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#04060a] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/30 active:scale-[0.98]"
                >
                  <Shield className="w-4 h-4" />
                  <span>{authLoading ? 'Verificando...' : 'Iniciar Sesión'}</span>
                </button>
              </form>

              {/* Quick Demo Access Button */}
              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <button
                  onClick={handleQuickDemoAccess}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-mono hover:underline cursor-pointer"
                >
                  ⚡ Acceso Rápido Modo Demo (Sin credenciales)
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="space-y-10">
            {/* Top Admin Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold text-white tracking-tight">
                    Centro de Control CMS
                  </h1>
                  <p className="text-xs text-slate-400 font-mono">
                    Distribución de APKs Android y Orquestación de Versiones OTA
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                  SESIÓN ADMIN ACTIVA
                </span>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="py-1.5 px-4 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Cerrar</span>
                </button>
              </div>
            </div>

            {/* Metrics Ticker */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="double-bezel-outer p-1">
                <div className="double-bezel-inner p-5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 block mb-1">Apps Registradas</span>
                  <span className="text-2xl font-bold text-white font-mono">{apps.length}</span>
                </div>
              </div>

              <div className="double-bezel-outer p-1">
                <div className="double-bezel-inner p-5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 block mb-1">Descargas Totales</span>
                  <span className="text-2xl font-bold text-cyan-400 font-mono">{totalDownloads.toLocaleString()}</span>
                </div>
              </div>

              <div className="double-bezel-outer p-1">
                <div className="double-bezel-inner p-5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 block mb-1">Updates Críticos</span>
                  <span className="text-2xl font-bold text-rose-400 font-mono">{criticalUpdatesCount}</span>
                </div>
              </div>

              <div className="double-bezel-outer p-1">
                <div className="double-bezel-inner p-5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 block mb-1">Motor de Datos</span>
                  <span className={`text-xs font-mono font-bold block mt-1 ${isSupabaseConfigured ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {isSupabaseConfigured ? 'Supabase Activo' : 'Capa Local / Fallback'}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="double-bezel-outer p-1">
              <div className="double-bezel-inner p-1.5 flex items-center gap-1 overflow-x-auto scrollbar-none font-mono">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-2 px-4 rounded-full text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'overview'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Catálogo ({apps.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('new-release')}
                  className={`py-2 px-4 rounded-full text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'new-release'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <UploadCloud className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Publicar Release / APK</span>
                </button>

                <button
                  onClick={() => setActiveTab('new-app')}
                  className={`py-2 px-4 rounded-full text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'new-app'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Dar de Alta App</span>
                </button>

                <button
                  onClick={() => setActiveTab('sql')}
                  className={`py-2 px-4 rounded-full text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'sql'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Database className="w-3.5 h-3.5 text-amber-400" />
                  <span>Esquema SQL Supabase</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Apps Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Analytics Distribution Card */}
                <div className="double-bezel-outer">
                  <div className="double-bezel-inner p-6 sm:p-8 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
                      <div className="flex items-center gap-2.5">
                        <BarChart3 className="w-5 h-5 text-cyan-400" />
                        <div>
                          <h3 className="font-bold text-white text-base">Distribución y Analítica de Descargas</h3>
                          <p className="text-xs text-slate-400 font-mono">Volumen transferido y cuota de demanda por aplicación</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-mono">
                        <span className="text-slate-400">Tráfico total servido:</span>
                        <span className="text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                          {formatBytes(totalBandwidthBytes)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {apps.map((app) => {
                        const count = app.total_downloads || 0;
                        const pct = totalDownloads > 0 ? Math.round((count / totalDownloads) * 100) : 0;

                        return (
                          <div key={app.id} className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs font-mono">
                              <span className="text-slate-200 font-semibold flex items-center gap-2">
                                <span>{app.name}</span>
                                <span className="text-slate-500 font-normal">({app.category})</span>
                              </span>
                              <div className="flex items-center gap-3">
                                <span className="text-slate-400">{count.toLocaleString()} descargas</span>
                                <span className="text-cyan-300 font-bold">{pct}%</span>
                              </div>
                            </div>
                            <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
                                style={{ width: `${Math.max(pct, 2)}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {apps.map((app) => (
                    <div key={app.id} className="double-bezel-outer p-1">
                      <div className="double-bezel-inner p-6 flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={app.icon_url}
                            alt={app.name}
                            className="w-14 h-14 rounded-2xl object-cover ring-1 ring-white/10"
                          />
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-white text-base tracking-tight">{app.name}</h3>
                              <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/5 text-indigo-300 border border-white/10">
                                {app.category}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 font-mono">{app.package_name}</p>
                            <div className="text-xs text-slate-400 font-mono flex items-center gap-3 pt-1">
                              <span className="text-slate-200">
                                v{app.latest_release?.version_name || '1.0.0'} (Code {app.latest_release?.version_code || 1})
                              </span>
                              <span>•</span>
                              <span>{app.total_downloads?.toLocaleString()} descargas</span>
                            </div>
                          </div>
                        </div>

                        <Link
                          href={`/apps/${app.slug}`}
                          className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center justify-center transition-colors"
                          title="Ver Ficha Pública"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: New Release Form */}
            {activeTab === 'new-release' && (
              <div className="double-bezel-outer max-w-3xl">
                <div className="double-bezel-inner p-8 sm:p-10">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                      <UploadCloud className="w-5 h-5 text-indigo-400" />
                      <span>Publicar Nueva Versión & Subida de APK</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Carga el archivo APK binario firmado, redacta el changelog Markdown y define la criticidad.
                    </p>
                  </div>

                  <AdminReleaseForm
                    apps={apps}
                    onSuccess={() => {
                      loadData();
                      setActiveTab('overview');
                    }}
                  />
                </div>
              </div>
            )}

            {/* Tab 3: New App Form */}
            {activeTab === 'new-app' && (
              <div className="double-bezel-outer max-w-3xl">
                <div className="double-bezel-inner p-8 sm:p-10">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                      <PlusCircle className="w-5 h-5 text-emerald-400" />
                      <span>Dar de Alta Nueva Aplicación</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Registra los metadatos de una aplicación móvil en el catálogo y motor de distribución.
                    </p>
                  </div>

                  <AdminAppForm
                    onSuccess={() => {
                      loadData();
                      setActiveTab('overview');
                    }}
                  />
                </div>
              </div>
            )}

            {/* Tab 4: SQL & Setup Instructions */}
            {activeTab === 'sql' && (
              <div className="double-bezel-outer max-w-4xl">
                <div className="double-bezel-inner p-8 sm:p-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                        <Database className="w-5 h-5 text-amber-400" />
                        <span>Script SQL para Supabase</span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-1 font-mono">
                        Ejecuta este script en el editor SQL de Supabase para inicializar tablas y funciones atómicas.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`-- Archivo supabase/schema.sql disponible en el proyecto`);
                        setCopiedSql(true);
                        setTimeout(() => setCopiedSql(false), 2000);
                      }}
                      className="py-2 px-4 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-mono flex items-center gap-2 border border-white/10 transition-colors cursor-pointer"
                    >
                      {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSql ? 'Copiado' : 'Copiar Referencia'}</span>
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#04060a] border border-white/10 font-mono text-xs text-slate-300 space-y-2">
                    <p className="text-amber-300"># Ubicación del archivo de migración en el repositorio:</p>
                    <p className="text-white font-bold">file:///c:/Users/Andre/OneDrive/Desktop/proyectos/proton-apps/supabase/schema.sql</p>
                    <p className="text-slate-400 pt-2">Estructuras integradas:</p>
                    <ul className="list-disc list-inside text-slate-400 space-y-1">
                      <li>Tabla `apps` con slug único, categorías y estados ENUM</li>
                      <li>Tabla `app_screenshots` con orden de visualización</li>
                      <li>Tabla `releases` con `version_code`, `is_critical` y `download_count`</li>
                      <li>Función `increment_release_download` para atomicidad en métricas</li>
                      <li>Políticas RLS (Row Level Security) para acceso público y admin autenticado</li>
                      <li>Datos semilla de FinUp, Task Pulse, Proton Mail, etc.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
