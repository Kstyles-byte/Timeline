export interface Level {
  name: string
  description: string
  nonNegotiables: string[]
}

export interface TimelineData {
  currentLevel: number
  daysCompleted: number
  currentStreak: number
  levelsCompleted: number
  totalRestarts: number
  failureLog: FailureEntry[]
}

export interface FailureEntry {
  date: string
  level: number
  reason: string
  daysCompleted: number
}

export interface LevelConfig {
  [key: number]: Level
}