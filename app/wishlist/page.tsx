'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { useWishlist } from '@/context/wishlist-context'
import { Product } from '@/types/product'
import { Trash2, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (items.length === 0) {
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        
        if (data.success) {
          const wishlistProducts = data.data.filter((product: Product) =>
            items.includes(product.id)
          )
          setProducts(wishlistProducts)
        }
      } catch (error) {
        console.error('Failed to fetch wishlist products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWishlistProducts()
  }, [items])

  return (
    <main className="overflow-hidden bg-white min-h-screen">
      <Header />
      
      <div className="pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
              My Wishlist
            </h1>
            <p className="text-gray-500">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-4">
                <Heart size={40} className="text-pink-300" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-gray-500 mb-6">
                Start adding products you love to your wishlist
              </p>
              <Link
                href="/shop"
                className="px-6 py-3 bg-pink-600 text-white rounded-xl font-medium hover:bg-pink-700 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-pink-100 hover:shadow-lg transition-all duration-300"
                >
                  <Link href={`/shop/${product.id}`} className="block">
                    <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>

                  <div className="p-4">
                    <Link href={`/shop/${product.id}`}>
                      <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1 line-clamp-1 group-hover:text-pink-600 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </Link>

                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
