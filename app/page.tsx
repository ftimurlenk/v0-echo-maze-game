"use client"

import { useState } from "react"
import { useEchoMazeGame } from "./hooks/useEchoMazeGame"
import { GameBoard } from "./components/GameBoard"
import { HUD } from "./components/HUD"
import { Overlay } from "./components/Overlay"
import { MobileControls } from "./components/MobileControls"
import { getLevel } from "./utils/levels"

export default function EchoMazePage() {
  const {
    playerPosition,
    gameState,
    moveCount,
    elapsedTime,
    visionRadius,
    isEchoActive,
    echoTimeRemaining,
    currentLevel,
    totalLevels,
    maxUnlockedLevel,
    move,
    resetGame,
    goToNextLevel,
    goToPreviousLevel,
    selectLevel,
    showHelp,
    setShowHelp,
    getBestScore,
  } = useEchoMazeGame()

  const [showLevelSelect, setShowLevelSelect] = useState(false)

  const handleWinClose = () => {
    resetGame()
  }

  const handleNextLevel = () => {
    goToNextLevel()
  }

  const levelData = getLevel(currentLevel)

  return (
    <div className="min-h-screen flex flex-col items-center justify-start md:justify-center p-2 sm:p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-slate-800/20 via-transparent to-transparent" />

      <div className="relative z-10 w-full flex flex-col items-center pb-safe">
        <div className="mb-3 sm:mb-6 text-center px-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-transparent mb-2 sm:mb-3 tracking-tight leading-tight">
            Echo Maze
          </h1>
          {levelData && (
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-cyan-400 text-base sm:text-lg font-semibold">{levelData.name}</p>
              <p className="text-slate-400 text-xs sm:text-sm hidden sm:block">{levelData.description}</p>
            </div>
          )}
        </div>

        <HUD
          moveCount={moveCount}
          elapsedTime={elapsedTime}
          isEchoActive={isEchoActive}
          echoTimeRemaining={echoTimeRemaining}
          onReset={resetGame}
          onHelp={() => setShowHelp(true)}
          bestScore={getBestScore()}
          currentLevel={currentLevel}
          totalLevels={totalLevels}
          maxUnlockedLevel={maxUnlockedLevel}
          onPreviousLevel={goToPreviousLevel}
          onNextLevel={goToNextLevel}
          onLevelSelect={() => setShowLevelSelect(true)}
        />

        <GameBoard playerPosition={playerPosition} visionRadius={visionRadius} currentLevel={currentLevel} />

        <MobileControls onMove={move} />

        <Overlay
          type="win"
          isOpen={gameState === "WON"}
          onClose={handleWinClose}
          moveCount={moveCount}
          elapsedTime={elapsedTime}
          bestScore={getBestScore()}
          currentLevel={currentLevel}
          onNextLevel={handleNextLevel}
        />

        <Overlay type="help" isOpen={showHelp} onClose={() => setShowHelp(false)} />

        <Overlay
          type="levelSelect"
          isOpen={showLevelSelect}
          onClose={() => setShowLevelSelect(false)}
          currentLevel={currentLevel}
          maxUnlockedLevel={maxUnlockedLevel}
          onSelectLevel={selectLevel}
        />
      </div>
    </div>
  )
}
