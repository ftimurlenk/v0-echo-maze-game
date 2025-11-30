"use client"

import { HelpCircle, RotateCcw, Zap, ChevronLeft, ChevronRight, Layers } from "lucide-react"

interface HUDProps {
  moveCount: number
  elapsedTime: number
  isEchoActive: boolean
  echoTimeRemaining: number
  onReset: () => void
  onHelp: () => void
  bestScore: number | null
  currentLevel: number
  totalLevels: number
  onPreviousLevel: () => void
  onNextLevel: () => void
  onLevelSelect: () => void
  maxUnlockedLevel: number
}

export function HUD({
  moveCount,
  elapsedTime,
  isEchoActive,
  echoTimeRemaining,
  onReset,
  onHelp,
  bestScore,
  currentLevel,
  totalLevels,
  onPreviousLevel,
  onNextLevel,
  onLevelSelect,
  maxUnlockedLevel,
}: HUDProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="w-full max-w-[min(95vw,600px)] mb-3 sm:mb-4 md:mb-6 space-y-2 px-2">
      <div className="flex items-center justify-center gap-2 p-2 bg-gradient-to-br from-slate-900/40 to-slate-950/50 rounded-xl backdrop-blur-md border border-slate-700/50 shadow-lg">
        <button
          onClick={onPreviousLevel}
          disabled={currentLevel === 1}
          className="p-2 hover:bg-slate-700/50 active:bg-slate-600/60 rounded-lg transition-all duration-200 text-slate-400 hover:text-slate-100 disabled:opacity-30 disabled:cursor-not-allowed border border-transparent hover:border-slate-600 touch-manipulation"
          aria-label="Previous Level"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={onLevelSelect}
          className="flex items-center gap-2 px-3 py-2 hover:bg-slate-700/50 active:bg-slate-600/60 rounded-lg transition-all duration-200 border border-slate-700/50 hover:border-slate-600 touch-manipulation"
        >
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-100 font-semibold text-sm">
            Level {currentLevel} / {totalLevels}
          </span>
        </button>

        <button
          onClick={onNextLevel}
          disabled={currentLevel >= maxUnlockedLevel}
          className="p-2 hover:bg-slate-700/50 active:bg-slate-600/60 rounded-lg transition-all duration-200 text-slate-400 hover:text-slate-100 disabled:opacity-30 disabled:cursor-not-allowed border border-transparent hover:border-slate-600 touch-manipulation"
          aria-label="Next Level"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center justify-between gap-2 p-2.5 sm:p-3 bg-gradient-to-br from-slate-900/60 to-slate-950/70 rounded-xl backdrop-blur-md border border-slate-700/50 shadow-xl">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-center">
            <div className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-wide leading-tight">Moves</div>
            <div className="text-slate-100 font-mono text-sm sm:text-base font-bold">{moveCount}</div>
          </div>
          <div className="text-center">
            <div className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-wide leading-tight">Time</div>
            <div className="text-slate-100 font-mono text-sm sm:text-base font-bold">{formatTime(elapsedTime)}</div>
          </div>
          {bestScore !== null && (
            <div className="text-center">
              <div className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-wide leading-tight">Best</div>
              <div className="text-amber-400 font-mono text-sm sm:text-base font-bold">{bestScore}</div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isEchoActive ? (
            <div className="flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border border-cyan-400/40 rounded-full">
              <Zap className="w-3 h-3 text-cyan-300 animate-pulse" />
              <span className="text-cyan-200 text-xs font-semibold">{echoTimeRemaining.toFixed(1)}s</span>
            </div>
          ) : (
            <div className="text-slate-500 text-xs font-medium px-2">Limited</div>
          )}

          <button
            onClick={onHelp}
            className="p-1.5 sm:p-2 hover:bg-slate-700/50 active:bg-slate-600/60 rounded-lg transition-all duration-200 text-slate-400 hover:text-slate-100 border border-transparent hover:border-slate-600 touch-manipulation"
            aria-label="Help"
          >
            <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={onReset}
            className="p-1.5 sm:p-2 hover:bg-slate-700/50 active:bg-slate-600/60 rounded-lg transition-all duration-200 text-slate-400 hover:text-slate-100 border border-transparent hover:border-slate-600 touch-manipulation"
            aria-label="Restart"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
