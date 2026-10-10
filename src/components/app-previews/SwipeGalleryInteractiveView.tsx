'use client';

import React, { useState } from 'react';
import { Trash2, Heart, Lock, ShieldCheck, Sparkles, RotateCcw, CheckCircle2 } from 'lucide-react';

export function SwipeGalleryInteractiveView() {
  const [activeTab, setActiveTab] = useState<'clean' | 'vault'>('clean');
  const [freedSpaceMb, setFreedSpaceMb] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);

  // Vault state
  const [pin, setPin] = useState('');
  const [vaultUnlocked, setVaultUnlocked] = useState(false);

  const samplePhotos = [
    { id: 1, title: 'Captura duplicada de factura', size: 4.8, category: 'Captura Antigua' },
    { id: 2, title: 'Video borroso de WhatsApp', size: 38.5, category: 'Video Pesado' },
    { id: 3, title: 'Meme repetido descargado', size: 3.2, category: 'Descargas' },
    { id: 4, title: 'Foto de viaje en la playa (Conservar)', size: 8.4, category: 'Cámara' },
  ];

  const handleAction = (action: 'keep' | 'delete') => {
    if (cardIndex >= samplePhotos.length) return;
    const current = samplePhotos[cardIndex];
    if (action === 'delete') {
      setFreedSpaceMb((prev) => +(prev + current.size).toFixed(1));
    }
    setCardIndex((prev) => prev + 1);
  };

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);
      if (nextPin === '1234') {
        setVaultUnlocked(true);
      }
    }
  };

  const currentPhoto = samplePhotos[cardIndex];

  return (
    <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-950/20 via-[#0e070c] to-black p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 font-black text-lg">
            🔥
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              SwipeGallery Live: Modo Limpieza Gestual & Bóveda Secreta
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold">
                Interactivo
              </span>
            </h3>
            <p className="text-xs text-slate-400">Prueba el gesto de swipe para limpiar almacenamiento y la bóveda PIN</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
          <button
            onClick={() => setActiveTab('clean')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'clean' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Swipe & Clean
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'vault' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            🔒 Bóveda PIN
          </button>
        </div>
      </div>

      {activeTab === 'clean' ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Card Simulator */}
          <div className="md:col-span-7 flex flex-col items-center">
            {currentPhoto ? (
              <div className="w-full max-w-sm p-5 rounded-2xl bg-black/80 border border-rose-500/30 shadow-2xl space-y-4">
                <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-4xl mb-2">📸</span>
                  <span className="text-xs font-bold text-white">{currentPhoto.title}</span>
                  <span className="text-[11px] font-mono text-rose-400 font-bold mt-1">
                    {currentPhoto.size} MB · {currentPhoto.category}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-4 pt-2">
                  <button
                    onClick={() => handleAction('delete')}
                    className="flex-1 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Trash2 className="w-4 h-4 text-rose-400" />
                    <span>Eliminar</span>
                  </button>
                  <button
                    onClick={() => handleAction('keep')}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Heart className="w-4 h-4 text-emerald-400 fill-current" />
                    <span>Conservar</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-black/60 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">¡Revisión Finalizada!</h4>
                <p className="text-xs text-slate-400">Has liberado {freedSpaceMb} MB en esta sesión.</p>
                <button
                  onClick={() => {
                    setCardIndex(0);
                    setFreedSpaceMb(0);
                  }}
                  className="mt-2 text-xs font-bold text-rose-400 hover:text-rose-300 underline underline-offset-4 cursor-pointer"
                >
                  Reiniciar simulador
                </button>
              </div>
            )}
          </div>

          {/* Telemetry Counter */}
          <div className="md:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-black/60 border border-rose-500/20 text-center">
              <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-bold block mb-1">
                Espacio Liberado Simulado
              </span>
              <div className="text-4xl sm:text-5xl font-black font-mono text-white">
                {freedSpaceMb} <span className="text-lg text-rose-400 font-normal">MB</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-200/90 leading-relaxed">
              🔥 <strong>Novedad v1.0.4:</strong> Multi-selección para mover a la bóveda privada en lote, navegación deslizante horizontal entre fotos y miniaturas de video nativas en hardware.
            </div>
          </div>
        </div>
      ) : (
        /* Vault PIN Simulator */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-6 flex flex-col items-center p-6 bg-black/80 rounded-2xl border border-rose-500/30">
            <Lock className="w-8 h-8 text-rose-400 mb-2" />
            <span className="text-xs font-bold text-white mb-2">Ingresa PIN de Bóveda (Prueba: 1234)</span>

            {/* PIN Dots */}
            <div className="flex gap-2.5 my-3">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-3.5 h-3.5 rounded-full border border-rose-400 ${
                    pin.length > i ? 'bg-rose-500' : 'bg-transparent'
                  }`}
                />
              ))}
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-2 mt-2 w-48">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '✓'].map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    if (key === 'C') {
                      setPin('');
                      setVaultUnlocked(false);
                    } else if (key === '✓') {
                      if (pin === '1234') setVaultUnlocked(true);
                    } else {
                      handlePinInput(key);
                    }
                  }}
                  className="h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono font-bold text-sm cursor-pointer transition-colors"
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-6 space-y-3">
            {vaultUnlocked ? (
              <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>¡Bóveda Desbloqueada con Éxito!</span>
                </div>
                <p className="text-xs text-slate-300">
                  En SwipeGallery tus archivos ocultos se mueven al almacenamiento privado seguro de la aplicación fuera del alcance de la galería de Android y apps de terceros.
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-300 space-y-2">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-rose-400" />
                  Privacidad Cero-Rastreo
                </div>
                <p className="text-[11px] text-slate-400">
                  Protección con PIN hash local, importación masiva y exportación de vuelta a la galería cuando lo decidas.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
