'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { motion } from 'framer-motion'
import { Droplet, Wind, Sun, Flame, AlertCircle } from 'lucide-react'

const careGuides = [
  {
    id: 1,
    title: 'Washing Instructions',
    icon: Droplet,
    items: [
      'Wash in cold water (30°C or below)',
      'Use gentle detergent for delicate fabrics',
      'Do not wring; gently squeeze out excess water',
      'Wash similar colors together',
      'For silk items, hand wash is recommended',
    ],
  },
  {
    id: 2,
    title: 'Drying Methods',
    icon: Wind,
    items: [
      'Air dry in shade; avoid direct sunlight',
      'Do not use a dryer for delicate fabrics',
      'Lay flat or hang on padded hangers',
      'Keep away from heat sources',
      'Allow garments to dry completely before storage',
    ],
  },
  {
    id: 3,
    title: 'Sun Protection',
    icon: Sun,
    items: [
      'Avoid prolonged sun exposure',
      'Store in a cool, dry place',
      'Use UV protection spray for outdoor wear',
      'Avoid chlorine and direct heat',
      'Protect from dust and humidity',
    ],
  },
  {
    id: 4,
    title: 'Ironing & Pressing',
    icon: Flame,
    items: [
      'Iron on low to medium heat',
      'Use a pressing cloth for silk and delicate fabrics',
      'Iron inside out to prevent shine',
      'Never iron directly on embroidery',
      'Allow garments to cool before wearing',
    ],
  },
]

const materials = [
  {
    name: 'Silk',
    description: 'Premium luxury fabric, breathable and smooth. Hand wash recommended.',
    care: 'Gentle hand wash, air dry in shade',
  },
  {
    name: 'Cotton Blend',
    description: 'Comfortable and durable natural fiber blend. Easy to maintain.',
    care: 'Cold water wash, gentle cycle recommended',
  },
  {
    name: 'Linen',
    description: 'Breathable and elegant. Gets softer with every wash.',
    care: 'Hand wash or delicate cycle, air dry',
  },
  {
    name: 'Synthetic Blend',
    description: 'Wrinkle-resistant and long-lasting quality fabric.',
    care: 'Machine wash on gentle cycle, tumble dry low',
  },
]

export default function CareGuide() {
  return (
    <main className="overflow-hidden">
      <Header />

      {/* Hero */}
      <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-pink-600 text-sm font-medium tracking-widest uppercase mb-4">Garment Care</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
              Care & Material Guide
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Learn how to properly care for your AWP Shopping pieces to ensure they last for years
            </p>
          </motion.div>
        </div>
      </section>

      {/* Care Guide Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careGuides.map((guide, index) => {
              const IconComponent = guide.icon
              return (
                <motion.div
                  key={guide.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-morphism p-6 rounded-xl"
                >
                  <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white mb-4">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{guide.title}</h3>
                  <ul className="space-y-2">
                    {guide.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-pink-600 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Materials & Fabrics */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Materials</h2>
            <p className="text-gray-600 text-lg">Premium fabrics used in AWP Shopping collections</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {materials.map((material, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">{material.name}</h3>
                <p className="text-gray-600 mb-4">{material.description}</p>
                <div className="flex items-center gap-2 text-pink-600 font-semibold">
                  <AlertCircle size={18} />
                  <span>Care: {material.care}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-pink-600 to-pink-500 rounded-2xl p-12 text-white"
          >
            <h2 className="text-3xl font-serif font-bold mb-6">Pro Tips for Longevity</h2>
            <ul className="space-y-4">
              {[
                'Store garments in a cool, dry place away from direct sunlight',
                'Use cedar blocks or lavender sachets to keep clothes fresh',
                'Rotate your wardrobe to extend garment life',
                'Treat stains immediately with appropriate stain remover',
                'Avoid overloading your washing machine',
                'Read and follow care labels specific to each garment',
              ].map((tip, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center gap-3 text-lg"
                >
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  {tip}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
