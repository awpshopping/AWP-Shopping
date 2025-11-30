import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

/**
 * Upload a single image to Cloudinary
 * @param file - Base64 encoded image or file path
 * @param folder - Cloudinary folder name (default: 'AWP Shopping-products')
 * @returns Cloudinary secure URL
 */
export async function uploadImage(
    file: string,
    folder: string = 'AWP Shopping-products'
): Promise<string> {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder,
            resource_type: 'auto',
            transformation: [
                { width: 1000, height: 1000, crop: 'limit' },
                { quality: 'auto:good' },
            ],
        })
        return result.secure_url
    } catch (error) {
        console.error('Cloudinary upload error:', error)
        throw new Error('Failed to upload image to Cloudinary')
    }
}

/**
 * Upload multiple images to Cloudinary
 * @param files - Array of base64 encoded images
 * @param folder - Cloudinary folder name
 * @returns Array of Cloudinary secure URLs
 */
export async function uploadMultipleImages(
    files: string[],
    folder: string = 'AWP Shopping-products'
): Promise<string[]> {
    try {
        const uploadPromises = files.map((file) => uploadImage(file, folder))
        const urls = await Promise.all(uploadPromises)
        return urls
    } catch (error) {
        console.error('Multiple image upload error:', error)
        throw new Error('Failed to upload images to Cloudinary')
    }
}

/**
 * Delete an image from Cloudinary
 * @param publicId - Cloudinary public ID
 */
export async function deleteImage(publicId: string): Promise<void> {
    try {
        await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        console.error('Cloudinary delete error:', error)
        throw new Error('Failed to delete image from Cloudinary')
    }
}

export default cloudinary
