'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
}

export default function HeroSection() {
  return (
    <>
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden noise-bg">

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-2xl px-4 sm:px-6 text-center md:text-left"
      >
        <motion.div variants={itemVariants}>
          <p className="text-pink-600 text-sm font-medium tracking-widest uppercase mb-4">
            Luxury Redefined
          </p>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 leading-tight"
        >
          Elegance <span className="text-pink-600">Meets</span> Style
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed"
        >
          Discover our curated collection of premium, luxurious clothing designed for the modern woman who values quality and elegance.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button className="px-8 py-3 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 transition-colors">
          <Link href="/collections">
            Shop Collection
          </Link>
          </button>
          <button className="px-8 py-3 border-2 border-pink-600 text-pink-600 rounded-lg font-medium hover:bg-pink-50 transition-colors">
            <Link href="/about">
            Explore More
            </Link>
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <ChevronDown size={24} className="text-pink-600" />
      </motion.div>
      </section>

      
    </>
  )
}
