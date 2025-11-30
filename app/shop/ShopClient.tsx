"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Product } from '@/types/product'
import { Loader2 } from 'lucide-react'
import ProductCard from '@/components/product-card'
import SearchBar from '@/components/search-bar'
import SortDropdown, { SortOption } from '@/components/sort-dropdown'

export default function ShopClient() {
  const searchParams = useSearchParams()
  const typeFilter = searchParams.get('type')
  const priceRangeFilter = searchParams.get('priceRange')
  
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeType, setActiveType] = useState<string | null>(typeFilter)
  const [activePriceRange, setActivePriceRange] = useState<string | null>(priceRangeFilter)
  const [sortOption, setSortOption] = useState<SortOption>('newest')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (typeFilter) {
      setActiveType(typeFilter)
    }
    if (priceRangeFilter) {
      setActivePriceRange(priceRangeFilter)
    }
  }, [typeFilter, priceRangeFilter])

  useEffect(() => {
    let result = [...products]

    // Apply Type Filter
    if (activeType) {
      result = result.filter(p => p.type === activeType)
    }

    // Apply Search Filter
    if (searchQuery) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply Price Range Filter
    if (activePriceRange) {
      switch (activePriceRange) {
        case 'budget':
          result = result.filter(p => p.price >= 0 && p.price <= 500)
          break
        case 'mid':
          result = result.filter(p => p.price >= 501 && p.price <= 1000)
          break
        case 'premium':
          result = result.filter(p => p.price >= 1001)
          break
      }
    }

    // Apply Sorting
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
      default:
        // Sort by createdAt date, falling back to ID string comparison
        result.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          }
          return b.id.localeCompare(a.id)
        })
        break
    }

    setFilteredProducts(result)
  }, [products, activeType, activePriceRange, sortOption, searchQuery])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()

      if (data.success) {
        setProducts(data.data)
      } else {
        setError('Failed to load products')
      }
    } catch (err) {
      setError('Failed to load products')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (type: string | null) => {
    setActiveType(type)
    // Update URL without reloading
    const url = new URL(window.location.href)
    if (type) {
      url.searchParams.set('type', type)
    } else {
      url.searchParams.delete('type')
    }
    window.history.pushState({}, '', url)
  }



  return (
    <main className="overflow-hidden min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50/50 to-white text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-pink-600 text-xs sm:text-sm font-medium tracking-widest uppercase mb-3">
            {activePriceRange && activeType
              ? `${activeType} Collection`
              : activePriceRange 
              ? activePriceRange === 'budget' 
                ? '₹0 - ₹500' 
                : activePriceRange === 'mid' 
                ? '₹501 - ₹1,000' 
                : '₹1,001+'
              : activeType 
              ? `${activeType} Collection` 
              : 'Shop All'}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
            {activePriceRange && activeType
              ? `${activePriceRange === 'budget' ? 'Budget' : activePriceRange === 'mid' ? 'Mid Range' : 'Premium'} ${activeType.charAt(0).toUpperCase() + activeType.slice(1)}s`
              : activePriceRange
              ? activePriceRange === 'budget'
                ? 'Budget Friendly'
                : activePriceRange === 'mid'
                ? 'Mid Range'
                : 'Premium Collection'
              : activeType 
              ? `${activeType.charAt(0).toUpperCase() + activeType.slice(1)}s` 
              : 'New Arrivals'}
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto">
            {activePriceRange && activeType
              ? `Explore our ${activePriceRange === 'budget' ? 'budget-friendly' : activePriceRange === 'mid' ? 'mid-range' : 'premium'} collection of ${activeType}s.`
              : activePriceRange
              ? 'Quality fashion within your budget'
              : activeType 
              ? `Explore our exclusive collection of ${activeType}s, designed for elegance.` 
              : 'Discover our latest collection of premium fashion essentials.'}
          </p>
        </div>
      </section>

      {/* Toolbar (Search & Sort) */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-y border-gray-100 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-inline sm:flex-row items-stretch sm:items-center gap-3">     
            {/* Search Bar */}
            <div className="flex-1">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search products..."
              />
            </div>
            
            {/* Sort */}
            <div className="flex items-center gap-3">
              <SortDropdown 
                currentSort={sortOption} 
                onSortChange={setSortOption} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 size={40} className="animate-spin text-pink-600" />
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-32">
              {error}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center text-gray-600 py-32">
              <p className="text-xl mb-4">No products found.</p>
              <button
                onClick={() => {
                  handleFilterChange(null)
                  setActivePriceRange(null)
                  setSearchQuery('')
                }}
                className="text-pink-600 hover:text-pink-700 font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
