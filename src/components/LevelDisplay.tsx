'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit, Save, X } from 'lucide-react'

interface Level {
  id: number
  name: string
  description: string
}

interface LevelDisplayProps {
  currentLevel: number
  daysCompleted: number
  levelData?: Level
  isEditMode: boolean
  onUpdate: (name: string, description: string) => Promise<void>
}

export function LevelDisplay({ currentLevel, daysCompleted, levelData, isEditMode, onUpdate }: LevelDisplayProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(levelData?.name || '')
  const [editDescription, setEditDescription] = useState(levelData?.description || '')
  const [isSaving, setIsSaving] = useState(false)

  // Update edit state when levelData changes
  useEffect(() => {
    setEditName(levelData?.name || '')
    setEditDescription(levelData?.description || '')
  }, [levelData])

  const progress = (daysCompleted / 14) * 100
  const radius = 54
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (progress / 100) * circumference

  const handleEdit = () => {
    setEditName(levelData?.name || '')
    setEditDescription(levelData?.description || '')
    setIsEditing(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onUpdate(editName, editDescription)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating level:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditName(levelData?.name || '')
    setEditDescription(levelData?.description || '')
    setIsEditing(false)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-800 rounded-3xl p-8 mb-8 shadow-2xl flex justify-between items-center flex-wrap gap-6"
    >
      <div className="level-info flex-1">
        <div className="flex items-center justify-between mb-3">
          <motion.h2 
            className="text-4xl font-bold text-indigo-600 dark:text-indigo-400"
            key={currentLevel}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            Level {currentLevel}
            {isEditing && (
              <span className="text-lg ml-3">- </span>
            )}
            {isEditing ? (
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 bg-transparent border-b-2 border-indigo-300 dark:border-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none ml-2 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Level name..."
              />
            ) : (
              <span className="text-2xl ml-3">{levelData?.name}</span>
            )}
          </motion.h2>
          
          {isEditMode && !isEditing && (
            <motion.button
              onClick={handleEdit}
              className="flex items-center gap-2 px-3 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Edit size={16} />
              Edit
            </motion.button>
          )}
          
          {isEditing && (
            <div className="flex gap-2">
              <motion.button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-3 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors text-sm disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Save size={16} />
                {isSaving ? 'Saving...' : 'Save'}
              </motion.button>
              <motion.button
                onClick={handleCancel}
                className="flex items-center gap-2 px-3 py-2 bg-slate-600 text-white rounded-xl hover:bg-slate-500 transition-colors text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={16} />
                Cancel
              </motion.button>
            </div>
          )}
        </div>
        
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.textarea
              key="editing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full p-3 border-2 border-slate-600 rounded-xl focus:border-indigo-500 focus:outline-none resize-none bg-slate-700 text-gray-100 placeholder-gray-400"
              placeholder="Level description..."
              rows={2}
            />
          ) : (
            <motion.p 
              key="viewing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-lg text-gray-300"
            >
              {levelData?.description || 'Unknown level'}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      
      <div className="relative flex items-center justify-center">
        <svg
          className="transform -rotate-90 w-32 h-32"
          width="120"
          height="120"
        >
          <circle
            className="text-slate-600"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
          />
          <motion.circle
            className="text-indigo-400"
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
            className="text-3xl font-bold text-indigo-400 block"
            key={daysCompleted}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
          >
            {daysCompleted}
          </motion.span>
          <span className="text-sm text-gray-400">/ 14 days</span>
        </div>
      </div>
    </motion.div>
  )
}
