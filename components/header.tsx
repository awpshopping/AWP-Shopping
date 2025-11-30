'use client'

import { Heart, ShoppingBag, House, Layers, User, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { useWishlist } from '@/context/wishlist-context'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useCart } from '@/context/cart-context'
import CartDrawer from '@/components/cart-drawer'
import WishlistDrawer from '@/components/wishlist-drawer'

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Collections', href: '/collections' },
  { label: 'Shop', href: '/shop' },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

// Bottom nav items for mobile/tablet
const bottomNavItems = [
  { label: 'Home', href: '/', icon: House },
  { label: 'Collections', href: '/collections', icon: Layers },
  { label: 'Shop', href: '/shop', icon: ShoppingBag },
  { label: 'About', href: '/about', icon: User },
  { label: 'Contact', href: '/contact', icon: MessageCircle },
]

export default function Header() {
  const pathname = usePathname()
  const { setIsCartOpen, cartCount } = useCart()
  const { wishlistCount, setIsWishlistOpen } = useWishlist()

  return (
    <>
      <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-pink-100">
        <nav className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-pink-600 font-serif"
            >
              AWP Shopping
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 hover:bg-pink-50 rounded-lg transition-colors"
            >
              <Heart size={20} className="text-gray-700" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-pink-50 rounded-lg transition-colors relative"
            >
              <ShoppingBag size={20} className="text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </nav>
      </header>

      {/* Bottom Navigation for Mobile/Tablet */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-pink-100 lg:hidden z-50 pb-safe">
        <div className="flex justify-around items-center h-16">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? 'text-pink-600' : 'text-gray-500 hover:text-pink-500'
                  }`}
              >
                <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>

      <CartDrawer />
      <WishlistDrawer />
    </>
  )
}
