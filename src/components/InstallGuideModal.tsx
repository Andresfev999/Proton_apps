'use client';
import { useState } from 'react';
import { Download, Copy } from 'lucide-react';
import { Modal } from './Modal';

export function InstallGuideModal({ isOpen, onClose, appName = 'la aplicación', apkSize, sha256Hash, downloadUrl }: {
  isOpen: boolean; onClose: () => void; appName?: string; apkSize?: string; sha256Hash?: string; downloadUrl?: string;
}) {
  const [message, setMessage] = useState('');
  if (!isOpen) return null;
  const validHash = sha256Hash && /^[a-f0-9]{64}$/i.test(sha256Hash);
  const copy = async () => {
    try { await navigator.clipboard.writeText(sha256Hash!); setMessage('Hash copiado'); }
    catch { setMessage('No se pudo copiar. Selecciona el hash para copiarlo manualmente.'); }
  };
  return <Modal title={`Cómo instalar ${appName}`} onClose={onClose} wide>
    <p className="text-sm text-slate-400 leading-relaxed">Estas aplicaciones se distribuyen como archivos APK para Android{apkSize ? ` (${apkSize})` : ''}. No se pueden instalar en iPhone.</p>
    <ol className="space-y-5 my-7">
      {[
        ['Descarga el APK', 'Usa el botón de descarga de esta web y espera a que termine. Comprueba que el nombre del archivo corresponde a la app que elegiste.'],
        ['Abre el archivo descargado', 'Busca el APK en las notificaciones de descarga o en la carpeta Descargas de tu teléfono.'],
        ['Autoriza esta instalación', 'Si Android lo solicita, permite la instalación desde el navegador o gestor de archivos que estás usando. Después pulsa Instalar. Puedes retirar ese permiso al terminar.']
      ].map(([title, text], index) => <li key={title} className="flex gap-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300 font-semibold">{index + 1}</span><div><h3 className="font-medium text-white mb-1">{title}</h3><p className="text-sm text-slate-400 leading-relaxed">{text}</p></div></li>)}
    </ol>
    <p className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-sm leading-relaxed text-amber-200">Si tu navegador o Play Protect identifica una amenaza concreta, detén la instalación. No desactives las protecciones del teléfono para continuar.</p>
    {validHash && <div className="mt-5 rounded-xl border border-white/10 p-4"><p className="text-sm font-medium text-slate-200">Huella del archivo (SHA-256)</p><p className="mt-1 text-xs text-slate-400">Sirve para comparar la integridad del APK; no equivale a un análisis antivirus.</p><code className="mt-3 block break-all text-xs text-slate-300 select-all">{sha256Hash}</code><button type="button" onClick={copy} className="secondary-button mt-3"><Copy size={15} aria-hidden="true" /> Copiar hash</button></div>}
    <p role="status" className="text-xs text-slate-300 mt-3">{message}</p>
    <div className="mt-6 flex flex-wrap gap-3">{downloadUrl && <a href={downloadUrl} className="primary-button"><Download size={17} aria-hidden="true" /> Descargar APK</a>}<button type="button" onClick={onClose} className="secondary-button">Entendido</button></div>
  </Modal>;
}
