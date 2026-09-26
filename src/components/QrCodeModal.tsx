'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'qrcode';
import { X, Copy, Check, QrCode, Smartphone, Download } from 'lucide-react';
import { App, Release } from '@/types/database';
import { formatBytes } from '@/lib/data';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  app: App;
  release?: Release;
}

export function QrCodeModal({ isOpen, onClose, app, release }: QrCodeModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && release) {
      const url = `${window.location.origin}/api/v1/download/${release.id}`;
      setDownloadUrl(url);

      QRCode.toDataURL(url, {
        width: 320,
        margin: 2,
        color: {
          dark: '#04060a',
          light: '#ffffff'
        },
        errorCorrectionLevel: 'H'
      })
        .then((dataUrl) => {
          setQrDataUrl(dataUrl);
        })
        .catch((err) => {
          console.error('Error generando QR Code:', err);
        });
    }
  }, [release]);

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopy = () => {
    if (!downloadUrl) return;
    navigator.clipboard.writeText(downloadUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop con desenfoque */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Double-Bezel Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="relative w-full max-w-md double-bezel-outer z-10"
          >
            <div className="double-bezel-inner p-6 sm:p-8 relative overflow-hidden">
              {/* Ambient Radiant Glow */}
              <div className="absolute -top-20 -right-20 w-44 h-44 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                    <QrCode className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base tracking-tight leading-tight">Escaneo Móvil Directo</h3>
                    <p className="text-xs text-slate-400">Descarga {app.name} en tu celular</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Cerrar modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* QR Frame Container */}
              <div className="my-6 flex flex-col items-center">
                <div className="p-3 bg-white rounded-2xl shadow-2xl ring-4 ring-indigo-500/30 relative">
                  {qrDataUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={qrDataUrl}
                      alt={`Código QR para descargar ${app.name}`}
                      className="w-52 h-52 sm:w-60 sm:h-60 object-contain rounded-xl"
                    />
                  ) : (
                    <div className="w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center bg-slate-100 rounded-xl">
                      <span className="text-xs text-slate-500 animate-pulse font-mono">Generando código...</span>
                    </div>
                  )}
                </div>

                {/* Version & file info */}
                <div className="mt-4 flex items-center gap-3 text-xs font-mono text-slate-300">
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                    v{release?.version_name || '1.0.0'}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">
                    {release ? formatBytes(release.apk_size_bytes) : 'APK'}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-emerald-400 font-medium">Instalador Oficial</span>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-white/[0.02] rounded-2xl p-4 border border-white/5 space-y-2 mb-6 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <Smartphone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Abre la <strong>cámara de tu celular</strong> o lector QR y apunta a la pantalla para comenzar la descarga directa del archivo <code className="text-cyan-300 font-mono">.apk</code>.
                  </p>
                </div>
              </div>

              {/* Action Buttons: Button-in-Button */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={handleCopy}
                  className="flex-1 py-2.5 px-4 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>¡Enlace Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copiar Enlace Directo</span>
                    </>
                  )}
                </button>

                {release && (
                  <a
                    href={`/api/v1/download/${release.id}`}
                    className="pl-5 pr-2 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-between gap-3 shadow-md shadow-indigo-600/30 transition-all duration-150 cursor-pointer active:scale-95 group/btn"
                  >
                    <span>Descargar en PC</span>
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center btn-nested-icon">
                      <Download className="w-3 h-3" />
                    </div>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
