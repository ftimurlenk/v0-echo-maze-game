"use client"

import { Trophy, X, Target, Gamepad2, Eye, Zap, ChevronRight, Lock } from "lucide-react"
import { getLevel, LEVELS } from "../utils/levels"

interface OverlayProps {
  type: "win" | "help" | "levelSelect"
  isOpen: boolean
  onClose: () => void
  moveCount?: number
  elapsedTime?: number
  bestScore?: number | null
  currentLevel?: number
  maxUnlockedLevel?: number
  onNextLevel?: () => void
  onSelectLevel?: (levelId: number) => void
}

export function Overlay({
  type,
  isOpen,
  onClose,
  moveCount,
  elapsedTime,
  bestScore,
  currentLevel,
  maxUnlockedLevel = 1,
  onNextLevel,
  onSelectLevel,
}: OverlayProps) {
  if (!isOpen) return null

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const levelData = currentLevel ? getLevel(currentLevel) : null
  const isLastLevel = currentLevel === LEVELS.length

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200 p-4">
      <div className="relative max-w-md w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 bg-gradient-to-br from-slate-900/95 to-slate-950/95 rounded-2xl border border-slate-700/50 shadow-2xl backdrop-blur-sm animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2.5 sm:p-2 hover:bg-slate-800/60 active:bg-slate-700/70 rounded-lg transition-all duration-200 text-slate-400 hover:text-slate-100 border border-transparent hover:border-slate-700 touch-manipulation"
          aria-label="Close"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {type === "win" && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-[0_0_40px_rgba(251,191,36,0.4)] animate-pulse">
              <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-slate-900" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-slate-100 to-slate-300 bg-clip-text text-transparent mb-2">
              {isLastLevel ? "All Levels Complete!" : "Level Complete!"}
            </h2>
            {levelData && <p className="text-cyan-400 text-base sm:text-lg font-semibold mb-2">{levelData.name}</p>}
            <p className="text-slate-400 mb-6 sm:mb-8 text-sm sm:text-base">You navigated through the darkness</p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="p-4 sm:p-5 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl border border-slate-700/50 shadow-lg">
                <div className="text-slate-400 text-xs mb-2 uppercase tracking-wide">Moves</div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-cyan-300">{moveCount}</div>
              </div>
              <div className="p-4 sm:p-5 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl border border-slate-700/50 shadow-lg">
                <div className="text-slate-400 text-xs mb-2 uppercase tracking-wide">Time</div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-cyan-300">
                  {formatTime(elapsedTime || 0)}
                </div>
              </div>
            </div>

            {bestScore !== null && moveCount !== undefined && moveCount <= bestScore && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/40 rounded-xl shadow-lg shadow-amber-500/10">
                <p className="text-amber-300 font-bold text-base sm:text-lg">New Best Score!</p>
              </div>
            )}

            <div className="space-y-2.5 sm:space-y-3">
              {!isLastLevel && onNextLevel && (
                <button
                  onClick={onNextLevel}
                  className="w-full py-3.5 sm:py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 active:from-cyan-600 active:to-blue-600 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-cyan-500/50 active:scale-95 text-base sm:text-lg flex items-center justify-center gap-2 touch-manipulation"
                >
                  Next Level
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={onClose}
                className="w-full py-3.5 sm:py-4 px-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 hover:from-slate-700/90 hover:to-slate-800/90 active:from-slate-600 active:to-slate-700 text-white font-bold rounded-xl transition-all duration-200 border border-slate-700/50 hover:border-slate-600/60 active:scale-95 text-base sm:text-lg touch-manipulation"
              >
                Replay Level
              </button>
            </div>
          </div>
        )}

        {type === "levelSelect" && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-slate-100 to-slate-300 bg-clip-text text-transparent mb-4 sm:mb-6 pr-8">
              Select Level
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 max-h-[60vh] overflow-y-auto pr-2">
              {LEVELS.map((level) => {
                const bestMoves =
                  typeof window !== "undefined" ? localStorage.getItem(`echoMazeBestMoves_level${level.id}`) : null

                const isLocked = level.id > maxUnlockedLevel

                return (
                  <button
                    key={level.id}
                    onClick={() => {
                      if (isLocked) return
                      onSelectLevel?.(level.id)
                      onClose()
                    }}
                    disabled={isLocked}
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-200 text-left touch-manipulation ${
                      isLocked
                        ? "bg-slate-900/40 border-slate-800/50 opacity-50 cursor-not-allowed"
                        : currentLevel === level.id
                          ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/50 shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95"
                          : "bg-slate-800/60 border-slate-700/50 hover:border-slate-600 hover:scale-105 active:scale-95"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base sm:text-lg font-bold text-slate-100">Level {level.id}</span>
                        {isLocked && <Lock className="w-4 h-4 text-slate-500" />}
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          level.difficulty === "Easy"
                            ? "bg-green-500/20 text-green-300"
                            : level.difficulty === "Medium"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : level.difficulty === "Hard"
                                ? "bg-orange-500/20 text-orange-300"
                                : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {level.difficulty}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 mb-1.5 sm:mb-2">{level.name}</p>
                    {!isLocked && bestMoves && (
                      <p className="text-xs text-cyan-400 font-mono">Best: {bestMoves} moves</p>
                    )}
                    {isLocked && <p className="text-xs text-slate-500">Complete previous level to unlock</p>}
                  </button>
                )
              })}
            </div>

            <button
              onClick={onClose}
              className="w-full mt-4 sm:mt-6 py-3 sm:py-3.5 px-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 hover:from-slate-700/90 hover:to-slate-800/90 active:from-slate-600 active:to-slate-700 text-white font-semibold rounded-xl transition-all duration-200 border border-slate-700/50 hover:border-slate-600/60 active:scale-95 touch-manipulation"
            >
              Close
            </button>
          </div>
        )}

        {type === "help" && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-slate-100 to-slate-300 bg-clip-text text-transparent mb-4 sm:mb-6 pr-8">
              How to Play
            </h2>

            <div className="space-y-4 sm:space-y-5 text-slate-300">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                  <Target className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100 mb-1.5">Goal</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Navigate through the dark maze and reach the glowing exit tile.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                  <Gamepad2 className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100 mb-1.5">Controls</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    <strong className="text-slate-300">Desktop:</strong> Arrow keys or WASD
                    <br />
                    <strong className="text-slate-300">Mobile:</strong> On-screen buttons
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                  <Eye className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100 mb-1.5">Limited Vision</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    You can only see a small radius around your character. Dark areas are unexplored.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                  <Zap className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100 mb-1.5">Echo Pulse</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Step on echo tiles (with ripple effect) to temporarily expand your vision for 3 seconds.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <p className="text-xs text-slate-500">Built with Next.js, TypeScript & Tailwind CSS</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full mt-4 sm:mt-6 py-3 sm:py-3.5 px-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 hover:from-slate-700/90 hover:to-slate-800/90 active:from-slate-600 active:to-slate-700 text-white font-semibold rounded-xl transition-all duration-200 border border-slate-700/50 hover:border-slate-600/60 active:scale-95 touch-manipulation"
            >
              Got it!
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
