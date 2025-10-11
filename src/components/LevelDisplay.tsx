'use client'

import { motion } from 'framer-motion'
import { levels } from '@/lib/levels'

interface LevelDisplayProps {
  currentLevel: number
  daysCompleted: number
}

export function LevelDisplay({ currentLevel, daysCompleted }: LevelDisplayProps) {
  const progress = (daysCompleted / 14) * 100
  const radius = 54
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-3xl p-8 mb-8 shadow-2xl flex justify-between items-center flex-wrap gap-6"
    >
      <div className="level-info">
        <motion.h2 
          className="text-4xl font-bold text-indigo-600 mb-3"
          key={currentLevel}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          Level {currentLevel}
        </motion.h2>
        <p className="text-lg text-gray-600">
          {levels[currentLevel]?.description || 'Unknown level'}
        </p>
      </div>
      
      <div className="relative flex items-center justify-center">
        <svg
          className="transform -rotate-90 w-32 h-32"
          width="120"
          height="120"
        >
          <circle
            className="text-gray-200"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
          />
          <motion.circle
            className="text-indigo-600"
            strokeWidth="8"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </svg>
        <div className="absolute text-center">
          <motion.span 
            className="text-3xl font-bold text-indigo-600 block"
            key={daysCompleted}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
          >
            {daysCompleted}
          </motion.span>
          <span className="text-sm text-gray-600">/ 14 days</span>
        </div>
      </div>
    </motion.div>
  )
}