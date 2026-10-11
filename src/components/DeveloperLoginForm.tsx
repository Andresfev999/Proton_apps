'use client';

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import ProtonAppsLogo from './ProtonAppsLogo';

interface DeveloperLoginFormProps {
  onSuccess: (developerData: { email: string; name: string }) => void;
}

export function DeveloperLoginForm({ onSuccess }: DeveloperLoginFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [devName, setDevName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);

    try {
      if (isSupabaseConfigured && supabase) {
        if (isLogin) {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
          const userEmail = data.user?.email || email;
          setSuccessMsg('Inicio de sesión exitoso. Cargando consola...');
          setTimeout(() => {
            onSuccess({ email: userEmail, name: userEmail.split('@')[0] });
          }, 800);
          return;
        } else {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { developer_name: devName || email.split('@')[0] }
            }
          });
          if (error) throw error;
          setSuccessMsg('¡Cuenta de desarrollador creada con éxito!');
          setTimeout(() => {
            onSuccess({ email: data.user?.email || email, name: devName || email.split('@')[0] });
          }, 800);
          return;
        }
      }

      // Modo Demo / Fallback local para desarrolladores
      if (email && password.length >= 4) {
        setSuccessMsg(isLogin ? '¡Bienvenido a la Consola de Desarrolladores!' : '¡Registro completado!');
        setTimeout(() => {
          onSuccess({ email, name: devName || email.split('@')[0] });
        }, 600);
      } else {
        setErrorMsg('La contraseña debe tener al menos 4 caracteres.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al autenticar';
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    setIsLoading(true);

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: `${window.location.origin}/developer` }
        });
        if (error) throw error;
        return;
      }

      // Simulación inmediata de login con Google
      setTimeout(() => {
        setSuccessMsg('Acceso verificado con Google');
        onSuccess({ email: 'developer@protondev.space', name: 'Proton Developer' });
      }, 700);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al conectar con Google';
      setErrorMsg(msg);
      setIsLoading(false);
    }
  };

  const handleQuickDemo = () => {
    setEmail('dev@protondev.space');
    setPassword('proton2026');
    setSuccessMsg('Acceso concedido como Desarrollador Verificado');
    setTimeout(() => {
      onSuccess({ email: 'dev@protondev.space', name: 'Proton Verified Dev' });
    }, 400);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Brand Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-emerald-50 border border-emerald-100 shadow-xs mb-3">
          <ProtonAppsLogo size={42} showText={false} animated={false} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Proton Play Console
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {isLogin 
            ? 'Inicia sesión para gestionar y publicar tus apps Android' 
            : 'Crea tu cuenta y empieza a publicar apps hoy'}
        </p>
      </div>

      {/* Main Login Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 shadow-sm">
        {/* Toggle between Iniciar Sesión / Registrarse */}
        <div className="flex rounded-full bg-slate-100 p-1 mb-6 border border-slate-200/60">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all ${
              isLogin 
                ? 'bg-white text-slate-900 shadow-xs' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all ${
              !isLogin 
                ? 'bg-white text-slate-900 shadow-xs' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Feedback alerts */}
        {errorMsg && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle size={16} className="text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nombre del Desarrollador o Estudio
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={devName}
                  onChange={(e) => setDevName(e.target.value)}
                  placeholder="ej: Nexus Labs"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01875f]/20 focus:border-[#01875f] transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail size={17} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="desarrollador@empresa.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01875f]/20 focus:border-[#01875f] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <Lock size={17} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-11 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#01875f]/20 focus:border-[#01875f] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5 rounded-lg transition-colors"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 rounded-full bg-[#01875f] hover:bg-[#017250] text-white font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{isLogin ? 'Acceder a la Consola' : 'Crear Cuenta de Desarrollador'}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Divider: o continúa con */}
        <div className="relative my-6 flex items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-3 text-xs text-slate-400 font-medium">o continúa con</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full py-2.5 px-4 rounded-full border border-slate-300 hover:bg-slate-50 bg-white text-slate-700 font-semibold text-sm transition-all flex items-center justify-center gap-3 cursor-pointer shadow-2xs"
        >
          {/* Official Google 4-Color G Icon */}
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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
          <span>Continuar con Google</span>
        </button>

        {/* Quick Demo Button for Testing */}
        <div className="mt-4 pt-4 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full py-2 px-3 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles size={14} className="text-emerald-600" />
            <span>Acceso Rápido Desarrollador (Modo Demo)</span>
          </button>
        </div>
      </div>

      {/* Safety and Terms Footer */}
      <div className="mt-5 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
        <ShieldCheck size={14} className="text-emerald-600" />
        <span>Conexión cifrada de extremo a extremo · Proton Dev Space</span>
      </div>
    </div>
  );
}
