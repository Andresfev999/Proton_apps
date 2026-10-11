'use client';

import React, { useState } from 'react';
import { Terminal, Play, CheckCircle2, AlertTriangle, ShieldCheck, Copy, Check } from 'lucide-react';
import { UpdateCheckResponse } from '@/types/database';

interface ApiTesterProps {
  initialSlug?: string;
}

export function ApiTester({ initialSlug = 'speednova' }: ApiTesterProps) {
  const [slug, setSlug] = useState(initialSlug);
  const [versionCode, setVersionCode] = useState('1');
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
    <div className="rounded-2xl p-6 sm:p-7 bg-white border border-slate-200/90 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Consola Interactiva de Prueba OTA</h3>
            <p className="text-xs text-slate-500">Simula la petición de actualización que realiza tu app móvil</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-[11px] font-mono font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
            GET /api/v1/apps/:slug/updates
          </span>
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Slug de la App
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01875f]/20 focus:border-[#01875f] font-mono transition-all"
            placeholder="ej: speednova"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            version_code (Instalado en cliente)
          </label>
          <input
            type="number"
            value={versionCode}
            onChange={(e) => setVersionCode(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01875f]/20 focus:border-[#01875f] font-mono transition-all"
            placeholder="ej: 1"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Plataforma
          </label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01875f]/20 focus:border-[#01875f] font-mono transition-all cursor-pointer"
          >
            <option value="android">Android</option>
            <option value="ios">iOS</option>
          </select>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5">
        <div className="text-xs font-mono text-slate-500 truncate w-full sm:w-auto">
          <span className="text-emerald-700 font-bold">GET</span> {requestUrl}
        </div>

        <button
          onClick={handleTest}
          disabled={loading}
          className="w-full sm:w-auto py-2 px-5 rounded-full bg-[#01875f] hover:bg-[#017250] disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{loading ? 'Consultando...' : 'Ejecutar Solicitud'}</span>
        </button>
      </div>

      {/* Response Area */}
      {response && (
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-bold ${
                  status === 200
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                HTTP {status}
              </span>

              {response.has_update ? (
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Actualización disponible
                </span>
              ) : (
                <span className="text-xs font-semibold text-slate-500">
                  App al día
                </span>
              )}
            </div>

            <button
              onClick={copyJson}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado' : 'Copiar JSON'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto max-h-56">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
