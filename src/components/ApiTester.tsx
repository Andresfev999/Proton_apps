'use client';

import React, { useState } from 'react';
import { Terminal, Play, CheckCircle2, AlertTriangle, ShieldCheck, Copy, Check } from 'lucide-react';
import { UpdateCheckResponse } from '@/types/database';

interface ApiTesterProps {
  initialSlug?: string;
}

export function ApiTester({ initialSlug = 'task-pulse' }: ApiTesterProps) {
  const [slug, setSlug] = useState(initialSlug);
  const [versionCode, setVersionCode] = useState('10');
  const [platform, setPlatform] = useState('android');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<UpdateCheckResponse | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const requestUrl = `/apps/api/v1/apps/${slug}/updates?version_code=${versionCode}&platform=${platform}`;

  const handleTest = async () => {
    setLoading(true);
    try {
      const res = await fetch(requestUrl);
      setStatus(res.status);
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error(err);
      setStatus(500);
      setResponse({ has_update: false, message: 'Error de red al consultar el endpoint' });
    } finally {
      setLoading(false);
    }
  };

  const copyJson = () => {
    if (!response) return;
    navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
            <Terminal className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base sm:text-lg">Consola Interactiva de Prueba OTA</h3>
            <p className="text-xs text-slate-400">Simula la petición que realiza tu app móvil al iniciar</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-1 rounded">
            GET /api/v1/apps/:slug/updates
          </span>
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Slug de la App
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
            placeholder="ej: task-pulse"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            version_code (Instalado)
          </label>
          <input
            type="number"
            value={versionCode}
            onChange={(e) => setVersionCode(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
            placeholder="ej: 10"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Plataforma
          </label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
          >
            <option value="android">Android</option>
            <option value="ios">iOS</option>
          </select>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="text-xs font-mono text-slate-400 truncate w-full sm:w-auto">
          <span className="text-emerald-400 font-semibold">GET</span> {requestUrl}
        </div>

        <button
          onClick={handleTest}
          disabled={loading}
          className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/30 transition-all duration-150 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{loading ? 'Consultando...' : 'Ejecutar Solicitud'}</span>
        </button>
      </div>

      {/* Response Area */}
      {response && (
        <div className="space-y-4">
          {/* Status Banner */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2.5 py-1 rounded-md font-mono font-bold ${
                status === 200 ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-rose-950 text-rose-300 border border-rose-500/30'
              }`}>
                HTTP {status}
              </span>

              {response.has_update ? (
                response.is_critical ? (
                  <span className="text-xs px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Actualización Crítica Detectada (Bloqueante)
                  </span>
                ) : (
                  <span className="text-xs px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Nueva Versión Opcional Disponible
                  </span>
                )
              ) : (
                <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  App al Día (has_update: false)
                </span>
              )}
            </div>

            <button
              onClick={copyJson}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 py-1 px-2 rounded hover:bg-white/5 transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copiado' : 'Copiar JSON'}</span>
            </button>
          </div>

          {/* JSON Syntax Viewer */}
          <div className="bg-slate-950 rounded-xl p-4 border border-white/10 font-mono text-xs text-slate-300 overflow-x-auto max-h-72">
            <pre className="text-cyan-300">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
