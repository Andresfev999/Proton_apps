'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Search, X, Smartphone, Download, QrCode, Sparkles, SlidersHorizontal, Check, FileDown, FolderOpen, Settings } from 'lucide-react';
import { App } from '@/types/database';
import { appHref, downloadHref } from '@/lib/urls';
import { formatBytes } from '@/lib/data';
import { useDeviceType } from '@/lib/use-device';
import { AppCard } from './AppCard';
import { QrCodeModal } from './QrCodeModal';
import { InstallGuideModal } from './InstallGuideModal';

const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
type Filters = { q: string; category: string; sort: string };
const faqs = [
  ['¿Cómo descargo una aplicación?', 'Elige una app y pulsa Descargar. En un computador, usa el botón QR para abrir su ficha en tu teléfono Android. La descarga contiene un archivo APK que debes abrir para instalar.'],
  ['¿Las apps funcionan en iPhone?', 'Los archivos APK de este catálogo se instalan en Android. Si una app tiene una versión para iOS, encontrarás el enlace a la App Store en su ficha.'],
  ['¿Qué versión de Android necesito?', 'Cada ficha muestra el requisito mínimo de su versión actual. Comprueba ese dato antes de descargarla y asegúrate de tener espacio disponible.'],
  ['¿Cómo sé qué cambia en una actualización?', 'Abre la ficha de la app y consulta el historial de versiones. Allí puedes ver las novedades y la versión más reciente disponible.'],
  ['¿Dónde encuentro información sobre mis datos?', 'Consulta la política de privacidad de la plataforma y los detalles de cada aplicación. Los servicios de conexión, cuentas e inteligencia artificial pueden requerir internet y procesar información fuera del dispositivo.']
];

export function HomeContent({ apps, initialFilters }: { apps: App[]; initialFilters: Filters }) {
  const [filters, setFilters] = useState(initialFilters);
  const [qr, setQr] = useState(false);
  const [guide, setGuide] = useState(false);
  const { isIOS, isAndroid } = useDeviceType();
  const flagship = apps.find(app => app.slug === 'finup') || apps[0];
  const categories = useMemo(() => [...new Set(apps.map(app => app.category))].sort((a,b) => a.localeCompare(b, 'es')), [apps]);
  const counts = useMemo(() => new Map<string, number>(categories.map(category => [category, apps.filter(app => app.category === category).length])), [apps, categories]);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (filters.q) params.set('q', filters.q); else params.delete('q');
    if (filters.category !== 'Todas') params.set('category', filters.category); else params.delete('category');
    if (filters.sort !== 'recommended') params.set('sort', filters.sort); else params.delete('sort');
    const query = params.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`);
  }, [filters]);
  useEffect(() => {
    const restore = () => { const params = new URLSearchParams(window.location.search); setFilters({q:params.get('q') || '',category:params.get('category') || 'Todas',sort:params.get('sort') || 'recommended'}); };
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, []);
  const filtered = useMemo(() => {
    const term = normalize(filters.q.trim());
    return apps.filter(app => (filters.category === 'Todas' || app.category === filters.category) && (!term || normalize(`${app.name} ${app.tagline} ${app.category}`).includes(term)))
      .sort((a,b) => filters.sort === 'name' ? a.name.localeCompare(b.name,'es') : filters.sort === 'latest' ? new Date(b.latest_release?.published_at || b.updated_at).getTime() - new Date(a.latest_release?.published_at || a.updated_at).getTime() : (b.slug === 'finup' ? 1 : 0) - (a.slug === 'finup' ? 1 : 0) || (b.total_downloads || 0) - (a.total_downloads || 0));
  }, [apps, filters]);
  const reset = () => setFilters({ q: '', category: 'Todas', sort: 'recommended' });
  return <main id="main-content">
    <section className="hero-glow border-b border-white/[.06]">
      <div className="site-container grid lg:grid-cols-[1.12fr_1fr] items-center gap-10 lg:gap-16 py-14 sm:py-20 lg:py-24">
        <div>
          <p className="eyebrow flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> El universo de tus apps Android</p>
          <h1 className="mt-6 text-[2.8rem] sm:text-6xl lg:text-[4.3rem] leading-[1.07] font-semibold tracking-[-.045em] text-white">Pequeñas apps.<br /><span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">Grandes posibilidades.</span></h1>
          <p className="mt-6 max-w-lg text-base sm:text-lg leading-relaxed text-slate-400">Organiza tu dinero, impulsa tu negocio y simplifica tu día. Encuentra tu próxima app y descárgala directamente en tu Android.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/#catalogo" className="primary-button">Explorar aplicaciones <ArrowRight size={18} aria-hidden="true" /></Link><Link href="/#instalacion" className="secondary-button">Cómo instalar</Link></div>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400"><span className="flex items-center gap-1.5"><Smartphone size={14} className="text-indigo-300" aria-hidden="true" /> {apps.length} aplicaciones</span><span className="flex items-center gap-1.5"><Download size={14} className="text-cyan-300" aria-hidden="true" /> Descarga directa</span><span className="flex items-center gap-1.5"><Check size={14} className="text-emerald-300" aria-hidden="true" /> Sin intermediarios</span></div>
        </div>
        {flagship && <div className="relative rounded-[28px] border border-white/10 bg-gradient-to-br from-[#171c34] to-[#0d1822] p-6 sm:p-8 overflow-hidden">
          <div className="flex justify-between items-center gap-3"><span className="text-xs font-medium text-indigo-200 flex items-center gap-2"><Sparkles size={15} aria-hidden="true" /> App de la semana</span><span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-slate-400">{flagship.category}</span></div>
          <Link href={appHref(flagship.slug)} aria-label={`Descubrir ${flagship.name}`} className="relative block h-[260px] sm:h-[290px] mt-6 overflow-hidden">
            <div className="absolute top-6 left-1/2 -translate-x-[85%] -rotate-[8deg] w-[150px] sm:w-[175px] h-[310px] rounded-[25px] border-[5px] border-[#252b3e] bg-[#080b14] shadow-2xl overflow-hidden">{flagship.screenshots?.[1] ? <img src={flagship.screenshots[1].image_url} alt={`Pantalla de ${flagship.name}`} width={350} height={700} fetchPriority="high" className="w-full h-full object-cover object-top" /> : <img src={flagship.icon_url} alt="" width={150} height={150} className="m-auto mt-20 rounded-3xl" />}</div>
            <div className="absolute top-0 left-1/2 -translate-x-[10%] rotate-[7deg] w-[160px] sm:w-[185px] h-[340px] rounded-[27px] border-[5px] border-[#30354a] bg-[#080b14] shadow-2xl overflow-hidden">{flagship.screenshots?.[2] ? <img src={flagship.screenshots[2].image_url} alt={`Otra vista de ${flagship.name}`} width={370} height={740} fetchPriority="high" className="w-full h-full object-cover object-top" /> : <img src={flagship.icon_url} alt="" width={150} height={150} className="m-auto mt-20 rounded-3xl" />}</div>
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#111b2a] to-transparent" />
          </Link>
          <div className="relative flex items-center gap-3 mt-1"><img src={flagship.icon_url} width={44} height={44} alt="" className="h-11 w-11 rounded-xl" /><div><h2 className="text-xl font-semibold text-white">{flagship.name}</h2><p className="text-xs text-slate-400 mt-1">{flagship.slug === 'finup' ? 'Tu dinero, con más claridad.' : flagship.tagline}</p></div><Link href={appHref(flagship.slug)} aria-label={`Ver ${flagship.name}`} className="icon-button ml-auto"><ArrowUpRight size={20} aria-hidden="true" /></Link></div>
          <div className="flex gap-2 mt-5">{flagship.latest_release && !isIOS ? <a href={downloadHref(flagship.latest_release.id)} onClick={() => setGuide(true)} className="primary-button flex-1"><Download size={16} aria-hidden="true" /> {isAndroid ? 'Descargar en Android' : 'Descargar APK'} <span className="hidden sm:inline text-xs text-indigo-100">· {formatBytes(flagship.latest_release.apk_size_bytes)}</span></a> : <Link href={appHref(flagship.slug)} className="primary-button flex-1">Conocer la app</Link>}<button type="button" onClick={() => setQr(true)} aria-label={`Abrir QR de ${flagship.name}`} className="icon-button"><QrCode size={20} aria-hidden="true" /></button></div>
        </div>}
      </div>
    </section>
    <section id="catalogo" className="site-container py-16 sm:py-20">
      <div className="flex flex-col sm:flex-row justify-between gap-6 items-start sm:items-end"><div><p className="eyebrow">Encuentra lo que necesitas</p><h2 className="mt-3 text-3xl sm:text-4xl tracking-tight font-semibold text-white">Una app para cada día.</h2><p className="mt-3 text-sm text-slate-400">Herramientas para trabajar, crear y disfrutar.</p></div><p role="status" aria-live="polite" className="text-sm text-slate-400 tabular-nums">{filtered.length} {filtered.length === 1 ? 'app disponible' : 'apps disponibles'}</p></div>
      <div className="mt-8 flex flex-col sm:flex-row gap-3"><div className="relative flex-1"><label htmlFor="catalog-search" className="sr-only">Buscar aplicaciones</label><Search size={18} aria-hidden="true" className="absolute left-4 top-3.5 text-slate-500" /><input id="catalog-search" type="search" name="q" autoComplete="off" value={filters.q} onChange={event => setFilters({...filters,q:event.target.value})} placeholder="Busca una app o algo que quieras hacer…" className="field pl-11 pr-12" />{filters.q && <button type="button" aria-label="Limpiar búsqueda" onClick={() => setFilters({...filters,q:''})} className="absolute right-1 top-1 icon-button border-0 h-10 w-10"><X size={16} aria-hidden="true" /></button>}</div><div className="relative sm:w-52"><label htmlFor="catalog-sort" className="sr-only">Ordenar aplicaciones</label><SlidersHorizontal size={16} aria-hidden="true" className="absolute top-4 left-3 text-slate-500" /><select id="catalog-sort" value={filters.sort} onChange={event => setFilters({...filters,sort:event.target.value})} className="field pl-9"><option value="recommended">Recomendadas</option><option value="latest">Últimas actualizaciones</option><option value="name">Nombre: A–Z</option></select></div></div>
      <div aria-label="Filtrar por categoría" className="mt-5 flex flex-wrap gap-2">{['Todas',...categories].map(category => <button type="button" key={category} aria-pressed={filters.category === category} onClick={() => setFilters({...filters,category})} className={`rounded-full px-3.5 py-2.5 min-h-11 text-xs border transition-colors ${filters.category === category ? 'bg-indigo-500/15 border-indigo-400/40 text-indigo-200' : 'bg-white/[.02] border-white/[.08] text-slate-400 hover:border-white/20 hover:text-white'}`}>{category} <span className="ml-1.5 opacity-60 tabular-nums">{category === 'Todas' ? apps.length : counts.get(category)}</span></button>)}</div>
      {isIOS && <p className="mt-6 rounded-xl border border-indigo-400/20 bg-indigo-400/5 p-4 text-sm text-indigo-200">Estás explorando desde un iPhone. Los APK se instalan en Android; utiliza el QR para compartir una app con un teléfono compatible.</p>}
      {filtered.length ? <div className="app-grid mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(app => <AppCard key={app.id} app={app} isFeatured={app.slug === flagship?.slug} />)}</div> : <div className="panel mt-8 px-6 py-16 text-center"><Search size={32} className="mx-auto text-slate-600" aria-hidden="true" /><h3 className="mt-4 text-xl font-semibold">No encontramos esa app</h3><p className="mt-2 text-sm text-slate-400">Prueba con otro nombre o elige una categoría diferente.</p><button type="button" onClick={reset} className="secondary-button mt-6">Ver todas las aplicaciones</button></div>}
    </section>
    <section id="instalacion" className="border-y border-white/[.06] bg-[#0c101b]"><div className="site-container py-16 sm:py-20"><div className="max-w-xl"><p className="eyebrow">Del catálogo a tu teléfono</p><h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Tu próxima app, en tres pasos.</h2><p className="mt-4 text-sm text-slate-400 leading-relaxed">Descarga e instala directamente en Android. Si es tu primera vez con un APK, te acompañamos.</p></div><div className="mt-10 grid gap-8 md:grid-cols-3">{[{icon:FileDown,title:'Elige y descarga',text:'Encuentra una app que te guste y descarga su archivo APK. En tu computador, escanea el QR con el teléfono.'},{icon:FolderOpen,title:'Abre el archivo',text:'Cuando termine la descarga, abre el APK desde la notificación o desde la carpeta Descargas.'},{icon:Settings,title:'Instala en Android',text:'Autoriza la instalación desde esa fuente si Android lo solicita y pulsa Instalar. Revisa siempre los avisos del dispositivo.'}].map((step,index) => <div key={step.title}><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300"><step.icon size={20} aria-hidden="true" /></span><span className="text-xs text-slate-500 font-mono">0{index + 1}</span></div><h3 className="mt-5 text-lg font-semibold">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-400">{step.text}</p></div>)}</div><button type="button" onClick={() => setGuide(true)} className="secondary-button mt-9">Ver la guía completa <ArrowRight size={16} aria-hidden="true" /></button></div></section>
    <section id="preguntas" className="site-container py-16 sm:py-20 grid lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-20"><div><p className="eyebrow">Antes de empezar</p><h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Resolvemos tus dudas.</h2><p className="mt-4 text-sm leading-relaxed text-slate-400">Lo que necesitas saber para elegir e instalar una app.</p><Link href="/privacy" className="mt-5 inline-flex gap-2 items-center text-sm text-indigo-300 hover:text-indigo-200">Consulta la privacidad <ArrowUpRight size={15} aria-hidden="true" /></Link></div><div className="space-y-3">{faqs.map(([question,answer]) => <details key={question} className="rounded-2xl border border-white/[.08] bg-white/[.02] group"><summary className="flex items-center justify-between gap-3 p-5 text-sm font-medium list-none">{question}<span className="text-slate-500 text-xl group-open:rotate-45 transition-transform" aria-hidden="true">+</span></summary><p className="px-5 pb-5 text-sm leading-relaxed text-slate-400">{answer}</p></details>)}</div></section>
    <section className="site-container"><div className="panel flex flex-col sm:flex-row justify-between sm:items-center gap-6 p-7 sm:p-9 bg-gradient-to-r from-indigo-500/10 to-cyan-500/5"><div><h2 className="text-xl font-semibold">¿Construyes aplicaciones?</h2><p className="mt-2 text-sm text-slate-400">Explora nuestra API de versiones y actualizaciones.</p></div><Link href="/developers" className="secondary-button">Para desarrolladores <ArrowUpRight size={17} aria-hidden="true" /></Link></div></section>
    {flagship && <QrCodeModal isOpen={qr} onClose={() => setQr(false)} app={flagship} release={flagship.latest_release} />}
    <InstallGuideModal isOpen={guide} onClose={() => setGuide(false)} appName={flagship?.name} sha256Hash={flagship?.latest_release?.sha256_hash} />
  </main>;
}
