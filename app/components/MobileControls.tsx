"use client"

import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import type { Direction } from "../types/game"

interface MobileControlsProps {
  onMove: (direction: Direction) => void
}

export function MobileControls({ onMove }: MobileControlsProps) {
  return (
    <div className="mt-4 sm:mt-6 md:mt-8">
      <div className="flex flex-col items-center gap-2 sm:gap-3">
        {/* Up */}
        <button
          onClick={() => onMove("up")}
          className="p-4 sm:p-5 bg-gradient-to-br from-slate-800/70 to-slate-900/70 hover:from-slate-700/80 hover:to-slate-800/80 active:from-slate-600/90 active:to-slate-700/90 rounded-xl transition-all duration-150 border border-slate-600/50 hover:border-slate-500/60 shadow-lg active:scale-95 touch-manipulation backdrop-blur-sm min-w-[56px] min-h-[56px] flex items-center justify-center"
          aria-label="Move up"
        >
          <ChevronUp className="w-7 h-7 sm:w-8 sm:h-8 text-slate-200" />
        </button>

        {/* Left, Down, Right */}
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={() => onMove("left")}
            className="p-4 sm:p-5 bg-gradient-to-br from-slate-800/70 to-slate-900/70 hover:from-slate-700/80 hover:to-slate-800/80 active:from-slate-600/90 active:to-slate-700/90 rounded-xl transition-all duration-150 border border-slate-600/50 hover:border-slate-500/60 shadow-lg active:scale-95 touch-manipulation backdrop-blur-sm min-w-[56px] min-h-[56px] flex items-center justify-center"
            aria-label="Move left"
          >
            <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 text-slate-200" />
          </button>
          <button
            onClick={() => onMove("down")}
            className="p-4 sm:p-5 bg-gradient-to-br from-slate-800/70 to-slate-900/70 hover:from-slate-700/80 hover:to-slate-800/80 active:from-slate-600/90 active:to-slate-700/90 rounded-xl transition-all duration-150 border border-slate-600/50 hover:border-slate-500/60 shadow-lg active:scale-95 touch-manipulation backdrop-blur-sm min-w-[56px] min-h-[56px] flex items-center justify-center"
            aria-label="Move down"
          >
            <ChevronDown className="w-7 h-7 sm:w-8 sm:h-8 text-slate-200" />
          </button>
          <button
            onClick={() => onMove("right")}
            className="p-4 sm:p-5 bg-gradient-to-br from-slate-800/70 to-slate-900/70 hover:from-slate-700/80 hover:to-slate-800/80 active:from-slate-600/90 active:to-slate-700/90 rounded-xl transition-all duration-150 border border-slate-600/50 hover:border-slate-500/60 shadow-lg active:scale-95 touch-manipulation backdrop-blur-sm min-w-[56px] min-h-[56px] flex items-center justify-center"
            aria-label="Move right"
          >
            <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 text-slate-200" />
          </button>
        </div>
      </div>
    </div>
  )
}
