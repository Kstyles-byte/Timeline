'use client'

import { Activity } from 'lucide-react'
import { motion } from 'framer-motion'

export function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-10 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
    >
      <motion.h1 
        className="text-5xl font-bold text-white mb-3 text-shadow-lg flex items-center justify-center gap-4"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Activity className="text-yellow-400" size={48} />
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