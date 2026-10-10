'use client';
export default function ErrorPage({reset}: {reset: () => void}) {
  return <main id="main-content" className="site-container py-24 text-center"><h1 className="text-3xl font-semibold">No pudimos cargar esta página</h1><p className="mt-4 text-slate-400">Comprueba tu conexión y vuelve a intentarlo.</p><button type="button" onClick={reset} className="primary-button mt-7">Reintentar</button><a href="/apps" className="secondary-button mt-7 ml-3">Volver al catálogo</a></main>;
}
