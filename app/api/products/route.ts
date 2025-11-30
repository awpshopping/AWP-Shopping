import { NextResponse } from 'next/server'
import { getProducts } from '@/lib/products'
import { ApiResponse } from '@/types/product'

/**
 * GET /api/products
 * Public endpoint to get all products
 */
export async function GET() {
    try {
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
