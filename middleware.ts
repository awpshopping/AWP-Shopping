import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const token = request.cookies.get('admin_token')?.value

    // Define paths
    const isLoginPage = path === '/admin/login'
    const isAdminPath = path.startsWith('/admin')

    // If trying to access login page while already logged in
    if (isLoginPage && token) {
        return NextResponse.redirect(new URL('/admin', request.url))
    }

    // If trying to access protected admin pages without being logged in
    if (isAdminPath && !isLoginPage && !token) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
    matcher: ['/admin/:path*']
}
