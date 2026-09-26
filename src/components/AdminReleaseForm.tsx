'use client';

import React, { useState } from 'react';
import { App } from '@/types/database';
import { Upload, Check, AlertTriangle, FileCode, HardDrive, CheckCircle2 } from 'lucide-react';
import { formatBytes } from '@/lib/data';

interface AdminReleaseFormProps {
  apps: App[];
  onSuccess: () => void;
}

export function AdminReleaseForm({ apps, onSuccess }: AdminReleaseFormProps) {
  const [selectedAppId, setSelectedAppId] = useState(apps[0]?.id || '');
  const [versionName, setVersionName] = useState('1.3.1');
  const [versionCode, setVersionCode] = useState('15');
  const [platform, setPlatform] = useState('android');
  const [minOsVersion, setMinOsVersion] = useState('Android 8.0 (API 26)');
  const [isCritical, setIsCritical] = useState(false);
  const [changelog, setChangelog] = useState(`### Novedades en esta versión
- Optimizaciones de rendimiento en el motor de renderizado.
- Corrección de anomalías en sincronización de datos offline.
- Parche de seguridad en protocolos de red.`);
  
  // APK File upload state
  const [apkFileName, setApkFileName] = useState('app-v1.3.1.apk');
  const [apkSizeBytes, setApkSizeBytes] = useState(26214400); // 25 MB
  const [apkUrl, setApkUrl] = useState('https://storage.proton.local/apks/app-v1.3.1.apk');
  const [sha256Hash, setSha256Hash] = useState('');
  const [isHashing, setIsHashing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(100);
  const [isUploading, setIsUploading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setApkFileName(file.name);
    setApkSizeBytes(file.size);
    setIsUploading(true);
    setUploadProgress(0);

    // Calcular SHA-256 automáticamente usando Web Crypto API
    setIsHashing(true);
    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.result instanceof ArrayBuffer) {
        try {
          const hashBuffer = await crypto.subtle.digest('SHA-256', reader.result);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
          setSha256Hash(hashHex);
        } catch (err) {
          console.warn('Error calculando hash SHA-256:', err);
        } finally {
          setIsHashing(false);
        }
      }
    };
    reader.readAsArrayBuffer(file);

    // Simular subida con progreso suave a Storage
    let current = 0;
    const interval = setInterval(() => {
      current += 15;
      if (current >= 100) {
        clearInterval(interval);
        setUploadProgress(100);
        setIsUploading(false);
        setApkUrl(`https://storage.proton.local/apks/${file.name}`);
      } else {
        setUploadProgress(current);
      }
    }, 150);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppId) {
      setMessage({ type: 'error', text: 'Por favor selecciona una aplicación' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/v1/releases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          app_id: selectedAppId,
          version_name: versionName,
          version_code: parseInt(versionCode, 10),
          platform,
          changelog,
          apk_file_url: apkUrl,
          apk_size_bytes: apkSizeBytes,
          min_os_version: minOsVersion,
          is_critical: isCritical,
          sha256_hash: sha256Hash || undefined
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al publicar versión');

      setMessage({
        type: 'success',
        text: `¡Versión v${versionName} (Build ${versionCode}) publicada con éxito!`
      });
      setTimeout(() => onSuccess(), 1500);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Error inesperado';
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
          message.type === 'success' ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300' : 'bg-rose-950/80 border border-rose-500/40 text-rose-300'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Target App & Version details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Aplicación Destino *</label>
          <select
            value={selectedAppId}
            onChange={(e) => setSelectedAppId(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
          >
            {apps.map((app) => (
              <option key={app.id} value={app.id}>
                {app.name} ({app.slug})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre de Versión (SemVer) *</label>
          <input
            type="text"
            required
            value={versionName}
            onChange={(e) => setVersionName(e.target.value)}
            placeholder="ej: 1.3.1"
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Version Code (Entero incremental) *</label>
          <input
            type="number"
            required
            value={versionCode}
            onChange={(e) => setVersionCode(e.target.value)}
            placeholder="ej: 15"
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Plataforma</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
          >
            <option value="android">Android (APK)</option>
            <option value="ios">iOS</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">SO Mínimo Requerido</label>
          <input
            type="text"
            value={minOsVersion}
            onChange={(e) => setMinOsVersion(e.target.value)}
            placeholder="Android 8.0 (API 26)"
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
          />
        </div>
      </div>

      {/* APK File Upload Area with Progress Bar */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Archivo Binario APK *</label>
        <div className="p-4 rounded-xl border border-dashed border-white/20 bg-slate-900/50 hover:bg-slate-900/80 transition-colors flex flex-col items-center justify-center text-center relative group">
          <input
            type="file"
            accept=".apk"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
          />

          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2">
            <Upload className="w-5 h-5" />
          </div>

          <p className="text-xs text-slate-200 font-medium">
            Arrastra el archivo <span className="font-mono text-indigo-400">.apk</span> o haz clic para examinar
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Archivos binarios Android APK firmados para producción</p>
        </div>

        {/* Upload status & Progress */}
        <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 font-mono text-slate-300">
              <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
              {apkFileName}
            </span>
            <span className="text-slate-400 text-[11px]">
              {formatBytes(apkSizeBytes)} ({uploadProgress}%)
            </span>
          </div>

          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>

          {/* Real-time calculated SHA-256 hash */}
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400 flex items-center gap-1.5">
              <span>SHA-256:</span>
              {isHashing ? (
                <span className="text-cyan-400 animate-pulse">Calculando hash criptográfico...</span>
              ) : sha256Hash ? (
                <span className="text-emerald-300 truncate max-w-xs">{sha256Hash}</span>
              ) : (
                <span className="text-slate-500">Pendiente de selección</span>
              )}
            </span>
            {sha256Hash && (
              <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                ✓ Web Crypto SHA-256
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Toggle is_critical */}
      <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10 flex items-center justify-between">
        <div className="space-y-0.5 pr-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">¿Actualización Obligatoria Crítica?</span>
            {isCritical && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                BLOQUEANTE
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400">
            Si se activa, las apps cliente recibirán <code className="text-rose-400">is_critical: true</code> para forzar un diálogo modal que impide seguir usando la versión desactualizada.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCritical(!isCritical)}
          className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
            isCritical ? 'bg-rose-600' : 'bg-slate-700'
          }`}
          aria-label="Toggle actualización crítica"
        >
          <div
            className={`w-4 h-4 rounded-full bg-white transition-transform transform absolute top-1 ${
              isCritical ? 'right-1' : 'left-1'
            }`}
          />
        </button>
      </div>

      {/* Markdown Split-Screen Editor & Live Preview */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <FileCode className="w-3.5 h-3.5 text-indigo-400" />
            Notas de Lanzamiento (Changelog en Markdown)
          </span>
          <span className="text-[11px] text-slate-500 font-normal">Editor con Vista Previa en Vivo</span>
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Textarea */}
          <textarea
            rows={7}
            value={changelog}
            onChange={(e) => setChangelog(e.target.value)}
            placeholder="### Novedades en v1.3.1..."
            className="w-full bg-slate-950 border border-white/10 rounded-xl p-3.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500 leading-relaxed"
          />

          {/* Live Preview */}
          <div className="bg-slate-950/80 border border-white/10 rounded-xl p-3.5 text-xs text-slate-300 overflow-y-auto max-h-[168px] leading-relaxed whitespace-pre-line prose prose-invert prose-sm">
            <div className="text-[10px] uppercase font-semibold text-slate-500 pb-1 mb-2 border-b border-white/5">
              Vista Previa Renderizada
            </div>
            {changelog}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading || isUploading}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 transition-all cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>{loading ? 'Publicando y distribuyendo...' : `Publicar Versión v${versionName} (Build ${versionCode})`}</span>
        </button>
      </div>
    </form>
  );
}
