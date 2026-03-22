// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Lấy token từ cookie
    const token = request.cookies.get('auth_token')?.value;

    // Nếu đang cố vào các trang dashboard mà không có token
    if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Nếu đã có token rồi mà còn cố quay lại trang login
    if (token && request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

// Chỉ định những đường dẫn nào middleware sẽ kiểm tra
export const config = {
    matcher: ['/dashboard/:path*', '/login'],
};