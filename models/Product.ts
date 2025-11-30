import mongoose, { Schema, Document } from 'mongoose'

export interface IProduct extends Document {
    title: string
    description: string
    price: number
    rating: number
    type: string
    sizes: string[]
    colours: string[]
    images: string[]
    createdAt: string
    updatedAt: string
}

const ProductSchema = new Schema<IProduct>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    rating: { type: Number, required: true, min: 0, max: 5 },
    type: { type: String, required: true },
    sizes: { type: [String], required: true },
    colours: { type: [String], required: true },
    images: { type: [String], required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
})

// Check if model already exists to prevent overwrite error during hot reload
export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)
