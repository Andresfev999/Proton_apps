'use client';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Copy, Check, Smartphone } from 'lucide-react';
import { App, Release } from '@/types/database';
import { BASE_PATH, appHref } from '@/lib/urls';
import { Modal } from './Modal';

export function QrCodeModal({ isOpen, onClose, app, release }: { isOpen: boolean; onClose: () => void; app: App; release?: Release }) {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    const target = `${window.location.origin}${BASE_PATH}${appHref(app.slug)}`;
    setUrl(target); setQrDataUrl(''); setMessage('');
    QRCode.toDataURL(target, { width: 320, margin: 2, color: { dark: '#090e1a', light: '#ffffff' } })
      .then(data => { if (!cancelled) setQrDataUrl(data); })
      .catch(() => { if (!cancelled) setMessage('No pudimos generar el QR. Puedes copiar el enlace.'); });
    return () => { cancelled = true; };
  }, [isOpen, app.slug]);
  if (!isOpen) return null;
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setMessage('Enlace copiado'); }
    catch { setMessage('No pudimos copiarlo. Selecciona el enlace de abajo para copiarlo manualmente.'); }
  };
  return <Modal title={`Abre ${app.name} en tu Android`} onClose={onClose}>
    <p className="text-xs sm:text-sm leading-relaxed text-slate-600">Escanea este código con la cámara de tu teléfono Android para abrir la ficha directa y descargar el APK.</p>
    <div className="mx-auto my-5 flex h-60 w-60 max-w-full items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-2xs p-3">
      {qrDataUrl ? <img src={qrDataUrl} alt={`Código QR para abrir ${app.name}`} width={230} height={230} /> : <span className="text-xs text-slate-500">{message || 'Generando código QR…'}</span>}
    </div>
    <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium"><Smartphone size={15} aria-hidden="true" /> Android{release ? ` · Versión ${release.version_name}` : ''}</p>
    <input readOnly value={url} aria-label="Enlace a la aplicación" className="field mt-4 text-xs font-mono" onFocus={event => event.target.select()} />
    <button type="button" onClick={copy} className="primary-button mt-3 w-full">{message === 'Enlace copiado' ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />} Copiar enlace</button>
    <p role="status" className="mt-2 text-center text-xs text-emerald-700 font-medium min-h-4">{message}</p>
  </Modal>;
}
