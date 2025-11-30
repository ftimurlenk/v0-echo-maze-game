"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { Direction, GameState, Position } from "../types/game"
import { GRID_SIZE, getTileType, findStartPosition, isWalkable } from "../utils/maze"
import { getTotalLevels } from "../utils/levels"

const INITIAL_VISION_RADIUS = 2
const ECHO_PULSE_DURATION = 3000 // 3 seconds
const ECHO_VISION_BONUS = 3

export function useEchoMazeGame() {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [playerPosition, setPlayerPosition] = useState<Position>(findStartPosition(1))
  const [gameState, setGameState] = useState<GameState>("PLAYING")
  const [moveCount, setMoveCount] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [visionRadius, setVisionRadius] = useState(INITIAL_VISION_RADIUS)
  const [isEchoActive, setIsEchoActive] = useState(false)
  const [echoTimeRemaining, setEchoTimeRemaining] = useState(0)
  const [showHelp, setShowHelp] = useState(false)

  const echoTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const gameStartTimeRef = useRef<number>(Date.now())

  const getMaxUnlockedLevel = useCallback(() => {
    if (typeof window === "undefined") return 1
    const saved = localStorage.getItem("echoMazeMaxUnlockedLevel")
    return saved ? Number.parseInt(saved, 10) : 1
  }, [])

  const [maxUnlockedLevel, setMaxUnlockedLevel] = useState(1)

  useEffect(() => {
    setMaxUnlockedLevel(getMaxUnlockedLevel())
  }, [getMaxUnlockedLevel])

  const saveBestScore = useCallback(
    (moves: number) => {
      if (typeof window === "undefined") return
      const currentBest = localStorage.getItem(`echoMazeBestMoves_level${currentLevel}`)
      if (currentBest === null || moves < Number.parseInt(currentBest, 10)) {
        localStorage.setItem(`echoMazeBestMoves_level${currentLevel}`, moves.toString())
      }
    },
    [currentLevel],
  )

  const unlockNextLevel = useCallback(() => {
    if (typeof window === "undefined") return
    const nextLevel = currentLevel + 1
    const currentMax = getMaxUnlockedLevel()
    if (nextLevel > currentMax && nextLevel <= getTotalLevels()) {
      localStorage.setItem("echoMazeMaxUnlockedLevel", nextLevel.toString())
      setMaxUnlockedLevel(nextLevel)
    }
  }, [currentLevel, getMaxUnlockedLevel])

  useEffect(() => {
    if (gameState !== "PLAYING") return

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - gameStartTimeRef.current) / 1000))
    }, 100)

    return () => clearInterval(interval)
  }, [gameState])

  useEffect(() => {
    if (!isEchoActive) return

    const interval = setInterval(() => {
      setEchoTimeRemaining((prev) => {
        const newTime = Math.max(0, prev - 0.1)
        if (newTime === 0) {
          setIsEchoActive(false)
          setVisionRadius(INITIAL_VISION_RADIUS)
        }
        return newTime
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isEchoActive])

  const activateEchoPulse = useCallback(() => {
    if (echoTimeoutRef.current) {
      clearTimeout(echoTimeoutRef.current)
    }

    setIsEchoActive(true)
    setVisionRadius(INITIAL_VISION_RADIUS + ECHO_VISION_BONUS)
    setEchoTimeRemaining(ECHO_PULSE_DURATION / 1000)

    echoTimeoutRef.current = setTimeout(() => {
      setIsEchoActive(false)
      setVisionRadius(INITIAL_VISION_RADIUS)
      setEchoTimeRemaining(0)
    }, ECHO_PULSE_DURATION)
  }, [])

  const move = useCallback(
    (direction: Direction) => {
      if (gameState !== "PLAYING") return

      let newX = playerPosition.x
      let newY = playerPosition.y

      switch (direction) {
        case "up":
          newY -= 1
          break
        case "down":
          newY += 1
          break
        case "left":
          newX -= 1
          break
        case "right":
          newX += 1
          break
      }

      if (!isWalkable(newX, newY, currentLevel)) return

      setPlayerPosition({ x: newX, y: newY })
      setMoveCount((prev) => prev + 1)

      const tileType = getTileType(newX, newY, currentLevel)

      if (tileType === "echo") {
        activateEchoPulse()
      } else if (tileType === "exit") {
        setGameState("WON")
        unlockNextLevel()
      }
    },
    [playerPosition, gameState, activateEchoPulse, currentLevel, unlockNextLevel],
  )

  const resetGame = useCallback(() => {
    setPlayerPosition(findStartPosition(currentLevel))
    setGameState("PLAYING")
    setMoveCount(0)
    setElapsedTime(0)
    setVisionRadius(INITIAL_VISION_RADIUS)
    setIsEchoActive(false)
    setEchoTimeRemaining(0)
    gameStartTimeRef.current = Date.now()

    if (echoTimeoutRef.current) {
      clearTimeout(echoTimeoutRef.current)
    }
  }, [currentLevel])

  const goToNextLevel = useCallback(() => {
    const nextLevel = Math.min(currentLevel + 1, getTotalLevels())
    if (nextLevel > maxUnlockedLevel) return

    setCurrentLevel(nextLevel)
    setPlayerPosition(findStartPosition(nextLevel))
    setGameState("PLAYING")
    setMoveCount(0)
    setElapsedTime(0)
    setVisionRadius(INITIAL_VISION_RADIUS)
    setIsEchoActive(false)
    setEchoTimeRemaining(0)
    gameStartTimeRef.current = Date.now()

    if (echoTimeoutRef.current) {
      clearTimeout(echoTimeoutRef.current)
    }
  }, [currentLevel, maxUnlockedLevel])

  const goToPreviousLevel = useCallback(() => {
    const prevLevel = Math.max(currentLevel - 1, 1)
    setCurrentLevel(prevLevel)
    setPlayerPosition(findStartPosition(prevLevel))
    setGameState("PLAYING")
    setMoveCount(0)
    setElapsedTime(0)
    setVisionRadius(INITIAL_VISION_RADIUS)
    setIsEchoActive(false)
    setEchoTimeRemaining(0)
    gameStartTimeRef.current = Date.now()

    if (echoTimeoutRef.current) {
      clearTimeout(echoTimeoutRef.current)
    }
  }, [currentLevel])

  const selectLevel = useCallback(
    (levelId: number) => {
      if (levelId > maxUnlockedLevel) return

      setCurrentLevel(levelId)
      setPlayerPosition(findStartPosition(levelId))
      setGameState("PLAYING")
      setMoveCount(0)
      setElapsedTime(0)
      setVisionRadius(INITIAL_VISION_RADIUS)
      setIsEchoActive(false)
      setEchoTimeRemaining(0)
      gameStartTimeRef.current = Date.now()

      if (echoTimeoutRef.current) {
        clearTimeout(echoTimeoutRef.current)
      }
    },
    [maxUnlockedLevel],
  )

  useEffect(() => {
    if (gameState === "WON") {
      saveBestScore(moveCount)
    }
  }, [gameState, moveCount, saveBestScore])

  const getBestScore = useCallback(() => {
    if (typeof window === "undefined") return null
    const best = localStorage.getItem(`echoMazeBestMoves_level${currentLevel}`)
    return best ? Number.parseInt(best, 10) : null
  }, [currentLevel])

  useEffect(() => {
    if (gameState !== "PLAYING") return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault()
          move("up")
          break
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault()
          move("down")
          break
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault()
          move("left")
          break
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault()
          move("right")
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [move, gameState])

  return {
    playerPosition,
    gameState,
    moveCount,
    elapsedTime,
    visionRadius,
    isEchoActive,
    echoTimeRemaining,
    gridSize: GRID_SIZE,
    currentLevel,
    totalLevels: getTotalLevels(),
    maxUnlockedLevel,
    move,
    resetGame,
    goToNextLevel,
    goToPreviousLevel,
    selectLevel,
    showHelp,
    setShowHelp,
    getBestScore,
  }
}
