'use client'

import { motion } from 'framer-motion'

const items = [
  'Premium Quality',
  '•',
  'Free Shipping',
  '•',
  'Easy Returns',
  '•',
  'Customer Support',
  '•',
  'Luxury Fashion',
  '•',
]

export default function AnimatedMarquee() {
  return (
    <div className="bg-pink-600 text-white py-4 overflow-hidden">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="flex gap-8 whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-lg font-semibold">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
