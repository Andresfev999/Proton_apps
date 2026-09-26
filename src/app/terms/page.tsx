'use client';

// Design Read: Legal & Trust-First terms of service page with Double-Bezel containment,
// clean readable typography, and dark-tech aesthetic.

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FileText, ArrowLeft, Shield, CheckCircle2, AlertTriangle, Scale, Smartphone, RefreshCw } from 'lucide-react';

export default function TermsPage() {
  const lastUpdated = "25 de Septiembre de 2026";

  return (
    <div className="min-h-screen bg-[#04060a] text-slate-100 selection:bg-indigo-500 selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full space-y-12">
        {/* Breadcrumb */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Inicio</span>
          </Link>
        </div>

        {/* Header Hero */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-[10px] font-mono uppercase tracking-[0.2em]">
            <Scale className="w-3.5 h-3.5 text-indigo-400" />
            <span>Términos Legales & Condiciones de Uso</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Términos de Servicio
          </h1>

          <p className="text-xs font-mono text-slate-400">
            Última actualización: <span className="text-slate-200">{lastUpdated}</span>
          </p>
        </div>

        {/* Content Box with Double-Bezel */}
        <div className="double-bezel-outer">
          <div className="double-bezel-inner p-8 sm:p-12 space-y-10 text-sm text-slate-300 leading-relaxed font-sans">
            
            {/* 1. Aceptación */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                <span>1. Aceptación de los Términos</span>
              </h2>
              <p>
                Al acceder al portal web de <strong>Proton Apps Hub</strong>, descargar binarios Android (<code className="text-indigo-300 font-mono">.apk</code>), escanear códigos QR de distribución móvil o consumir los endpoints de la API de actualizaciones Over-The-Air (OTA), aceptas quedar sujeto a los presentes Términos de Servicio.
              </p>
              <p className="text-xs text-slate-400">
                Si no estás de acuerdo con alguna de las cláusulas aquí expuestas, te solicitamos abstenerte de utilizar la plataforma y sus servicios derivados.
              </p>
            </section>

            {/* 2. Naturaleza de la Plataforma */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-cyan-400" />
                <span>2. Naturaleza y Propósito del Servicio</span>
              </h2>
              <p>
                <strong>Proton Apps Hub</strong> es una plataforma de ingeniería diseñada para centralizar, exhibir y gestionar el ciclo de vida, distribución de instaladores móviles y resolución de versiones OTA.
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 pl-2">
                <li>
                  <strong className="text-slate-200">Distribución Independiente (Sideloading):</strong> Los paquetes APK se proporcionan para instalación directa en dispositivos compatibles con Android. El usuario comprende y asume la configuración necesaria en su sistema operativo para habilitar la instalación desde fuentes externas autorizadas.
                </li>
                <li>
                  <strong className="text-slate-200">Pasarela a Tiendas Oficiales:</strong> Cuando esté disponible, se proporcionan enlaces directos a tiendas oficiales como Google Play Store y Apple App Store para conveniencia del usuario.
                </li>
              </ul>
            </section>

            {/* 3. Actualizaciones Over-The-Air */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-emerald-400" />
                <span>3. Mecanismo de Actualizaciones OTA y Parches Críticos</span>
              </h2>
              <p>
                Nuestra API REST (<code className="text-cyan-300 font-mono">/api/v1/apps/:slug/updates</code>) permite a las aplicaciones verificar periódicamente si existen nuevas compilaciones:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 pl-2">
                <li>
                  <strong className="text-slate-200">Actualizaciones Opcionales (<code className="text-emerald-400 font-mono">is_critical: false</code>):</strong> El usuario final tiene la libertad de decidir cuándo descargar e instalar las nuevas versiones.
                </li>
                <li>
                  <strong className="text-slate-200">Actualizaciones Críticas (<code className="text-rose-400 font-mono">is_critical: true</code>):</strong> En casos de parches de seguridad indispensables, corrección de vulnerabilidades criptográficas o cambios de compatibilidad en protocolos centrales, las apps cliente pueden requerir la actualización obligatoria como condición para mantener la conectividad segura con los servicios.
                </li>
              </ul>
            </section>

            {/* 4. Responsabilidad del Usuario */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-400" />
                <span>4. Uso Aceptable y Responsabilidades del Usuario</span>
              </h2>
              <p>
                Al utilizar nuestros servicios, el usuario se compromete a:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 pl-2">
                <li>No realizar ataques de denegación de servicio (DoS/DDoS) contra los endpoints de descarga ni saturar maliciosamente la API de actualizaciones.</li>
                <li>No intentar redistribuir versiones modificadas con código malicioso suplantando la identidad de las aplicaciones oficiales del catálogo.</li>
                <li>Mantener respaldos de sus datos personales locales en las aplicaciones que operan bajo arquitectura *Local-First*.</li>
              </ul>
            </section>

            {/* 5. Exclusión de Garantías */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span>5. Exclusión de Garantías y Limitación de Responsabilidad</span>
              </h2>
              <p>
                La plataforma, su código fuente y las aplicaciones distribuidas se entregan <strong>&ldquo;tal cual&rdquo; (as is)</strong> y <strong>&ldquo;según disponibilidad&rdquo;</strong>, sin garantías de ningún tipo, ya sean expresas o implícitas.
              </p>
              <p className="text-xs text-slate-400">
                En ningún caso los mantenedores de Proton Apps Hub serán responsables por daños indirectos, pérdida de datos, interrupción de servicio o incompatibilidades técnicas derivadas de la instalación de versiones beta o experimentales en dispositivos no homologados.
              </p>
            </section>

            {/* 6. Propiedad Intelectual */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Scale className="w-5 h-5 text-violet-400" />
                <span>6. Propiedad Intelectual</span>
              </h2>
              <p>
                Los nombres, logotipos, marcas comerciales y binarios de cada aplicación pertenecen a sus respectivos autores y creadores. Los componentes de código abierto se rigen por sus correspondientes licencias de software (MIT, Apache 2.0, GPL, etc.) accesibles en los repositorios de cada proyecto.
              </p>
            </section>

            {/* 7. Modificaciones */}
            <section className="space-y-3 pt-4 border-t border-white/5">
              <h2 className="text-lg font-bold text-white tracking-tight">
                7. Modificaciones a los Términos
              </h2>
              <p>
                Nos reservamos el derecho de actualizar estos Términos en cualquier momento para reflejar mejoras técnicas, regulatorias o de seguridad. Las modificaciones entrarán en vigor a partir de su publicación en esta misma página.
              </p>
              <p className="font-mono text-xs text-slate-400">
                Para consultas legales o reportes técnicos, visita:{" "}
                <a href="https://github.com/Andresfev999/Proton_apps" target="_blank" rel="noreferrer" className="text-indigo-400 underline hover:text-white">
                  github.com/Andresfev999/Proton_apps
                </a>
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
