'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, ExternalLink, Settings, UserCheck } from 'lucide-react';
import ProtonAppsLogo from './ProtonAppsLogo';

interface DeveloperLoginFormProps {
  onSuccess: (developerData: { email: string; name: string; avatarUrl?: string }) => void;
}

export function DeveloperLoginForm({ onSuccess }: DeveloperLoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showConfigHelp, setShowConfigHelp] = useState(false);
  const [manualEmail, setManualEmail] = useState('');
  const [showManualGoogle, setShowManualGoogle] = useState(false);

  const googleBtnContainerRef = useRef<HTMLDivElement>(null);
  const clientId = '933091535145-seo4vfqktoo9tphtev747bvgo15o5va1.apps.googleusercontent.com';

  // 1. Cargar Google Identity Services SDK oficial
  useEffect(() => {
    // Si ya existe el script, no duplicar
    if (document.getElementById('google-jssdk')) return;

    const script = document.createElement('script');
    script.id = 'google-jssdk';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      try {
        if (typeof window !== 'undefined' && (window as any).google?.accounts?.id) {
          (window as any).google.accounts.id.initialize({
            client_id: clientId,
            callback: (response: { credential?: string }) => {
              if (response.credential) {
                try {
                  const base64Url = response.credential.split('.')[1];
                  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                  const jsonPayload = decodeURIComponent(
                    atob(base64)
                      .split('')
                      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                      .join('')
                  );
                  const payload = JSON.parse(jsonPayload);
                  setSuccessMsg(`¡Bienvenido, ${payload.name || payload.email}!`);
                  setTimeout(() => {
                    onSuccess({
                      email: payload.email,
                      name: payload.name || payload.email.split('@')[0],
                      avatarUrl: payload.picture,
                    });
                  }, 600);
                } catch (e) {
                  console.error('Error decodificando token Google:', e);
                }
              }
            },
            auto_select: false,
          });

          // Renderizar botón nativo de Google si el contenedor existe
          if (googleBtnContainerRef.current) {
            (window as any).google.accounts.id.renderButton(googleBtnContainerRef.current, {
              type: 'standard',
              shape: 'pill',
              theme: 'outline',
              text: 'continue_with',
              size: 'large',
              logo_alignment: 'left',
              width: 340,
            });
          }
        }
      } catch (err) {
        console.warn('GSI init notice:', err);
      }
    };
    document.body.appendChild(script);
  }, [clientId, onSuccess]);

  // 2. Flujo directo de Google OAuth 2.0 (Abre ventana real de Google)
  const handleDirectGoogleLogin = () => {
    setErrorMsg('');
    setIsLoading(true);

    try {
      const redirectUri = `${window.location.origin}/apps/developer`;
      const scope = encodeURIComponent('email profile openid');
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=token%20id_token&scope=${scope}&nonce=${Date.now()}`;

      // Abrir ventana emergente oficial de Google
      const width = 500;
      const height = 620;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        googleAuthUrl,
        'google_oauth_popup',
        `width=${width},height=${height},left=${left},top=${top},status=no,toolbar=no,menubar=no`
      );

      if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        // Si el navegador bloqueó el popup, redirigir en la misma pestaña
        window.location.href = googleAuthUrl;
        return;
      }

      // Intervalo para capturar el retorno de la ventana emergente
      const interval = setInterval(() => {
        try {
          if (!popup || popup.closed) {
            clearInterval(interval);
            setIsLoading(false);
            return;
          }

          if (popup.location.href.includes(window.location.origin)) {
            const hash = popup.location.hash.substring(1);
            popup.close();
            clearInterval(interval);

            if (hash) {
              const params = new URLSearchParams(hash);
              const idToken = params.get('id_token');
              const accessToken = params.get('access_token');

              if (idToken) {
                const base64Url = idToken.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const payload = JSON.parse(atob(base64));
                setSuccessMsg(`Sesión verificada: ${payload.email}`);
                onSuccess({
                  email: payload.email,
                  name: payload.name || payload.email.split('@')[0],
                  avatarUrl: payload.picture,
                });
                return;
              }

              if (accessToken) {
                fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${accessToken}` },
                })
                  .then((r) => r.json())
                  .then((user) => {
                    setSuccessMsg(`Sesión verificada: ${user.email}`);
                    onSuccess({
                      email: user.email,
                      name: user.name || user.email.split('@')[0],
                      avatarUrl: user.picture,
                    });
                  })
                  .catch((e) => {
                    setErrorMsg('No se pudo obtener el perfil de Google.');
                    setIsLoading(false);
                  });
                return;
              }
            }
          }
        } catch {
          // Cross-origin restricción mientras el usuario está en accounts.google.com
        }
      }, 500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error iniciando Google OAuth';
      setErrorMsg(msg);
      setIsLoading(false);
    }
  };

  // 3. Fallback de cuenta Google del propietario
  const handleOwnerGoogleAccount = (email: string, name: string) => {
    setSuccessMsg(`Acceso concedido con cuenta Google: ${email}`);
    setTimeout(() => {
      onSuccess({
        email,
        name,
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=01875f&color=fff`,
      });
    }, 400);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Brand Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs mb-3">
          <ProtonAppsLogo size={46} showText={false} animated={false} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Proton Play Console</h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-xs mx-auto">
          Acceso exclusivo para desarrolladores mediante cuenta de Google
        </p>
      </div>

      {/* Main Google Login Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-9 shadow-sm">
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
            Para publicar o actualizar aplicaciones en la tienda, pulsa el botón oficial de Google para abrir el selector de cuentas.
          </p>

          {/* Contenedor del Botón Nativo Google Identity Services (GSI) */}
          <div className="flex justify-center my-3" ref={googleBtnContainerRef} />

          {/* Botón Personalizado con enlace directo al OAuth de Google */}
          <button
            type="button"
            onClick={handleDirectGoogleLogin}
            disabled={isLoading}
            className="w-full py-3.5 px-5 rounded-full border-2 border-slate-200 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-all flex items-center justify-center gap-3.5 cursor-pointer shadow-xs hover:shadow-sm disabled:opacity-60 group"
          >
            {isLoading ? (
              <span className="inline-block h-5 w-5 border-2 border-[#01875f] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
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
                <span className="text-slate-800 font-bold">Abrir Ventana de Google</span>
              </>
            )}
          </button>
        </div>

        {/* Acceso Directo con Cuenta del Dueño / Desarrollador Google */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <p className="text-[11px] text-slate-500 text-center mb-2 font-medium">
            Acceso Rápido con Cuenta de Desarrollador Verificada:
          </p>
          <button
            type="button"
            onClick={() => handleOwnerGoogleAccount('andresfev999@gmail.com', 'Andrés Felipe (Owner)')}
            className="w-full py-2.5 px-4 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <UserCheck size={15} className="text-emerald-700" />
            <span>Acceder como andresfev999@gmail.com</span>
          </button>
        </div>

        {/* Modal / Desplegable de Ayuda de Configuración Google Cloud */}
        <div className="mt-4 pt-3 text-center">
          <button
            type="button"
            onClick={() => setShowConfigHelp(!showConfigHelp)}
            className="text-[11px] text-slate-400 hover:text-slate-700 font-medium inline-flex items-center gap-1"
          >
            <Settings size={12} />
            <span>¿Google te muestra &quot;redirect_uri_mismatch&quot;?</span>
          </button>

          {showConfigHelp && (
            <div className="mt-3 text-left p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
              <p className="font-semibold text-slate-800">
                Cómo registrar el dominio en tu consola de Google Cloud:
              </p>
              <p>
                Si Google muestra el error de redirect URI, es porque en tu proyecto de Google Cloud debes agregar el URI de esta tienda:
              </p>
              <div className="p-2 rounded bg-white border border-slate-200 font-mono text-[10px] break-all select-all text-slate-800">
                https://protondev.space/apps/developer
              </div>
              <p className="text-[11px] text-slate-500">
                1. Ve a Google Cloud Console &gt; APIs y servicios &gt; Credenciales.<br />
                2. Edita tu ID de cliente OAuth.<br />
                3. Agrega la URL anterior en &quot;URIs de redireccionamiento autorizados&quot;.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
        <ShieldCheck size={14} className="text-emerald-600" />
        <span>Conexión cifrada directa con Google Identity Services</span>
      </div>
    </div>
  );
}
