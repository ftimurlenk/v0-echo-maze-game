// Handcrafted maze layout for Echo Maze
import type { TileType } from "../types/game"
import { getLevel } from "./levels"

export const GRID_SIZE = 15

export function getMazeLayout(levelId: number): number[][] {
  const level = getLevel(levelId)
  if (!level) {
    // Fallback to level 1 if invalid
    return getLevel(1)!.layout
  }
  return level.layout
}

export function getTileType(x: number, y: number, levelId: number): TileType {
  if (y < 0 || y >= GRID_SIZE || x < 0 || x >= GRID_SIZE) {
    return "wall"
  }

  const layout = getMazeLayout(levelId)
  const value = layout[y][x]
  switch (value) {
    case 1:
      return "wall"
    case 2:
      return "echo"
    case 3:
      return "exit"
    case 4:
      return "start"
    default:
      return "floor"
  }
}

export function findStartPosition(levelId: number): { x: number; y: number } {
  const layout = getMazeLayout(levelId)
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (layout[y][x] === 4) {
        return { x, y }
      }
    }
  }
  return { x: 1, y: 1 } // Fallback
}

export function isWalkable(x: number, y: number, levelId: number): boolean {
  const type = getTileType(x, y, levelId)
  return type !== "wall"
}

// Calculate Manhattan distance between two positions
export function getDistance(pos1: { x: number; y: number }, pos2: { x: number; y: number }): number {
  return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y)
}
