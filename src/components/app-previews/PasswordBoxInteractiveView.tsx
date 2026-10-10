'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck, Key, Copy, Check } from 'lucide-react';

export function PasswordBoxInteractiveView() {
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [length, setLength] = useState(16);

  const mockGeneratedPassword = 'k9$P#mX92_Qz!Lw7';

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/25 via-[#060b10] to-black p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black text-lg">
            🔐
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              PasswordBox Live: Generador Criptográfico & Bóveda AES-256
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold">
                Interactivo
              </span>
            </h3>
            <p className="text-xs text-slate-400">Genera credenciales blindadas sin conexión a servidores externos</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-7 space-y-4">
          <div className="p-4 rounded-xl bg-black/60 border border-cyan-500/20 flex items-center justify-between">
            <span className="font-mono text-cyan-300 font-bold text-base tracking-wider">
              {showPassword ? mockGeneratedPassword : '••••••••••••••••'}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(mockGeneratedPassword);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs flex items-center gap-1 font-bold"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '¡Copiada!' : 'Copiar'}</span>
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1 font-mono">
              <span>Longitud:</span>
              <span className="text-cyan-300 font-bold">{length} caracteres (Alta entropía)</span>
            </div>
            <input
              type="range"
              min={12}
              max={32}
              value={length}
              onChange={(e) => setLength(+e.target.value)}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>

        <div className="md:col-span-5 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200/90 leading-relaxed space-y-2">
          <div className="flex items-center gap-2 font-bold text-white">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Seguridad Grado Militar</span>
          </div>
          <p className="text-[11px] text-slate-300">
            Cifrado AES-256-GCM derivado con PBKDF2 (100.000 iteraciones). Tu clave maestra nunca abandona tu dispositivo.
          </p>
        </div>
      </div>
    </div>
  );
}
