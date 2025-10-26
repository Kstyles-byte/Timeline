'use client'

import { motion } from 'framer-motion'

export function Header() {
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    })
  }

  const title = "The Timeline"

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-10 bg-slate-900/30 backdrop-blur-md rounded-3xl p-8 border border-slate-700/50"
    >
      <motion.h1 
        className="text-6xl font-bold mb-3 text-shadow-lg flex items-center justify-center gap-1 font-[family-name:var(--font-playfair)]"
      >
        {title.split('').map((char, index) => (
          <motion.span
            key={index}
            custom={index}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            className={char === ' ' ? 'inline-block w-4' : 'inline-block bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent hover:from-emerald-300 hover:via-green-300 hover:to-emerald-400 transition-all duration-300'}
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
      <motion.p 
        className="text-xl text-white/90 font-light tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Your Personal Accountability System
      </motion.p>
    </motion.header>
  )
}
}
