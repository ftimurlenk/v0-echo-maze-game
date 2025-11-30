// Core game types for Echo Maze

export type TileType = "wall" | "floor" | "echo" | "exit" | "start"

export type Position = {
  x: number
  y: number
}

export type Direction = "up" | "down" | "left" | "right"

export type GameState = "PLAYING" | "WON"

export type Tile = {
  type: TileType
  position: Position
}

export type GameConfig = {
  gridSize: number
  initialVisionRadius: number
  echoPulseDuration: number
  echoVisionBonus: number
}
