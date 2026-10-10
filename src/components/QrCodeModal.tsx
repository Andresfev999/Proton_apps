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
    QRCode.toDataURL(target, { width: 320, margin: 2, color: { dark: '#080b14', light: '#ffffff' } })
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
    <p className="text-sm leading-relaxed text-slate-400">Escanea este código con la cámara de tu teléfono. Verás la ficha de la app y podrás descargarla allí.</p>
    <div className="mx-auto my-6 flex h-64 w-64 max-w-full items-center justify-center rounded-2xl bg-white p-3">
      {qrDataUrl ? <img src={qrDataUrl} alt={`Código QR para abrir ${app.name}`} width={240} height={240} /> : <span className="text-sm text-slate-600">{message || 'Generando código…'}</span>}
    </div>
    <p className="flex items-center justify-center gap-2 text-xs text-slate-400"><Smartphone size={16} aria-hidden="true" /> Android{release ? ` · Versión ${release.version_name}` : ''}</p>
    <input readOnly value={url} aria-label="Enlace a la aplicación" className="field mt-5 text-xs" onFocus={event => event.target.select()} />
    <button type="button" onClick={copy} className="primary-button mt-4 w-full">{message === 'Enlace copiado' ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />} Copiar enlace</button>
    <p role="status" className="mt-3 text-center text-xs text-slate-300 min-h-4">{message}</p>
  </Modal>;
}
