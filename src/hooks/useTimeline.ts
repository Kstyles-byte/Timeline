'use client'

import { useState, useEffect } from 'react'
import { TimelineData } from '@/types'
import { saveToStorage, loadFromStorage } from '@/lib/utils'

const defaultTimelineData: TimelineData = {
  currentLevel: 1,
  daysCompleted: 0,
  currentStreak: 0,
  levelsCompleted: 0,
  totalRestarts: 0,
  failureLog: []
}

export function useTimeline() {
  const [timelineData, setTimelineData] = useState<TimelineData>(defaultTimelineData)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = loadFromStorage('timelineData')
    if (savedData) {
      setTimelineData(savedData)
    }
    setIsLoaded(true)
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      saveToStorage('timelineData', timelineData)
    }
  }, [timelineData, isLoaded])

  const handleSuccess = () => {
    setTimelineData(prev => {
      const newDaysCompleted = prev.daysCompleted + 1
      const newCurrentStreak = prev.currentStreak + 1
      
      // Check if level is complete
      if (newDaysCompleted >= 14) {
        return {
          ...prev,
          daysCompleted: 0,
          currentStreak: 0,
          currentLevel: prev.currentLevel + 1,
          levelsCompleted: prev.levelsCompleted + 1
        }
      }
      
      return {
        ...prev,
        daysCompleted: newDaysCompleted,
        currentStreak: newCurrentStreak
      }
    })
  }

  const handleFailure = (reason: string) => {
    setTimelineData(prev => ({
      ...prev,
      daysCompleted: 0,
      currentStreak: 0,
      totalRestarts: prev.totalRestarts + 1,
      failureLog: [
        ...prev.failureLog,
        {
          date: new Date().toISOString(),
          level: prev.currentLevel,
          reason,
          daysCompleted: prev.daysCompleted
        }
      ]
    }))
  }

  const resetTimeline = () => {
    setTimelineData({
      ...defaultTimelineData,
      totalRestarts: timelineData.totalRestarts + 1
    })
  }

  return {
    timelineData,
    handleSuccess,
    handleFailure,
    resetTimeline,
    isLoaded
  }
}