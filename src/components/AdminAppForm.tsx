'use client';

import React, { useState } from 'react';
import { PlusCircle, Check, AlertCircle } from 'lucide-react';
import { AppCategory, AppPlatform } from '@/types/database';

interface AdminAppFormProps {
  onSuccess: () => void;
}

export function AdminAppForm({ onSuccess }: AdminAppFormProps) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [category, setCategory] = useState<AppCategory>('Productividad');
  const [packageName, setPackageName] = useState('');
  const [playStoreUrl, setPlayStoreUrl] = useState('');
  const [appStoreUrl, setAppStoreUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!slug) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/apps/api/v1/apps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          slug,
          tagline,
          description,
          icon_url: iconUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=160&auto=format&fit=crop&q=80',
          category,
          package_name: packageName,
          platforms: ['android'] as AppPlatform[],
          play_store_url: playStoreUrl || undefined,
          app_store_url: appStoreUrl || undefined,
          github_url: githubUrl || undefined,
          status: 'published'
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al registrar la app');

      setMessage({ type: 'success', text: `¡Aplicación "${name}" registrada exitosamente!` });
      setName('');
      setSlug('');
      setTagline('');
      setDescription('');
      setIconUrl('');
      setPackageName('');
      setTimeout(() => onSuccess(), 1500);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error inesperado';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <div className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
          message.type === 'success' ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300' : 'bg-rose-950/80 border border-rose-500/40 text-rose-300'
        }`}>
          {message.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre de la App *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="ej: Task Pulse"
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Slug URL Único *</label>
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="ej: task-pulse"
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Package Name *</label>
          <input
            type="text"
            required
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            placeholder="ej: com.proton.taskpulse"
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Categoría</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as AppCategory)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="Productividad">Productividad</option>
            <option value="Seguridad">Seguridad</option>
            <option value="Utilidades">Utilidades</option>
            <option value="Finanzas">Finanzas</option>
            <option value="Comunicación">Comunicación</option>
            <option value="Desarrollo">Desarrollo</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Tagline (1 Línea) *</label>
        <input
          type="text"
          required
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="ej: Gestor ágil de micro-hábitos con sincronización biométrica"
          className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Descripción Completa (Markdown) *</label>
        <textarea
          rows={3}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Escribe la descripción completa en formato Markdown..."
          className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">URL del Icono</label>
        <input
          type="url"
          value={iconUrl}
          onChange={(e) => setIconUrl(e.target.value)}
          placeholder="https://images.unsplash.com/..."
          className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Google Play URL</label>
          <input
            type="url"
            value={playStoreUrl}
            onChange={(e) => setPlayStoreUrl(e.target.value)}
            placeholder="https://play.google.com/..."
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">App Store URL</label>
          <input
            type="url"
            value={appStoreUrl}
            onChange={(e) => setAppStoreUrl(e.target.value)}
            placeholder="https://apps.apple.com/..."
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub Repo URL</label>
          <input
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/..."
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
          />
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{loading ? 'Guardando en catálogo...' : 'Publicar Nueva Aplicación'}</span>
        </button>
      </div>
    </form>
  );
}
