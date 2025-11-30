export interface Product {
    id: string
    title: string
    description: string
    price: number
    rating: number
    reviewCount?: number
    originalPrice?: number
    type: string // Product type (e.g., 'frock', 'lehenga', 'kurti')
    sizes: string[]
    colours: string[]
    images: string[] // Cloudinary URLs
    createdAt: string
    updatedAt: string
}

export interface ProductFormData {
    title: string
    description: string
    price: number
    rating: number
    sizes: string[]
    colours: string[]
    images: File[]
}

export interface ApiResponse<T = unknown> {
    success: boolean
    data?: T
    error?: string
    message?: string
}
