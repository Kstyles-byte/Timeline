'use client'

import { useState } from 'react'
import { CalendarCheck, Check, X, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DailyCheckinProps {
  onSuccess: () => void
  onFailure: (reason: string) => void
}

export function DailyCheckin({ onSuccess, onFailure }: DailyCheckinProps) {
  const [showFailureLog, setShowFailureLog] = useState(false)
  const [failureReason, setFailureReason] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)

  const handleSuccess = () => {
    setIsAnimating(true)
    setTimeout(() => {
      onSuccess()
      setIsAnimating(false)
    }, 200)
  }

  const handleFailureClick = () => {
    setShowFailureLog(true)
  }

  const handleLogFailure = () => {
    if (!failureReason.trim()) {
      alert('Please describe what went wrong before logging the failure.')
      return
    }
    
    onFailure(failureReason)
    setShowFailureLog(false)
    setFailureReason('')
  }

  const handleCancel = () => {
    setShowFailureLog(false)
    setFailureReason('')
  }

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800 rounded-3xl p-8 mb-8 shadow-2xl text-center"
      >
        <h3 className="text-2xl font-semibold text-gray-100 mb-6 flex items-center justify-center gap-3">
          <CalendarCheck className="text-teal-300" size={24} />
          Today&apos;s Check-in
        </h3>
        
        <div className="flex gap-6 justify-center flex-wrap">
          <motion.button
            onClick={handleSuccess}
            className={cn(
              "px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center gap-3 min-w-[180px] justify-center",
              "bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700",
              "shadow-lg hover:shadow-xl hover:-translate-y-1"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: isAnimating ? 1.1 : 0.95 }}
          >
            <Check size={20} />
            I Did It!
          </motion.button>
          
          <motion.button
            onClick={handleFailureClick}
            className={cn(
              "px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center gap-3 min-w-[180px] justify-center",
              "bg-gradient-to-r from-slate-600 to-slate-700 text-white hover:from-slate-700 hover:to-slate-800",
              "shadow-lg hover:shadow-xl hover:-translate-y-1"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={20} />
            I Failed
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showFailureLog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-3xl p-8 max-w-md w-full border-2 border-slate-600"
            >
              <h3 className="text-2xl font-semibold text-slate-200 mb-6 flex items-center gap-3">
                <AlertCircle size={24} />
                What Went Wrong?
              </h3>
              
              <textarea
                value={failureReason}
                onChange={(e) => setFailureReason(e.target.value)}
                placeholder="Describe what caused you to miss your non-negotiables..."
                className="w-full min-h-[120px] p-4 border-2 border-slate-600 rounded-xl font-medium resize-vertical focus:border-teal-400 focus:outline-none mb-6 bg-slate-700 text-gray-100 placeholder:text-gray-400"
                autoFocus
              />
              
              <div className="flex gap-4 justify-center">
                <motion.button
                  onClick={handleLogFailure}
                  className="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-full font-semibold hover:from-slate-700 hover:to-slate-800 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Log & Restart
                </motion.button>
                
                <motion.button
                  onClick={handleCancel}
                  className="px-6 py-3 bg-slate-600 text-gray-200 rounded-full font-semibold hover:bg-slate-500 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}