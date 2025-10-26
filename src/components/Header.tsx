'use client'

import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import Image from 'next/image'

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-10 bg-white/10 dark:bg-slate-900/30 backdrop-blur-md rounded-3xl p-8 border border-white/20 dark:border-slate-700/50 relative transition-colors"
    >
      <motion.button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/20 dark:bg-slate-800/50 hover:bg-white/30 dark:hover:bg-slate-700/50 transition-all backdrop-blur-sm border border-white/30 dark:border-slate-600"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      >
        {theme === 'light' ? (
          <Moon className="text-white" size={24} />
        ) : (
          <Sun className="text-yellow-400" size={24} />
        )}
      </motion.button>

      <motion.h1 
        className="text-5xl font-bold text-white mb-3 text-shadow-lg flex items-center justify-center gap-4"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Image 
          src="/logo.svg" 
          alt="Timeline Logo" 
          width={56} 
          height={56}
          className="drop-shadow-lg"
        />
        The Timeline
      </motion.h1>
      <motion.p 
        className="text-xl text-white/90 font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Your Personal Accountability System
      </motion.p>
    </motion.header>
  )
}
