'use client';

import React, { useState } from 'react';
import { Utensils, Users, Plus, Minus, Check, Clock, Sparkles } from 'lucide-react';

export function ChefCraftInteractiveView() {
  const [servings, setServings] = useState(2);

  const baseIngredients = [
    { name: 'Arroz Carnaroli o Arborio', baseAmount: 160, unit: 'g' },
    { name: 'Champiñones Portobello frescos', baseAmount: 200, unit: 'g' },
    { name: 'Caldo de Verduras o Ave', baseAmount: 600, unit: 'ml' },
    { name: 'Queso Parmigiano Reggiano', baseAmount: 40, unit: 'g' },
    { name: 'Mantequilla sin sal', baseAmount: 25, unit: 'g' },
  ];

  const updateServings = (delta: number) => {
    setServings((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  return (
    <div className="rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-950/25 via-[#120a07] to-black p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-black text-lg">
            🍳
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              ChefCraft Live: Escalador Dinámico de Porciones
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 font-bold">
                Interactivo
              </span>
            </h3>
            <p className="text-xs text-slate-400">Ajusta los comensales y mira cómo se recalculan los gramos en tiempo real</p>
          </div>
        </div>

        {/* Portion Adjuster Controls */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-1.5 rounded-xl">
          <span className="text-xs font-mono text-slate-400 pl-2 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-orange-400" /> Porciones:
          </span>
          <button
            onClick={() => updateServings(-1)}
            disabled={servings <= 1}
            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-6 text-center font-black font-mono text-base text-orange-300">
            {servings}
          </span>
          <button
            onClick={() => updateServings(1)}
            disabled={servings >= 10}
            className="w-7 h-7 rounded-lg bg-orange-500 hover:bg-orange-400 text-black flex items-center justify-center cursor-pointer transition-colors"
          >
            <Plus className="w-3.5 h-3.5 font-bold" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Ingredients list with live calculation */}
        <div className="lg:col-span-7 space-y-2.5">
          <div className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold mb-1">
            Receta: Risotto Cremoso de Setas Silvestres ({servings} {servings === 1 ? 'persona' : 'personas'})
          </div>
          {baseIngredients.map((ing, idx) => {
            const calculatedAmount = Math.round((ing.baseAmount / 2) * servings);
            return (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between hover:border-orange-500/20 transition-colors"
              >
                <div className="flex items-center gap-2.5 text-xs">
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                  <span className="text-slate-200 font-medium">{ing.name}</span>
                </div>
                <div className="font-mono font-bold text-xs text-orange-300 bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/20">
                  {calculatedAmount} {ing.unit}
                </div>
              </div>
            );
          })}
        </div>

        {/* Cooking mode card */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-black/60 border border-orange-500/20 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold block mb-1">
              Modo Cocina Paso a Paso
            </span>
            <h4 className="text-sm font-bold text-white">Paso 2 de 4: Sellado de Setas</h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Dora los {Math.round((200 / 2) * servings)}g de champiñones a fuego vivo con un toque de aceite de oliva hasta que tomen color avellana.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-between text-xs font-mono text-orange-300">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-orange-400" /> Temporizador recomendado:
            </span>
            <span className="font-bold text-white">4:00 min</span>
          </div>

          <div className="text-[11px] text-slate-400 leading-tight">
            💡 Con <strong>ChefCraft</strong> añade estos ingredientes a tu lista de compras inteligente con un solo toque y accede 100% offline.
          </div>
        </div>
      </div>
    </div>
  );
}
