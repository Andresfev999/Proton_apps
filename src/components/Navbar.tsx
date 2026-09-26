'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Smartphone, Layers, Terminal, Shield, ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Floating Island Navigation (Detached, Centered Pill) */}
      <header className="sticky top-4 z-40 w-full px-4 sm:px-6 pointer-events-none">
        <div className="max-w-4xl mx-auto flex items-center justify-between pointer-events-auto floating-island rounded-full px-4 sm:px-5 py-2.5">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#05070D] rounded-full flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-indigo-300 group-hover:text-cyan-300 transition-colors" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                Proton Apps
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-widest text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 rounded-full">
                HUB
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/#catalogo"
              className="text-xs font-medium text-slate-300 hover:text-white px-3.5 py-1.5 rounded-full hover:bg-white/5 transition-all duration-150 flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>Catálogo</span>
            </Link>

            <Link
              href="/#api-docs"
              className="text-xs font-medium text-slate-300 hover:text-white px-3.5 py-1.5 rounded-full hover:bg-white/5 transition-all duration-150 flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>OTA Engine</span>
            </Link>

            <div className="w-px h-4 bg-white/10 mx-2" />

            {/* Admin CMS Button-in-Button */}
            <Link
              href="/admin"
              className="group pl-3.5 pr-1.5 py-1 rounded-full bg-indigo-600/20 hover:bg-indigo-600/35 border border-indigo-500/30 hover:border-indigo-400/50 text-indigo-200 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all active:scale-[0.98]"
            >
              <span>Admin CMS</span>
              <div className="w-6 h-6 rounded-full bg-indigo-500/30 flex items-center justify-center btn-nested-icon">
                <ArrowUpRight className="w-3 h-3 text-indigo-300" />
              </div>
            </Link>
          </nav>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Reveal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-50 floating-island rounded-3xl p-6 md:hidden space-y-4"
          >
            <div className="flex flex-col gap-2">
              <Link
                href="/#catalogo"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl bg-white/5 text-sm text-slate-200"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span>Catálogo de Apps</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500" />
              </Link>

              <Link
                href="/#api-docs"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl bg-white/5 text-sm text-slate-200"
              >
                <div className="flex items-center gap-2.5">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>API de Actualizaciones OTA</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500" />
              </Link>

              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl bg-indigo-600/30 border border-indigo-500/30 text-sm text-white font-semibold"
              >
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-indigo-300" />
                  <span>Panel de Administración CMS</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-indigo-300" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
