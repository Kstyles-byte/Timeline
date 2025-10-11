'use client'

import { Trophy, Check, Clock, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { levels } from '@/lib/levels'

interface LevelManagementProps {
  currentLevel: number
  levelsCompleted: number
}

export function LevelManagement({ currentLevel }: LevelManagementProps) {
  const levelNumbers = [1, 2, 3, 4]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 mb-8 shadow-2xl"
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
        <Trophy className="text-yellow-500" size={24} />
        Level Management
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {levelNumbers.map((levelNumber) => {
          const isCompleted = levelNumber < currentLevel
          const isCurrent = levelNumber === currentLevel
          const isLocked = levelNumber > currentLevel
          
          return (
            <motion.div
              key={levelNumber}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: levelNumber * 0.1 }}
              className={cn(
                "p-6 rounded-2xl transition-all duration-300 border-2 flex items-center gap-4",
                {
                  "bg-gradient-to-br from-teal-500 to-emerald-500 text-white border-teal-500 shadow-lg": isCompleted,
                  "bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-indigo-500 shadow-lg scale-105": isCurrent,
                  "bg-gray-100 text-gray-400 border-gray-200 opacity-60": isLocked
                }
              )}
              whileHover={{ scale: isCurrent ? 1.08 : isCompleted ? 1.02 : 1.01 }}
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold",
                "bg-white/20 backdrop-blur-sm"
              )}>
                {levelNumber}
              </div>
              
              <div className="flex-1">
                <div className="font-semibold text-lg">
                  {levels[levelNumber]?.name || 'Unknown'}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {isCompleted && <Check size={16} />}
                  {isCurrent && <Clock size={16} />}
                  {isLocked && <Lock size={16} />}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}