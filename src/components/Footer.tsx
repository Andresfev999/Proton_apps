import React from 'react';
import Link from 'next/link';
import { Smartphone, Shield, Zap, GitBranch, Terminal } from 'lucide-react';
import ProtonAppsLogo from './ProtonAppsLogo';

export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#04060a] mt-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <ProtonAppsLogo size={34} showText={true} animated={false} />
              <span className="text-[9px] font-mono font-bold tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full ml-1">
                SYSTEM ONLINE
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed font-normal">
              Infraestructura centralizada de alto rendimiento para catálogo, distribución de APKs Android y orquestación de actualizaciones Over-The-Air (OTA) con control de criticidad obligatoria.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 pt-2">
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-400" /> SHA-256 Validado</span>
              <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-cyan-400" /> Latencia &lt;18ms</span>
              <span className="flex items-center gap-1.5"><GitBranch className="w-3.5 h-3.5 text-indigo-400" /> Next.js 16 + Supabase</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
              Plataforma
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <Link href="/#catalogo" className="hover:text-white transition-colors">
                  Catálogo de Apps
                </Link>
              </li>
              <li>
                <Link href="/#api-docs" className="hover:text-white transition-colors">
                  Consola OTA Interactiva
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Panel de Administración CMS
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
              Legal & Cumplimiento
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-400/80" />
                  <span>Política de Privacidad</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-indigo-400/80" />
                  <span>Términos de Servicio</span>
                </Link>
              </li>
              <li>
                <span className="text-slate-500 cursor-default">
                  Distribución Independiente
                </span>
              </li>
            </ul>
          </div>

          {/* Endpoints specification */}
          <div>
            <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
              Endpoints Core
            </h4>
            <div className="space-y-2 text-[11px] font-mono">
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-slate-300">
                <span className="text-emerald-400 font-bold mr-2">GET</span>
                <span>/api/v1/apps/:slug/updates</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-slate-300">
                <span className="text-cyan-400 font-bold mr-2">GET</span>
                <span>/api/v1/download/:releaseId</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} Proton Apps Hub. Diseñado bajo estándares Vanguard UI & Impeccable.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacidad
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Términos
            </Link>
            <span>•</span>
            <span>Control Semántico OTA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
