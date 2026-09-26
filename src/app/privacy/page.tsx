'use client';

// Design Read: Legal & Trust-First privacy policy page with Double-Bezel containment,
// clean readable typography, and dark-tech aesthetic.

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ShieldCheck, ArrowLeft, Lock, EyeOff, Server, Smartphone, Cpu, CheckCircle2 } from 'lucide-react';

export default function PrivacyPage() {
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono uppercase tracking-[0.2em]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Compromiso de Privacidad Absoluta</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Política de Privacidad
          </h1>

          <p className="text-xs font-mono text-slate-400">
            Última actualización: <span className="text-slate-200">{lastUpdated}</span>
          </p>
        </div>

        {/* Content Box with Double-Bezel */}
        <div className="double-bezel-outer">
          <div className="double-bezel-inner p-8 sm:p-12 space-y-10 text-sm text-slate-300 leading-relaxed font-sans">
            
            {/* 1. Introducción */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Lock className="w-5 h-5 text-indigo-400" />
                <span>1. Filosofía y Compromiso de Privacidad</span>
              </h2>
              <p>
                En <strong>Proton Apps Hub</strong>, la privacidad y la soberanía de los datos no son características opcionales, sino la base arquitectónica sobre la cual se diseñan nuestros servicios. Esta Política de Privacidad explica cómo tratamos la información cuando visitas nuestro catálogo web, descargas archivos binarios de instalación (APKs) o cuando tus dispositivos móviles consultan el motor de actualizaciones Over-The-Air (OTA).
              </p>
              <p>
                <strong>Principio fundamental:</strong> No comercializamos, vendemos, alquilamos ni transferimos tus datos a intermediarios publicitarios o corredores de datos.
              </p>
            </section>

            {/* 2. Qué información recopilamos */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-cyan-400" />
                <span>2. Información que Recopilamos (Telemetría Mínima)</span>
              </h2>
              <p>
                Mantenemos una estricta política de minimización de datos:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 pl-2">
                <li>
                  <strong className="text-slate-200">Métricas Anónimas de Descargas:</strong> Registramos únicamente un contador numérico agregado (<code className="text-indigo-300 font-mono">download_count</code>) cada vez que un paquete APK es solicitado, sin asociar direcciones IP o identificadores de hardware permanentes.
                </li>
                <li>
                  <strong className="text-slate-200">Registros de Diagnóstico Técnico:</strong> Registros efímeros del servidor para monitoreo de estabilidad, mitigación de ataques DDoS y calidad de servicio (conservados por un periodo máximo de 14 días y anonimizados).
                </li>
                <li>
                  <strong className="text-slate-200">Sin Rastreadores Invasivos:</strong> No implementamos cookies de terceros, píxeles de retargeting de Meta, Google Analytics ni huellas dactilares de navegador (*browser fingerprinting*).
                </li>
              </ul>
            </section>

            {/* 3. Motor de Actualizaciones OTA */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-400" />
                <span>3. Consultas al Motor de Actualizaciones OTA</span>
              </h2>
              <p>
                Cuando una aplicación cliente (como <em>FinUp</em>) verifica actualizaciones automáticas mediante nuestro endpoint REST (<code className="text-cyan-300 font-mono">GET /api/v1/apps/:slug/updates</code>), se transmiten exclusivamente los siguientes parámetros técnicos:
              </p>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 font-mono text-xs">
                <div><span className="text-slate-500">slug:</span> Nombre canónico de la app (ej. <code>finup</code>)</div>
                <div><span className="text-slate-500">version_code:</span> Entero de compilación instalado (ej. <code>1</code>)</div>
                <div><span className="text-slate-500">platform:</span> Sistema operativo destino (ej. <code>android</code>)</div>
              </div>
              <p className="text-xs text-slate-400">
                Ningún número de serie (IMEI), identificador publicitario (GAID/IDFA), libreta de contactos o dato personal es recopilado ni solicitado en este proceso.
              </p>
            </section>

            {/* 4. Seguridad de los Binarios */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Server className="w-5 h-5 text-indigo-400" />
                <span>4. Integridad y Seguridad de los Archivos APK</span>
              </h2>
              <p>
                Todos los instaladores APK ofrecidos en este centro provienen de compilaciones oficiales verificadas por sus respectivos mantenedores y desarrolladores.
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 pl-2">
                <li>Los binarios son firmados criptográficamente mediante certificados de producción de Android.</li>
                <li>Verificamos los hashes de integridad (SHA-256) para garantizar que los paquetes no hayan sido alterados durante el almacenamiento o transmisión.</li>
              </ul>
            </section>

            {/* 5. Servicios de Terceros */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-violet-400" />
                <span>5. Enlaces a Tiendas Oficiales y Servicios Externos</span>
              </h2>
              <p>
                Nuestra plataforma proporciona enlaces opcionales a Google Play Store, Apple App Store y repositorios de código en GitHub. Al hacer clic en dichos enlaces externos, te recomendamos consultar las políticas de privacidad de cada plataforma respectiva.
              </p>
            </section>

            {/* 6. Contacto y Consultas */}
            <section className="space-y-3 pt-4 border-t border-white/5">
              <h2 className="text-lg font-bold text-white tracking-tight">
                6. Contacto y Consultas de Privacidad
              </h2>
              <p>
                Si tienes preguntas sobre nuestras prácticas de privacidad o deseas reportar alguna inquietud de seguridad en los paquetes distribuidos, puedes comunicarte con nuestro equipo a través del repositorio oficial de la plataforma:
              </p>
              <p className="font-mono text-xs text-indigo-300">
                <a href="https://github.com/Andresfev999/Proton_apps" target="_blank" rel="noreferrer" className="underline hover:text-white">
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
