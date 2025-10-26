'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertCircle, Calendar, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

interface FailureLog {
  id: string
  level: number
  reason: string
  days_completed: number
  date: string
  created_at: string
}

interface FailureLogsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function FailureLogsModal({ isOpen, onClose }: FailureLogsModalProps) {
  const { user } = useAuth()
  const [failureLogs, setFailureLogs] = useState<FailureLog[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadFailureLogs = useCallback(async () => {
    if (!user) return

    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('failure_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading failure logs:', error)
        return
      }

      setFailureLogs(data || [])
    } catch (error) {
      console.error('Error loading failure logs:', error)
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (isOpen && user) {
      loadFailureLogs()
    }
  }, [isOpen, user, loadFailureLogs])

  const deleteFailureLog = async (logId: string) => {
    try {
      const { error } = await supabase
        .from('failure_logs')
        .delete()
        .eq('id', logId)

      if (error) {
        console.error('Error deleting failure log:', error)
        return
      }

      setFailureLogs(prev => prev.filter(log => log.id !== logId))
    } catch (error) {
      console.error('Error deleting failure log:', error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
              <AlertCircle className="text-red-500 dark:text-red-400" size={32} />
              Failure Logs
            </h2>
            <motion.button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors text-gray-700 dark:text-gray-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full"
              />
            </div>
          ) : failureLogs.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={48} />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No failure logs found. Keep up the great work!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {failureLogs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800 rounded-2xl p-6 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <AlertCircle className="text-red-500 dark:text-red-400 flex-shrink-0" size={20} />
                        <h3 className="font-semibold text-red-800 dark:text-red-300">
                          Level {log.level} Failure
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                          <Calendar size={16} />
                          {formatDate(log.date)}
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 p-3 rounded-lg border border-red-200 dark:border-red-800 transition-colors">
                          <span className="font-medium">Reason:</span> {log.reason}
                        </p>
                      </div>
                      
                      <div className="text-sm text-red-600 dark:text-red-400">
                        Days completed before failure: <span className="font-semibold">{log.days_completed}</span>
                      </div>
                    </div>
                    
                    <motion.button
                      onClick={() => deleteFailureLog(log.id)}
                      className="p-2 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors ml-4"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Delete log"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}