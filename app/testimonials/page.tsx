'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const allTestimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Fashion Enthusiast',
    content: 'AWP Shopping has completely transformed my wardrobe. The quality and elegance are unmatched!',
    rating: 5,
    image: '/placeholder.svg?key=woman1',
  },
  {
    id: 2,
    name: 'Ananya Gupta',
    role: 'Business Executive',
    content: 'Every piece I buy from AWP Shopping is a statement of sophistication. Absolutely love their collections!',
    rating: 5,
    image: '/placeholder.svg?key=woman2',
  },
  {
    id: 3,
    name: 'Divya Patel',
    role: 'Lifestyle Blogger',
    content: 'The attention to detail and premium quality is incredible. AWP Shopping sets the standard for luxury fashion.',
    rating: 5,
    image: '/placeholder.svg?key=woman3',
  },
  {
    id: 4,
    name: 'Isha Mehta',
    role: 'Entrepreneur',
    content: 'I recommend AWP Shopping to all my friends. The pieces are timeless and the customer service is exceptional.',
    rating: 5,
    image: '/placeholder.svg?key=woman4',
  },
  {
    id: 5,
    name: 'Neha Singh',
    role: 'Artist',
    content: 'The elegance and craftsmanship in every garment is visible. Worth every penny!',
    rating: 5,
    image: '/placeholder.svg?key=woman5',
  },
  {
    id: 6,
    name: 'Sakshi Desai',
    role: 'Marketing Manager',
    content: 'AWP Shopping has elevated my personal style. Feeling confident in their outfits every single day.',
    rating: 5,
    image: '/placeholder.svg?key=woman6',
  },
]

export default function Testimonials() {
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
            <p className="text-pink-600 text-sm font-medium tracking-widest uppercase mb-4">Customer Stories</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
              Testimonials
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Hear from our beloved customers about their AWP Shopping experience
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-morphism p-8 rounded-2xl hover:shadow-xl transition-shadow"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-pink-600 text-pink-600" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.content}&rdquo;</p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
