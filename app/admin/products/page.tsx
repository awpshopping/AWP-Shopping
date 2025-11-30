'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Footer from '@/components/footer'
import { Product } from '@/types/product'
import { Loader2, Edit, Plus, X, Upload, Star } from 'lucide-react'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Ensure products is always an array (defensive programming)
  const safeProducts = useMemo(() => {
    if (Array.isArray(products)) {
      return products
    }
    console.warn('Products is not an array, defaulting to empty array:', products)
    return []
  }, [products])

  // Edit modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState('')
  const [saveError, setSaveError] = useState('')

  // Form state
  const [formData, setFormData] = useState<{
    title: string
    description: string
    price: number
    rating: number
    type: string
    sizes: string[]
    colours: string[]
    existingImages: string[]
    newImages: File[]
  }>({
    title: '',
    description: '',
    price: 0,
    rating: 5,
    type: '',
    sizes: [],
    colours: [],
    existingImages: [],
    newImages: [],
  })
  const [availableTypes] = useState<string[]>(['frock', 'lehenga', 'kurti'])
  const [showTypeSuggestions, setShowTypeSuggestions] = useState(false)

  // Additional form state
  const [sizeInput, setSizeInput] = useState('')
  const [colourInput, setColourInput] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([])

  // Fetch products on mount
  useEffect(() => {
    fetchProducts()
  }, [])

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const result = await response.json()
        // API returns { success: true, data: products }
        let productsArray: Product[] = []

        if (result && typeof result === 'object') {
          if (Array.isArray(result.data)) {
            productsArray = result.data
          } else if (Array.isArray(result)) {
            productsArray = result
          } else if (result.data && Array.isArray(result.data)) {
            productsArray = result.data
          }
        }

        // Ensure we always set an array
        setProducts(productsArray)
      } else {
        console.warn('Failed to fetch products:', response.status)
        setProducts([])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }

  // Open edit modal
  const openEditModal = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      rating: product.rating,
      type: product.type,
      sizes: [...product.sizes],
      colours: [...product.colours],
      existingImages: [...product.images],
      newImages: [],
    })
    setNewImagePreviews([])
    setSizeInput('')
    setColourInput('')
    setSaveError('')
    setSaveSuccess('')
    setIsEditModalOpen(true)
  }

  // Close edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setEditingProduct(null)
    setFormData({
      title: '',
      description: '',
      price: 0,
      rating: 5,
      type: '',
      sizes: [],
      colours: [],
      existingImages: [],
      newImages: [],
    })
    setNewImagePreviews([])
    setSizeInput('')
    setColourInput('')
    setSaveError('')
    setSaveSuccess('')
  }

  // Size management
  const addSize = () => {
    if (sizeInput.trim() && !formData.sizes.includes(sizeInput.trim())) {
      setFormData({ ...formData, sizes: [...formData.sizes, sizeInput.trim()] })
      setSizeInput('')
    }
  }

  const removeSize = (size: string) => {
    setFormData({ ...formData, sizes: formData.sizes.filter(s => s !== size) })
  }

  // Colour management
  const addColour = () => {
    if (colourInput.trim() && !formData.colours.includes(colourInput.trim())) {
      setFormData({ ...formData, colours: [...formData.colours, colourInput.trim()] })
      setColourInput('')
    }
  }

  const removeColour = (colour: string) => {
    setFormData({ ...formData, colours: formData.colours.filter(c => c !== colour) })
  }

  // Image management
  const removeExistingImage = (index: number) => {
    const newImages = formData.existingImages.filter((_, i) => i !== index)
    setFormData({ ...formData, existingImages: newImages })
  }

  const removeNewImage = (index: number) => {
    const newPreviews = newImagePreviews.filter((_, i) => i !== index)
    const newImages = formData.newImages.filter((_, i) => i !== index)
    setNewImagePreviews(newPreviews)
    setFormData({ ...formData, newImages })
  }

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  // Image file handling
  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    if (imageFiles.length === 0) return

    const newFiles: File[] = []
    const newPreviews: string[] = []
    let loadedCount = 0

    imageFiles.forEach(file => {
      newFiles.push(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          newPreviews.push(e.target.result as string)
          loadedCount++
          if (loadedCount === imageFiles.length) {
            setNewImagePreviews(prev => [...prev, ...newPreviews])
            setFormData(prev => ({ ...prev, newImages: [...prev.newImages, ...newFiles] }))
          }
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
  }

  // Paste handler
  const handlePaste = (e: React.ClipboardEvent) => {
    const items = Array.from(e.clipboardData.items)
    const imageFiles = items
      .filter(item => item.type.startsWith('image/'))
      .map(item => item.getAsFile())
      .filter((file): file is File => file !== null)

    if (imageFiles.length > 0) {
      handleFiles(imageFiles)
    }
  }

  // Save handler
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveError('')
    setSaveSuccess('')

    try {
      if (!editingProduct) return

      const formDataToSend = new FormData()
      formDataToSend.append('id', editingProduct.id)
      formDataToSend.append('title', formData.title)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('price', formData.price.toString())
      formDataToSend.append('rating', formData.rating.toString())
      formDataToSend.append('type', formData.type)
      formDataToSend.append('sizes', JSON.stringify(formData.sizes))
      formDataToSend.append('colours', JSON.stringify(formData.colours))
      formDataToSend.append('existingImages', JSON.stringify(formData.existingImages))

      formData.newImages.forEach((file) => {
        formDataToSend.append('images', file)
      })

      const response = await fetch('/api/admin/products', {
        method: 'PUT',
        body: formDataToSend,
      })

      if (response.ok) {
        setSaveSuccess('Product updated successfully!')
        const result = await response.json()
        // API returns { success: true, data: product }
        const updatedProduct = result.data || result
        const currentProducts = Array.isArray(products) ? products : []
        setProducts(currentProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p))
        setTimeout(() => {
          closeEditModal()
        }, 1500)
      } else {
        const error = await response.json()
        setSaveError(error.error || error.message || 'Failed to update product')
      }
    } catch (error) {
      setSaveError('An error occurred while updating the product')
      console.error('Error updating product:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main>
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-pink-600 text-sm font-medium tracking-widest uppercase mb-4">
                Admin Panel
              </p>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
                Manage Products
              </h1>
              <p className="text-gray-600 text-lg">
                View and edit all products
              </p>
            </div>
            <Link
              href="/admin/add-product"
              className="flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              <Plus size={20} />
              Add New Product
            </Link>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={40} className="animate-spin text-pink-600" />
            </div>
          ) : safeProducts.length === 0 ? (
            <div className="text-center text-gray-600 py-20">
              <p className="text-xl mb-4">No products found.</p>
              <Link
                href="/admin/add-product"
                className="text-pink-600 hover:text-pink-700 underline"
              >
                Add your first product
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-pink-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-pink-50 border-b border-pink-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Image</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rating</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sizes</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Colours</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Images</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {safeProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{product.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-lg font-semibold text-green-600">
                            ₹{product.price.toLocaleString('en-IN')}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <Star size={16} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-900">{product.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {product.sizes.slice(0, 2).map((size) => (
                              <span key={size} className="text-xs px-2 py-1 bg-pink-50 text-pink-700 rounded">
                                {size}
                              </span>
                            ))}
                            {product.sizes.length > 2 && (
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                                +{product.sizes.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {product.colours.slice(0, 2).map((colour) => (
                              <span key={colour} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                {colour}
                              </span>
                            ))}
                            {product.colours.length > 2 && (
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                                +{product.colours.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-900">{product.images.length}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => openEditModal(product)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit product"
                            >
                              <Edit size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Edit Modal */}
      {isEditModalOpen && editingProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
              <h2 className="text-3xl font-serif font-bold text-gray-900">
                Edit Product
              </h2>
              <button
                onClick={closeEditModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Title *
                </label>
                <input
                  type="text"
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="edit-price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  id="edit-price"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Rating */}
              <div>
                <label htmlFor="edit-rating" className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (0-5) *
                </label>
                <input
                  type="number"
                  id="edit-rating"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Product Type */}
              <div>
                <label htmlFor="edit-type" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Type *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="edit-type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value.toLowerCase() })}
                    onFocus={() => setShowTypeSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowTypeSuggestions(false), 200)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="e.g., frock, lehenga, kurti"
                    required
                  />
                  {showTypeSuggestions && availableTypes.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                      {availableTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, type })
                            setShowTypeSuggestions(false)
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-pink-50 transition-colors"
                        >
                          <span className="capitalize">{type}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Existing types: {availableTypes.map(t => <span key={t} className="inline-block px-2 py-1 bg-pink-50 text-pink-700 rounded mr-1 capitalize">{t}</span>)}
                </p>
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sizes *
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={sizeInput}
                    onChange={(e) => setSizeInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSize())}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="e.g., S, M, L, XL"
                  />
                  <button
                    type="button"
                    onClick={addSize}
                    className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2"
                  >
                    <Plus size={20} />
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.sizes.map((size) => (
                    <span
                      key={size}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-lg"
                    >
                      {size}
                      <button
                        type="button"
                        onClick={() => removeSize(size)}
                        className="hover:text-pink-900"
                      >
                        <X size={16} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Colours */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Colours *
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={colourInput}
                    onChange={(e) => setColourInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addColour())}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="e.g., Pink, Blue, Black"
                  />
                  <button
                    type="button"
                    onClick={addColour}
                    className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2"
                  >
                    <Plus size={20} />
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.colours.map((colour) => (
                    <span
                      key={colour}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-lg"
                    >
                      {colour}
                      <button
                        type="button"
                        onClick={() => removeColour(colour)}
                        className="hover:text-pink-900"
                      >
                        <X size={16} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Existing Images */}
              {formData.existingImages.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Images
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {formData.existingImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Current ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Images */}
              <div onPaste={handlePaste}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add New Images
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${isDragging
                    ? 'border-pink-500 bg-pink-50 scale-105'
                    : 'border-gray-300 hover:border-pink-500'
                    }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="edit-images"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="edit-images"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload size={40} className={isDragging ? "text-pink-500" : "text-gray-400"} />
                    <span className={`font-medium ${isDragging ? "text-pink-600" : "text-gray-600"}`}>
                      {isDragging ? 'Drop images here' : 'Click to upload, drag & drop, or paste images'}
                    </span>
                    <span className="text-xs text-gray-400 mt-2">
                      💡 Tip: You can also paste images from clipboard (Ctrl+V)
                    </span>
                  </label>
                </div>

                {newImagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                    {newImagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`New ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Messages */}
              {saveError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {saveError}
                </div>
              )}

              {saveSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  {saveSuccess}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 bg-pink-600 text-white py-4 rounded-lg font-medium hover:bg-pink-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-8 py-4 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}

