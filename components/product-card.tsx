'use client'

import Link from 'next/link'
import { Star, ShoppingBag, Eye } from 'lucide-react'
import { Product } from '@/types/product'
import { useWishlist } from '@/context/wishlist-context'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const inWishlist = isInWishlist(product.id)

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product.id)
    }
  }
  return (
    <Link
      href={`/shop/${product.id}`}
      className="group block bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-pink-100 hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading={priority ? 'eager' : 'lazy'}
        />
        
        {/* Overlay Actions - Desktop */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:flex items-center justify-center gap-3">
          <button 
            className="bg-white text-gray-900 p-3 rounded-full shadow-lg hover:bg-pink-600 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
            onClick={(e) => {
              e.preventDefault()
              // Add to cart logic would go here
            }}
          >
            <ShoppingBag size={20} />
          </button>
          <button 
            className="bg-white text-gray-900 p-3 rounded-full shadow-lg hover:bg-pink-600 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
            onClick={(e) => {
              e.preventDefault()
              // Quick view logic
            }}
          >
            <Eye size={20} />
          </button>
        </div>

        {/* Mobile Quick Add Badge */}
        <button 
          className="absolute bottom-3 right-3 bg-white/90 backdrop-blur shadow-sm p-2 rounded-full text-pink-600 lg:hidden active:scale-95 transition-transform"
          onClick={(e) => {
            e.preventDefault()
            // Add to cart logic
          }}
        >
          <ShoppingBag size={18} />
        </button>

        {/* Heart Button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-3 left-3 bg-white/90 backdrop-blur shadow-sm p-2 rounded-full hover:bg-white transition-all active:scale-95"
        >
          <svg
            className={`w-5 h-5 transition-colors ${
              inWishlist ? 'fill-red-500 text-red-500' : 'fill-none text-gray-700'
            }`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Badges */}
        {product.images.length > 1 && (
          <div className="absolute top-3 right-3 bg-white/80 backdrop-blur px-2 py-1 rounded-full text-[10px] font-medium text-gray-700">
            +{product.images.length - 1}
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-gray-500 font-medium">{product.rating}</span>
        </div>

        {/* Title & Price */}
        <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1 line-clamp-1 group-hover:text-pink-600 transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="text-base sm:text-lg font-bold text-gray-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                <span className="text-[10px] px-2 py-0.5 bg-pink-100 text-pink-600 rounded-full font-medium">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              </>
            )}
          </div>
        </div>

        {/* Sizes - Desktop Only */}
        <div className="hidden sm:flex flex-wrap gap-1 mt-3">
          {product.sizes.slice(0, 3).map((size) => (
            <span
              key={size}
              className="text-[10px] px-1.5 py-0.5 bg-gray-50 text-gray-600 rounded border border-gray-100"
            >
              {size}
            </span>
          ))}
          {product.sizes.length > 3 && (
            <span className="text-[10px] px-1.5 py-0.5 text-gray-400">
              +{product.sizes.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
