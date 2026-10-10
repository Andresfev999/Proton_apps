'use client';
import { useState } from 'react';
export function VideoPreview({url,name,poster}: {url:string;name:string;poster?:string}) {
  const [error, setError] = useState(false);
  return <div className="panel overflow-hidden">{error ? <div className="p-8 text-center"><p className="text-slate-300">El video no está disponible en este navegador.</p><p className="mt-3 text-sm text-slate-400">Puedes explorar las capturas de la aplicación.</p><a href="#capturas" className="secondary-button mt-5">Ver capturas</a></div> : <video controls playsInline preload="none" poster={poster} src={url} aria-label={`Video de presentación de ${name}`} onError={() => setError(true)} className="w-full aspect-video bg-black object-contain">Tu navegador no puede reproducir este video.</video>}</div>;
}
