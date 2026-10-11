'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DeveloperLoginForm } from '@/components/DeveloperLoginForm';
import { AdminAppForm } from '@/components/AdminAppForm';
import { AdminReleaseForm } from '@/components/AdminReleaseForm';
import { App } from '@/types/database';
import { formatBytes } from '@/lib/data';
import {
  Layers,
  UploadCloud,
  PlusCircle,
  LogOut,
  Smartphone,
  CheckCircle2,
  ExternalLink,
  Code2,
  Terminal,
  Activity,
  ArrowRight,
  TrendingUp,
  Download,
  Shield,
  FileCode2,
  Boxes
} from 'lucide-react';

import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export default function DeveloperPortalPage() {
  const [developer, setDeveloper] = useState<{ email: string; name: string; avatarUrl?: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'my-apps' | 'pending-approvals' | 'new-app' | 'new-release' | 'api-docs'>('my-apps');
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const ADMIN_EMAIL = 'andresfev999@gmail.com';
  const isAdmin = developer?.email?.toLowerCase().trim() === ADMIN_EMAIL;

  // Restore developer session from localStorage or Supabase Google OAuth
  useEffect(() => {
    try {
      const saved = localStorage.getItem('proton_dev_session');
      if (saved) {
        setDeveloper(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Error reading dev session:', e);
    }

    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const user = session.user;
          const devData = {
            email: user.email || 'developer@google.com',
            name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Desarrollador',
            avatarUrl: user.user_metadata?.avatar_url || user.user_metadata?.picture
          };
          setDeveloper(devData);
          localStorage.setItem('proton_dev_session', JSON.stringify(devData));
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const user = session.user;
          const devData = {
            email: user.email || 'developer@google.com',
            name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Desarrollador',
            avatarUrl: user.user_metadata?.avatar_url || user.user_metadata?.picture
          };
          setDeveloper(devData);
          localStorage.setItem('proton_dev_session', JSON.stringify(devData));
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const loadApps = async () => {
    try {
      setLoading(true);
      const res = await fetch('/apps/api/v1/apps');
      if (res.ok) {
        const data = await res.json();
        setApps(data.apps || []);
      }
    } catch (err) {
      console.error('Error cargando apps:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (developer) {
      loadApps();
    }
  }, [developer]);

  const handleLoginSuccess = (devData: { email: string; name: string; avatarUrl?: string }) => {
    setDeveloper(devData);
    try {
      localStorage.setItem('proton_dev_session', JSON.stringify(devData));
    } catch (e) {
      console.warn('Error saving dev session:', e);
    }
  };

  const handleLogout = async () => {
    setDeveloper(null);
    try {
      localStorage.removeItem('proton_dev_session');
      if (isSupabaseConfigured && supabase) {
        await supabase.auth.signOut();
      }
    } catch (e) {
      console.warn('Error removing dev session:', e);
    }
  };

  const handleModerateApp = async (appId: string, slug: string, newStatus: 'published' | 'rejected') => {
    if (!developer?.email || !isAdmin) return;
    setActionLoading(appId);
    setStatusMessage(null);

    try {
      const res = await fetch('/apps/api/v1/apps', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: appId,
          slug,
          status: newStatus,
          admin_email: developer.email,
          review_notes: newStatus === 'published' ? 'Aprobada por el Administrador' : 'Rechazada tras revisión técnica'
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al procesar la aprobación');

      setStatusMessage({
        type: 'success',
        text: `La aplicación ha sido ${newStatus === 'published' ? 'APROBADA y ahora está pública en la tienda' : 'RECHAZADA'}.`
      });

      await loadApps();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error inesperado';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setActionLoading(null);
    }
  };

  const pendingApps = apps.filter((a) => a.status === 'pending');
  const publishedApps = apps.filter((a) => a.status === 'published' || a.status === 'beta');
  const myApps = isAdmin ? apps : apps.filter((a) => a.developer_email === developer?.email);

  const totalDownloads = apps.reduce((acc, a) => acc + (a.total_downloads || 0), 0);
  const totalApkSizeBytes = apps.reduce((acc, a) => acc + (a.latest_release?.apk_size_bytes || 28000000), 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 py-10 sm:py-14">
        <div className="site-container">
          {!developer ? (
            /* Google Login Screen */
            <div className="py-6 sm:py-10">
              <DeveloperLoginForm onSuccess={handleLoginSuccess} />
            </div>
          ) : (
            /* Developer Console Dashboard */
            <div className="space-y-8">
              {/* Header with Developer Info & Google Avatar */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  {developer.avatarUrl ? (
                    <img
                      src={developer.avatarUrl}
                      alt={developer.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-xl shadow-xs shrink-0">
                      {developer.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-bold text-slate-900">{developer.name}</h1>
                      {isAdmin ? (
                        <span className="px-2.5 py-0.5 text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 rounded-full flex items-center gap-1 shadow-2xs">
                          <Shield size={12} className="text-amber-700" />
                          Administrador Principal (Owner)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full flex items-center gap-1">
                          <CheckCircle2 size={12} />
                          Cuenta Google Verificada
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 font-mono">{developer.email}</p>
                    <p className="text-xs text-slate-600 mt-1">
                      {isAdmin ? 'Control de Moderación y Publicación Global · Proton Apps' : 'Consola de Desarrollador Oficial · Proton Apps Play Store'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab('new-app')}
                    className="px-4 py-2.5 rounded-full bg-[#01875f] hover:bg-[#017250] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <PlusCircle size={15} />
                    <span>Subir Nueva App</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="px-3.5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <LogOut size={14} />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </div>

              {/* Status Message Alert */}
              {statusMessage && (
                <div className={`p-4 rounded-2xl text-xs flex items-center gap-2.5 shadow-2xs ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border border-rose-200 text-rose-800'
                }`}>
                  <CheckCircle2 size={16} className={statusMessage.type === 'success' ? 'text-emerald-600 shrink-0' : 'text-rose-600 shrink-0'} />
                  <span className="font-medium">{statusMessage.text}</span>
                </div>
              )}

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-medium">Apps Públicas</span>
                    <Smartphone size={16} className="text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{publishedApps.length}</div>
                  <p className="text-[11px] text-emerald-600 mt-1 font-medium">En tienda activa</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-medium">Por Aprobar</span>
                    <Shield size={16} className={pendingApps.length > 0 ? 'text-amber-600 animate-pulse' : 'text-slate-400'} />
                  </div>
                  <div className={`text-2xl font-bold ${pendingApps.length > 0 ? 'text-amber-600' : 'text-slate-900'}`}>{pendingApps.length}</div>
                  <p className="text-[11px] text-amber-600 mt-1 font-medium">Requieren tu visto bueno</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-medium">Total Descargas</span>
                    <Download size={16} className="text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{totalDownloads.toLocaleString()}</div>
                  <p className="text-[11px] text-blue-600 mt-1 font-medium">Tráfico OTA</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-medium">Almacenamiento APK</span>
                    <Boxes size={16} className="text-indigo-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{formatBytes(totalApkSizeBytes)}</div>
                  <p className="text-[11px] text-slate-500 mt-1">VPS Fast Storage CDN</p>
                </div>
              </div>

              {/* Navigation Tabs (Google Play Console style) */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab('my-apps')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'my-apps'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Layers size={15} />
                  <span>Mis Aplicaciones ({myApps.length})</span>
                </button>

                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('pending-approvals')}
                    className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                      activeTab === 'pending-approvals'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200'
                    }`}
                  >
                    <Shield size={15} />
                    <span>Aprobaciones Pendientes ({pendingApps.length})</span>
                    {pendingApps.length > 0 && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setActiveTab('new-app')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'new-app'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <PlusCircle size={15} />
                  <span>Subir Nueva Aplicación</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('new-release')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'new-release'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <UploadCloud size={15} />
                  <span>Publicar Versión / APK</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('api-docs')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'api-docs'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Terminal size={15} />
                  <span>SDK & Endpoints API</span>
                </button>
              </div>

              {/* Tab 1: My Apps */}
              {activeTab === 'my-apps' && (
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">Aplicaciones en Producción</h2>
                      <p className="text-xs text-slate-500 mt-0.5">Gestiona las fichas de producto y versiones de tus apps Android.</p>
                    </div>

                    <button
                      onClick={() => setActiveTab('new-app')}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#01875f] hover:bg-[#017250] rounded-full transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                    >
                      <PlusCircle size={14} />
                      <span>Añadir App</span>
                    </button>
                  </div>

                  {loading ? (
                    <div className="p-12 text-center text-slate-400">
                      <span className="inline-block h-6 w-6 border-2 border-[#01875f] border-t-transparent rounded-full animate-spin mb-2" />
                      <p className="text-xs">Cargando aplicaciones...</p>
                    </div>
                  ) : apps.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                      <Smartphone size={36} className="mx-auto text-slate-300 mb-3" />
                      <p className="font-medium text-sm text-slate-700">No tienes aplicaciones registradas aún</p>
                      <p className="text-xs text-slate-400 mt-1">Haz clic en &quot;Subir Nueva App&quot; para crear tu primera ficha.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {apps.map((app) => (
                        <div key={app.id} className="p-5 sm:p-6 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4 min-w-0">
                            <img
                              src={app.icon_url}
                              alt=""
                              className="w-13 h-13 rounded-2xl object-cover border border-slate-200 shadow-2xs shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h3 className="text-base font-bold text-slate-900 truncate">{app.name}</h3>
                                <span className="px-2 py-0.5 text-[10px] font-semibold text-slate-600 bg-slate-100 rounded-full">
                                  {app.category}
                                </span>
                                {app.status === 'published' ? (
                                  <span className="px-2 py-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
                                    En Tienda
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 text-[10px] font-semibold text-amber-700 bg-amber-50 rounded-full border border-amber-200">
                                    Beta
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 truncate mt-0.5">{app.tagline}</p>
                              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 font-mono">
                                <span>{app.package_name}</span>
                                {app.latest_release && (
                                  <>
                                    <span>·</span>
                                    <span className="text-emerald-700 font-semibold">v{app.latest_release.version_name} (Build {app.latest_release.version_code})</span>
                                    <span>·</span>
                                    <span>{formatBytes(app.latest_release.apk_size_bytes)}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            <button
                              onClick={() => setActiveTab('new-release')}
                              className="px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-full border border-emerald-200 transition-colors flex items-center gap-1.5"
                            >
                              <UploadCloud size={14} />
                              <span>Subir APK</span>
                            </button>

                            <Link
                              href={`/apps/${app.slug}`}
                              target="_blank"
                              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-full border border-slate-300 transition-colors flex items-center gap-1.5"
                            >
                              <span>Ver Ficha</span>
                              <ExternalLink size={13} />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Pending Approvals (Exclusivo Administrador andresfev999@gmail.com) */}
              {activeTab === 'pending-approvals' && isAdmin && (
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-amber-50/40">
                    <div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-amber-700" />
                        <h2 className="text-lg font-bold text-slate-900">Módulo de Moderación y Aprobación de Apps</h2>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Como administrador general, revisa las apps que otros desarrolladores han subido. Solo las apps que apruebes serán visibles y descargables en la tienda pública.
                      </p>
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 self-start sm:self-auto">
                      {pendingApps.length} {pendingApps.length === 1 ? 'pendiente' : 'pendientes'}
                    </span>
                  </div>

                  {pendingApps.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                      <CheckCircle2 size={40} className="mx-auto text-emerald-500 mb-3" />
                      <p className="font-bold text-sm text-slate-800">¡Bandeja de moderación limpia!</p>
                      <p className="text-xs text-slate-500 mt-1">
                        No hay aplicaciones pendientes de revisión en este momento. Todas las solicitudes recibidas han sido procesadas.
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {pendingApps.map((app) => (
                        <div key={app.id} className="p-6 hover:bg-slate-50/60 transition-colors">
                          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                            {/* App Info */}
                            <div className="flex items-start gap-4 min-w-0 flex-1">
                              <img
                                src={app.icon_url}
                                alt={app.name}
                                className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-xs shrink-0"
                              />
                              <div className="min-w-0 space-y-1.5 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="text-lg font-bold text-slate-900">{app.name}</h3>
                                  <span className="px-2.5 py-0.5 text-[10px] font-semibold text-slate-600 bg-slate-100 rounded-full">
                                    {app.category}
                                  </span>
                                  <span className="px-2.5 py-0.5 text-[10px] font-bold text-amber-800 bg-amber-100 rounded-full border border-amber-300 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                                    Pendiente de Aprobación
                                  </span>
                                </div>

                                <p className="text-xs text-slate-700 font-medium">{app.tagline}</p>
                                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{app.description}</p>

                                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono">
                                  <div className="flex items-center gap-1">
                                    <span className="text-slate-400">Package:</span>
                                    <span className="text-slate-700 font-bold">{app.package_name}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span className="text-slate-400">Slug:</span>
                                    <span className="text-slate-700">/apps/{app.slug}</span>
                                  </div>
                                  {app.developer_email && (
                                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200">
                                      <span className="text-slate-400 font-sans">Desarrollador:</span>
                                      <span className="text-emerald-700 font-bold font-sans">
                                        {app.developer_name ? `${app.developer_name} (${app.developer_email})` : app.developer_email}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons for Admin */}
                            <div className="flex flex-row lg:flex-col items-center gap-2.5 shrink-0 self-end lg:self-center">
                              <button
                                type="button"
                                disabled={actionLoading === app.id}
                                onClick={() => handleModerateApp(app.id, app.slug, 'published')}
                                className="w-full px-5 py-2.5 rounded-full bg-[#01875f] hover:bg-[#017250] text-white text-xs font-bold shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                              >
                                {actionLoading === app.id ? (
                                  <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <>
                                    <CheckCircle2 size={15} />
                                    <span>Aprobar y Publicar en Tienda</span>
                                  </>
                                )}
                              </button>

                              <button
                                type="button"
                                disabled={actionLoading === app.id}
                                onClick={() => handleModerateApp(app.id, app.slug, 'rejected')}
                                className="w-full px-4 py-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                              >
                                <span>Rechazar Solicitud</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: New App */}
              {activeTab === 'new-app' && (
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
                  <div className="mb-6 pb-4 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900">Registrar Nueva Aplicación en la Tienda</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isAdmin
                        ? 'Como administrador, las aplicaciones que registres quedarán publicadas de forma inmediata.'
                        : 'Tu aplicación entrará en cola de revisión para ser aprobada por el administrador (andresfev999@gmail.com) antes de salir pública.'}
                    </p>
                  </div>
                  <AdminAppForm
                    developer={developer}
                    onSuccess={() => {
                      loadApps();
                      setActiveTab(isAdmin ? 'my-apps' : 'my-apps');
                    }}
                  />
                </div>
              )}

              {/* Tab 3: New Release / APK */}
              {activeTab === 'new-release' && (
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
                  <div className="mb-6 pb-4 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900">Distribuir Nueva Versión (Archivo Binario APK)</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Sube el binario APK firmado. El sistema calculará el hash criptográfico SHA-256 automáticamente.</p>
                  </div>
                  <AdminReleaseForm
                    apps={apps}
                    onSuccess={() => {
                      loadApps();
                      setActiveTab('my-apps');
                    }}
                  />
                </div>
              )}

              {/* Tab 4: API & SDK Documentation */}
              {activeTab === 'api-docs' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
                    <h2 className="text-lg font-bold text-slate-900 mb-1">API de Actualizaciones In-App (OTA)</h2>
                    <p className="text-xs text-slate-500 mb-6">
                      Integra verificación automática de actualizaciones en tus aplicaciones Android para notificar a los usuarios cuando haya una versión nueva o crítica.
                    </p>

                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-700 mb-1.5">
                          <span className="px-2 py-0.5 rounded bg-emerald-100">GET</span>
                          <span>/apps/api/v1/apps/:slug/updates?version_code=1&platform=android</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Devuelve si hay una actualización disponible, enlace al APK, notas de la versión y si es de instalación obligatoria (<code className="text-emerald-700 font-mono">is_critical: true</code>).
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-700 mb-1.5">
                          <span className="px-2 py-0.5 rounded bg-blue-100">GET</span>
                          <span>/apps/api/v1/apps</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Listado completo en formato JSON de todas las aplicaciones activas con sus metadatos y versiones más recientes.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-700 mb-1.5">
                          <span className="px-2 py-0.5 rounded bg-indigo-100">GET</span>
                          <span>/apps/api/v1/download/:releaseId</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Descarga directa del binario APK registrando el contador de descargas verificado.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dart / Flutter snippet */}
                  <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 sm:p-8 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-2">
                        <Code2 size={16} />
                        Ejemplo de Integración en Flutter / Dart
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">lib/services/update_service.dart</span>
                    </div>

                    <pre className="text-xs font-mono text-slate-300 overflow-x-auto p-4 rounded-2xl bg-slate-950 border border-slate-800 leading-relaxed">
{`import 'package:http/http.dart' as http;
import 'dart:convert';

Future<void> checkForUpdates(String slug, int currentVersionCode) async {
  final url = Uri.parse(
    'https://protondev.space/apps/api/v1/apps/\$slug/updates?version_code=\$currentVersionCode&platform=android'
  );

  final res = await http.get(url);
  if (res.statusCode == 200) {
    final data = jsonDecode(res.body);
    if (data['has_update'] == true) {
      final isCritical = data['is_critical'] ?? false;
      final downloadUrl = data['download_url'];
      // Mostrar diálogo modal con notas de la versión
      print('Nueva versión disponible: \${data['version_name']}');
    }
  }
}`}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
