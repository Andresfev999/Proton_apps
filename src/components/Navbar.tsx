'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, UploadCloud, LayoutGrid, HelpCircle, ShieldCheck, Search } from 'lucide-react';
import ProtonAppsLogo from './ProtonAppsLogo';

const links = [
  { href: '/#catalogo', label: 'Apps y Herramientas', icon: LayoutGrid },
  { href: '/#instalacion', label: 'Cómo instalar APK', icon: ShieldCheck },
  { href: '/#preguntas', label: 'Preguntas frecuentes', icon: HelpCircle },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="site-container flex h-18 items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" aria-label="Proton Apps, inicio" onClick={() => setOpen(false)} className="flex items-center">
          <ProtonAppsLogo size={36} showText animated={false} />
        </Link>

        {/* Center Navigation Links (Desktop) */}
        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/#catalogo"
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/70 rounded-full border border-slate-200 transition-colors"
          >
            <Search size={14} className="text-slate-400" />
            <span>Buscar en la tienda</span>
          </Link>

          <Link
            href="/developer"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#01875f] hover:bg-[#017250] rounded-full shadow-xs transition-all hover:shadow-sm"
          >
            <UploadCloud size={15} />
            <span>Consola Desarrollador</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className="md:hidden flex items-center justify-center h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-colors"
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Navegación móvil"
          className="site-container md:hidden py-4 border-t border-slate-100 flex flex-col gap-1.5 bg-white"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl p-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <link.icon size={18} className="text-slate-500" />
              <span>{link.label}</span>
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 mt-1 flex flex-col gap-2">
            <Link
              href="/developer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white bg-[#01875f]"
            >
              <UploadCloud size={17} />
              <span>Consola Desarrollador / Subir App</span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
