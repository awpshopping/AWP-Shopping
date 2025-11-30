'use client'

import { useState } from 'react'
import { X, Filter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Product } from '@/types/product'

interface FilterDrawerProps {
  products: Product[]
  activeType: string | null
  activePriceRange: string | null
  onTypeChange: (type: string | null) => void
  onPriceRangeChange: (range: string | null) => void
}

export default function FilterDrawer({ 
  products, 
  activeType, 
  activePriceRange,
  onTypeChange, 
  onPriceRangeChange 
}: FilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Extract unique types/categories
  const types = Array.from(new Set(products.map(p => p.type))).sort()

  const priceRanges = [
    { id: 'budget', label: 'Budget Friendly', range: '₹0 - ₹500' },
    { id: 'mid', label: 'Mid Range', range: '₹501 - ₹1,000' },
    { id: 'premium', label: 'Premium', range: '₹1,001+' }
  ]

  const handleTypeSelect = (type: string | null) => {
    onTypeChange(type)
  }

  const handlePriceRangeSelect = (range: string | null) => {
    onPriceRangeChange(range)
  }

  const handleClearAll = () => {
    onTypeChange(null)
    onPriceRangeChange(null)
    setIsOpen(false)
  }

  const hasActiveFilters = activeType !== null || activePriceRange !== null

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-pink-200 hover:text-pink-600 transition-colors"
      >
        <Filter size={16} />
        Filters
        {hasActiveFilters && (
          <span className="ml-1 w-2 h-2 rounded-full bg-pink-600" />
        )}
      </button>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="text-lg font-serif font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-6">
                  {/* Price Range */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">Price Range</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => handlePriceRangeSelect(null)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          activePriceRange === null
                            ? 'bg-pink-50 text-pink-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        All Prices
                      </button>
                      {priceRanges.map((range) => (
                        <button
                          key={range.id}
                          onClick={() => handlePriceRangeSelect(range.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            activePriceRange === range.id
                              ? 'bg-pink-50 text-pink-700 font-medium'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{range.label}</span>
                            <span className="text-xs text-gray-500">{range.range}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">Category</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleTypeSelect(null)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeType === null
                            ? 'bg-pink-50 text-pink-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        All Categories
                      </button>
                      {types.map((type) => (
                        <button
                          key={type}
                          onClick={() => handleTypeSelect(type)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            activeType === type
                              ? 'bg-pink-50 text-pink-700 font-medium'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-2">
                {hasActiveFilters && (
                  <button
                    onClick={handleClearAll}
                    className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                  >
                    Clear All Filters
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 transition-colors"
                >
                  Show Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
