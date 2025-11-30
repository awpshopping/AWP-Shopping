'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { motion } from 'framer-motion'

const timelineEvents = [
  { year: '2020', event: 'AWP Shopping Founded' },
  { year: '2021', event: 'Launched First Collection' },
  { year: '2022', event: 'Expanded Product Line' },
  { year: '2023', event: 'Reached 10K+ Customers' },
  { year: '2024', event: 'Became Industry Leader' },
]

export default function About() {
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
            <p className="text-pink-600 text-sm font-medium tracking-widest uppercase mb-4">Our Story</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
              About AWP Shopping
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Crafting luxury, elegance, and sophistication for the modern woman
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/luxury-saree-collection.jpg"
              alt="Brand Story"
              className="rounded-2xl shadow-2xl"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-serif font-bold text-gray-900">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              AWP Shopping was born from a passion for creating beautiful, luxurious clothing that empowers women to express their elegance and sophistication. We believe that luxury fashion should be accessible to everyone, which is why we offer premium quality pieces at prices between ₹500-₹1500.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Every garment in our collection is thoughtfully designed, crafted with premium materials, and created to make every woman feel confident, beautiful, and celebrated.
            </p>
            <div className="flex items-center gap-4 pt-6">
              <div className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold">
                ✓
              </div>
              <span className="text-lg font-semibold text-gray-900">Premium Quality Guaranteed</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Values</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Elegance',
                description: 'Every piece embodies grace, sophistication, and timeless beauty.',
              },
              {
                title: 'Quality',
                description: 'We use only premium materials and expert craftsmanship in every garment.',
              },
              {
                title: 'Empowerment',
                description: 'We believe fashion should empower women to feel confident and beautiful.',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-pink-600 rounded-full flex items-center justify-center text-4xl text-white mx-auto mb-4 font-serif font-bold">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Journey</h2>
          </motion.div>

          <div className="space-y-8">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex gap-8 items-center ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                <div className="flex-1">
                  <div className="text-right">
                    <p className="text-4xl font-serif font-bold text-pink-600">{event.year}</p>
                    <p className="text-lg text-gray-700 font-medium mt-2">{event.event}</p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-pink-600 rounded-full flex-shrink-0"></div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
