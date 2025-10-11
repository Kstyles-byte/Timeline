'use client'

import { useState } from 'react'
import { Trophy, Check, Clock, Lock, Settings } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LevelManagementModal } from './LevelManagementModal'

interface Level {
  id: number
  name: string
  description: string
}

interface LevelManagementProps {
  currentLevel: number
  levelsCompleted: number
  levels?: Level[]
  isEditMode?: boolean
  onUpdateLevel?: (levelId: number, name: string, description: string) => Promise<void>
}

export function LevelManagement({ currentLevel, levels = [], isEditMode = false, onUpdateLevel }: LevelManagementProps) {
  const [showModal, setShowModal] = useState(false)
  const levelNumbers = [1, 2, 3, 4]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 mb-8 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
          <Trophy className="text-yellow-500" size={24} />
          Level Management
        </h3>
        
        {isEditMode && onUpdateLevel && (
          <motion.button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings size={16} />
            <span className="text-sm font-medium">Manage All Levels</span>
          </motion.button>
        )}
      </div>
      
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
                  {levels.find(l => l.id === levelNumber)?.name || 'Unknown'}
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
      
      {isEditMode && onUpdateLevel && (
        <LevelManagementModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          levels={levels}
          onUpdateLevel={onUpdateLevel}
        />
      )}
    </motion.div>
  )
}
