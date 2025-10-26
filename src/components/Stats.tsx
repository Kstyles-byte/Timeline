'use client'

import { Flame, Trophy, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'

interface StatsProps {
  currentStreak: number
  levelsCompleted: number
  totalRestarts: number
}

export function Stats({ currentStreak, levelsCompleted, totalRestarts }: StatsProps) {
  const stats = [
    {
      icon: Flame,
      value: currentStreak,
      label: 'Day Streak',
      color: 'text-indigo-400',
      bgColor: 'from-indigo-900/30 to-indigo-800/30'
    },
    {
      icon: Trophy,
      value: levelsCompleted,
      label: 'Levels Completed',
      color: 'text-indigo-400',
      bgColor: 'from-indigo-900/30 to-indigo-800/30'
    },
    {
      icon: RotateCcw,
      value: totalRestarts,
      label: 'Total Restarts',
      color: 'text-indigo-400',
      bgColor: 'from-indigo-900/30 to-indigo-800/30'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`bg-gradient-to-br ${stat.bgColor} rounded-3xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300`}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
          >
            <stat.icon className={`${stat.color} mx-auto mb-3`} size={32} />
          </motion.div>
          
          <motion.div
            className="text-4xl font-bold text-gray-100 mb-2"
            key={stat.value}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {stat.value}
          </motion.div>
          
          <div className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}