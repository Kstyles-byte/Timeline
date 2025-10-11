'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

interface TimelineData {
  currentLevel: number
  daysCompleted: number
  currentStreak: number
  levelsCompleted: number
  totalRestarts: number
}

interface Level {
  id: number
  user_id: string
  level_number: number
  name: string
  description: string
}

interface NonNegotiable {
  id: string
  user_id: string
  level_id: number
  text: string
  order_index: number
}

export function useSupabaseTimeline() {
  const { user } = useAuth()
  const [timelineData, setTimelineData] = useState<TimelineData>({
    currentLevel: 1,
    daysCompleted: 0,
    currentStreak: 0,
    levelsCompleted: 0,
    totalRestarts: 0
  })
  const [levels, setLevels] = useState<Level[]>([])
  const [nonNegotiables, setNonNegotiables] = useState<NonNegotiable[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load data when user is authenticated
  useEffect(() => {
    if (user) {
      loadAllData()
    } else {
      setIsLoaded(true)
    }
  }, [user]) // loadAllData is defined within the hook, so it's safe to omit

  const loadAllData = async () => {
    try {
      await Promise.all([
        loadTimelineData(),
        loadLevels(),
        loadNonNegotiables()
      ])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsLoaded(true)
    }
  }

  const loadTimelineData = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('timeline_data')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
        console.error('Error loading timeline data:', error)
        // Create default timeline data if it doesn't exist
        const { error: insertError } = await supabase
          .from('timeline_data')
          .insert({
            user_id: user.id,
            current_level: 1,
            days_completed: 0,
            current_streak: 0,
            levels_completed: 0,
            total_restarts: 0
          })
        
        if (insertError) {
          console.error('Error creating timeline data:', insertError)
        }
        return
      }

      if (data) {
        setTimelineData({
          currentLevel: data.current_level,
          daysCompleted: data.days_completed,
          currentStreak: data.current_streak,
          levelsCompleted: data.levels_completed,
          totalRestarts: data.total_restarts
        })
      }
    } catch (error) {
      console.error('Error loading timeline data:', error)
    }
  }

  const loadLevels = async () => {
    if (!user) return
    
    try {
      const { data, error } = await supabase
        .from('levels')
        .select('*')
        .eq('user_id', user.id)
        .order('level_number')

      if (error) {
        console.error('Error loading levels:', error)
        return
      }

      if (data) {
        setLevels(data)
      } else {
        console.warn('No levels data returned from database')
      }
    } catch (error) {
      console.error('Error loading levels:', error)
    }
  }

  const loadNonNegotiables = async () => {
    if (!user) return
    
    try {
      const { data, error } = await supabase
        .from('non_negotiables')
        .select('*')
        .eq('user_id', user.id)
        .order('level_id, order_index')

      if (error) {
        console.error('Error loading non-negotiables:', error)
        return
      }

      if (data) {
        setNonNegotiables(data)
      } else {
        console.warn('No non-negotiables data returned from database')
      }
    } catch (error) {
      console.error('Error loading non-negotiables:', error)
    }
  }

  const updateTimelineData = async (updates: Partial<TimelineData>) => {
    if (!user) return

    const newData = { ...timelineData, ...updates }
    setTimelineData(newData)

    const { error } = await supabase
      .from('timeline_data')
      .upsert({
        user_id: user.id,
        current_level: newData.currentLevel,
        days_completed: newData.daysCompleted,
        current_streak: newData.currentStreak,
        levels_completed: newData.levelsCompleted,
        total_restarts: newData.totalRestarts
      })

    if (error) {
      console.error('Error updating timeline data:', error)
    }
  }

  const handleSuccess = async () => {
    const newDaysCompleted = timelineData.daysCompleted + 1
    const newCurrentStreak = timelineData.currentStreak + 1

    // Check if level is complete
    if (newDaysCompleted >= 14) {
      await updateTimelineData({
        daysCompleted: 0,
        currentStreak: 0,
        currentLevel: timelineData.currentLevel + 1,
        levelsCompleted: timelineData.levelsCompleted + 1
      })
    } else {
      await updateTimelineData({
        daysCompleted: newDaysCompleted,
        currentStreak: newCurrentStreak
      })
    }
  }

  const handleFailure = async (reason: string) => {
    if (!user) return

    // Log the failure
    const { error: logError } = await supabase
      .from('failure_logs')
      .insert({
        user_id: user.id,
        level: timelineData.currentLevel,
        reason,
        days_completed: timelineData.daysCompleted,
        date: new Date().toISOString()
      })

    if (logError) {
      console.error('Error logging failure:', logError)
    }

    // Reset timeline
    await updateTimelineData({
      daysCompleted: 0,
      currentStreak: 0,
      totalRestarts: timelineData.totalRestarts + 1
    })
  }

  const updateLevel = async (levelNumber: number, name: string, description: string) => {
    if (!user) return
    
    const { error } = await supabase
      .from('levels')
      .update({ name, description })
      .eq('user_id', user.id)
      .eq('level_number', levelNumber)

    if (error) {
      console.error('Error updating level:', error)
      throw error
    }

    await loadLevels()
  }

  const updateNonNegotiables = async (levelNumber: number, items: string[]) => {
    if (!user) return
    
    // Get the level ID for this level number
    const level = levels.find(l => l.level_number === levelNumber)
    if (!level) return
    
    // Delete existing non-negotiables for this level
    const { error: deleteError } = await supabase
      .from('non_negotiables')
      .delete()
      .eq('level_id', level.id)
      .eq('user_id', user.id)

    if (deleteError) {
      console.error('Error deleting non-negotiables:', deleteError)
      throw deleteError
    }

    // Insert new non-negotiables
    const insertData = items.map((text, index) => ({
      user_id: user.id,
      level_id: level.id,
      text,
      order_index: index + 1
    }))

    const { error: insertError } = await supabase
      .from('non_negotiables')
      .insert(insertData)

    if (insertError) {
      console.error('Error inserting non-negotiables:', insertError)
      throw insertError
    }

    await loadNonNegotiables()
  }

  // Get non-negotiables for a specific level
  const getNonNegotiablesForLevel = (levelNumber: number) => {
    const level = levels.find(l => l.level_number === levelNumber)
    if (!level) return []
    
    return nonNegotiables
      .filter(nn => nn.level_id === level.id)
      .sort((a, b) => a.order_index - b.order_index)
      .map(nn => nn.text)
  }

  // Get level data
  const getLevel = (levelNumber: number) => {
    return levels.find(level => level.level_number === levelNumber)
  }

  return {
    timelineData,
    levels,
    nonNegotiables,
    isLoaded,
    handleSuccess,
    handleFailure,
    updateLevel,
    updateNonNegotiables,
    getNonNegotiablesForLevel,
    getLevel,
    refreshData: loadAllData
  }
}