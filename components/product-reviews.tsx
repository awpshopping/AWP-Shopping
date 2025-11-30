'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const reviews = [
  {
    id: 1,
    author: 'Minal K.',
    rating: 5,
    title: 'Absolutely Stunning!',
    content: 'The dress I purchased is even more beautiful in person. Perfect quality!',
  },
  {
    id: 2,
    author: 'Zara P.',
    rating: 5,
    title: 'Highly Recommend',
    content: 'Amazing collection and excellent customer service. Will definitely order again.',
  },
  {
    id: 3,
    author: 'Anjali M.',
    rating: 5,
    title: 'Worth Every Penny',
    content: 'Premium quality garments at reasonable prices. Love the elegance!',
  },
]

export default function ProductReviews() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Customer Reviews</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-lg border border-pink-100"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-pink-600 text-pink-600" />
                ))}
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
              <p className="text-gray-600 text-sm mb-3">{review.content}</p>
              <p className="text-sm font-medium text-gray-500">— {review.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
