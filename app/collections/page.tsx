'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { motion } from 'framer-motion'
import { Product } from '@/types/product'
import { Loader2, ArrowRight } from 'lucide-react'

interface TypeCollection {
  type: string
  count: number
  image: string
}

interface PriceRangeSection {
  id: string
  name: string
  description: string
  minPrice: number
  maxPrice: number | null
  priceLabel: string
  types: TypeCollection[]
}



export default function Collections() {
  const [sections, setSections] = useState<PriceRangeSection[]>([])
  const [topTypes, setTopTypes] = useState<TypeCollection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollections()
  }, [])

  const fetchCollections = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()

      if (data.success && data.data) {
        const products: Product[] = data.data

        // Define price ranges
        const priceRanges = [
          {
            id: 'budget',
            name: 'Budget Friendly',
            description: 'Affordable fashion for everyday wear',
            minPrice: 0,
            maxPrice: 500,
            priceLabel: '₹0 - ₹500',
          },
          {
            id: 'mid',
            name: 'Mid Range',
            description: 'Quality pieces at great value',
            minPrice: 501,
            maxPrice: 1000,
            priceLabel: '₹501 - ₹1,000',
          },
          {
            id: 'premium',
            name: 'Premium Collection',
            description: 'Luxury fashion for special occasions',
            minPrice: 1001,
            maxPrice: null,
            priceLabel: '₹1,001+',
          },
        ]

        // Organize products by price range and type
        const sectionsWithTypes: PriceRangeSection[] = priceRanges.map((range) => {
          // Filter products in this price range
          const productsInRange = products.filter((product) => {
            if (range.maxPrice === null) {
              return product.price >= range.minPrice
            }
            return product.price >= range.minPrice && product.price <= range.maxPrice
          })

          // Group by type
          const typeMap = new Map<string, Product[]>()
          productsInRange.forEach((product) => {
            if (!typeMap.has(product.type)) {
              typeMap.set(product.type, [])
            }
            typeMap.get(product.type)!.push(product)
          })

          // Create type collections
          const types: TypeCollection[] = Array.from(typeMap.entries())
            .map(([type, typeProducts]) => ({
              type,
              count: typeProducts.length,
              image: typeProducts[0]?.images[0] || '/placeholder.svg',
            }))
            .sort((a, b) => a.type.localeCompare(b.type))

          return {
            ...range,
            types,
          }
        })

        setSections(sectionsWithTypes)

        // Also compute overall top types (across all prices) and take top 3
        const overallTypeMap = new Map<string, Product[]>()
        products.forEach((product) => {
          if (!overallTypeMap.has(product.type)) {
            overallTypeMap.set(product.type, [])
          }
          overallTypeMap.get(product.type)!.push(product)
        })

        const overallTypes: TypeCollection[] = Array.from(overallTypeMap.entries())
          .map(([type, typeProducts]) => ({
            type,
            count: typeProducts.length,
            image: typeProducts[0]?.images[0] || '/placeholder.svg',
          }))
          .sort((a, b) => b.count - a.count)

        setTopTypes(overallTypes.slice(0, 3))
      } else {
        setError('Failed to load collections')
      }
    } catch (err) {
      setError('Failed to load collections')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <main className="overflow-hidden bg-white min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-40 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-pink-600 text-sm font-medium tracking-widest uppercase mb-4">Explore Our Collections</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
              Shop by Price & Style
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover curated collections organized by price range and product type. Find the perfect pieces that match your style and budget.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Combined Collections Grid (3 Types + 3 Price Ranges) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={40} className="animate-spin text-pink-600" />
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-20">{error}</div>
          ) : (
            (() => {
              const typeTiles = topTypes.slice(0, 3).map((t) => ({
                id: `type-${t.type}`,
                title: `${capitalizeFirst(t.type)}s`,
                subtitle: `${t.count} ${t.count === 1 ? 'Product' : 'Products'}`,
                image: t.image,
                href: `/shop?type=${t.type}`,
              }))

              const priceTiles = sections.slice(0, 3).map((s) => ({
                id: `price-${s.id}`,
                title: s.name,
                subtitle: s.priceLabel,
                image: s.types[0]?.image || '/placeholder.svg',
                href: `/shop?priceRange=${s.id}`,
              }))

              const tiles = [...typeTiles, ...priceTiles].slice(0, 6)

              return (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Collections</h2>
                  </div>
                  <p className="text-gray-600 mb-6">Explore curated collections by type and price.</p>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                    {tiles.map((tile, idx) => (
                      <motion.div
                        key={tile.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8 }}
                      >
                        <Link href={tile.href} className="group block cursor-pointer">
                          <div className="relative h-72 rounded-xl overflow-hidden shadow-md border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                            <img src={tile.image} alt={tile.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-5">
                              <div className="w-full">
                                <h3 className="text-xl font-serif font-bold text-white mb-1">{tile.title}</h3>
                                <div className="flex items-center justify-between">
                                  <p className="text-pink-300 text-sm font-medium">{tile.subtitle}</p>
                                  <ArrowRight size={18} className="text-pink-300 group-hover:translate-x-1 transition-transform" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
            })()
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
