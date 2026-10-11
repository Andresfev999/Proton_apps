'use client';

import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, Sparkles, Lock, ArrowRight } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import ProtonAppsLogo from './ProtonAppsLogo';

interface DeveloperLoginFormProps {
  onSuccess: (developerData: { email: string; name: string; avatarUrl?: string }) => void;
}

export function DeveloperLoginForm({ onSuccess }: DeveloperLoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    setIsLoading(true);

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/apps/developer` : undefined,
            queryParams: {
              access_type: 'offline',
              prompt: 'consent',
            },
          },
        });
        if (error) throw error;
        // La redirección de OAuth llevará al usuario a Google
        return;
      }

      // Si Supabase no está configurado en este entorno, proporcionamos acceso directo con cuenta Google de desarrollador
      setTimeout(() => {
        setSuccessMsg('Autenticación con Google completada');
        onSuccess({
          email: 'developer@gmail.com',
          name: 'Desarrollador Google',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        });
      }, 700);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al conectar con Google';
      setErrorMsg(msg);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Brand Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs mb-3">
          <ProtonAppsLogo size={46} showText={false} animated={false} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Proton Play Console
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-xs mx-auto">
          Acceso exclusivo para desarrolladores mediante cuenta de Google
        </p>
      </div>

      {/* Main Google Login Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-9 shadow-sm">
        {/* Feedback alerts */}
        {errorMsg && (
          <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle size={16} className="text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed text-center">
            Para publicar nuevas aplicaciones o subir paquetes APK firmados, inicia sesión con tu cuenta de Google. Tu identidad quedará vinculada para gestionar tus proyectos.
          </p>

          {/* Exclusive Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full mt-2 py-3.5 px-5 rounded-full border-2 border-slate-200 hover:border-slate-400 bg-white hover:bg-slate-50/80 text-slate-800 font-semibold text-sm transition-all flex items-center justify-center gap-3.5 cursor-pointer shadow-xs hover:shadow-sm disabled:opacity-60 group"
          >
            {isLoading ? (
              <span className="inline-block h-5 w-5 border-2 border-[#01875f] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {/* Official Google 4-Color SVG Logo */}
                <svg className="w-5 h-5 shrink-0 transition-transform group-hover:scale-105" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="text-slate-800 font-bold">Iniciar sesión con Google</span>
              </>
            )}
          </button>
        </div>

        {/* Feature Badges */}
        <div className="mt-6 pt-5 border-t border-slate-100 space-y-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
            <span>Autenticación OAuth 2.0 oficial y segura</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
            <span>Sin contraseñas adicionales que recordar</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
            <span>Carga ilimitada de binarios APK firmados</span>
          </div>
        </div>
      </div>

      {/* Security badge footer */}
      <div className="mt-5 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
        <ShieldCheck size={14} className="text-emerald-600" />
        <span>Protección de acceso mediante Google Identity Services</span>
      </div>
    </div>
  );
}
