'use client'

import { useState } from 'react'
import { ShoppingBag, MessageCircle } from 'lucide-react'
import { Product } from '@/types/product'
import { useCart } from '@/context/cart-context'
import { useWishlist } from '@/context/wishlist-context'
import { toast } from 'sonner'

interface ProductActionsProps {
  product: Product
  selectedSize: string
  selectedColor: string
  onSizeSelect: (size: string) => void
  onColorSelect: (color: string) => void
}

export default function ProductActions({ 
  product, 
  selectedSize, 
  selectedColor, 
  onSizeSelect, 
  onColorSelect 
}: ProductActionsProps) {
  const { addToCart } = useCart()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const [showError, setShowError] = useState(false)
  const inWishlist = isInWishlist(product.id)

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(product.id)
      toast.success('Added to wishlist')
    }
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      setShowError(true)
      toast.error('Please select size and color', {
        style: {
          background: '#ef4444',
          color: '#fff',
        },
      })
      setTimeout(() => setShowError(false), 2000)
      return
    }
    setShowError(false)
    addToCart(product, selectedSize, selectedColor)
    toast.success('Added to cart')
  }

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      setShowError(true)
      toast.error('Please select size and color', {
        style: {
          background: '#ef4444',
          color: '#fff',
        },
      })
      setTimeout(() => setShowError(false), 2000)
      return
    }
    setShowError(false)
    
    // WhatsApp Integration
    const phoneNumber = '918854846782'
    const message = `Hello! 👋\n\nI'm interested in ordering the *${product.title}*.\n\nSize: ${selectedSize}\nColor: ${selectedColor}\nPrice: ₹${product.price}\n\nIs this available?`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="space-y-6">
      {/* Sizes */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-gray-900">Select Size</h3>
          <button className="text-xs text-pink-600 underline">Size Guide</button>
        </div>
        <div className="flex flex-wrap gap-3">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => onSizeSelect(size)}
              className={`min-w-[3rem] h-10 px-3 rounded-lg text-sm font-medium transition-all border ${
                selectedSize === size
                  ? 'bg-gray-900 text-white border-gray-900'
                  : showError && !selectedSize
                  ? 'bg-white text-gray-700 border-red-500 border-2'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Select Color</h3>
        <div className="flex flex-wrap gap-3">
          {product.colours.map((color) => (
            <button
              key={color}
              onClick={() => onColorSelect(color)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                selectedColor === color
                  ? 'bg-pink-50 text-pink-700 border-pink-200 ring-1 ring-pink-200'
                  : showError && !selectedColor
                  ? 'bg-white text-gray-700 border-red-500 border-2'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Actions (Visible on all screens) */}
      <div className="flex flex-col gap-3 pt-4">
        <div className="flex gap-4">
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${
              selectedSize && selectedColor
                ? 'bg-pink-600 text-white hover:bg-pink-700 hover:shadow-pink-200 hover:-translate-y-0.5'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            <ShoppingBag size={20} />
            Add to Cart
          </button>
          <button 
            onClick={toggleWishlist}
            className="p-4 rounded-xl border border-gray-200 hover:border-pink-200 hover:bg-pink-50 transition-colors"
          >
            <svg
              className={`w-6 h-6 transition-colors ${
                inWishlist ? 'fill-red-500 text-red-500' : 'fill-none text-gray-600'
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
        </div>
        
        <button
          onClick={handleBuyNow}
          className={`w-full py-3 rounded-xl font-medium border-2 flex items-center justify-center gap-2 transition-all ${
            selectedSize && selectedColor
              ? 'border-green-500 text-green-600 hover:bg-green-50'
              : 'border-gray-200 text-gray-400'
          }`}
        >
          <MessageCircle size={20} />
          Buy on WhatsApp
        </button>
      </div>
    </div>
  )
}
