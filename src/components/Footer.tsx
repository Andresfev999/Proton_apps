import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import ProtonAppsLogo from './ProtonAppsLogo';

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white">
      <div className="site-container py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="Proton Apps, inicio">
              <ProtonAppsLogo size={36} showText animated={false} />
            </Link>
            <p className="mt-3.5 max-w-sm text-xs leading-relaxed text-slate-500">
              Tienda y catálogo de aplicaciones Android independientes. Distribución directa, verificación de integridad SHA-256 y privacidad total.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 w-fit">
              <ShieldCheck size={14} />
              <span>Distribución APK Oficial y Segura</span>
            </div>
          </div>

          <nav aria-label="Explorar">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3.5">
              Explorar Tienda
            </h2>
            <div className="flex flex-col items-start gap-2.5 text-xs text-slate-600">
              <Link href="/#catalogo" className="hover:text-[#01875f] transition-colors">
                Catálogo de Apps
              </Link>
              <Link href="/#instalacion" className="hover:text-[#01875f] transition-colors">
                Guía de Instalación APK
              </Link>
              <Link href="/#preguntas" className="hover:text-[#01875f] transition-colors">
                Preguntas Frecuentes
              </Link>
              <Link href="/developer" className="hover:text-[#01875f] font-semibold text-emerald-700 flex items-center gap-1 transition-colors">
                Consola Desarrollador <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </nav>

          <nav aria-label="Legal e Información">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3.5">
              Información & Legal
            </h2>
            <div className="flex flex-col items-start gap-2.5 text-xs text-slate-600">
              <Link href="/privacy" className="hover:text-[#01875f] transition-colors">
                Privacidad y Datos
              </Link>
              <Link href="/terms" className="hover:text-[#01875f] transition-colors">
                Términos de Servicio
              </Link>
              <a
                href="https://protondev.space"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#01875f] flex items-center gap-1 transition-colors"
              >
                Proton Dev Space <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Proton Apps Store · Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="/developer" className="hover:text-slate-600 transition-colors font-medium">
              Subir tu App
            </Link>
            <span>·</span>
            <Link href="/admin" className="hover:text-slate-600 transition-colors">
              Panel Administrativo
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
