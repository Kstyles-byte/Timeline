'use client'

import { AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import { levels } from '@/lib/levels'

interface NonNegotiablesProps {
  currentLevel: number
}

export function NonNegotiables({ currentLevel }: NonNegotiablesProps) {
  const currentLevelData = levels[currentLevel]

  if (!currentLevelData) return null

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-3xl p-8 mb-8 shadow-2xl"
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
        <AlertTriangle className="text-red-500" size={24} />
        Non-Negotiables
      </h3>
      
      <div className="space-y-4">
        {currentLevelData.nonNegotiables.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 p-4 rounded-xl border-l-4 border-red-500 flex items-center gap-4"
          >
            <AlertTriangle className="text-red-500 flex-shrink-0" size={20} />
            <span className="text-gray-700 font-medium">{item}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}