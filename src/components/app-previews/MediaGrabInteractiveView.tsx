'use client';

import React, { useState } from 'react';
import { Download, Film, Music, CheckCircle2, Play, Sparkles, Loader2 } from 'lucide-react';

export function MediaGrabInteractiveView() {
  const [url, setUrl] = useState('https://video.example.com/watch?v=4K_Cyberpunk_Tokyo');
  const [selectedFormat, setSelectedFormat] = useState<'1080p' | '720p' | 'mp3'>('1080p');
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);

  const formats = [
    { id: '1080p', label: '1080p Full HD', size: '124 MB', type: 'video', quality: 'Máxima Nitidez' },
    { id: '720p', label: '720p HD', size: '58 MB', type: 'video', quality: 'Ahorro de Datos' },
    { id: 'mp3', label: 'Audio MP3 320kbps', size: '9.2 MB', type: 'audio', quality: 'Sonido Studio' },
  ];

  const handleStartDownload = () => {
    if (downloading) return;
    setDownloading(true);
    setProgress(0);
    setFinished(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloading(false);
          setFinished(true);
          return 100;
        }
        return prev + 15;
      });
    }, 150);
  };

  return (
    <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-950/25 via-[#0d0914] to-black p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 font-black text-lg">
            📥
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              MediaGrab Live: Capturador HD & Extractor de Audio
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/40 text-violet-300 font-bold">
                Interactivo
              </span>
            </h3>
            <p className="text-xs text-slate-400">Pega un enlace y elige la resolución ideal sin anuncios ni esperas</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Link Input Simulator */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-violet-400"
            placeholder="Pega cualquier enlace de video o reel..."
          />
          <button
            onClick={handleStartDownload}
            disabled={downloading}
            className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-violet-600/25 transition-all cursor-pointer"
          >
            {downloading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>{downloading ? 'Capturando...' : 'Capturar Ahora'}</span>
          </button>
        </div>

        {/* Quality format options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {formats.map((fmt) => (
            <div
              key={fmt.id}
              onClick={() => setSelectedFormat(fmt.id as any)}
              className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                selectedFormat === fmt.id
                  ? 'bg-violet-500/20 border-violet-400 text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5">
                  {fmt.type === 'video' ? <Film className="w-3.5 h-3.5 text-violet-400" /> : <Music className="w-3.5 h-3.5 text-indigo-400" />}
                  {fmt.label}
                </span>
                <span className="text-[11px] font-mono text-violet-300">{fmt.size}</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">{fmt.quality}</div>
            </div>
          ))}
        </div>

        {/* Download Queue Progress */}
        {(downloading || finished) && (
          <div className="p-4 rounded-xl bg-black/60 border border-violet-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white font-bold flex items-center gap-1.5">
                {finished ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Loader2 className="w-4 h-4 text-violet-400 animate-spin" />}
                {finished ? '¡Descarga lista en Almacenamiento!' : `Descargando (${selectedFormat})...`}
              </span>
              <span className="font-mono text-violet-300 font-bold">{progress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
