'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import ProtonAppsLogo from './ProtonAppsLogo';

const links = [{ href: '/#catalogo', label: 'Explorar apps' }, { href: '/#instalacion', label: 'Cómo instalar' }, { href: '/#preguntas', label: 'Preguntas frecuentes' }];
export function Navbar() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return <header className="sticky top-0 z-40 border-b border-white/[.07] bg-[#090e1a]/90 backdrop-blur-xl">
    <div className="site-container flex h-20 items-center justify-between gap-4">
      <Link href="/" aria-label="Proton Apps, inicio" onClick={() => setOpen(false)}><ProtonAppsLogo size={36} showText animated={false} /></Link>
      <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-7">{links.map(link => <Link key={link.href} href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">{link.label}</Link>)}<Link href="/#catalogo" className="secondary-button">Ver catálogo <ArrowUpRight size={16} aria-hidden="true" /></Link></nav>
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} className="icon-button mobile-menu-toggle">{open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}</button>
    </div>
    {open && <nav id="mobile-navigation" aria-label="Navegación móvil" className="site-container md:hidden pb-5 flex flex-col gap-1">{links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-xl p-3 text-sm text-slate-200 hover:bg-white/5">{link.label}</Link>)}</nav>}
  </header>;
}
