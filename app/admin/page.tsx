'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/footer'
import { Loader2, Package, Plus, ShoppingBag, Settings } from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthChecking, setIsAuthChecking] = useState(true)
  const [stats, setStats] = useState({
    totalProducts: 0,
    isLoading: true,
  })

  // Check authentication on mount
  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me', {
        credentials: 'include',
      })
      const data = await res.json()

      if (!data.success) {
        router.push('/admin/login')
      } else {
        setIsAuthenticated(true)
        setIsAuthChecking(false)
        // Fetch stats after authentication
        fetchStats()
      }
    } catch (error) {
      console.error('Auth check error:', error)
      router.push('/admin/login')
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const result = await response.json()
        let productsArray: unknown[] = []

        if (result && typeof result === 'object') {
          if (Array.isArray(result.data)) {
            productsArray = result.data
          } else if (Array.isArray(result)) {
            productsArray = result
          }
        }

        setStats({
          totalProducts: productsArray.length,
          isLoading: false,
        })
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
      setStats({ totalProducts: 0, isLoading: false })
    }
  }

  // Show loading while checking authentication
  if (isAuthChecking || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 size={40} className="animate-spin text-pink-600" />
      </div>
    )
  }

  return (
    <main>
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <p className="text-pink-600 text-sm font-medium tracking-widest uppercase mb-4">
              Welcome Back
            </p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Manage your store, products, and inventory from one central location
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Total Products</p>
                  {stats.isLoading ? (
                    <Loader2 size={20} className="animate-spin text-pink-600 mt-2" />
                  ) : (
                    <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
                  )}
                </div>
                <div className="bg-pink-100 p-3 rounded-lg">
                  <Package className="text-pink-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Quick Actions</p>
                  <p className="text-3xl font-bold text-gray-900">2</p>
                </div>
                <div className="bg-pink-100 p-3 rounded-lg">
                  <Settings className="text-pink-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Store Status</p>
                  <p className="text-3xl font-bold text-green-600">Active</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <ShoppingBag className="text-green-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Manage Products Card */}
            <Link
              href="/admin/products"
              className="group bg-white rounded-2xl shadow-xl border border-pink-100 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="bg-pink-100 p-4 rounded-xl group-hover:bg-pink-200 transition-colors">
                  <Package className="text-pink-600" size={32} />
                </div>
                <div className="text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                Manage Products
              </h3>
              <p className="text-gray-600 mb-4">
                View, edit, and manage all your products in one place. Update details, images, and inventory.
              </p>
              <div className="flex items-center text-pink-600 font-medium group-hover:text-pink-700">
                <span>Go to Products</span>
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>

            {/* Add Product Card */}
            <Link
              href="/admin/add-product"
              className="group bg-white rounded-2xl shadow-xl border border-pink-100 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="bg-pink-100 p-4 rounded-xl group-hover:bg-pink-200 transition-colors">
                  <Plus className="text-pink-600" size={32} />
                </div>
                <div className="text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                Add New Product
              </h3>
              <p className="text-gray-600 mb-4">
                Create and add new products to your store. Upload images, set prices, and configure details.
              </p>
              <div className="flex items-center text-pink-600 font-medium group-hover:text-pink-700">
                <span>Add Product</span>
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          </div>

          {/* Quick Links Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Quick Links</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/admin/products"
                className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-pink-300 hover:bg-pink-50 transition-all group"
              >
                <div className="bg-pink-100 p-2 rounded-lg group-hover:bg-pink-200 transition-colors">
                  <Package className="text-pink-600" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-pink-600">All Products</p>
                  <p className="text-sm text-gray-500">View all products</p>
                </div>
              </Link>

              <Link
                href="/admin/add-product"
                className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-pink-300 hover:bg-pink-50 transition-all group"
              >
                <div className="bg-pink-100 p-2 rounded-lg group-hover:bg-pink-200 transition-colors">
                  <Plus className="text-pink-600" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-pink-600">New Product</p>
                  <p className="text-sm text-gray-500">Add a new product</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

