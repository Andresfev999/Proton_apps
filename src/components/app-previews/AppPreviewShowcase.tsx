'use client';
import dynamic from 'next/dynamic';
const loading = () => <p role="status" className="p-5 text-sm text-slate-400">Cargando demostración…</p>;
const previews = {
  crosspro: dynamic(() => import('./CrossProInteractiveView').then(module => module.CrossProInteractiveView), {loading}),
  barberpoint: dynamic(() => import('./BarberPointInteractiveView').then(module => module.BarberPointInteractiveView), {loading}),
  pacepulse: dynamic(() => import('./PacePulseInteractiveView').then(module => module.PacePulseInteractiveView), {loading}),
  speednova: dynamic(() => import('./SpeedNovaInteractiveView').then(module => module.SpeedNovaInteractiveView), {loading}),
  mediagrab: dynamic(() => import('./MediaGrabInteractiveView').then(module => module.MediaGrabInteractiveView), {loading}),
  fitpulse: dynamic(() => import('./FitPulseInteractiveView').then(module => module.FitPulseInteractiveView), {loading}),
  chefcraft: dynamic(() => import('./ChefCraftInteractiveView').then(module => module.ChefCraftInteractiveView), {loading}),
  swipegallery: dynamic(() => import('./SwipeGalleryInteractiveView').then(module => module.SwipeGalleryInteractiveView), {loading}),
  flowpdf: dynamic(() => import('./FlowPdfInteractiveView').then(module => module.FlowPdfInteractiveView), {loading}),
  finup: dynamic(() => import('./FinUpInteractiveView').then(module => module.FinUpInteractiveView), {loading}),
  passwordbox: dynamic(() => import('./PasswordBoxInteractiveView').then(module => module.PasswordBoxInteractiveView), {loading})
};
export const hasAppPreview = (slug: string) => Object.hasOwn(previews, slug);
export function AppPreviewShowcase({slug}: {slug:string}) { const Preview = previews[slug as keyof typeof previews]; return Preview ? <Preview /> : null; }
