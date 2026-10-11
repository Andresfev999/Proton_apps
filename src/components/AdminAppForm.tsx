'use client';

import React, { useState } from 'react';
import { PlusCircle, Check, AlertCircle, Sparkles } from 'lucide-react';
import { AppCategory, AppPlatform } from '@/types/database';

interface AdminAppFormProps {
  onSuccess: () => void;
  developer?: { email: string; name: string } | null;
}

export function AdminAppForm({ onSuccess, developer }: AdminAppFormProps) {
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

    const isAdmin = developer?.email?.toLowerCase().trim() === 'andresfev999@gmail.com';

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
          status: isAdmin ? 'published' : 'pending',
          developer_email: developer?.email,
          developer_name: developer?.name
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al registrar la app');

      const successText = isAdmin
        ? `¡Aplicación "${name}" publicada inmediatamente por el administrador!`
        : `¡Aplicación "${name}" enviada para revisión! El administrador (andresfev999@gmail.com) la evaluará antes de publicarla.`;

      setMessage({ type: 'success', text: successText });
      setName('');
      setSlug('');
      setTagline('');
      setDescription('');
      setIconUrl('');
      setPackageName('');
      setTimeout(() => onSuccess(), 2000);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error inesperado';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {message && (
        <div className={`p-4 rounded-xl text-sm flex items-center gap-2.5 ${
          message.type === 'success' 
            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
            : 'bg-rose-50 border border-rose-200 text-rose-800'
        }`}>
          {message.type === 'success' ? <Check className="w-5 h-5 text-emerald-600 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nombre de la Aplicación *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="ej: FitPulse Trainer"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01875f]/20 focus:border-[#01875f] transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Slug URL Único *</label>
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="ej: fitpulse-trainer"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01875f]/20 focus:border-[#01875f] font-mono transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Package Name (Identificador Android) *</label>
          <input
            type="text"
            required
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            placeholder="ej: com.proton.fitpulse"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01875f]/20 focus:border-[#01875f] font-mono transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Categoría en la Tienda</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as AppCategory)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01875f]/20 focus:border-[#01875f] transition-all cursor-pointer"
          >
            <option value="Productividad">Productividad</option>
            <option value="Seguridad">Seguridad & Privacidad</option>
            <option value="Utilidades">Herramientas & Utilidades</option>
            <option value="Finanzas">Finanzas & Negocios</option>
            <option value="Comunicación">Multimedia & Video</option>
            <option value="Desarrollo">Salud & Deporte</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tagline o Subtítulo Resumen (1 línea) *</label>
        <input
          type="text"
          required
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="ej: Monitoreo cardíaco y rutinas de alta intensidad guiadas"
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01875f]/20 focus:border-[#01875f] transition-all"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Descripción Completa (Características y Novedades) *</label>
        <textarea
          rows={3}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe las funcionalidades clave que enamorarán a los usuarios..."
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01875f]/20 focus:border-[#01875f] transition-all"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">URL del Icono (PNG / JPG 512x512)</label>
        <input
          type="url"
          value={iconUrl}
          onChange={(e) => setIconUrl(e.target.value)}
          placeholder="https://images.unsplash.com/... o enlace de icono público"
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01875f]/20 focus:border-[#01875f] transition-all"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Google Play URL (Opcional)</label>
          <input
            type="url"
            value={playStoreUrl}
            onChange={(e) => setPlayStoreUrl(e.target.value)}
            placeholder="https://play.google.com/..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01875f]/20 focus:border-[#01875f]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">App Store URL (Opcional)</label>
          <input
            type="url"
            value={appStoreUrl}
            onChange={(e) => setAppStoreUrl(e.target.value)}
            placeholder="https://apps.apple.com/..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01875f]/20 focus:border-[#01875f]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">GitHub Repo URL (Opcional)</label>
          <input
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01875f]/20 focus:border-[#01875f]"
          />
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full bg-[#01875f] hover:bg-[#017250] disabled:opacity-50 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{loading ? 'Publicando en la tienda...' : 'Publicar Aplicación en la Tienda'}</span>
        </button>
      </div>
    </form>
  );
}
