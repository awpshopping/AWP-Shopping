import { NextRequest, NextResponse } from 'next/server'
import { signToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
    try {
        const { password } = await request.json()

        if (!password) {
            return NextResponse.json(
                { success: false, error: 'Password is required' },
                { status: 400 }
            )
        }

        // Verify password directly
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

        if (password !== ADMIN_PASSWORD) {
            return NextResponse.json(
                { success: false, error: 'Invalid password' },
                { status: 401 }
            )
        }

        // Generate token with dummy admin data
        // We don't need a real user from DB anymore since we're using a single admin password
        const token = signToken({
            userId: 'admin',
            email: 'admin@awpfashions.com',
            role: 'admin'
        })

        // Create response
        const response = NextResponse.json(
            { success: true, message: 'Logged in successfully' },
            { status: 200 }
        )

        // Set HTTP-only cookie
        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400, // 1 day
            path: '/',
        })

        return response
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}
