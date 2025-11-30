'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react'
import { useWishlist } from '@/context/wishlist-context'
import { useCart } from '@/context/cart-context'
import { useEffect, useState } from 'react'
import { Product } from '@/types/product'
import Link from 'next/link'

export default function WishlistDrawer() {
  const { items: wishlistIds, isWishlistOpen, setIsWishlistOpen, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  // Prevent body scroll when wishlist is open
  useEffect(() => {
    if (isWishlistOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isWishlistOpen])

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      if (wishlistIds.length === 0) {
        setProducts([])
        return
      }
      
      setLoading(true)
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        if (data.success) {
          const allProducts: Product[] = data.data
          const wishlistProducts = allProducts.filter(p => wishlistIds.includes(p.id))
          setProducts(wishlistProducts)
        }
      } catch (error) {
        console.error('Failed to fetch products', error)
      } finally {
        setLoading(false)
      }
    }

    if (isWishlistOpen) {
      fetchProducts()
    }
  }, [isWishlistOpen, wishlistIds])

  const handleAddToCart = (product: Product) => {
    addToCart(product, 'M', 'Default') // Default size/color for now, or open product modal
    // Optional: removeFromWishlist(product.id)
  }

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-[90%] max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
                <Heart className="text-pink-600" />
                Wishlist ({wishlistIds.length})
              </h2>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Wishlist Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
                </div>
              ) : products.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center">
                    <Heart size={32} className="text-pink-300" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">Your wishlist is empty</p>
                    <p className="text-gray-500">Save items you love to view them here.</p>
                  </div>
                  <button
                    onClick={() => setIsWishlistOpen(false)}
                    className="px-6 py-2 bg-pink-600 text-white rounded-full font-medium hover:bg-pink-700 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                products.map((product) => (
                  <div key={product.id} className="flex gap-4">
                    {/* Image */}
                    <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <Link 
                            href={`/shop/${product.id}`}
                            onClick={() => setIsWishlistOpen(false)}
                            className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-pink-600"
                          >
                            {product.title}
                          </Link>
                          <button
                            onClick={() => removeFromWishlist(product.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="font-bold text-gray-900 mt-1">
                          ₹{product.price.toLocaleString('en-IN')}
                        </p>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center justify-center gap-2 w-full py-2 bg-gray-900 text-white text-xs rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <ShoppingBag size={14} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
