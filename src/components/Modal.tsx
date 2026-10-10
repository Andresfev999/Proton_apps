'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export function Modal({ title, onClose, children, wide = false }: { title: string; onClose: () => void; children: ReactNode; wide?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);
  useEffect(() => { closeRef.current = onClose; }, [onClose]);
  useEffect(() => {
    const element = dialog.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { element?.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  return createPortal(
    <dialog ref={dialog} aria-label={title} onCancel={event => { event.preventDefault(); closeRef.current(); }}
      onClick={event => { if (event.target === event.currentTarget) closeRef.current(); }}
      className={`proton-dialog ${wide ? 'proton-dialog-wide' : ''}`}>
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold text-white tracking-tight">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Cerrar ventana" className="icon-button shrink-0"><X size={19} aria-hidden="true" /></button>
        </div>
        {children}
      </div>
    </dialog>, document.body
  );
}
