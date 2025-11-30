import { NextRequest, NextResponse } from 'next/server'
import { uploadMultipleImages } from '@/lib/cloudinary'
import { addProduct, getProducts, getProductById, updateProduct } from '@/lib/products'
import { Product, ApiResponse } from '@/types/product'

/**
 * Verify admin authentication
 */
import { getSession } from '@/lib/auth'

/**
 * Verify admin authentication
 */
async function verifyAdmin(): Promise<boolean> {
    const session = await getSession()
    return !!session
}

/**
 * POST /api/admin/products
 * Create a new product with Cloudinary image upload
 */
export async function POST(request: NextRequest) {
    try {
        // Verify admin authentication
        const isAdmin = await verifyAdmin()
        if (!isAdmin) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: 'Unauthorized - Invalid admin credentials',
                },
                { status: 401 }
            )
        }

        // Parse request body
        const body = await request.json()
        const { title, description, price, rating, sizes, colours, images } = body

        // Validate required fields
        if (!title || !description || price === undefined || rating === undefined || !sizes || !colours || !images) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: 'Missing required fields',
                },
                { status: 400 }
            )
        }

        // Validate data types
        if (typeof title !== 'string' || typeof description !== 'string') {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: 'Invalid data types for title or description',
                },
                { status: 400 }
            )
        }

        if (typeof price !== 'number' || price < 0) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: 'Price must be a positive number',
                },
                { status: 400 }
            )
        }

        if (typeof rating !== 'number' || rating < 0 || rating > 5) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: 'Rating must be a number between 0 and 5',
                },
                { status: 400 }
            )
        }

        if (!Array.isArray(sizes) || !Array.isArray(colours) || !Array.isArray(images)) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: 'Sizes, colours, and images must be arrays',
                },
                { status: 400 }
            )
        }

        if (images.length === 0) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: 'At least one image is required',
                },
                { status: 400 }
            )
        }

        // Upload images to Cloudinary
        let imageUrls: string[]
        try {
            imageUrls = await uploadMultipleImages(images)
        } catch (error) {
            console.error('Image upload failed:', error)
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: 'Failed to upload images to Cloudinary',
                },
                { status: 500 }
            )
        }

        // Create product object
        const now = new Date().toISOString()
        const product: Omit<Product, 'id'> = {
            title: title.trim(),
            description: description.trim(),
            price: Number(price),
            rating: Number(rating),
            type: 'frock', // Default type, can be updated via the form
            sizes: sizes.map((s: string) => s.trim()),
            colours: colours.map((c: string) => c.trim()),
            images: imageUrls,
            createdAt: now,
            updatedAt: now,
        }

        // Save product to JSON file
        const savedProduct = await addProduct(product)

        return NextResponse.json<ApiResponse>(
            {
                success: true,
                data: savedProduct,
                message: 'Product created successfully',
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('Product creation error:', error)
        return NextResponse.json<ApiResponse>(
            {
                success: false,
                error: 'Internal server error',
            },
            { status: 500 }
        )
    }
}

/**
 * GET /api/admin/products
 * Get all products
 */
export async function GET() {
    try {
        // Verify admin authentication
        const isAdmin = await verifyAdmin()
        if (!isAdmin) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: 'Unauthorized - Invalid admin credentials',
                },
                { status: 401 }
            )
        }

        const products = await getProducts()

        return NextResponse.json<ApiResponse>(
            {
                success: true,
                data: products,
            },
            { status: 200 }
        )
    } catch (error) {
        console.error('Get products error:', error)
        return NextResponse.json<ApiResponse>(
            {
                success: false,
                error: 'Internal server error',
            },
            { status: 500 }
        )
    }
}

/**
 * PUT /api/admin/products
 * Update an existing product
 */
export async function PUT(request: NextRequest) {
    try {
        // Verify admin authentication
        const isAdmin = await verifyAdmin()
        if (!isAdmin) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: 'Unauthorized - Invalid admin credentials',
                },
                { status: 401 }
            )
        }

        // Parse FormData (since we're uploading files)
        const formData = await request.formData()
        
        // Extract text fields
        const id = formData.get('id') as string
        const title = formData.get('title') as string
        const description = formData.get('description') as string
        const price = parseFloat(formData.get('price') as string)
        const rating = parseFloat(formData.get('rating') as string)
        const type = formData.get('type') as string
        const sizesStr = formData.get('sizes') as string
        const coloursStr = formData.get('colours') as string
        const existingImagesStr = formData.get('existingImages') as string
        
        // Parse JSON fields
        let sizes: string[] = []
        let colours: string[] = []
        let existingImages: string[] = []
        
        try {
            sizes = sizesStr ? JSON.parse(sizesStr) : []
            colours = coloursStr ? JSON.parse(coloursStr) : []
            existingImages = existingImagesStr ? JSON.parse(existingImagesStr) : []
        } catch (parseError) {
            console.error('Error parsing JSON fields:', parseError)
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: 'Invalid data format for sizes, colours, or existingImages',
                },
                { status: 400 }
            )
        }
        
        // Extract image files from FormData
        const imageFiles: File[] = []
        const imageEntries = formData.getAll('images')
        for (const entry of imageEntries) {
            if (entry instanceof File) {
                imageFiles.push(entry)
            }
        }

        // Validate required fields
        if (!id || !title || !description || isNaN(price) || isNaN(rating)) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: 'Missing required fields',
                },
                { status: 400 }
            )
        }

        // Validate price
        if (price < 0) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: 'Price must be a positive number',
                },
                { status: 400 }
            )
        }
        
        // Validate rating
        if (rating < 0 || rating > 5) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: 'Rating must be between 0 and 5',
                },
                { status: 400 }
            )
        }
        
        // Validate arrays
        if (!Array.isArray(sizes) || !Array.isArray(colours) || !Array.isArray(existingImages)) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: 'Sizes, colours, and existingImages must be arrays',
                },
                { status: 400 }
            )
        }

        // Get existing product
        const existingProduct = await getProductById(id)
        if (!existingProduct) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: 'Product not found',
                },
                { status: 404 }
            )
        }

        // Handle images: combine existing images with new uploads
        let finalImages: string[] = existingImages || []

        if (imageFiles.length > 0) {
            try {
                // Convert File objects to base64 strings
                const base64Promises = imageFiles.map((file) => {
                    return new Promise<string>((resolve, reject) => {
                        const reader = new FileReader()
                        reader.onload = () => {
                            const result = reader.result as string
                            resolve(result)
                        }
                        reader.onerror = (error) => reject(error)
                        reader.readAsDataURL(file)
                    })
                })
                
                const base64Images = await Promise.all(base64Promises)
                const newImageUrls = await uploadMultipleImages(base64Images)
                finalImages = [...finalImages, ...newImageUrls]
            } catch (error) {
                console.error('Image upload failed:', error)
                return NextResponse.json<ApiResponse>(
                    {
                        success: false,
                        error: 'Failed to upload new images to Cloudinary',
                    },
                    { status: 500 }
                )
            }
        }

        // Ensure at least one image
        if (finalImages.length === 0) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: 'At least one image is required',
                },
                { status: 400 }
            )
        }

        // Update product
        const updatedProduct = await updateProduct(id, {
            title: title.trim(),
            description: description.trim(),
            price: price,
            rating: rating,
            type: type || existingProduct.type,
            sizes: sizes.map((s: string) => s.trim()),
            colours: colours.map((c: string) => c.trim()),
            images: finalImages,
        })

        if (!updatedProduct) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: 'Failed to update product',
                },
                { status: 500 }
            )
        }

        return NextResponse.json<ApiResponse>(
            {
                success: true,
                data: updatedProduct,
                message: 'Product updated successfully',
            },
            { status: 200 }
        )
    } catch (error) {
        console.error('Product update error:', error)
        return NextResponse.json<ApiResponse>(
            {
                success: false,
                error: 'Internal server error',
            },
            { status: 500 }
        )
    }
}
