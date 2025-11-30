'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { WishlistContextType } from '@/types/wishlist'

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load wishlist from local storage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist)
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(parsedWishlist)
      } catch (e) {
        console.error('Failed to parse wishlist from local storage', e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save wishlist to local storage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('wishlist', JSON.stringify(items))
    }
  }, [items, isLoaded])

  const addToWishlist = (productId: string) => {
    setItems((prevItems) => {
      if (prevItems.includes(productId)) {
        return prevItems
      }
      return [...prevItems, productId]
    })
  }

  const removeFromWishlist = (productId: string) => {
    setItems((prevItems) => prevItems.filter((id) => id !== productId))
  }

  const isInWishlist = (productId: string) => {
    return items.includes(productId)
  }

  const [isWishlistOpen, setIsWishlistOpen] = useState(false)

  const wishlistCount = items.length

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount,
        isWishlistOpen,
        setIsWishlistOpen,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
