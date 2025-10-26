'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save, Edit } from 'lucide-react'

interface Level {
  id: number
  name: string
  description: string
}

interface LevelManagementModalProps {
  isOpen: boolean
  onClose: () => void
  levels: Level[]
  onUpdateLevel: (levelId: number, name: string, description: string) => Promise<void>
}

export function LevelManagementModal({ isOpen, onClose, levels, onUpdateLevel }: LevelManagementModalProps) {
  const [editingLevels, setEditingLevels] = useState<{[key: number]: {name: string, description: string}}>({})
  const [isSaving, setIsSaving] = useState(false)

  const startEditing = (level: Level) => {
    setEditingLevels(prev => ({
      ...prev,
      [level.id]: { name: level.name, description: level.description }
    }))
  }

  const updateEditingLevel = (levelId: number, field: 'name' | 'description', value: string) => {
    setEditingLevels(prev => ({
      ...prev,
      [levelId]: { ...prev[levelId], [field]: value }
    }))
  }

  const saveLevel = async (levelId: number) => {
    const editData = editingLevels[levelId]
    if (!editData) return

    setIsSaving(true)
    try {
      await onUpdateLevel(levelId, editData.name, editData.description)
      setEditingLevels(prev => {
        const newState = { ...prev }
        delete newState[levelId]
        return newState
      })
    } catch (error) {
      console.error('Error saving level:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const cancelEditing = (levelId: number) => {
    setEditingLevels(prev => {
      const newState = { ...prev }
      delete newState[levelId]
      return newState
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
          className="bg-slate-800 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-100">Manage All Levels</h2>
            <motion.button
              onClick={onClose}
              className="p-2 hover:bg-slate-700 rounded-full transition-colors text-gray-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>
          </div>

          <div className="grid gap-6">
            {levels.map((level) => {
              const isEditing = editingLevels[level.id] !== undefined
              const editData = editingLevels[level.id] || level

              return (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-700 rounded-2xl p-6 border-2 border-slate-600"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-teal-300">
                      Level {level.id}
                    </h3>
                    {!isEditing ? (
                      <motion.button
                        onClick={() => startEditing(level)}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Edit size={16} />
                        Edit
                      </motion.button>
                    ) : (
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => saveLevel(level.id)}
                          disabled={isSaving}
                          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors disabled:opacity-50"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Save size={16} />
                          {isSaving ? 'Saving...' : 'Save'}
                        </motion.button>
                        <motion.button
                          onClick={() => cancelEditing(level.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-xl hover:bg-slate-500 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <X size={16} />
                          Cancel
                        </motion.button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Level Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) => updateEditingLevel(level.id, 'name', e.target.value)}
                          className="w-full p-3 border-2 border-slate-600 rounded-xl focus:border-teal-400 focus:outline-none font-semibold bg-slate-600 text-gray-100 placeholder-gray-400"
                          placeholder="Level name..."
                        />
                      ) : (
                        <div className="text-lg font-semibold text-gray-200">
                          {level.name}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      {isEditing ? (
                        <textarea
                          value={editData.description}
                          onChange={(e) => updateEditingLevel(level.id, 'description', e.target.value)}
                          className="w-full p-3 border-2 border-slate-600 rounded-xl focus:border-teal-400 focus:outline-none resize-none bg-slate-600 text-gray-100 placeholder-gray-400"
                          placeholder="Level description..."
                          rows={3}
                        />
                      ) : (
                        <div className="text-gray-300 bg-slate-600 p-3 rounded-xl border border-slate-500">
                          {level.description}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}