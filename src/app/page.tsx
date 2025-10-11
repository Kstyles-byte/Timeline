'use client'

import { Header } from '@/components/Header'
import { LevelDisplay } from '@/components/LevelDisplay'
import { NonNegotiables } from '@/components/NonNegotiables'
import { DailyCheckin } from '@/components/DailyCheckin'
import { TimelineGrid } from '@/components/TimelineGrid'
import { LevelManagement } from '@/components/LevelManagement'
import { Stats } from '@/components/Stats'
import { useTimeline } from '@/hooks/useTimeline'
import { motion } from 'framer-motion'

export default function Home() {
  const { timelineData, handleSuccess, handleFailure, isLoaded } = useTimeline()

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-blue-800">
      <div className="container mx-auto max-w-6xl px-6 py-8">
        <Header />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <LevelDisplay 
            currentLevel={timelineData.currentLevel}
            daysCompleted={timelineData.daysCompleted}
          />
          
          <NonNegotiables 
            currentLevel={timelineData.currentLevel}
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
