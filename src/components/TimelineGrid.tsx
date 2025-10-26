'use client'

import { Calendar, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TimelineGridProps {
  daysCompleted: number
}

export function TimelineGrid({ daysCompleted }: TimelineGridProps) {
  const days = Array.from({ length: 14 }, (_, i) => i + 1)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-3xl p-8 mb-8 shadow-2xl transition-colors"
    >
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
        <Calendar className="text-indigo-600 dark:text-indigo-400" size={24} />
        14-Day Timeline
      </h3>
      
      <div className="grid grid-cols-7 gap-3 max-w-lg mx-auto">
        {days.map((day) => {
          const isCompleted = day <= daysCompleted
          const isCurrent = day === daysCompleted + 1
          
          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: day * 0.05 }}
              className={cn(
                "aspect-square rounded-xl flex items-center justify-center font-bold text-lg border-2 transition-all duration-300 relative cursor-pointer",
                {
                  "bg-gradient-to-br from-teal-500 to-emerald-500 text-white border-teal-500 shadow-lg transform scale-110": isCompleted,
                  "bg-indigo-600 dark:bg-indigo-500 text-white border-indigo-600 dark:border-indigo-500 animate-pulse": isCurrent,
                  "bg-gray-50 dark:bg-slate-700 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500": !isCompleted && !isCurrent
                }
              )}
              whileHover={{ scale: isCompleted ? 1.15 : isCurrent ? 1.05 : 1.02 }}
            >
              {isCompleted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Check size={20} />
                </motion.div>
              )}
              {!isCompleted && (
                <span>{day}</span>
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}