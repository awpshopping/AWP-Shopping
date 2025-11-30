'use client'

import { Star } from 'lucide-react'
import { Product } from '@/types/product'

interface ProductInfoProps {
  product: Product
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="space-y-4">
      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < Math.floor(product.rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-200'
              }
            />
          ))}
        </div>
        <span className="text-sm text-gray-500 font-medium">
          {product.rating} ({product.reviewCount || 42} reviews)
        </span>
      </div>

      {/* Title & Price */}
      <div>
        <h1 className="text-2xl md:text-4xl font-serif font-bold text-gray-900 leading-tight mb-2">
          {product.title}
        </h1>
        <div className="flex items-baseline gap-3">
          <span className="text-2xl md:text-3xl font-bold text-pink-600">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {/* Original price */}
          {product.originalPrice && (
            <>
              <span className="text-lg text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="prose prose-sm text-gray-600 leading-relaxed">
        <p>{product.description}</p>
      </div>
    </div>
  )
}
