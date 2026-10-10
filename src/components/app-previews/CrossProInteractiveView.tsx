'use client';

import React, { useState } from 'react';
import { Sparkles, Trophy, RotateCcw, Lightbulb, CheckCircle2 } from 'lucide-react';

interface Cell {
  letter: string;
  solution: string;
  number?: number;
  blocked?: boolean;
}

export function CrossProInteractiveView() {
  // Mini 5x5 Crossword Board
  // Words:
  // Horiz 1: "PRO" (at row 0, col 1..3)
  // Horiz 2: "CODE" (at row 2, col 0..3)
  // Horiz 3: "FAST" (at row 4, col 1..4)
  // Vert 1: "SOLO" (at row 1..4, col 2)
  const initialGrid: (Cell | null)[][] = [
    [null, { letter: 'P', solution: 'P', number: 1 }, { letter: 'R', solution: 'R' }, { letter: 'O', solution: 'O' }, null],
    [null, null, { letter: '', solution: 'S', number: 2 }, null, null],
    [{ letter: 'C', solution: 'C', number: 3 }, { letter: '', solution: 'O' }, { letter: '', solution: 'D' }, { letter: '', solution: 'E' }, null],
    [null, null, { letter: '', solution: 'A' }, null, null],
    [null, { letter: '', solution: 'F', number: 4 }, { letter: '', solution: 'A' }, { letter: '', solution: 'S' }, { letter: '', solution: 'T' }],
  ];

  const [grid, setGrid] = useState<(Cell | null)[][]>(initialGrid);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>({ r: 2, c: 1 });
  const [solved, setSolved] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);

  const clues = [
    { num: 1, dir: 'Horizontal', text: 'Nivel avanzado o experto (3 letras)', answer: 'PRO' },
    { num: 3, dir: 'Horizontal', text: 'Instrucciones escritas para una app (4 letras)', answer: 'CODE' },
    { num: 4, dir: 'Horizontal', text: 'Rápido, sin demoras ni lag (4 letras)', answer: 'FAST' },
    { num: 2, dir: 'Vertical', text: 'Estructura o base lógica (4 letras)', answer: 'SODA' },
  ];

  const handleCellChange = (r: number, c: number, val: string) => {
    if (!grid[r][c]) return;
    const char = val.slice(-1).toUpperCase();
    const newGrid = grid.map((row, ri) =>
      row.map((cell, ci) => {
        if (ri === r && ci === c && cell) {
          return { ...cell, letter: char };
        }
        return cell;
      })
    );
    setGrid(newGrid);

    // Check completion
    let allCorrect = true;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const item = newGrid[i][j];
        if (item && item.letter !== item.solution) {
          allCorrect = false;
        }
      }
    }
    if (allCorrect) setSolved(true);
  };

  const revealHint = () => {
    if (solved) return;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        const item = grid[r][c];
        if (item && item.letter !== item.solution) {
          handleCellChange(r, c, item.solution);
          setHintsUsed((prev) => prev + 1);
          return;
        }
      }
    }
  };

  const resetGame = () => {
    setGrid(initialGrid);
    setSolved(false);
    setHintsUsed(0);
    setSelectedCell({ r: 2, c: 1 });
  };

  return (
    <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-950/20 via-[#0a0e17] to-black p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-lg">
            🧩
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              CrossPro Live Demo: Simulador de Crucigrama
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold">
                Interactivo
              </span>
            </h3>
            <p className="text-xs text-slate-400">Resuelve el mini tablero interactivo directamente aquí</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={revealHint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-medium transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Pista ({hintsUsed})</span>
          </button>
          <button
            onClick={resetGame}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
            title="Reiniciar crucigrama"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid & Clues */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Crossword Grid */}
        <div className="md:col-span-6 flex flex-col items-center">
          <div className="p-3 bg-black/60 rounded-2xl border border-white/10 shadow-2xl inline-block">
            <div className="grid grid-cols-5 gap-1.5">
              {grid.map((row, r) =>
                row.map((cell, c) => {
                  if (!cell) {
                    return <div key={`${r}-${c}`} className="w-11 h-11 rounded-lg bg-slate-900/60 opacity-20" />;
                  }
                  const isSelected = selectedCell?.r === r && selectedCell?.c === c;
                  const isCorrect = cell.letter === cell.solution;
                  return (
                    <div
                      key={`${r}-${c}`}
                      onClick={() => setSelectedCell({ r, c })}
                      className={`w-11 h-11 rounded-lg relative flex items-center justify-center font-bold text-lg cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-500/30 border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                          : isCorrect && cell.letter
                          ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300'
                          : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white'
                      }`}
                    >
                      {cell.number && (
                        <span className="absolute top-0.5 left-1 text-[9px] font-mono text-slate-400 leading-none">
                          {cell.number}
                        </span>
                      )}
                      <input
                        type="text"
                        maxLength={1}
                        value={cell.letter}
                        onChange={(e) => handleCellChange(r, c, e.target.value)}
                        onFocus={() => setSelectedCell({ r, c })}
                        className="w-full h-full text-center bg-transparent focus:outline-none uppercase font-black"
                      />
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {solved && (
            <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold animate-bounce">
              <Trophy className="w-4 h-4 text-emerald-400" />
              <span>¡Crucigrama Completado con Éxito!</span>
            </div>
          )}
        </div>

        {/* Clues Column */}
        <div className="md:col-span-6 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-2">
            Pistas Clave
          </div>
          <div className="space-y-2">
            {clues.map((clue) => (
              <div
                key={clue.num}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-amber-500/30 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">
                    #{clue.num} {clue.dir}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">({clue.answer.length} letras)</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">{clue.text}</p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200/90 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              En la versión completa para Android disfrutas de 500+ crucigramas temáticos, pistas inteligentes ilimitadas y juego 100% offline.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
