'use client'

import React, { useState } from 'react'
import { AlertTriangle, Edit, Save, X, Plus, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface NonNegotiablesProps {
  currentLevel: number
  nonNegotiables: string[]
  isEditMode: boolean
  onUpdate: (items: string[]) => Promise<void>
}

export function NonNegotiables({ nonNegotiables, isEditMode, onUpdate }: NonNegotiablesProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editItems, setEditItems] = useState<string[]>(nonNegotiables)

  // Update editItems when nonNegotiables prop changes
  React.useEffect(() => {
    setEditItems([...nonNegotiables])
  }, [nonNegotiables])
  const [isSaving, setIsSaving] = useState(false)

  const handleEdit = () => {
    setEditItems([...nonNegotiables])
    setIsEditing(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onUpdate(editItems.filter(item => item.trim().length > 0))
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating non-negotiables:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditItems([...nonNegotiables])
    setIsEditing(false)
  }

  const addItem = () => {
    setEditItems([...editItems, ''])
  }

  const removeItem = (index: number) => {
    setEditItems(editItems.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, value: string) => {
    const newItems = [...editItems]
    newItems[index] = value
    setEditItems(newItems)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-3xl p-8 mb-8 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
          <AlertTriangle className="text-red-500" size={24} />
          Non-Negotiables
        </h3>
        
        {isEditMode && !isEditing && (
          <motion.button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Edit size={16} />
            <span className="text-sm font-medium">Edit</span>
          </motion.button>
        )}
        
        {isEditing && (
          <div className="flex gap-2">
            <motion.button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Save size={16} />
              <span className="text-sm font-medium">{isSaving ? 'Saving...' : 'Save'}</span>
            </motion.button>
            <motion.button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={16} />
              <span className="text-sm font-medium">Cancel</span>
            </motion.button>
          </div>
        )}
      </div>
      
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            key="editing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {editItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <AlertTriangle className="text-red-500 flex-shrink-0" size={20} />
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateItem(index, e.target.value)}
                  className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  placeholder="Enter non-negotiable..."
                />
                <motion.button
                  onClick={() => removeItem(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 size={18} />
                </motion.button>
              </div>
            ))}
            
            <motion.button
              onClick={addItem}
              className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-red-500 hover:bg-red-50 transition-colors w-full justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={20} className="text-red-500" />
              <span className="text-red-500 font-medium">Add Non-Negotiable</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="viewing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {nonNegotiables.map((item, index) => (
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
