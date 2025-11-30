import { NextRequest, NextResponse } from 'next/server'
import { getProductById } from '@/lib/products'
import { ApiResponse } from '@/types/product'

/**
 * GET /api/products/[id]
 * Get a single product by ID
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        if (!id) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: 'Product ID is required',
                },
                { status: 400 }
            )
        }

        const product = await getProductById(id)

        if (!product) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: 'Product not found',
                },
                { status: 404 }
            )
        }

        return NextResponse.json<ApiResponse>(
            {
                success: true,
                data: product,
            },
            { status: 200 }
        )
    } catch (error) {
        console.error('Get product error:', error)
        return NextResponse.json<ApiResponse>(
            {
                success: false,
                error: 'Internal server error',
            },
            { status: 500 }
        )
    }
}
