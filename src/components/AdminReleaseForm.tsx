'use client';

import React, { useState } from 'react';
import { App } from '@/types/database';
import { Upload, FileCode, HardDrive, CheckCircle2, AlertTriangle } from 'lucide-react';
import { formatBytes } from '@/lib/data';

interface AdminReleaseFormProps {
  apps: App[];
  onSuccess: () => void;
}

export function AdminReleaseForm({ apps, onSuccess }: AdminReleaseFormProps) {
  const [selectedAppId, setSelectedAppId] = useState(apps[0]?.id || '');
  const [versionName, setVersionName] = useState('1.0.2');
  const [versionCode, setVersionCode] = useState('3');
  const [platform, setPlatform] = useState('android');
  const [minOsVersion, setMinOsVersion] = useState('Android 8.0 (API 26)');
  const [isCritical, setIsCritical] = useState(false);
  const [changelog, setChangelog] = useState(`### Novedades en esta versión
- Optimizaciones de rendimiento y respuesta táctil.
- Corrección de visualización y mejoras en la interfaz.
- Mayor estabilidad y soporte para Android 14+`);
  
  // APK File upload state
  const [apkFileName, setApkFileName] = useState('app-release.apk');
  const [apkSizeBytes, setApkSizeBytes] = useState(31457280); // 30 MB
  const [apkUrl, setApkUrl] = useState('https://storage.protondev.space/apks/app-release.apk');
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

    // Simular subida progresiva
    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      setUploadProgress(Math.min(progress, 100));
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setApkUrl(`/downloads/${file.name}`);
      }
    }, 150);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppId) {
      setMessage({ type: 'error', text: 'Debes seleccionar una aplicación destino.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/apps/api/v1/releases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          app_id: selectedAppId,
          version_name: versionName,
          version_code: parseInt(versionCode, 10),
          platform,
          min_os_version: minOsVersion,
          is_critical: isCritical,
          release_notes: changelog,
          apk_url: apkUrl,
          apk_size_bytes: apkSizeBytes,
          sha256_hash: sha256Hash || undefined
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al publicar la versión');

      setMessage({ type: 'success', text: `¡Versión ${versionName} (Build ${versionCode}) publicada con éxito!` });
      setTimeout(() => onSuccess(), 1500);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al registrar la versión';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div className={`p-4 rounded-xl text-sm flex items-center gap-2.5 ${
          message.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-rose-50 border border-rose-200 text-rose-800'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Target App & Version details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Aplicación Destino *</label>
          <select
            value={selectedAppId}
            onChange={(e) => setSelectedAppId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01875f]/20 focus:border-[#01875f] transition-all cursor-pointer"
          >
            {apps.map((app) => (
              <option key={app.id} value={app.id}>
                {app.name} ({app.slug})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nombre de Versión (SemVer) *</label>
          <input
            type="text"
            required
            value={versionName}
            onChange={(e) => setVersionName(e.target.value)}
            placeholder="ej: 1.0.2"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01875f]/20 focus:border-[#01875f] font-mono transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Version Code (Entero incremental) *</label>
          <input
            type="number"
            required
            value={versionCode}
            onChange={(e) => setVersionCode(e.target.value)}
            placeholder="ej: 3"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01875f]/20 focus:border-[#01875f] font-mono transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Plataforma</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01875f]/20 focus:border-[#01875f] transition-all cursor-pointer"
          >
            <option value="android">Android (APK)</option>
            <option value="ios">iOS (App Store IPA)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">SO Mínimo Requerido</label>
          <input
            type="text"
            value={minOsVersion}
            onChange={(e) => setMinOsVersion(e.target.value)}
            placeholder="Android 8.0 (API 26)"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01875f]/20 focus:border-[#01875f] transition-all"
          />
        </div>
      </div>

      {/* APK File Upload Area */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Archivo Binario APK *</label>
        <div className="p-6 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/80 hover:bg-slate-100/80 transition-colors flex flex-col items-center justify-center text-center relative group cursor-pointer">
          <input
            type="file"
            accept=".apk"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
          />

          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2.5">
            <Upload className="w-6 h-6" />
          </div>

          <p className="text-sm text-slate-800 font-semibold">
            Arrastra el archivo <span className="font-mono text-emerald-700">.apk</span> o haz clic para examinar
          </p>
          <p className="text-xs text-slate-500 mt-1">Archivos binarios Android APK firmados para producción</p>
        </div>

        {/* Upload status & Progress */}
        <div className="mt-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 font-mono text-slate-800 font-medium">
              <HardDrive className="w-4 h-4 text-emerald-600" />
              {apkFileName}
            </span>
            <span className="text-slate-500 text-xs font-medium">
              {formatBytes(apkSizeBytes)} ({uploadProgress}%)
            </span>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#01875f] to-teal-500 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>

          {/* Real-time calculated SHA-256 hash */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs font-mono gap-1">
            <span className="text-slate-600 flex items-center gap-1.5 truncate">
              <span className="font-semibold text-slate-700">SHA-256:</span>
              {isHashing ? (
                <span className="text-indigo-600 animate-pulse">Calculando hash criptográfico...</span>
              ) : sha256Hash ? (
                <span className="text-emerald-700 truncate max-w-xs">{sha256Hash}</span>
              ) : (
                <span className="text-slate-400">Listo para validar</span>
              )}
            </span>
            {sha256Hash && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                ✓ Web Crypto SHA-256
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Toggle is_critical */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
        <div className="space-y-0.5 pr-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-900">¿Actualización Obligatoria Crítica?</span>
            {isCritical && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                BLOQUEANTE
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">
            Si se activa, las apps cliente recibirán <code className="text-rose-600 font-mono">is_critical: true</code> para forzar la actualización antes de permitir su uso.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCritical(!isCritical)}
          className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
            isCritical ? 'bg-rose-600' : 'bg-slate-300'
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
        <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <FileCode className="w-4 h-4 text-emerald-600" />
            Notas de Lanzamiento (Changelog en Markdown)
          </span>
          <span className="text-xs text-slate-500 font-normal">Vista Previa en Vivo</span>
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <textarea
            rows={6}
            value={changelog}
            onChange={(e) => setChangelog(e.target.value)}
            placeholder="### Novedades en esta versión..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-xs text-slate-900 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01875f]/20 focus:border-[#01875f] leading-relaxed"
          />

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 overflow-y-auto max-h-[160px] leading-relaxed whitespace-pre-line">
            <div className="text-[10px] uppercase font-bold text-slate-400 pb-1 mb-2 border-b border-slate-200">
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
          className="w-full py-3.5 rounded-full bg-[#01875f] hover:bg-[#017250] disabled:opacity-50 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>{loading ? 'Publicando y distribuyendo APK...' : `Publicar Versión v${versionName} (Build ${versionCode})`}</span>
        </button>
      </div>
    </form>
  );
}
