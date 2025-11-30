'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Product } from '@/types/product'
import { Loader2, ArrowLeft, ChevronRight } from 'lucide-react'
import ProductGallery from '@/components/product-gallery'
import ProductInfo from '@/components/product-info'
import ProductActions from '@/components/product-actions'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string)
    }
  }, [params.id])

  useEffect(() => {
    if (product) {
      fetchSuggestedProducts(product.id)
    }
  }, [product])

  const fetchProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`)
      const data = await response.json()

      if (data.success) {
        setProduct(data.data)
      } else {
        setError(data.error || 'Product not found')
      }
    } catch (err) {
      setError('Failed to load product')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSuggestedProducts = async (currentId: string) => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      if (data.success) {
        const otherProducts = data.data.filter((p: Product) => p.id !== currentId)
        const shuffled = [...otherProducts].sort(() => 0.5 - Math.random())
        setSuggestedProducts(shuffled.slice(0, 4))
      }
    } catch (err) {
      console.error('Failed to load suggestions:', err)
    }
  }


  if (isLoading) {
    return (
      <main className="overflow-hidden bg-white min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-screen pt-20">
          <Loader2 size={40} className="animate-spin text-pink-600" />
        </div>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="overflow-hidden bg-white min-h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center h-screen pt-20 px-4 text-center">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => router.push('/shop')}
            className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Shop
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="overflow-hidden bg-white min-h-screen">
      <Header />

      {/* Breadcrumb / Back */}
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <button
          onClick={() => router.push('/shop')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-pink-600 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Shop
        </button>
      </div>

      {/* Product Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Gallery */}
            <ProductGallery images={product.images} title={product.title} />

            {/* Info & Actions */}
            <div className="space-y-8">
              <ProductInfo product={product} />
              
              <div id="product-actions" className="border-t border-gray-100 pt-8">
                <ProductActions 
                  product={product} 
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                  onSizeSelect={setSelectedSize}
                  onColorSelect={setSelectedColor}
                />
              </div>

              {/* Additional Details Accordion (Simplified) */}
              <div className="space-y-4 border-t border-gray-100 pt-8">
                <div className="flex justify-between items-center py-2 cursor-pointer group">
                  <span className="font-medium text-gray-900 group-hover:text-pink-600 transition-colors">Shipping & Returns</span>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-pink-600 transition-colors" />
                </div>
                <div className="flex justify-between items-center py-2 cursor-pointer group">
                  <span className="font-medium text-gray-900 group-hover:text-pink-600 transition-colors">Size Guide</span>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-pink-600 transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suggestions */}
      {suggestedProducts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {suggestedProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/shop/${p.id}`}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-1 mb-1">{p.title}</h3>
                    <p className="text-sm font-bold text-pink-600">₹{p.price.toLocaleString('en-IN')}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}


      
      <div>
        <Footer />
      </div>
    </main>
  )
}
