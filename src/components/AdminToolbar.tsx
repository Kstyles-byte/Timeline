'use client'

import { useState } from 'react'
import { LogOut, User, FileText } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { FailureLogsModal } from './FailureLogsModal'

export function UserToolbar() {
  const { user, signOut } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showFailureLogs, setShowFailureLogs] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-50"
    >
      <div className="relative">
        <motion.button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-white border border-white/20 hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <User size={20} />
          <span className="hidden sm:block text-sm font-medium">
            {user?.email?.split('@')[0]}
          </span>
        </motion.button>

        {showUserMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-full right-0 mt-2 w-48 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden"
          >
            <div className="p-3 border-b border-white/10">
              <p className="text-white text-sm font-medium truncate">
                {user?.email}
              </p>
            </div>
            
            <motion.button
              onClick={() => {
                setShowFailureLogs(true)
                setShowUserMenu(false)
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors text-left"
              whileHover={{ x: 5 }}
            >
              <FileText size={18} />
              <span className="text-sm">View Failure Logs</span>
            </motion.button>
            
            <motion.button
              onClick={() => {
                handleSignOut()
                setShowUserMenu(false)
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-red-500/10 transition-colors text-left"
              whileHover={{ x: 5 }}
            >
              <LogOut size={18} />
              <span className="text-sm">Sign Out</span>
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Click outside to close menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setShowUserMenu(false)}
        />
      )}
      
      <FailureLogsModal
        isOpen={showFailureLogs}
        onClose={() => setShowFailureLogs(false)}
      />
    </motion.div>
  )
}
