# 🌘 Echo Maze

A polished single-page web game built with Next.js, featuring limited vision gameplay and atmospheric fog-of-war mechanics.

## 🎮 Game Overview

Echo Maze is a top-down labyrinth navigation game where players must find their way to the exit with only a small radius of vision around their character. The game features:

- **Limited Vision (Fog of War)**: Only see a few tiles around your character
- **Echo Pulse Mechanic**: Step on special tiles to temporarily expand your vision
- **Handcrafted Maze**: A carefully designed 15x15 labyrinth
- **Performance Tracking**: Move counter, timer, and best score persistence

## 🎯 How to Play

**Goal**: Navigate through the dark maze and reach the glowing exit tile.

**Controls**:
- Desktop: Arrow keys or WASD
- Mobile: On-screen directional buttons

**Mechanics**:
- You can only see tiles within a small radius (2 tiles by default)
- Dark areas are unexplored territory
- Step on echo tiles (with ripple effect) to temporarily expand vision (+3 tiles for 3 seconds)
- Reach the golden exit to win!

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **State Management**: Custom React hooks
- **Persistence**: localStorage for best scores

## 🚀 Getting Started

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to play the game.

## 📂 Project Structure

\`\`\`
app/
├── components/
│   ├── GameBoard.tsx      # Renders the maze grid with fog-of-war
│   ├── HUD.tsx            # Displays stats and controls
│   ├── Overlay.tsx        # Win screen and help modal
│   └── MobileControls.tsx # Touch controls for mobile
├── hooks/
│   └── useEchoMazeGame.ts # Core game logic and state
├── types/
│   └── game.ts            # TypeScript type definitions
├── utils/
│   └── maze.ts            # Maze layout and helper functions
├── page.tsx               # Main game page
└── layout.tsx             # Root layout
\`\`\`

## 🎨 Design Features

- Dark, atmospheric color scheme inspired by underground caves
- Smooth transitions and animations
- Responsive design (mobile-first)
- Cyan accent color for player and echo effects
- Golden exit with glowing effect
- Clean, minimal HUD overlay

## 🏆 Features

- ✅ Single-page game (no routing)
- ✅ Keyboard and touch controls
- ✅ Fog-of-war visibility system
- ✅ Echo pulse temporary vision boost
- ✅ Move counter and timer
- ✅ Best score persistence (localStorage)
- ✅ Win screen with stats
- ✅ Help modal with instructions
- ✅ Mobile-friendly responsive design
- ✅ TypeScript with strict types
- ✅ Clean component architecture

## 📝 License

Created as a portfolio project showcasing React/Next.js game development skills.
