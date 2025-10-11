'use client'

import { Header } from '@/components/Header'
import { LevelDisplay } from '@/components/LevelDisplay'
import { NonNegotiables } from '@/components/NonNegotiables'
import { DailyCheckin } from '@/components/DailyCheckin'
import { TimelineGrid } from '@/components/TimelineGrid'
import { LevelManagement } from '@/components/LevelManagement'
import { Stats } from '@/components/Stats'
import { Auth } from '@/components/Auth'
import { UserToolbar } from '@/components/AdminToolbar'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { useSupabaseTimeline } from '@/hooks/useSupabaseTimeline'
import { motion } from 'framer-motion'

function TimelineApp() {
  const { user, isLoading: authLoading } = useAuth()
  const {
    timelineData,
    levels,
    handleSuccess,
    handleFailure,
    isLoaded,
    updateLevel,
    updateNonNegotiables,
    getNonNegotiablesForLevel,
    getLevel
  } = useSupabaseTimeline()
  
  const isEditMode = true // Always enable edit mode for personal tracking

  // Show auth loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-blue-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-white text-2xl font-semibold"
        >
          Loading...
        </motion.div>
      </div>
    )
  }

  // Show auth form if not logged in
  if (!user) {
    return <Auth />
  }

  // Show data loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-blue-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-white text-2xl font-semibold"
        >
          Loading Timeline...
        </motion.div>
      </div>
    )
  }

  const currentLevelData = getLevel(timelineData.currentLevel)
  const currentNonNegotiables = getNonNegotiablesForLevel(timelineData.currentLevel)

  const handleLevelUpdate = async (name: string, description: string) => {
    await updateLevel(timelineData.currentLevel, name, description)
  }

  const handleNonNegotiablesUpdate = async (items: string[]) => {
    await updateNonNegotiables(timelineData.currentLevel, items)
  }

  const handleAnyLevelUpdate = async (levelId: number, name: string, description: string) => {
    await updateLevel(levelId, name, description)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-blue-800 relative">
      <UserToolbar />
      
      <div className="container mx-auto max-w-6xl px-6 py-8">
        <Header />
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-teal-400/20 border border-teal-400/30 rounded-2xl p-4 mb-8 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
            <span className="text-teal-100 font-medium text-lg">
              Personal Timeline - Customize your levels and track your progress
            </span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <LevelDisplay 
            currentLevel={timelineData.currentLevel}
            daysCompleted={timelineData.daysCompleted}
            levelData={currentLevelData}
            isEditMode={isEditMode}
            onUpdate={handleLevelUpdate}
          />
          
          <NonNegotiables 
            currentLevel={timelineData.currentLevel}
            nonNegotiables={currentNonNegotiables}
            isEditMode={isEditMode}
            onUpdate={handleNonNegotiablesUpdate}
          />
          
          <DailyCheckin 
            onSuccess={handleSuccess}
            onFailure={handleFailure}
          />
          
          <TimelineGrid 
            daysCompleted={timelineData.daysCompleted}
          />
          
          <LevelManagement 
            currentLevel={timelineData.currentLevel}
            levelsCompleted={timelineData.levelsCompleted}
            levels={levels}
            isEditMode={isEditMode}
            onUpdateLevel={handleAnyLevelUpdate}
          />
          
          <Stats 
            currentStreak={timelineData.currentStreak}
            levelsCompleted={timelineData.levelsCompleted}
            totalRestarts={timelineData.totalRestarts}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <AuthProvider>
      <TimelineApp />
    </AuthProvider>
  )
}
