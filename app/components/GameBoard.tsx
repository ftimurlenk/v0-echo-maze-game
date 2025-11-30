"use client"

import type { Position } from "../types/game"
import { GRID_SIZE, getTileType, getDistance } from "../utils/maze"

interface GameBoardProps {
  playerPosition: Position
  visionRadius: number
  currentLevel: number
}

export function GameBoard({ playerPosition, visionRadius, currentLevel }: GameBoardProps) {
  const tiles = []

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const tileType = getTileType(x, y, currentLevel)
      const isPlayer = playerPosition.x === x && playerPosition.y === y
      const distance = getDistance(playerPosition, { x, y })

      let visibility: "visible" | "dim" | "dark" = "dark"
      let fogOpacity = 1

      if (distance <= visionRadius) {
        visibility = "visible"
        fogOpacity = 0
      } else if (distance <= visionRadius + 1) {
        visibility = "dim"
        fogOpacity = 0.5
      } else if (distance <= visionRadius + 2) {
        fogOpacity = 0.8
      }

      tiles.push(
        <div
          key={`${x}-${y}`}
          className={`
            relative aspect-square
            ${getTileClassName(tileType, visibility, isPlayer)}
            transition-all duration-500 ease-out
          `}
          style={{
            filter: visibility === "visible" ? "brightness(1)" : "brightness(0.4)",
          }}
        >
          {visibility !== "visible" && (
            <div
              className="absolute inset-0 bg-slate-950 pointer-events-none transition-opacity duration-500"
              style={{ opacity: fogOpacity }}
            />
          )}

          {isPlayer && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="absolute w-4/5 h-4/5 bg-cyan-400/30 rounded-full blur-md" />
              <div className="w-3/5 h-3/5 bg-gradient-to-br from-cyan-300 to-cyan-500 rounded-full shadow-[0_0_30px_rgba(34,211,238,1),0_0_60px_rgba(34,211,238,0.5)] animate-pulse" />
            </div>
          )}

          {tileType === "echo" && visibility === "visible" && !isPlayer && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-3/5 h-3/5 border-2 border-cyan-400/40 rounded-full animate-ping" />
              <div className="w-2/5 h-2/5 border-2 border-cyan-500/60 rounded-full" />
            </div>
          )}

          {tileType === "exit" && visibility === "visible" && (
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 shadow-[0_0_40px_rgba(251,191,36,0.8),0_0_80px_rgba(251,191,36,0.4)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.3)_100%)]" />
            </div>
          )}
        </div>,
      )
    }
  }

  return (
    <div className="relative">
      {/* Outer glow effect */}
      <div className="absolute -inset-2 sm:-inset-4 bg-cyan-500/5 rounded-2xl blur-2xl" />

      <div
        className="relative grid gap-[2px] sm:gap-[3px] p-3 sm:p-4 md:p-6 bg-gradient-to-br from-slate-900/80 to-slate-950/90 rounded-xl backdrop-blur-sm border border-slate-700/50 shadow-2xl"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
          width: "min(95vw, 90vh, 600px)",
          height: "min(95vw, 90vh, 600px)",
        }}
      >
        {tiles}
      </div>
    </div>
  )
}

function getTileClassName(
  type: "wall" | "floor" | "echo" | "exit" | "start",
  visibility: "visible" | "dim" | "dark",
  isPlayer: boolean,
): string {
  const baseClasses = "rounded-sm overflow-hidden"

  // Fog of war overlay
  if (visibility === "dark") {
    return `${baseClasses} bg-slate-950 border border-slate-900/30`
  }

  if (visibility === "dim") {
    return `${baseClasses} bg-slate-900/90 border border-slate-800/40`
  }

  // Visible tiles with enhanced styling
  switch (type) {
    case "wall":
      return `${baseClasses} bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 shadow-inner`
    case "floor":
    case "start":
      return `${baseClasses} bg-slate-900/70 border border-slate-800/40`
    case "echo":
      return `${baseClasses} bg-slate-900/70 border border-cyan-500/30 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]`
    case "exit":
      return `${baseClasses} border border-amber-500/60`
    default:
      return baseClasses
  }
}
