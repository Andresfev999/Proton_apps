import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ProtonAppsLogo from './ProtonAppsLogo';

export function Footer() {
  return <footer className="mt-20 border-t border-white/[.07] bg-[#080b14]">
    <div className="site-container py-12">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
        <div><Link href="/" aria-label="Proton Apps, inicio"><ProtonAppsLogo size={34} showText animated={false} /></Link><p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">Aplicaciones Android para organizar tu día, cuidar tu dinero y hacer más con tu teléfono.</p><p className="mt-4 text-xs text-slate-500">Distribución directa · Archivos APK para Android</p></div>
        <nav aria-label="Recursos"><h2 className="text-sm font-semibold text-slate-200 mb-4">Descubre</h2><div className="flex flex-col items-start gap-3 text-sm text-slate-400"><Link href="/#catalogo" className="hover:text-white">Catálogo de apps</Link><Link href="/#instalacion" className="hover:text-white">Guía de instalación</Link><Link href="/#preguntas" className="hover:text-white">Preguntas frecuentes</Link><Link href="/developers" className="hover:text-white flex items-center gap-1">Para desarrolladores <ArrowUpRight size={13} aria-hidden="true" /></Link></div></nav>
        <nav aria-label="Información legal"><h2 className="text-sm font-semibold text-slate-200 mb-4">Información</h2><div className="flex flex-col items-start gap-3 text-sm text-slate-400"><Link href="/privacy" className="hover:text-white">Privacidad</Link><Link href="/terms" className="hover:text-white">Términos de uso</Link><a href="https://protondev.space" className="hover:text-white">Proton Dev</a></div></nav>
      </div>
      <div className="mt-10 border-t border-white/[.07] pt-6 flex flex-wrap justify-between gap-3 text-xs text-slate-500"><p>© {new Date().getFullYear()} Proton Apps. Hecho para tu día a día.</p><Link href="/admin" className="hover:text-slate-300">Administración</Link></div>
    </div>
  </footer>;
}
