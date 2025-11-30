'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Product } from '@/types/product'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        if (data.success) {
          setProducts(data.data.slice(0, 6))
        }
      } catch (error) {
        console.error('Failed to fetch featured products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (isLoading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-7xl mx-auto flex justify-center">
          <Loader2 size={40} className="animate-spin text-pink-600" />
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-pink-600 text-sm font-medium tracking-widest uppercase mb-4">
            Our Collection
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked luxury pieces that define elegance and sophistication
          </p>
        </motion.div>

        {/* Featured products grid (6 items) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <Link key={p.id} href={`/shop/${p.id}`} className="group block">
              <div className="relative rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow bg-white">
                <div className="w-full h-48 bg-gray-100 overflow-hidden">
                  <img src={p.images?.[0] || '/placeholder.svg'} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">{p.title}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-pink-600 font-semibold">₹{p.price}</p>
                    {/* Original price is not in the Product type currently, so omitting it or checking if it exists */}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/shop" className="flex-1">
          <button className="px-8 py-3 border-2 border-pink-600 text-pink-600 rounded-lg font-medium hover:bg-pink-600 hover:text-white transition-colors">
            View All Products
          </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
