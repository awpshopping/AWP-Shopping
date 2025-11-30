import dbConnect from '@/lib/db'
import ProductModel from '@/models/Product'
import { Product } from '@/types/product'

/**
 * Read all products from the database
 * @returns Array of products
 */
export async function getProducts(): Promise<Product[]> {
    try {
        await dbConnect()
        const products = await ProductModel.find({}).lean()
        return products.map(mapDocToProduct)
    } catch (error) {
        console.error('Error reading products:', error)
        return []
    }
}

/**
 * Get a single product by ID
 * @param id - Product ID
 * @returns Product or null
 */
export async function getProductById(id: string): Promise<Product | null> {
    try {
        await dbConnect()
        const product = await ProductModel.findById(id).lean()
        return product ? mapDocToProduct(product) : null
    } catch (error) {
        console.error('Error getting product:', error)
        return null
    }
}

/**
 * Add a new product to the database
 * @param product - Product to add
 * @returns The added product
 */
export async function addProduct(product: Omit<Product, 'id'>): Promise<Product> {
    try {
        await dbConnect()
        const newProduct = new ProductModel(product)
        await newProduct.save()
        return mapDocToProduct(newProduct.toObject())
    } catch (error) {
        console.error('Error adding product:', error)
        throw new Error('Failed to add product')
    }
}

/**
 * Update an existing product
 * @param id - Product ID
 * @param updates - Partial product updates
 * @returns Updated product or null
 */
export async function updateProduct(
    id: string,
    updates: Partial<Product>
): Promise<Product | null> {
    try {
        await dbConnect()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _, ...updateData } = updates

        const product = await ProductModel.findByIdAndUpdate(
            id,
            { $set: { ...updateData, updatedAt: new Date().toISOString() } },
            { new: true }
        ).lean()

        return product ? mapDocToProduct(product) : null
    } catch (error) {
        console.error('Error updating product:', error)
        throw new Error('Failed to update product')
    }
}

/**
 * Delete a product by ID
 * @param id - Product ID
 * @returns True if deleted, false otherwise
 */
export async function deleteProduct(id: string): Promise<boolean> {
    try {
        await dbConnect()
        const result = await ProductModel.findByIdAndDelete(id)
        return !!result
    } catch (error) {
        console.error('Error deleting product:', error)
        throw new Error('Failed to delete product')
    }
}

// Helper to map Mongoose document to Product interface
function mapDocToProduct(doc: Record<string, unknown>): Product {
    const { _id, ...product } = doc
    return {
        ...product,
        id: String(_id),
    } as unknown as Product
}
