import { Navbar } from '@/components/Navbar';
export default function Loading() {
  return <><Navbar /><main id="main-content" aria-busy="true" className="site-container py-16"><p role="status" className="text-sm text-slate-400">Cargando aplicaciones…</p><div className="mt-6 grid gap-6 sm:grid-cols-2"><div className="h-72 rounded-3xl bg-white/5 animate-pulse" /><div className="h-72 rounded-3xl bg-white/5 animate-pulse" /></div></main></>;
}
