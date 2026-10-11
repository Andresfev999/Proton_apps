import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ApiTester } from '@/components/ApiTester';
import { Terminal, ArrowLeft, UploadCloud, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'API y actualizaciones para desarrolladores - Proton Apps',
  description: 'Consulta versiones, prueba la API de actualizaciones in-app y accede a la Consola de Desarrolladores.',
  alternates: { canonical: 'https://protondev.space/apps/developers' },
};

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col">
      <Navbar />
      <main id="main-content" className="site-container py-10 sm:py-14 flex-1">
        <Link
          href="/"
          className="inline-flex gap-2 items-center text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={15} aria-hidden="true" /> Volver a Proton Apps
        </Link>

        {/* CTA to Developer Console */}
        <div className="mt-6 mb-10 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 p-6 sm:p-8 text-white shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/20 text-white backdrop-blur-xs mb-2">
              <UploadCloud size={14} />
              Consola de Desarrolladores
            </span>
            <h2 className="text-xl sm:text-2xl font-bold">¿Deseas subir o actualizar una app?</h2>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1">
              Accede a la consola oficial para registrar nuevas aplicaciones, subir binarios APK y publicar versiones.
            </p>
          </div>
          <Link
            href="/developer"
            className="py-2.5 px-5 rounded-full bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs shadow-xs transition-all shrink-0 flex items-center gap-2"
          >
            <span>Ir a la Consola</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        <p className="eyebrow flex items-center gap-2">
          <Terminal size={15} aria-hidden="true" /> Documentación API
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Versiones claras. Actualizaciones conectadas.
        </h1>
        <p className="mt-3 max-w-2xl text-xs sm:text-sm text-slate-600 leading-relaxed">
          Nuestra API REST te permite consultar en tiempo real las versiones publicadas y comprobar si un cliente Android necesita actualizarse con soporte para actualizaciones críticas bloqueantes.
        </p>

        <div className="mt-8 rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-7 shadow-xs">
          <ApiTester initialSlug="speednova" />
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">Endpoints públicos</h2>
          <div className="grid gap-4 mt-4 sm:grid-cols-3">
            {[
              ['/apps/api/v1/apps', 'Catálogo general en formato JSON con todas las apps y sus últimas versiones.'],
              ['/apps/api/v1/apps/:slug/updates', 'Comprueba si existe actualización pasando version_code y platform.'],
              ['/apps/api/v1/download/:releaseId', 'Descarga directa del binario APK registrando métricas de tráfico.'],
            ].map(([endpoint, description]) => (
              <div key={endpoint} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <code className="text-xs font-mono font-semibold text-emerald-700 break-all">GET {endpoint}</code>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
