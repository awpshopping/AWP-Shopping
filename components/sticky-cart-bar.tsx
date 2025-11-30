'use client'

import { ShoppingBag, MessageCircle } from 'lucide-react'
import { Product } from '@/types/product'
import { useCart } from '@/context/cart-context'
import { toast } from 'sonner'

interface StickyCartBarProps {
  product: Product
  selectedSize: string
  selectedColor: string
  onAddToCart: () => void // This is actually "scroll to options"
}

export default function StickyCartBar({ product, selectedSize, selectedColor, onAddToCart }: StickyCartBarProps) {
  const { addToCart } = useCart()

  const handleAction = (action: 'cart' | 'buy') => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color')
      onAddToCart() // Scroll to options
      return
    }

    if (action === 'cart') {
      addToCart(product, selectedSize, selectedColor)
      toast.success('Added to cart')
    } else {
      // WhatsApp Integration
      const phoneNumber = '918854846782'
      const message = `Hello! 👋\n\nI'm interested in ordering the *${product.title}*.\n\nSize: ${selectedSize}\nColor: ${selectedColor}\nPrice: ₹${product.price}\n\nIs this available?`
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')
    }
  }
  return (
    <div className="fixed bottom-16 left-0 w-full bg-white border-t border-gray-100 p-4 pb-4 z-40 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex gap-3 items-center">
        <div className="flex-1">
          <p className="text-xs text-gray-500 mb-0.5">{product.title}</p>
          <p className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => handleAction('cart')}
            className="p-3 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingBag size={18} />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={() => handleAction('buy')}
            className="px-6 bg-green-500 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-green-200 active:scale-95 transition-transform"
          >
            <MessageCircle size={18} />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  )
}
