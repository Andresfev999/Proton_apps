'use client';

import React from 'react';

interface ProtonAppsLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  animated?: boolean;
  showHubBadge?: boolean;
}

export default function ProtonAppsLogo({
  size = 40,
  className = '',
  showText = false,
  animated = true,
  showHubBadge = true,
}: ProtonAppsLogoProps) {
  return (
    <div
      className={`inline-flex items-center gap-3 select-none ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center' }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          overflow: 'visible',
          filter: 'drop-shadow(0 0 14px rgba(99, 102, 241, 0.45)) drop-shadow(0 0 5px rgba(0, 242, 254, 0.35))',
        }}
        aria-label="Proton Apps Logo"
      >
        <defs>
          {/* Radial Gradient for 3D Proton Nucleus Core */}
          <radialGradient
            id="appsCoreGradComponent"
            cx="36%"
            cy="34%"
            r="65%"
            fx="30%"
            fy="28%"
          >
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="20%" stopColor="#c7d2fe" />
            <stop offset="42%" stopColor="#818cf8" />
            <stop offset="70%" stopColor="#6366f1" />
            <stop offset="90%" stopColor="#4338ca" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </radialGradient>

          {/* Halo Glow */}
          <radialGradient id="appsHaloGradComponent" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#00f2fe" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#03060d" stopOpacity="0" />
          </radialGradient>

          {/* Orbit 1: Indigo to Violet */}
          <linearGradient id="orbitIndigoComp" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="1" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.95" />
          </linearGradient>

          {/* Orbit 2: Cyber Cyan to Electric Blue */}
          <linearGradient id="orbitCyanComp" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="1" />
            <stop offset="55%" stopColor="#0284c7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.95" />
          </linearGradient>

          {/* Orbit 3: Android Emerald to Neon Mint */}
          <linearGradient id="orbitEmeraldComp" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ff87" stopOpacity="1" />
            <stop offset="60%" stopColor="#10b981" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.95" />
          </linearGradient>

          {/* Intense Neon Glow Filter */}
          <filter id="appsNeonGlowComp" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.2" result="blur1" />
            <feGaussianBlur stdDeviation="4.8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <style>{`
          @keyframes protonAppsPulse {
            0%, 100% {
              transform: scale(1);
              filter: drop-shadow(0 0 16px rgba(99, 102, 241, 0.75));
            }
            50% {
              transform: scale(1.06);
              filter: drop-shadow(0 0 24px rgba(0, 242, 254, 0.85));
            }
          }
          .proton-apps-core-anim {
            transform-origin: 60px 60px;
            ${animated ? 'animation: protonAppsPulse 3.5s ease-in-out infinite;' : ''}
          }
        `}</style>

        {/* --- ORBITAS ELÍPTICAS CUÁNTICAS --- */}
        {/* Órbita 1: Vertical (Indigo / Violeta) */}
        <ellipse
          cx="60"
          cy="60"
          rx="22"
          ry="53"
          stroke="url(#orbitIndigoComp)"
          strokeWidth="2.8"
          fill="none"
          filter="url(#appsNeonGlowComp)"
        />

        {/* Órbita 2: Inclinada +60 grados (Cian Eléctrico) */}
        <ellipse
          cx="60"
          cy="60"
          rx="22"
          ry="53"
          transform="rotate(60 60 60)"
          stroke="url(#orbitCyanComp)"
          strokeWidth="2.8"
          fill="none"
          filter="url(#appsNeonGlowComp)"
        />

        {/* Órbita 3: Inclinada -60 grados (Verde Esmeralda Android) */}
        <ellipse
          cx="60"
          cy="60"
          rx="22"
          ry="53"
          transform="rotate(-60 60 60)"
          stroke="url(#orbitEmeraldComp)"
          strokeWidth="2.8"
          fill="none"
          filter="url(#appsNeonGlowComp)"
        />

        {/* --- NÚCLEO PROTÓN CENTRAL --- */}
        <g className="proton-apps-core-anim">
          {/* Halo radiante */}
          <circle
            cx="60"
            cy="60"
            r="23"
            fill="url(#appsHaloGradComponent)"
            filter="url(#appsNeonGlowComp)"
          />
          {/* Esfera 3D sólida */}
          <circle
            cx="60"
            cy="60"
            r="17.5"
            fill="url(#appsCoreGradComponent)"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="1"
          />
          {/* Reflejos especulares */}
          <ellipse
            cx="53.8"
            cy="52.8"
            rx="5.5"
            ry="3.2"
            transform="rotate(-30 53.8 52.8)"
            fill="#ffffff"
            opacity="0.9"
          />
          <circle
            cx="51"
            cy="51"
            r="2"
            fill="#ffffff"
            opacity="0.96"
          />
        </g>

        {/* --- BADGES EMBLEMÁTICOS DE PROTON APPS --- */}

        {/* 1. DISPOSITIVO MÓVIL / SMARTPHONE (Órbita Superior Izquierda) */}
        <g transform="translate(9, 21)" filter="url(#appsNeonGlowComp)">
          <rect
            x="0"
            y="0"
            width="30"
            height="20"
            rx="10"
            fill="#070d1d"
            stroke="#00f2fe"
            strokeWidth="1.6"
          />
          <rect
            x="10"
            y="4"
            width="10"
            height="12"
            rx="2"
            fill="none"
            stroke="#00f2fe"
            strokeWidth="1.2"
          />
          <line
            x1="13"
            y1="5.5"
            x2="17"
            y2="5.5"
            stroke="#00f2fe"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <circle cx="15" cy="14" r="0.8" fill="#00f2fe" />
        </g>

        {/* 2. APK ANDROID (Órbita Superior Derecha) */}
        <g transform="translate(81, 21)" filter="url(#appsNeonGlowComp)">
          <rect
            x="0"
            y="0"
            width="30"
            height="20"
            rx="10"
            fill="#070d1d"
            stroke="#00ff87"
            strokeWidth="1.6"
          />
          <text
            x="15"
            y="12.5"
            fill="#00ff87"
            fontSize="10"
            fontWeight="900"
            fontFamily="monospace, sans-serif"
            textAnchor="middle"
            dominantBaseline="central"
          >
            APK
          </text>
        </g>

        {/* 3. OTA / OVER-THE-AIR (Órbita Inferior Derecha) */}
        <g transform="translate(76, 75)" filter="url(#appsNeonGlowComp)">
          <rect
            x="0"
            y="0"
            width="30"
            height="20"
            rx="10"
            fill="#070d1d"
            stroke="#818cf8"
            strokeWidth="1.6"
          />
          <text
            x="15"
            y="12.5"
            fill="#818cf8"
            fontSize="10"
            fontWeight="900"
            fontFamily="monospace, sans-serif"
            textAnchor="middle"
            dominantBaseline="central"
          >
            OTA
          </text>
        </g>

        {/* --- NODOS ORBITALES DE ENERGÍA ACTIVA --- */}
        <g filter="url(#appsNeonGlowComp)">
          <circle cx="60" cy="113" r="4.5" fill="#00ff87" />
          <circle cx="60" cy="113" r="2" fill="#ffffff" />

          <circle cx="17" cy="80" r="4" fill="#00f2fe" />
          <circle cx="17" cy="80" r="1.8" fill="#ffffff" />

          <circle cx="96" cy="42" r="4" fill="#818cf8" />
          <circle cx="96" cy="42" r="1.8" fill="#ffffff" />
        </g>
      </svg>

      {showText && (
        <div className="flex items-center gap-2">
          <div className="flex items-baseline gap-1.5">
            <span
              className="font-black tracking-tight text-white"
              style={{ fontSize: `${size * 0.44}px` }}
            >
              Proton
            </span>
            <span
              className="font-black tracking-tight bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent"
              style={{ fontSize: `${size * 0.44}px` }}
            >
              Apps
            </span>
          </div>

          {showHubBadge && (
            <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-widest text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 rounded-full">
              HUB
            </span>
          )}
        </div>
      )}
    </div>
  );
}
