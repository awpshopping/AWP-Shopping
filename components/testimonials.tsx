'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Fashion Enthusiast',
    content: 'AWP Shopping has completely transformed my wardrobe. The quality and elegance are unmatched!',
    rating: 5,
    image: '/placeholder-user.jpg',
  },
  {
    id: 2,
    name: 'Ananya Gupta',
    role: 'Business Executive',
    content: 'Every piece I buy from AWP Shopping is a statement of sophistication. Absolutely love their collections!',
    rating: 5,
    image: '/placeholder-user.jpg',
  },
  {
    id: 3,
    name: 'Divya Patel',
    role: 'Lifestyle Blogger',
    content: 'The attention to detail and premium quality is incredible. AWP Shopping sets the standard for luxury fashion.',
    rating: 5,
    image: '/placeholder-user.jpg',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-pink-600 text-sm font-medium tracking-widest uppercase mb-4">
            Customer Love
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-morphism p-8 rounded-2xl"
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
  )
}
