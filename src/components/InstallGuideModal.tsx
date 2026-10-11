'use client';

import { useState } from 'react';
import { Download, Copy, Check, ShieldAlert } from 'lucide-react';
import { Modal } from './Modal';

export function InstallGuideModal({
  isOpen,
  onClose,
  appName = 'la aplicación',
  apkSize,
  sha256Hash,
  downloadUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  appName?: string;
  apkSize?: string;
  sha256Hash?: string;
  downloadUrl?: string;
}) {
  const [message, setMessage] = useState('');
  if (!isOpen) return null;

  const validHash = sha256Hash && /^[a-f0-9]{64}$/i.test(sha256Hash);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(sha256Hash!);
      setMessage('Hash copiado al portapapeles');
    } catch {
      setMessage('No se pudo copiar. Selecciona el hash manualmente.');
    }
  };

  return (
    <Modal title={`Guía de instalación: ${appName}`} onClose={onClose} wide>
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
        Las aplicaciones se descargan como archivos binarios APK oficiales para Android{apkSize ? ` (${apkSize})` : ''}.
      </p>

      <ol className="space-y-4 my-6">
        {[
          [
            'Descarga el archivo APK',
            'Haz clic en el botón de descarga. Tu navegador comenzará a descargar el archivo oficial firmado.',
          ],
          [
            'Abre la descarga finalizada',
            'Toca la notificación de "Descarga completa" o ingresa a tu carpeta de Descargas en el teléfono.',
          ],
          [
            'Autoriza la instalación en Android',
            'Si es la primera vez que instalas fuera de Google Play, permite la instalación para este navegador y pulsa Instalar.',
          ],
        ].map(([title, text], index) => (
          <li key={title} className="flex gap-3.5 items-start">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
              0{index + 1}
            </span>
            <div>
              <h3 className="font-bold text-sm text-slate-900 mb-0.5">{title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-xs leading-relaxed text-amber-900 flex items-start gap-2.5">
        <ShieldAlert size={17} className="text-amber-700 shrink-0 mt-0.5" />
        <span>
          Recomendación de seguridad: Descarga únicamente archivos desde el dominio oficial{' '}
          <strong className="text-amber-950 font-semibold">protondev.space</strong> para garantizar la autenticidad e integridad del código.
        </span>
      </div>

      {validHash && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-bold text-slate-800">Firma de Integridad (SHA-256)</p>
          <p className="mt-0.5 text-[11px] text-slate-500">
            Comprueba que el archivo descargado coincide exactamente con el código emitido.
          </p>
          <code className="mt-2 block break-all text-[11px] text-slate-700 bg-white p-2 rounded-lg border border-slate-200 select-all font-mono">
            {sha256Hash}
          </code>
          <button
            type="button"
            onClick={copy}
            className="mt-2.5 px-3 py-1.5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {message ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{message || 'Copiar hash SHA-256'}</span>
          </button>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2.5 justify-end">
        {downloadUrl && (
          <a
            href={downloadUrl}
            className="py-2.5 px-5 rounded-full bg-[#01875f] hover:bg-[#017250] text-white text-xs font-semibold shadow-xs transition-all inline-flex items-center gap-1.5"
          >
            <Download size={15} />
            <span>Descargar APK</span>
          </a>
        )}
        <button
          type="button"
          onClick={onClose}
          className="py-2.5 px-5 rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
}
