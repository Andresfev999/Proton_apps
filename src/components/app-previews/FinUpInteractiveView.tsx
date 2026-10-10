'use client';

import React, { useState } from 'react';
import { DollarSign, PieChart, TrendingDown, Sparkles, AlertCircle, ArrowUpRight } from 'lucide-react';

export function FinUpInteractiveView() {
  const [budgetLimit, setBudgetLimit] = useState(1500000);
  const [spent, setSpent] = useState(1180000);

  const categories = [
    { name: 'Alimentación & Súper', amount: 520000, percentage: 44, color: 'bg-emerald-400' },
    { name: 'Transporte & Gasolina', amount: 280000, percentage: 24, color: 'bg-cyan-400' },
    { name: 'Ocio & Salidas', amount: 260000, percentage: 22, color: 'bg-amber-400' },
    { name: 'Suscripciones', amount: 120000, percentage: 10, color: 'bg-purple-400' },
  ];

  const formatCOP = (val: number) => `$${val.toLocaleString('es-CO')}`;
  const percentUsed = Math.min(100, Math.round((spent / budgetLimit) * 100));

  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/25 via-[#060e0a] to-black p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-lg">
            💰
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              FinUp Live: Asesor DeepFi & Monitor de Gastos
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold">
                Interactivo
              </span>
            </h3>
            <p className="text-xs text-slate-400">Control de presupuesto mensual y diagnóstico de fugas de dinero</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Budget Progress Meter */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-black/60 border border-emerald-500/20">
            <div className="flex justify-between items-center text-xs text-slate-400 font-mono mb-2">
              <span>Gasto del Mes ({percentUsed}%)</span>
              <span className="text-white font-bold">{formatCOP(spent)} / {formatCOP(budgetLimit)}</span>
            </div>

            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden mb-4">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  percentUsed > 85 ? 'bg-amber-400' : 'bg-emerald-400'
                }`}
                style={{ width: `${percentUsed}%` }}
              />
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-white/5 text-xs">
              <span className="text-slate-400">Margen Restante:</span>
              <span className="font-mono font-black text-emerald-300 text-sm">
                {formatCOP(budgetLimit - spent)}
              </span>
            </div>
          </div>

          {/* Categories breakdown */}
          <div className="space-y-2">
            {categories.map((c, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${c.color}`} />
                  <span className="text-slate-300">{c.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-white font-bold">{formatCOP(c.amount)}</span>
                  <span className="text-slate-500 text-[10px] ml-2">({c.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DeepFi AI Insight Simulator */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            Diagnóstico Financiero Gemini DeepFi
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-200/90 leading-relaxed">
            "Has consumido el <strong>{percentUsed}%</strong> de tu presupuesto a mitad de mes. Detectamos un pico inusual en <strong>Ocio & Salidas</strong> (+18% sobre la media). Si recortas dos salidas este fin de semana, cerrarás con un ahorro proyectado de <strong>$240.000 COP</strong>."
          </div>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-slate-400 leading-relaxed">
            💡 <strong>Datos de ejemplo:</strong> Esta demostración ilustra un presupuesto. Las funciones de asesoría con Gemini y sincronización con Supabase utilizan servicios conectados.
          </div>
        </div>
      </div>
    </div>
  );
}
