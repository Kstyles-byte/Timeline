'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-10 bg-slate-900/30 backdrop-blur-md rounded-3xl p-8 border border-slate-700/50"
    >

      <motion.h1 
        className="text-5xl font-bold text-white mb-3 text-shadow-lg flex items-center justify-center gap-5"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <Image 
            src="/logo.svg" 
            alt="Timeline Logo" 
            width={80} 
            height={80}
            className="drop-shadow-2xl"
          />
        </motion.div>
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
