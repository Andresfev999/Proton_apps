'use client';

import React, { useState } from 'react';
import { Scissors, Calendar, Clock, User, CheckCircle2, Star, Sparkles } from 'lucide-react';

export function BarberPointInteractiveView() {
  const [selectedService, setSelectedService] = useState<'fade' | 'beard' | 'combo'>('combo');
  const [selectedBarber, setSelectedBarber] = useState('Carlos "Fade Master"');
  const [selectedTime, setSelectedTime] = useState('16:30');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const services = [
    { id: 'fade', name: 'Corte Fade / Degradado', duration: '35 min', price: '$25.000', icon: '✂️' },
    { id: 'beard', name: 'Perfilado & Barboterapia', duration: '25 min', price: '$18.000', icon: '🪒' },
    { id: 'combo', name: 'Combo Signature (Corte + Barba + Toalla)', duration: '55 min', price: '$38.000', icon: '👑' },
  ];

  const barbers = [
    { name: 'Carlos "Fade Master"', rating: '4.95', exp: '8 años exp' },
    { name: 'Mateo "Blade" R.', rating: '4.90', exp: '6 años exp' },
    { name: 'David Silva', rating: '4.88', exp: '5 años exp' },
  ];

  const timeSlots = ['14:00', '15:15', '16:30', '17:45', '19:00'];

  const currentServiceObj = services.find((s) => s.id === selectedService);

  return (
    <div className="rounded-2xl border border-amber-600/30 bg-gradient-to-br from-amber-950/25 via-[#0e0d0b] to-black p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-lg">
            💈
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              BarberPoint Live: Reserva Tu Turno en Tiempo Real
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold">
                Interactivo
              </span>
            </h3>
            <p className="text-xs text-slate-400">Prueba el flujo de selección de estilista, horario y confirmación digital</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Step 1 & 2: Services and Barbers */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block mb-2">
              1. Selecciona Servicio
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {services.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => {
                    setSelectedService(srv.id as any);
                    setBookingConfirmed(false);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedService === srv.id
                      ? 'bg-amber-500/20 border-amber-400 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  <span className="text-lg block mb-1">{srv.icon}</span>
                  <div className="text-xs font-bold leading-tight">{srv.name}</div>
                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/5 text-[11px] font-mono">
                    <span className="text-slate-400">{srv.duration}</span>
                    <span className="text-amber-300 font-bold">{srv.price}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block mb-2">
              2. Elige tu Barbero Experto
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {barbers.map((b) => (
                <button
                  key={b.name}
                  onClick={() => {
                    setSelectedBarber(b.name);
                    setBookingConfirmed(false);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedBarber === b.name
                      ? 'bg-amber-500/20 border-amber-400 text-white'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    <User className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{b.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-amber-400/90 mt-1">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{b.rating}</span>
                    <span className="text-slate-500 text-[10px]">· {b.exp}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block mb-2">
              3. Horario Disponible (Hoy)
            </span>
            <div className="flex flex-wrap gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => {
                    setSelectedTime(slot);
                    setBookingConfirmed(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-colors cursor-pointer ${
                    selectedTime === slot
                      ? 'bg-amber-400 text-black border-amber-400'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Digital Booking Pass Summary */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-2xl bg-black/80 border border-amber-500/30 shadow-2xl relative">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Ticket de Reserva
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                #BP-{(Math.random() * 9000 + 1000).toFixed(0)}
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Servicio:</span>
                <span className="font-bold text-white text-right">{currentServiceObj?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Barbero:</span>
                <span className="font-bold text-white">{selectedBarber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Horario:</span>
                <span className="font-mono text-amber-300 font-bold">Hoy a las {selectedTime}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-sm">
                <span className="font-bold text-slate-300">Total a Pagar:</span>
                <span className="font-black text-amber-400 font-mono text-base">{currentServiceObj?.price}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/10">
            {bookingConfirmed ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>¡Turno Agendado & Notificado!</span>
              </div>
            ) : (
              <button
                onClick={() => setBookingConfirmed(true)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                Confirmar Reserva Simulada
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
